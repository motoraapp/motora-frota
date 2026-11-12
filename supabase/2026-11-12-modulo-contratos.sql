-- Módulo de Contratos de Locação (12/11/2026)
-- Adiciona campos complementares em profiles e vehicles, cria rental_contracts e rental_contract_history com RLS estrita.
begin;

-- 1) Campos complementares em profiles (locador e locatário) sem duplicar os existentes
alter table public.profiles
  add column if not exists nationality text,
  add column if not exists marital_status text,
  add column if not exists profession text,
  add column if not exists cnh_ear boolean not null default false;

-- 2) Campos complementares em vehicles
alter table public.vehicles
  add column if not exists brand text,
  add column if not exists version text,
  add column if not exists manufacture_year text,
  add column if not exists model_year text,
  add column if not exists renavam text,
  add column if not exists chassi text,
  add column if not exists fuel text,
  add column if not exists mileage integer check (mileage is null or mileage >= 0);

-- 3) Numeração sequencial automática dos contratos (ex.: CTR-2026-0001)
create sequence if not exists public.rental_contracts_seq start 1;

create or replace function public.next_rental_contract_number()
returns text
language plpgsql
set search_path = public
as $$
declare
  v_seq bigint;
  v_ano text;
begin
  v_seq := nextval('public.rental_contracts_seq');
  v_ano := to_char(now() at time zone 'America/Sao_Paulo', 'YYYY');
  return 'CTR-' || v_ano || '-' || lpad(v_seq::text, 4, '0');
end $$;

-- 4) Tabela principal de contratos de locação
create table if not exists public.rental_contracts (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references public.profiles(id) on delete restrict,
  driver_id uuid not null references public.profiles(id) on delete restrict,
  vehicle_id uuid not null references public.vehicles(id) on delete restrict,
  contract_number text not null unique default public.next_rental_contract_number(),
  status text not null default 'rascunho'
    check (status in ('rascunho', 'aguardando_assinatura', 'ativo', 'encerrado', 'cancelado')),

  -- Cópia fiel (snapshot imutável) dos dados do locador, locatário, veículo, cláusulas e testemunhas no momento da emissão
  snapshot_data jsonb not null default '{}'::jsonb,

  -- Dados comerciais estruturados para busca, filtros e listagens
  rent_amount numeric(12, 2) not null check (rent_amount >= 0),
  payment_periodicity text not null default 'semanal'
    check (payment_periodicity in ('diaria', 'semanal', 'quinzenal', 'mensal')),
  due_day text,
  start_date date not null,
  end_date date,
  indefinite_term boolean not null default false,
  deposit_amount numeric(12, 2) not null default 0 check (deposit_amount >= 0),
  payment_method text,
  km_limit integer check (km_limit is null or km_limit >= 0),
  excess_km_fee numeric(10, 2) check (excess_km_fee is null or excess_km_fee >= 0),
  purpose text not null,
  notes text,
  signature_place text,
  signature_date date,

  -- Arquivos no Supabase Storage (bucket docs/<driver_id>/contratos/<id>/...)
  pdf_path text,
  signed_pdf_path text,

  -- Controle de assinaturas (preparado para futura assinatura eletrônica sem simular assinatura)
  signature_mode text not null default 'manual'
    check (signature_mode in ('manual', 'digitalizado', 'eletronica_pendente', 'eletronica_assinada')),
  signature_data jsonb not null default '{}'::jsonb,
  signed_at timestamptz,

  -- Ciclo de vida
  emitted_at timestamptz,
  terminated_at timestamptz,
  termination_reason text,
  renewed_from_id uuid references public.rental_contracts(id) on delete set null,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint rental_contracts_term_chk check (indefinite_term = true or end_date is null or end_date >= start_date)
);

create index if not exists idx_rental_contracts_owner_status
  on public.rental_contracts (owner_id, status, created_at desc);

create index if not exists idx_rental_contracts_driver
  on public.rental_contracts (driver_id, created_at desc);

create index if not exists idx_rental_contracts_vehicle
  on public.rental_contracts (vehicle_id);

create index if not exists idx_rental_contracts_renewed_from
  on public.rental_contracts (renewed_from_id)
  where renewed_from_id is not null;

