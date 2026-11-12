-- Inclui o valor pago de caução no encerramento de contrato e na mensagem ao motorista

create or replace function public.master_encerrar_contrato(
  p_driver uuid,
  p_data date default null,
  p_caucao_pago numeric default null
)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  d public.profiles%rowtype;
  v public.vehicles%rowtype;
  v_data date := coalesce(p_data, (now() at time zone 'America/Sao_Paulo')::date);
  v_caucao_ate date := v_data + 30;
  v_caucao_pago numeric := greatest(coalesce(p_caucao_pago, 0), 0);
  v_extra jsonb;
  v_texto text;
begin
  if not public.is_master() then
    raise exception 'apenas o master';
  end if;

  select * into d from public.profiles where id = p_driver and role = 'driver';
  if not found then
    raise exception 'motorista não encontrado';
  end if;

  if d.vehicle_id is not null then
    select * into v from public.vehicles where id = d.vehicle_id;
  end if;

  v_extra := coalesce(d.pix_extra, '{}'::jsonb)
    - 'pix_auto' - 'pix_auto_venc' - 'devolucao' - 'parcial' - 'parcial_pendente' - 'arquivado' - 'arquivado_em'
    || jsonb_build_object(
      'sem_cobranca', true,
      'contrato_encerrado', jsonb_build_object(
        'data', v_data,
        'caucao_ate', v_caucao_ate,
        'caucao_pago', v_caucao_pago,
        'encerrado_em', now(),
        'veiculo_id', d.vehicle_id,
        'veiculo', case when v.id is not null then v.model || ' (' || v.plate || ')' else null end
      )
    );

  perform set_config('motora.keep_pix_dates', '1', true);
  update public.profiles
  set vehicle_id = null,
      asaas_auto_charge_enabled = false,
      picpay_auto_charge_enabled = false,
      pix_code = null,
      pix_qr_path = null,
      pix_link = null,
      pix_amount = null,
      pix_description = null,
      pix_sent_at = null,
      pix_due_at = null,
      pix_extra = v_extra
  where id = p_driver;

  v_texto := 'Olá, ' || split_part(d.name, ' ', 1) || '! 👋' || E'\n\n' ||
    'Seu contrato foi encerrado em ' || to_char(v_data, 'DD/MM/YYYY') ||
    coalesce(' (' || v.model || ', placa ' || v.plate || ')', '') || '.' || E'\n';

  if v_caucao_pago > 0 then
    v_texto := v_texto || 'A caução de ' || public.brl_txt(v_caucao_pago) || ' (valor já pago) será paga na data de ' || to_char(v_caucao_ate, 'DD/MM/YYYY') || ' (após 30 dias do encerramento do contrato).';
  else
    v_texto := v_texto || 'A caução será paga na data de ' || to_char(v_caucao_ate, 'DD/MM/YYYY') || ' (após 30 dias do encerramento do contrato).';
  end if;

  insert into public.whatsapp_queue (driver_id, title, body, message)
  values (p_driver, 'Contrato encerrado', 'Previsão de pagamento da caução em 30 dias.', v_texto);
end $function$;

revoke all on function public.master_encerrar_contrato(uuid, date, numeric) from public, anon;
grant execute on function public.master_encerrar_contrato(uuid, date, numeric) to authenticated;
