-- MOTORA — 03/11/2026 (APLICADO)
-- Todo dia às 09:00 de Brasília: mensagem ao motorista em atraso.
select cron.schedule('motora-lembretes-atraso', '0 12 * * *', $job$
select net.http_post(url := 'https://epswrtcwszhbapaxdpzz.supabase.co/functions/v1/motora-lembretes',
  headers := jsonb_build_object('Content-Type', 'application/json', 'x-cron-token', (select value from public.app_secrets where key = 'cron_token')),
  body := '{"acao":"lembrar","quem":"atraso"}'::jsonb, timeout_milliseconds := 120000)
$job$);

-- Recibo em PDF
alter table public.whatsapp_queue add column if not exists arquivo_path text;
