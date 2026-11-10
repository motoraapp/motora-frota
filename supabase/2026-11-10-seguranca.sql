-- Segurança (10/11/2026). Já aplicado no banco.
begin;

-- 1) Configurações internas (QR do robô, regras da IA, recebedor do Pix) só para o dono.
--    Quem não é dono continua lendo apenas o visual do app e as funções ligadas para o motorista.
drop policy if exists todos_leem_config on public.app_settings;
create policy todos_leem_config on public.app_settings
  for select to authenticated
  using (key in ('design', 'driver_features'));

-- 2) Comprovante conferido pela IA não conta como pago: fica "confere" até o dono confirmar.
--    Asaas e PicPay já entram com confirmed_at (o próprio banco confirmou) e continuam automáticos.
--    Comprovantes antigos ficam como estavam.
create or replace function public.receipt_ia_aguarda_dono() returns trigger
language plpgsql set search_path = public as $$
begin
  if new.ai_status = 'ok' and new.confirmed_at is null then new.ai_status := 'confere'; end if;
  return new;
end $$;
revoke execute on function public.receipt_ia_aguarda_dono() from public, anon, authenticated;
drop trigger if exists trg_receipt_ia_aguarda_dono on public.receipts;
create trigger trg_receipt_ia_aguarda_dono before insert or update of ai_status on public.receipts
  for each row execute function public.receipt_ia_aguarda_dono();

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
  v_ia := case when new.ai_result->>'origem' = 'bb' then '🏦 O robô achou este Pix no extrato do Banco do Brasil (mesmo valor da cobrança de hoje).'
    when new.ai_status in ('ok', 'confere') then '✅ A IA conferiu: os dados batem. Veja no banco se o dinheiro caiu.'
    when new.ai_status = 'alerta' then E'⚠️ A IA encontrou problemas:\n' || coalesce(v_probs, '')
    else '⚠️ A IA não conseguiu ler. Confira o arquivo.' end;
  insert into whatsapp_dono (message, arquivo_path, receipt_id) values (
    '🧾 *Comprovante de ' || coalesce(v_nome, 'motorista') || E'*\nValor: ' || v_valor || E'\n' || v_ia ||
    E'\n\nPara decidir, responda:\n*CONFIRMAR*\nou\n*RECUSAR motivo*\nCom mais de um aberto, diga o nome. Exemplo: *CONFIRMAR ' || split_part(coalesce(v_nome, 'Fulano'), ' ', 1) || '*',
    new.file_path, new.id);
  if new.ai_status = 'confere' then
    perform call_edge('motora-push', jsonb_build_object('type', 'master_alert',
      'title', 'Comprovante de ' || coalesce(v_nome, 'motorista') || ': confirme',
      'body', 'Valor: ' || v_valor || '. A IA conferiu. Veja no banco se o dinheiro caiu e toque em Confirmar Pix.', 'url', '/'));
  end if;
  return new;
exception when others then
  raise warning 'receipt_avisa_dono: %', sqlerrm;
  return new;
end $$;

-- 3) Asaas: o dono cola a chave Pix no app, e o mesmo pagamento nunca entra duas vezes.
create or replace function public.set_app_config(p_key text, p_value text) returns void
language plpgsql security definer set search_path = public as $$
begin
if not public.is_master() then raise exception 'Apenas o master'; end if;
if p_key not in ('gemini_key', 'drive_url', 'asaas_key', 'asaas_ambiente', 'asaas_chave_pix', 'picpay_client_id', 'picpay_client_secret', 'picpay_webhook_token', 'picpay_ambiente') then raise exception 'Configuração desconhecida'; end if;
if coalesce(trim(p_value), '') = '' then delete from app_secrets where key = p_key;
else insert into app_secrets (key, value) values (p_key, trim(p_value)) on conflict (key) do update set value = excluded.value; end if;
if p_key = 'asaas_key' then delete from app_secrets where key = 'asaas_chave_pix'; end if;
end $$;

create unique index if not exists receipts_asaas_unico on public.receipts ((ai_result->>'id_transacao'))
  where ai_result->>'origem' = 'asaas';

commit;
