-- MOTORA — novidades de 01/11/2026 (AINDA NÃO APLICADO; só aplicar quando o dono pedir a publicação)
-- 1) Backup diário às 00:00 (Brasília)
-- 2) Dia da semana do pagamento por motorista (profiles.payment_day_of_week: 0=domingo ... 6=sábado; vazio = segunda)
-- 3/4) Cobrança automática pelo Asaas (profiles.asaas_auto_charge_enabled)
-- 5) Robô do WhatsApp no computador do dono (só disparo de mensagens)

-- ===== 2) Dia do pagamento e 3) liga/desliga do Asaas (colunas já criadas no banco; "if not exists" não muda nada) =====
alter table public.profiles add column if not exists payment_day_of_week smallint;
alter table public.profiles add column if not exists asaas_auto_charge_enabled boolean not null default false;
alter table public.profiles drop constraint if exists profiles_payment_day_chk;
alter table public.profiles add constraint profiles_payment_day_chk check (payment_day_of_week is null or payment_day_of_week between 0 and 6);

-- próximo dia escolhido (ou hoje, se for o dia) às 23:59:59, horário de Brasília
create or replace function public.next_due(p_from timestamptz, p_dia int)
 returns timestamptz language sql stable as $f$
select ((p_from at time zone 'America/Sao_Paulo')::date
        + ((coalesce(p_dia, 1) - extract(dow from p_from at time zone 'America/Sao_Paulo')::int + 7) % 7)
        + time '23:59:59') at time zone 'America/Sao_Paulo';
$f$;

create or replace function public.profiles_pix_dates()
 returns trigger language plpgsql as $f$
begin
if current_setting('motora.keep_pix_dates', true) = '1' then return new; end if;
if new.role = 'driver' and (new.pix_code is not null or new.pix_qr_path is not null) and (tg_op = 'INSERT' or new.pix_code is distinct from old.pix_code or new.pix_qr_path is distinct from old.pix_qr_path or new.pix_sent_at is distinct from old.pix_sent_at) then
  new.pix_sent_at := now();
  new.pix_due_at := public.next_due(now(), coalesce(new.payment_day_of_week, 1));
elsif tg_op = 'UPDATE' then
  new.pix_sent_at := old.pix_sent_at;
  new.pix_due_at := old.pix_due_at;
end if;
return new;
end $f$;

-- ===== 4) pagamento que veio do Asaas já entra conferido: não manda a IA ler o arquivo =====
create or replace function public.receipt_sets_em_dia()
 returns trigger language plpgsql security definer set search_path to 'public' as $f$
declare v_hist uuid;
begin
  select id into v_hist from pix_history
   where driver_id = new.driver_id and paid_at is null and sent_at < new.created_at
   order by sent_at desc limit 1;
  if v_hist is not null then
    update pix_history set receipt_id = new.id where id = v_hist;
  else
    perform drive_notify(jsonb_build_object('type', 'receipt', 'receipt_id', new.id));
  end if;
  if coalesce(new.ai_result->>'origem', '') <> 'asaas' then
    perform call_edge('motora-sync', jsonb_build_object('type', 'verify_receipt', 'receipt_id', new.id));
  end if;
  return new;
end $f$;

-- ===== chaves internas (geradas aqui; ninguém precisa digitar) =====
insert into public.app_secrets(key, value) values
  ('robo_token', encode(gen_random_bytes(24), 'hex')),
  ('asaas_webhook_token', encode(gen_random_bytes(24), 'hex'))
on conflict (key) do nothing;
-- A chave da API do Asaas (asaas_key) é colocada pelo dono no painel do Supabase (tabela app_secrets).
-- A função motora-asaas deve ser publicada SEM exigir login (o Asaas chama de fora) — ela confere a chave asaas_webhook_token.
-- No Asaas: Integrações > Webhooks > URL https://epswrtcwszhbapaxdpzz.supabase.co/functions/v1/motora-asaas, token = asaas_webhook_token, eventos de Cobrança.
-- Para testar no ambiente de testes do Asaas, crie também asaas_ambiente = 'sandbox'.

-- ===== 1) Backup: pasta privada para os arquivos =====
insert into storage.buckets(id, name, public) values ('backups', 'backups', false) on conflict (id) do nothing;
-- pasta privada da sessão do WhatsApp do robô (Hostless)
insert into storage.buckets(id, name, public) values ('robo', 'robo', false) on conflict (id) do nothing;

-- ===== agendamentos =====
select cron.unschedule(jobname) from cron.job where jobname in ('motora-backup-diario', 'motora-asaas-cobrar');

-- 00:00 de Brasília = 03:00 UTC
select cron.schedule('motora-backup-diario', '0 3 * * *', $c$
select net.http_post(url := 'https://epswrtcwszhbapaxdpzz.supabase.co/functions/v1/motora-backup',
  headers := jsonb_build_object('Content-Type', 'application/json', 'x-cron-token', (select value from public.app_secrets where key = 'cron_token')),
  body := '{}'::jsonb, timeout_milliseconds := 120000)
$c$);

-- todo dia às 08:00 de Brasília: cria no Asaas os QR codes Pix (estáticos, sem taxa até 100/mês) das cobranças que vencem nos próximos 3 dias
select cron.schedule('motora-asaas-cobrar', '0 11 * * *', $c$
select net.http_post(url := 'https://epswrtcwszhbapaxdpzz.supabase.co/functions/v1/motora-asaas',
  headers := jsonb_build_object('Content-Type', 'application/json', 'x-cron-token', (select value from public.app_secrets where key = 'cron_token')),
  body := '{"acao":"cobrar"}'::jsonb, timeout_milliseconds := 120000)
$c$);
