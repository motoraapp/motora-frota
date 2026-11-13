-- Módulo Unificado de Vistorias Veiculares e Devolução com IA (12/11/2026)
-- Evolui inspection_photos (preservando todas as fotos existentes), cria vehicle_inspections com snapshot imutável e RLS estrita.
begin;

-- 1) Sequência e numeração automática (ex.: VST-2026-0001 / DEV-2026-0001)
create sequence if not exists public.vehicle_inspections_seq start 1;

create or replace function public.next_vehicle_inspection_number(p_type text default 'entrega')
returns text
language plpgsql
set search_path = public
as $$
declare
  v_seq bigint;
  v_ano text;
  v_pref text;
begin
  v_seq := nextval('public.vehicle_inspections_seq');
  v_ano := to_char(now() at time zone 'America/Sao_Paulo', 'YYYY');
  v_pref := case when lower(coalesce(p_type, 'entrega')) = 'devolucao' then 'DEV' else 'VST' end;
  return v_pref || '-' || v_ano || '-' || lpad(v_seq::text, 4, '0');
end $$;

-- 2) Tabela principal de Termos de Vistoria (Entrega ao Motorista e Devolução pelo Motorista)
create table if not exists public.vehicle_inspections (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references public.profiles(id) on delete restrict,
  driver_id uuid references public.profiles(id) on delete restrict,
  vehicle_id uuid not null references public.vehicles(id) on delete restrict,
  contract_id uuid references public.rental_contracts(id) on delete set null,
  base_inspection_id uuid references public.vehicle_inspections(id) on delete set null,
  inspection_number text not null unique default public.next_vehicle_inspection_number('entrega'),
  inspection_type text not null default 'entrega'
    check (inspection_type in ('entrega', 'devolucao')),
  status text not null default 'rascunho'
    check (status in ('rascunho', 'aguardando_assinatura', 'concluido', 'cancelado')),

  -- Leitura veicular e checklist no momento da vistoria
  mileage integer check (mileage is null or mileage >= 0),
  fuel_level text,
  inspection_date timestamptz not null default now(),
  checklist jsonb not null default '{}'::jsonb,
  photos jsonb not null default '[]'::jsonb,
  damages_summary jsonb not null default '[]'::jsonb,
  driver_reservation text,
  notes text,
  signature_place text,
  signature_date date,

  -- Snapshot imutável após emissão definitiva (locador, locatário, veículo, contrato, fotos confirmadas, checklist e comparação)
  snapshot_data jsonb not null default '{}'::jsonb,

  -- PDFs no Storage (bucket docs/<driver_id ou vehicles/vehicle_id>/vistorias/<id>/...)
  pdf_path text,
  signed_pdf_path text,

  -- Assinaturas (manual / digitalizado / preparada para assinatura eletrônica futura)
  signature_mode text not null default 'manual'
    check (signature_mode in ('manual', 'digitalizado', 'eletronica_pendente', 'eletronica_assinada')),
  signature_data jsonb not null default '{}'::jsonb,
  emitted_at timestamptz,
  signed_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_vehicle_inspections_owner_type
  on public.vehicle_inspections (owner_id, inspection_type, status, created_at desc);

create index if not exists idx_vehicle_inspections_driver
  on public.vehicle_inspections (driver_id, created_at desc);

create index if not exists idx_vehicle_inspections_vehicle
  on public.vehicle_inspections (vehicle_id, created_at desc);

-- 3) Evolução da tabela inspection_photos (preserva todas as fotos já cadastradas)
alter table public.inspection_photos
  add column if not exists inspection_id uuid references public.vehicle_inspections(id) on delete set null,
  add column if not exists phase text not null default 'entrega' check (phase in ('entrega', 'devolucao')),
  add column if not exists ai_summary text,
  add column if not exists has_damage boolean not null default false,
  add column if not exists damage_status text not null default 'none'
    check (damage_status in ('none', 'preexistente', 'novo', 'descartado', 'pendente_confirmacao')),
  add column if not exists damage_note text;

create index if not exists idx_inspection_photos_inspection
  on public.inspection_photos (inspection_id)
  where inspection_id is not null;

-- 4) Trigger de atualização e imutabilidade após emissão definitiva
create or replace function public.vehicle_inspections_before_update()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at := now();
  if old.emitted_at is not null then
    if new.inspection_number is distinct from old.inspection_number
       or new.owner_id is distinct from old.owner_id
       or new.driver_id is distinct from old.driver_id
       or new.vehicle_id is distinct from old.vehicle_id
       or new.inspection_type is distinct from old.inspection_type
       or new.snapshot_data is distinct from old.snapshot_data
       or new.checklist is distinct from old.checklist
       or new.photos is distinct from old.photos
       or new.damages_summary is distinct from old.damages_summary
       or new.driver_reservation is distinct from old.driver_reservation then
      raise exception 'Termo de vistoria já emitido não pode ter dados originais, fotos ou snapshot alterados';
    end if;
  end if;
  return new;
end $$;

drop trigger if exists trg_vehicle_inspections_updated on public.vehicle_inspections;
create trigger trg_vehicle_inspections_updated
  before update on public.vehicle_inspections
  for each row execute function public.vehicle_inspections_before_update();

-- 5) Permissões e RLS estrita (isolamento por proprietário e acesso restrito do motorista aos termos emitidos)
grant select, insert, update, delete on public.vehicle_inspections to authenticated, service_role;
grant usage, select on sequence public.vehicle_inspections_seq to authenticated, service_role;
grant execute on function public.next_vehicle_inspection_number(text) to authenticated, service_role;

alter table public.vehicle_inspections enable row level security;

drop policy if exists master_le_suas_vistorias on public.vehicle_inspections;
create policy master_le_suas_vistorias on public.vehicle_inspections
  for select to authenticated
  using (public.is_master() and owner_id = (select auth.uid()));

drop policy if exists master_cria_suas_vistorias on public.vehicle_inspections;
create policy master_cria_suas_vistorias on public.vehicle_inspections
  for insert to authenticated
  with check (public.is_master() and owner_id = (select auth.uid()));

drop policy if exists master_atualiza_suas_vistorias on public.vehicle_inspections;
create policy master_atualiza_suas_vistorias on public.vehicle_inspections
  for update to authenticated
  using (public.is_master() and owner_id = (select auth.uid()))
  with check (public.is_master() and owner_id = (select auth.uid()));

drop policy if exists master_exclui_rascunho_vistoria on public.vehicle_inspections;
create policy master_exclui_rascunho_vistoria on public.vehicle_inspections
  for delete to authenticated
  using (public.is_master() and owner_id = (select auth.uid()) and status = 'rascunho');

drop policy if exists motorista_le_suas_vistorias on public.vehicle_inspections;
create policy motorista_le_suas_vistorias on public.vehicle_inspections
  for select to authenticated
  using (
    driver_id = (select auth.uid())
    and status in ('aguardando_assinatura', 'concluido')
  );

commit;
