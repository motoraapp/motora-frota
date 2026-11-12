-- Contagem de 30 dias da caução após encerramento do contrato + "Caução pago" e arquivamento da ficha

create or replace function public.master_encerrar_contrato(
  p_driver uuid,
  p_data date default null
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
    coalesce(' (' || v.model || ', placa ' || v.plate || ')', '') || '.' || E'\n' ||
    'A caução será paga na data de ' || to_char(v_caucao_ate, 'DD/MM/YYYY') || ' (após 30 dias do encerramento do contrato).';

  insert into public.whatsapp_queue (driver_id, title, body, message)
  values (p_driver, 'Contrato encerrado', 'Previsão de pagamento da caução em 30 dias.', v_texto);
end $function$;

create or replace function public.master_caucao_paga_arquivar(
  p_driver uuid,
  p_data_pago date default null
)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  d public.profiles%rowtype;
  v public.vehicles%rowtype;
  v_pago date := coalesce(p_data_pago, (now() at time zone 'America/Sao_Paulo')::date);
  v_enc jsonb;
  v_extra jsonb;
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

  v_enc := d.pix_extra->'contrato_encerrado';
  if v_enc is null then
    v_enc := jsonb_build_object(
      'data', v_pago,
      'caucao_ate', v_pago + 30,
      'encerrado_em', now(),
      'veiculo_id', d.vehicle_id,
      'veiculo', case when v.id is not null then v.model || ' (' || v.plate || ')' else null end
    );
  end if;

  v_enc := v_enc || jsonb_build_object(
    'caucao_pago_em', v_pago,
    'caucao_pago_registrado_em', now()
  );

  v_extra := coalesce(d.pix_extra, '{}'::jsonb)
    - 'pix_auto' - 'pix_auto_venc' - 'devolucao' - 'parcial' - 'parcial_pendente'
    || jsonb_build_object(
      'sem_cobranca', true,
      'arquivado', true,
      'arquivado_em', now(),
      'contrato_encerrado', v_enc
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
end $function$;

create or replace function public.master_desarquivar_ficha(p_driver uuid)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if not public.is_master() then
    raise exception 'apenas o master';
  end if;

  perform set_config('motora.keep_pix_dates', '1', true);
  update public.profiles
  set pix_extra = coalesce(pix_extra, '{}'::jsonb) - 'arquivado' - 'arquivado_em'
  where id = p_driver and role = 'driver';
  if not found then
    raise exception 'motorista não encontrado';
  end if;
end $function$;

revoke all on function public.master_encerrar_contrato(uuid, date) from public, anon;
grant execute on function public.master_encerrar_contrato(uuid, date) to authenticated;

revoke all on function public.master_caucao_paga_arquivar(uuid, date) from public, anon;
grant execute on function public.master_caucao_paga_arquivar(uuid, date) to authenticated;

revoke all on function public.master_desarquivar_ficha(uuid) from public, anon;
grant execute on function public.master_desarquivar_ficha(uuid) to authenticated;

-- Backfill caucao_ate em contratos ja encerrados
update public.profiles
set pix_extra = jsonb_set(
  pix_extra,
  '{contrato_encerrado,caucao_ate}',
  to_jsonb(((pix_extra->'contrato_encerrado'->>'data')::date + 30)::text),
  true
)
where role = 'driver'
  and pix_extra ? 'contrato_encerrado'
  and coalesce(pix_extra->'contrato_encerrado'->>'data', '') ~ '^\d{4}-\d{2}-\d{2}$'
  and not (pix_extra->'contrato_encerrado' ? 'caucao_ate');
