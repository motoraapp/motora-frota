-- MOTORA — 03/11/2026 (APLICADO em 03/11/2026)
-- Publicar antes a função motora-lembretes SEM exigir login (ela confere o cron_token).
-- Todo dia às 08:30 de Brasília: lembra o dono 2 dias antes e o motorista no dia do vencimento.
select cron.schedule('motora-lembretes', '30 11 * * *', $job$
select net.http_post(url := 'https://epswrtcwszhbapaxdpzz.supabase.co/functions/v1/motora-lembretes',
  headers := jsonb_build_object('Content-Type', 'application/json', 'x-cron-token', (select value from public.app_secrets where key = 'cron_token')),
  body := '{"acao":"lembrar"}'::jsonb, timeout_milliseconds := 120000)
$job$);

-- 03/11/2026: lembrete do motorista no dia do pagamento às 19:00 de Brasília; o do dono continua às 08:30.
select cron.schedule('motora-lembretes', '30 11 * * *', $job$
select net.http_post(url := 'https://epswrtcwszhbapaxdpzz.supabase.co/functions/v1/motora-lembretes',
  headers := jsonb_build_object('Content-Type', 'application/json', 'x-cron-token', (select value from public.app_secrets where key = 'cron_token')),
  body := '{"acao":"lembrar","quem":"dono"}'::jsonb, timeout_milliseconds := 120000)
$job$);
select cron.schedule('motora-lembretes-motorista', '0 22 * * *', $job$
select net.http_post(url := 'https://epswrtcwszhbapaxdpzz.supabase.co/functions/v1/motora-lembretes',
  headers := jsonb_build_object('Content-Type', 'application/json', 'x-cron-token', (select value from public.app_secrets where key = 'cron_token')),
  body := '{"acao":"lembrar","quem":"motorista"}'::jsonb, timeout_milliseconds := 120000)
$job$);
