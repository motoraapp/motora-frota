-- AVISO DE DEVOLUÇÃO PELO MOTORISTA (25/11/2026, pedido do dono). Já aplicado no Supabase.
-- O motorista toca em "Avisar devolução do carro", preenche a data e manda o comunicado pelo WhatsApp.
-- Esta função: confere a data (no mínimo 15 dias corridos, Cláusula 13 do contrato), guarda o pedido em
-- pix_extra.devolucao_pedido = {em, data, motivo}, avisa o dono no app e devolve o WhatsApp do locador
-- (app_settings locador_config.phone) para o app abrir a conversa certa. Quem registra a devolução
-- de verdade continua sendo o dono, na ficha ("Motorista informou a devolução").
create or replace function public.driver_avisar_devolucao(p_data date, p_motivo text default null)
 returns jsonb
 language plpgsql
 security definer
 set search_path to 'public'
as $f$
declare d profiles; v_hoje date := (now() at time zone 'America/Sao_Paulo')::date; v_fone text;
begin
  select * into d from profiles where id = auth.uid() and role = 'driver';
  if not found then raise exception 'apenas o motorista'; end if;
  if d.vehicle_id is null then raise exception 'você não está com nenhum carro'; end if;
  if p_data is null or p_data < v_hoje + 15 then raise exception 'a devolução precisa ser pelo menos 15 dias depois do aviso'; end if;
  update profiles set pix_extra = coalesce(pix_extra, '{}'::jsonb) || jsonb_build_object('devolucao_pedido',
    jsonb_build_object('em', now(), 'data', p_data, 'motivo', nullif(left(trim(coalesce(p_motivo, '')), 300), '')))
   where id = d.id;
  perform public.call_edge('motora-push', jsonb_build_object('type', 'master_alert', 'url', '/',
    'title', 'Aviso de devolução: ' || split_part(d.name, ' ', 1),
    'body', format('%s avisou que vai devolver o carro em %s. Confira e marque na ficha "Motorista informou a devolução".',
                   d.name, to_char(p_data, 'DD/MM/YYYY'))));
  select regexp_replace(coalesce(value->>'phone', ''), '\D', '', 'g') into v_fone from app_settings where key = 'locador_config';
  return jsonb_build_object('ok', true, 'whatsapp', nullif(v_fone, ''));
end $f$;

revoke execute on function public.driver_avisar_devolucao(date, text) from public, anon;
grant execute on function public.driver_avisar_devolucao(date, text) to authenticated;
