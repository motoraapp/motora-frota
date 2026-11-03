-- MOTORA — 03/11/2026 (AINDA NÃO APLICADO; só aplicar quando o dono pedir a publicação)
-- Publicar antes a função motora-lembretes SEM exigir login (ela confere o cron_token).
-- Todo dia às 08:30 de Brasília: lembra o dono 2 dias antes e o motorista no dia do vencimento.
select cron.schedule('motora-lembretes', '30 11 * * *', $job$
select net.http_post(url := 'https://epswrtcwszhbapaxdpzz.supabase.co/functions/v1/motora-lembretes',
  headers := jsonb_build_object('Content-Type', 'application/json', 'x-cron-token', (select value from public.app_secrets where key = 'cron_token')),
  body := '{"acao":"lembrar"}'::jsonb, timeout_milliseconds := 120000)
$job$);