-- Trigger de updated_at e proteção do snapshot após emissão
create or replace function public.rental_contracts_before_update()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at := now();
  if old.emitted_at is not null then
    if new.contract_number is distinct from old.contract_number
       or new.owner_id is distinct from old.owner_id
       or new.driver_id is distinct from old.driver_id
       or new.vehicle_id is distinct from old.vehicle_id
       or new.snapshot_data is distinct from old.snapshot_data
       or new.rent_amount is distinct from old.rent_amount
       or new.payment_periodicity is distinct from old.payment_periodicity
       or new.start_date is distinct from old.start_date
       or new.purpose is distinct from old.purpose then
      raise exception 'Contrato já emitido não pode ter dados originais ou snapshot alterados';
    end if;
  end if;
  return new;
end $$;

drop trigger if exists trg_rental_contracts_updated on public.rental_contracts;
create trigger trg_rental_contracts_updated
  before update on public.rental_contracts
  for each row execute function public.rental_contracts_before_update();

-- 5) Histórico imutável de eventos do contrato
create table if not exists public.rental_contract_history (
  id uuid primary key default gen_random_uuid(),
  contract_id uuid not null references public.rental_contracts(id) on delete cascade,
  owner_id uuid not null default auth.uid() references public.profiles(id) on delete restrict,
  driver_id uuid not null references public.profiles(id) on delete restrict,
  event_type text not null,
  description text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid default auth.uid(),
  created_at timestamptz not null default now()
);

create index if not exists idx_rental_contract_history_contract
  on public.rental_contract_history (contract_id, created_at desc);

create index if not exists idx_rental_contract_history_owner
  on public.rental_contract_history (owner_id);

create index if not exists idx_rental_contract_history_driver
  on public.rental_contract_history (driver_id);

-- 6) Permissões e RLS estrita (isolamento por conta/owner e por motorista)
grant select, insert, update, delete on public.rental_contracts to authenticated;
grant select, insert on public.rental_contract_history to authenticated;
grant usage, select on sequence public.rental_contracts_seq to authenticated;
grant execute on function public.next_rental_contract_number() to authenticated;

alter table public.rental_contracts enable row level security;
alter table public.rental_contract_history enable row level security;

drop policy if exists master_le_seus_contratos on public.rental_contracts;
create policy master_le_seus_contratos on public.rental_contracts
  for select to authenticated
  using (public.is_master() and owner_id = (select auth.uid()));

drop policy if exists master_cria_seus_contratos on public.rental_contracts;
create policy master_cria_seus_contratos on public.rental_contracts
  for insert to authenticated
  with check (public.is_master() and owner_id = (select auth.uid()));

drop policy if exists master_atualiza_seus_contratos on public.rental_contracts;
create policy master_atualiza_seus_contratos on public.rental_contracts
  for update to authenticated
  using (public.is_master() and owner_id = (select auth.uid()))
  with check (public.is_master() and owner_id = (select auth.uid()));

drop policy if exists master_exclui_rascunho_contrato on public.rental_contracts;
create policy master_exclui_rascunho_contrato on public.rental_contracts
  for delete to authenticated
  using (public.is_master() and owner_id = (select auth.uid()) and status = 'rascunho');

drop policy if exists motorista_le_seus_contratos on public.rental_contracts;
create policy motorista_le_seus_contratos on public.rental_contracts
  for select to authenticated
  using (
    driver_id = (select auth.uid())
    and status in ('aguardando_assinatura', 'ativo', 'encerrado')
  );

drop policy if exists master_le_historico_contratos on public.rental_contract_history;
create policy master_le_historico_contratos on public.rental_contract_history
  for select to authenticated
  using (public.is_master() and owner_id = (select auth.uid()));

drop policy if exists master_cria_historico_contratos on public.rental_contract_history;
create policy master_cria_historico_contratos on public.rental_contract_history
  for insert to authenticated
  with check (
    public.is_master()
    and owner_id = (select auth.uid())
    and exists (
      select 1 from public.rental_contracts rc
      where rc.id = contract_id
        and rc.owner_id = (select auth.uid())
    )
  );

drop policy if exists motorista_le_historico_contratos on public.rental_contract_history;
create policy motorista_le_historico_contratos on public.rental_contract_history
  for select to authenticated
  using (
    driver_id = (select auth.uid())
    and exists (
      select 1 from public.rental_contracts rc
      where rc.id = contract_id
        and rc.driver_id = (select auth.uid())
        and rc.status in ('aguardando_assinatura', 'ativo', 'encerrado')
    )
  );

commit;
