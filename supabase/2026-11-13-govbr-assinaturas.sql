-- Fluxo oficial de assinaturas eletrônicas via Portal GOV.BR (assinador.iti.br)
-- Suporta cadeia PAdES sequencial para Locador, Locatário, Testemunha 1 e Testemunha 2
-- em Contratos de Locação e Termos de Vistoria/Devolução.

begin;

create table if not exists public.signature_invites (
  id uuid primary key default gen_random_uuid(),
  token text not null unique,
  owner_id uuid not null references public.profiles(id) on delete cascade,
  doc_type text not null check (doc_type in ('contract', 'inspection')),
  doc_id uuid not null,
  signer_role text not null check (signer_role in ('locador', 'locatario', 'witness1', 'witness2')),
  signer_name text not null,
  signer_cpf text,
  status text not null default 'pendente' check (status in ('pendente', 'assinado', 'revogado')),
  signed_pdf_path text,
  pdf_sig_count integer,
  govbr_detected boolean not null default false,
  signed_at timestamptz,
  expires_at timestamptz not null default (now() + interval '15 days'),
  created_at timestamptz not null default now()
);

create index if not exists idx_signature_invites_doc
  on public.signature_invites (doc_type, doc_id, signer_role);

create index if not exists idx_signature_invites_owner
  on public.signature_invites (owner_id, created_at desc);

alter table public.signature_invites enable row level security;

grant select, insert, update, delete on public.signature_invites to authenticated;

drop policy if exists master_gerencia_convites_assinatura on public.signature_invites;
create policy master_gerencia_convites_assinatura on public.signature_invites
  for all to authenticated
  using (public.is_master() and owner_id = (select auth.uid()))
  with check (public.is_master() and owner_id = (select auth.uid()));

commit;
