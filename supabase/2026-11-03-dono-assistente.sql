-- Conversa do dono com a IA pelo WhatsApp e o pedido que espera o SIM. Só as funções do servidor leem e gravam.
create table if not exists public.dono_assistente (id int primary key default 1 check (id = 1), contents jsonb not null default '[]', pendentes jsonb, atualizado_em timestamptz not null default now());
alter table public.dono_assistente enable row level security;
revoke all on public.dono_assistente from anon, authenticated;
grant select, insert, update on public.dono_assistente to service_role;
-- O que o dono mandou a IA guardar (sempre depois do SIM)
create table if not exists public.dono_memoria (id bigint generated always as identity primary key, texto text not null, criado_em timestamptz not null default now());
alter table public.dono_memoria enable row level security;
revoke all on public.dono_memoria from anon, authenticated;
grant select, insert, delete on public.dono_memoria to service_role;
