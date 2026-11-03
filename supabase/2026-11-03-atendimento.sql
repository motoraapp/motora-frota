-- Atendimento de número desconhecido pelo robô (só o robô usa, pela função motora-robo)
create table if not exists public.whatsapp_atendimento (
  id uuid primary key default gen_random_uuid(),
  chave text not null unique,          -- DDD + últimos 8 dígitos
  telefone text not null,
  jid text not null,
  nome text,
  status text not null default 'aguardando' check (status in ('aguardando','com_dara','humano','encerrado','perguntar')),
  guardadas jsonb not null default '[]',
  saudado_em timestamptz not null default now(),
  escalado_em timestamptz,
  ultima_msg_em timestamptz not null default now(),
  motorista boolean not null default false,
  chamar_em timestamptz,
  urgencia text,
  dono_avisado_em timestamptz,
  created_at timestamptz not null default now()
);
alter table public.whatsapp_atendimento enable row level security;
revoke all on public.whatsapp_atendimento from anon, authenticated;
grant all on public.whatsapp_atendimento to service_role;
