-- MOTORA: vincula histórico de Pix ao veículo, adiciona encerramento de contrato e atualização segura de QR parcial (Asaas)

-- 1) Guarda o vehicle_id no momento em que cada cobrança (pix_history) é criada,
-- para o Financeiro nunca perder pagamentos quando o motorista devolver o carro ou encerrar o contrato.
alter table public.pix_history
  add column if not exists vehicle_id uuid references public.vehicles(id) on delete set null;

create index if not exists pix_history_vehicle_id_idx on public.pix_history(vehicle_id);

-- Atualiza o gatilho que cria pix_history para gravar também new.vehicle_id
create or replace function public.profiles_after_change()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if new.role <> 'driver' then return new; end if;
  if new.pix_sent_at is not null and (tg_op = 'INSERT' or new.pix_sent_at is distinct from old.pix_sent_at) then
    insert into pix_history (driver_id, vehicle_id, sent_at, due_at, amount, description, period_start, period_end)
    values (new.id, new.vehicle_id, new.pix_sent_at, new.pix_due_at, new.pix_amount, new.pix_description, new.pix_period_start, new.pix_period_end);
  end if;
  if new.cnh_path is not null and (tg_op = 'INSERT' or new.cnh_path is distinct from old.cnh_path) then perform drive_notify(jsonb_build_object('type', 'doc', 'driver_id', new.id, 'col', 'cnh_path')); end if;
  if new.address_path is not null and (tg_op = 'INSERT' or new.address_path is distinct from old.address_path) then perform drive_notify(jsonb_build_object('type', 'doc', 'driver_id', new.id, 'col', 'address_path')); end if;
  if new.contract_path is not null and (tg_op = 'INSERT' or new.contract_path is distinct from old.contract_path) then perform drive_notify(jsonb_build_object('type', 'doc', 'driver_id', new.id, 'col', 'contract_path')); end if;
  if new.inspection_term_path is not null and (tg_op = 'INSERT' or new.inspection_term_path is distinct from old.inspection_term_path) then perform drive_notify(jsonb_build_object('type', 'doc', 'driver_id', new.id, 'col', 'inspection_term_path')); end if;
  return new;
end $function$;

-- Preenche vehicle_id nos registros antigos de pix_history:
-- primeiro por placa/modelo citados na descrição, depois pelo veículo atual do motorista,
-- e por fim por outra cobrança já identificada do mesmo motorista (ex.: 1º aluguel do Ygor sem descrição).
update public.pix_history h
set vehicle_id = coalesce(
  (select v.id from public.vehicles v where h.description is not null and (h.description ilike '%' || v.plate || '%' or h.description ilike '%' || v.model || '%') limit 1),
  (select p.vehicle_id from public.profiles p where p.id = h.driver_id and p.vehicle_id is not null)
)
where h.vehicle_id is null;

update public.pix_history h
set vehicle_id = (
  select h2.vehicle_id
  from public.pix_history h2
  where h2.driver_id = h.driver_id and h2.vehicle_id is not null
  order by h2.sent_at desc
  limit 1
)
where h.vehicle_id is null
  and (h.description is null or h.description not ilike '%Aluguel da semana%');

-- 2) Encerrar contrato do motorista preservando histórico financeiro, recibos e documentos
create or replace function public.master_encerrar_contrato(p_driver uuid, p_data date default null)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  d public.profiles%rowtype;
  v public.vehicles%rowtype;
  v_data date := coalesce(p_data, (now() at time zone 'America/Sao_Paulo')::date);
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

  v_extra := coalesce(d.pix_extra, '{}'::jsonb)
    - 'pix_auto' - 'pix_auto_venc' - 'devolucao' - 'parcial' - 'parcial_pendente'
    || jsonb_build_object(
      'sem_cobranca', true,
      'contrato_encerrado', jsonb_build_object(
        'data', v_data,
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
end $function$;

revoke all on function public.master_encerrar_contrato(uuid, date) from public, anon;
grant execute on function public.master_encerrar_contrato(uuid, date) to authenticated;

-- 3) Atualiza QR Code / Pix parcial no perfil sem alterar datas de cobrança nem duplicar pix_history
create or replace function public.asaas_set_partial_qr(
  p_driver uuid,
  p_code text,
  p_qr_path text,
  p_amount numeric,
  p_extra jsonb
)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  perform set_config('motora.keep_pix_dates', '1', true);
  update public.profiles
  set pix_code = p_code,
      pix_qr_path = p_qr_path,
      pix_link = null,
      pix_amount = p_amount,
      pix_extra = coalesce(p_extra, '{}'::jsonb)
  where id = p_driver and role = 'driver';
end $function$;

revoke all on function public.asaas_set_partial_qr(uuid, text, text, numeric, jsonb) from public, anon, authenticated;
grant execute on function public.asaas_set_partial_qr(uuid, text, text, numeric, jsonb) to service_role;
