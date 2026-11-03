-- WhatsApp do dono: avisos do master no número dele e confirmação de comprovante por resposta.
-- O número fica em app_secrets (chave dono_whatsapp), que motorista não lê.
create table if not exists public.whatsapp_dono (
  id uuid primary key default gen_random_uuid(),
  message text not null,
  arquivo_path text,
  receipt_id uuid references public.receipts(id) on delete set null,
  codigo text,
  status text not null default 'pendente',
  created_at timestamptz not null default now(),
  sent_at timestamptz
);
alter table public.whatsapp_dono enable row level security; -- sem regras: só as funções internas acessam
grant select, insert, update, delete on table public.whatsapp_dono to service_role;
create index if not exists whatsapp_dono_pendente on public.whatsapp_dono (created_at) where status = 'pendente';
create unique index if not exists whatsapp_dono_codigo on public.whatsapp_dono (codigo) where codigo is not null and status <> 'decidido';

create or replace function public.receipt_avisa_dono() returns trigger
language plpgsql security definer set search_path = public as $$
declare v_nome text; v_valor text; v_probs text; v_ia text;
begin
  if old.ai_status is not null or new.ai_status is null or new.confirmed_at is not null or new.rejected_at is not null then return new; end if;
  if exists (select 1 from whatsapp_dono where receipt_id = new.id) then return new; end if;
  select name into v_nome from profiles where id = new.driver_id;
  v_valor := case when new.ai_result->>'valor' ~ '^[0-9.]+$'
    then 'R$ ' || replace(to_char((new.ai_result->>'valor')::numeric, 'FM999999990.00'), '.', ',') else 'não lido' end;
  select string_agg('• ' || p, E'\n') into v_probs from jsonb_array_elements_text(coalesce(new.ai_result->'problemas', '[]'::jsonb)) p;
  v_ia := case new.ai_status when 'ok' then '✅ A IA conferiu: os dados batem.'
    when 'alerta' then E'⚠️ A IA encontrou problemas:\n' || coalesce(v_probs, '')
    else '⚠️ A IA não conseguiu ler. Confira o arquivo.' end;
  insert into whatsapp_dono (message, arquivo_path, receipt_id) values (
    '🧾 *Comprovante de ' || coalesce(v_nome, 'motorista') || E'*\nValor: ' || v_valor || E'\n' || v_ia ||
    E'\n\nPara decidir, responda:\n*CONFIRMAR*\nou\n*RECUSAR motivo*\nCom mais de um aberto, diga o nome. Exemplo: *CONFIRMAR ' || split_part(coalesce(v_nome, 'Fulano'), ' ', 1) || '*',
    new.file_path, new.id);
  return new;
exception when others then
  raise warning 'receipt_avisa_dono: %', sqlerrm; -- o aviso nunca pode travar a conferência do comprovante
  return new;
end $$;
drop trigger if exists trg_receipt_avisa_dono on public.receipts;
create trigger trg_receipt_avisa_dono after update of ai_status on public.receipts
  for each row execute function public.receipt_avisa_dono();

-- mesma regra de master_confirm_receipt / master_reject_receipt, chamada só pela função do robô
create or replace function public.robo_decidir_comprovante(p_receipt uuid, p_confirmar boolean, p_motivo text default null) returns text
language plpgsql security definer set search_path = public as $$
declare r receipts; v_hist uuid;
begin
  select * into r from receipts where id = p_receipt for update;
  if not found then return 'nao_encontrado'; end if;
  if r.confirmed_at is not null then return 'ja_confirmado'; end if;
  if r.rejected_at is not null then return 'ja_recusado'; end if;
  if p_confirmar then
    update receipts set confirmed_at = now(), rejected_at = null, reject_reason = null where id = p_receipt;
    update profiles set payment_status = 'Em dia' where id = r.driver_id;
    select id into v_hist from pix_history
     where driver_id = r.driver_id and paid_at is null and (receipt_id = p_receipt or sent_at < r.created_at)
     order by (receipt_id = p_receipt) desc nulls last, sent_at desc limit 1;
    if v_hist is not null then update pix_history set paid_at = r.created_at, receipt_id = p_receipt where id = v_hist; end if;
    perform call_edge('motora-push', jsonb_build_object('type', 'driver_alert', 'driver_id', r.driver_id,
      'title', 'Pagamento confirmado', 'body', 'Seu Pix foi confirmado. Obrigado!'));
    return 'confirmado';
  end if;
  update receipts set rejected_at = now(), confirmed_at = null, reject_reason = nullif(trim(p_motivo), '') where id = p_receipt;
  update pix_history set receipt_id = null where receipt_id = p_receipt and paid_at is null;
  perform call_edge('motora-push', jsonb_build_object('type', 'driver_alert', 'driver_id', r.driver_id,
    'title', 'Comprovante recusado',
    'body', coalesce(nullif(trim(p_motivo), ''), 'O comprovante não foi aceito.') || ' Envie o comprovante correto.'));
  return 'recusado';
end $$;
revoke all on function public.robo_decidir_comprovante(uuid, boolean, text) from public, anon, authenticated;
grant execute on function public.robo_decidir_comprovante(uuid, boolean, text) to service_role;
revoke all on function public.receipt_avisa_dono() from public, anon, authenticated;

-- Lembrete de ganhos: uma vez por dia, às 20:30 de Brasília (já aplicado em 03/11/2026)
-- select cron.alter_job(4, schedule := '30 23 * * *');
