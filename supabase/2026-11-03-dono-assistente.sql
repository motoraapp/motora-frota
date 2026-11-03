-- Conversa do dono com a IA pelo WhatsApp e o pedido que espera o SIM. Só as funções do servidor leem e gravam.
create table if not exists public.dono_assistente (id int primary key default 1 check (id = 1), contents jsonb not null default '[]', pendentes jsonb, atualizado_em timestamptz not null default now());
alter table public.dono_assistente enable row level security;
revoke all on public.dono_assistente from anon, authenticated;
grant select, insert, update on public.dono_assistente to service_role;
