-- Nossa casinha: temperatura de lá fora MEDIDA, não prevista (15/11/2026, pedido do dono).
-- Fonte: estação do aeroporto Santa Genoveva, Goiânia (METAR SBGO, aviationweather.gov, uma medição por hora, sem chave).
-- O cron ar-tempo (a cada 15 min) chama a função ar-aviso ({tempo: true}): ela grava as medições novas em ar.fora
-- (ar_fora_salvar) e manda a última para a placa ({fora: t}, ar_fora_gravar). O app lê tudo por ar_fora().

create table if not exists ar.fora (
  em  timestamptz primary key,
  t   numeric(4,1) not null,
  ceu text
);
alter table ar.fora enable row level security; -- sem políticas: só pelas funções abaixo

create or replace function public.ar_fora_salvar(p jsonb) returns integer
language sql security definer set search_path = '' as $$
  with n as (
    insert into ar.fora (em, t, ceu)
    select (x->>'em')::timestamptz, (x->>'t')::numeric, nullif(x->>'ceu', '')
    from jsonb_array_elements(p) x
    where (x->>'t') is not null
    on conflict (em) do update set t = excluded.t, ceu = excluded.ceu
    returning 1)
  select count(*)::int from n;
$$;
revoke all on function public.ar_fora_salvar(jsonb) from public, anon, authenticated;
grant execute on function public.ar_fora_salvar(jsonb) to service_role;

-- Para o app (dono): última medição, as das últimas 25 h (gráfico de 24 h) e a máxima de cada dia do período (hora de Brasília).
create or replace function public.ar_fora(p_de date, p_ate date) returns jsonb
language sql stable security definer set search_path = '' as $$
  select case when not exists (select 1 from ar.device where owner = auth.uid() and ar.is_master()) then null else
  jsonb_build_object(
    'agora', (select jsonb_build_object('em', f.em, 't', f.t, 'ceu', f.ceu) from ar.fora f order by f.em desc limit 1),
    'horas', coalesce((select jsonb_agg(jsonb_build_object('em', f.em, 't', f.t) order by f.em)
                       from ar.fora f where f.em > now() - interval '25 hours'), '[]'::jsonb),
    'dias', coalesce((select jsonb_agg(jsonb_build_object('dia', d.dia, 'max', d.max, 'ceu', d.ceu) order by d.dia) from (
               select distinct on (dia) (f.em at time zone 'America/Sao_Paulo')::date dia, f.t max, f.ceu
               from ar.fora f
               where (f.em at time zone 'America/Sao_Paulo')::date between p_de and p_ate
               order by dia, f.t desc, f.em desc) d), '[]'::jsonb))
  end
$$;
revoke all on function public.ar_fora(date, date) from public, anon, authenticated;
grant execute on function public.ar_fora(date, date) to authenticated;
