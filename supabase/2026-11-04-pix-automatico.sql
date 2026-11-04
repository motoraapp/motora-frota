-- Pix automático do MOTORA e lembrete do meio-dia (já aplicado em 04/11/2026)
-- Ficha do motorista: Forma de cobrança "Pix automático do MOTORA" grava profiles.pix_extra.pix_auto = true (sem coluna nova).
-- A chave do dono fica em app_settings 'pix_recebedor' = {nome, cidade, tipo, chave} (o Novo Pix com "Gerar sozinho" atualiza).

-- 10:00 de Brasília: 2 dias antes do vencimento cria o Pix copia e cola (função motora-lembretes, quem=pix_auto)
select cron.schedule('motora-pix-auto', '0 13 * * *', $c$
select net.http_post(url := 'https://epswrtcwszhbapaxdpzz.supabase.co/functions/v1/motora-lembretes',
  headers := jsonb_build_object('Content-Type', 'application/json', 'x-cron-token', (select value from public.app_secrets where key = 'cron_token')),
  body := '{"acao":"lembrar","quem":"pix_auto"}'::jsonb, timeout_milliseconds := 120000)
$c$);

-- 12:00 de Brasília: lembrete do dia do vencimento (o das 19:00 já existia: motora-lembretes-motorista)
select cron.schedule('motora-lembretes-motorista-12h', '0 15 * * *', $c$
select net.http_post(url := 'https://epswrtcwszhbapaxdpzz.supabase.co/functions/v1/motora-lembretes',
  headers := jsonb_build_object('Content-Type', 'application/json', 'x-cron-token', (select value from public.app_secrets where key = 'cron_token')),
  body := '{"acao":"lembrar","quem":"motorista"}'::jsonb, timeout_milliseconds := 120000)
$c$);
