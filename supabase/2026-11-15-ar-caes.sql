-- Nossa casinha: avisos de fome e sede dos cachorros Elvis, Belinha e Maya (15/11/2026).
-- Tabela com as assinaturas de aviso de cada celular + nível de fome/sede (calculado pelo tempo na função ar-caes).
-- Só a função ar-caes (service role) lê e grava: RLS ligada, sem políticas.
create table if not exists public.ar_caes_push (
  endpoint      text primary key,
  p256dh        text not null,
  auth          text not null,
  tz            text not null default 'America/Sao_Paulo',
  cachorros     jsonb not null default '[]'::jsonb,   -- [{id, nome, artigo, fome, sede, em}]
  avisos        jsonb not null default '{}'::jsonb,   -- {"elvis:fome": ms do último aviso}
  atualizado_em timestamptz not null default now()
);
alter table public.ar_caes_push enable row level security;
revoke all on public.ar_caes_push from anon, authenticated;

-- A cada 15 min a função calcula e avisa (no máximo 1 por cachorro e necessidade a cada 2 h, nunca das 22h às 7h).
select cron.unschedule('ar-caes') where exists (select 1 from cron.job where jobname = 'ar-caes');
select cron.schedule('ar-caes', '*/15 * * * *', $$select public.call_edge('ar-caes', '{"acao": "rodar"}'::jsonb)$$);
