-- PIX DE ATRASO LOGO DEPOIS DA MEIA-NOITE (25/11/2026; já aplicado no Supabase)
-- Antes o Pix com multa e juros só era gerado às 08:00 (motora-asaas-cobrar) e o motorista que venceu à meia-noite
-- ficava sem código para pagar até lá (caso do Soyer). Mesmas condições da rotina normal:
-- só Asaas ligado, contrato ativo, sem comprovante aguardando conferência e sem Pix parcial.
create or replace function public.atraso_qr_madrugada()
returns integer
language plpgsql
security definer
set search_path to 'public'
as $$
declare d record; n int := 0;
begin
  for d in
    select p.id from profiles p
     where p.role = 'driver'
       and p.deleted_at is null
       and p.asaas_auto_charge_enabled
       and coalesce((p.pix_extra->>'sem_cobranca')::boolean, false) = false
       and p.pix_extra->'contrato_encerrado' is null
       and p.pix_extra->'parcial' is null
       and p.pix_extra->'parcial_pendente' is null
       and p.pix_due_at < now()
       and p.pix_due_at > now() - interval '1 day'
       and coalesce(p.pix_extra->'atraso_qr'->>'data', '') <> to_char(now() at time zone 'America/Sao_Paulo', 'YYYY-MM-DD')
       and not exists (select 1 from receipts r where r.driver_id = p.id and r.rejected_at is null and r.created_at >= p.pix_sent_at)
  loop
    perform net.http_post(
      url := 'https://epswrtcwszhbapaxdpzz.supabase.co/functions/v1/motora-asaas',
      headers := jsonb_build_object('Content-Type', 'application/json', 'x-cron-token', (select value from app_secrets where key = 'cron_token')),
      body := jsonb_build_object('acao', 'atualizar_atraso', 'driver_id', d.id),
      timeout_milliseconds := 60000);
    n := n + 1;
  end loop;
  return n;
end $$;

revoke all on function public.atraso_qr_madrugada() from public, anon, authenticated;

-- 00:10 de Brasília (03:10 UTC), depois do motora-verificar-atrasos das 00:05
select cron.schedule('motora-atraso-madrugada', '10 3 * * *', 'select public.atraso_qr_madrugada()');
