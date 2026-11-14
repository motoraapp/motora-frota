-- Nossa casinha (14/11/2026): histórico para "Uso do ar" (horas ligado por dia), "24 h" (temperatura a cada 5 min com o
-- tempo ligado) e o aviso de quarto quente (padrão 28 °C, pedido do dono). Tudo pelo estado que a placa já manda a
-- cada 3 s (ar_device_sync); a placa não mudou. O gatilho nunca derruba a sincronização (erro = ignora).
alter table ar.device
  add column if not exists amostra_em timestamptz,
  add column if not exists quente_lim numeric(4,1) not null default 28,
  add column if not exists quente_avisado boolean not null default false,
  add column if not exists quente_em timestamptz;

create table if not exists ar.uso (
  id bigserial primary key,
  device_id text not null references ar.device(id) on delete cascade,
  inicio timestamptz not null,
  fim timestamptz
);
create index if not exists uso_device_inicio on ar.uso (device_id, inicio);
create table if not exists ar.leitura (
  device_id text not null references ar.device(id) on delete cascade,
  em timestamptz not null,
  t numeric(4,1) not null,
  ligado boolean not null,
  primary key (device_id, em)
);
alter table ar.uso enable row level security;
alter table ar.leitura enable row level security;

create or replace function ar.historico() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  t numeric(4,1);
  liga boolean := coalesce((new.state->>'power')::boolean, false);
  antes boolean := coalesce((old.state->>'power')::boolean, false);
begin
  if new.owner is null then return new; end if;
  begin
    -- uso do ar: abre um período ao ligar e fecha ao desligar
    if liga and not antes then
      update ar.uso set fim = now() where device_id = new.id and fim is null;
      insert into ar.uso (device_id, inicio) values (new.id, now());
    elsif antes and not liga then
      update ar.uso set fim = now() where device_id = new.id and fim is null;
    end if;
    begin t := (new.state->'sala'->>'t')::numeric; exception when others then t := null; end;
    if t is not null and (t < -20 or t > 60) then t := null; end if;
    -- uma leitura a cada 5 minutos, guardada por 3 dias
    if t is not null and (old.amostra_em is null or old.amostra_em < now() - interval '5 minutes') then
      insert into ar.leitura (device_id, em, t, ligado) values (new.id, now(), t, liga) on conflict do nothing;
      new.amostra_em := now();
      delete from ar.leitura where device_id = new.id and em < now() - interval '3 days';
    end if;
    -- quarto quente: avisa ao passar do limite; de novo só depois de cair 1 °C e pelo menos 3 h depois
    if t is not null then
      if t >= new.quente_lim and not new.quente_avisado and (new.quente_em is null or new.quente_em < now() - interval '3 hours') then
        new.quente_avisado := true; new.quente_em := now();
        perform public.call_edge('motora-push', jsonb_build_object('type', 'master_alert',
          'title', 'Quarto quente: ' || replace(t::text, '.', ',') || ' °C',
          'body', case when liga then 'O ar está ligado, mas o quarto passou de ' || replace(new.quente_lim::text, '.', ',') || ' °C.'
                       else 'O ar está desligado. Toque para abrir o Nossa casinha.' end,
          'url', '/ar/'));
      elsif t <= new.quente_lim - 1 and new.quente_avisado then
        new.quente_avisado := false;
      end if;
    end if;
  exception when others then
    raise warning 'ar.historico: %', sqlerrm;
  end;
  return new;
end $$;

drop trigger if exists ar_device_hist on ar.device;
create trigger ar_device_hist before update of state on ar.device
  for each row execute function ar.historico();

-- Horas de ar ligado por dia (horário de Brasília), de p_de a p_ate (até 400 dias). O período aberto conta até agora.
create or replace function public.ar_uso_periodo(p_de date, p_ate date) returns jsonb
language sql stable security definer set search_path = '' as $$
  with dev as (select id from ar.device where owner = auth.uid() and ar.is_master()),
  dias as (select d::date as dia from generate_series(p_de, least(p_ate, p_de + 400), interval '1 day') d),
  janelas as (select dia, (dia::timestamp at time zone 'America/Sao_Paulo') as ini,
                     ((dia + 1)::timestamp at time zone 'America/Sao_Paulo') as fim from dias)
  select coalesce(jsonb_agg(jsonb_build_object('dia', j.dia, 'seg', s.seg) order by j.dia), '[]'::jsonb)
  from janelas j
  cross join lateral (
    select sum(extract(epoch from least(coalesce(u.fim, now()), j.fim) - greatest(u.inicio, j.ini)))::int as seg
    from ar.uso u join dev on dev.id = u.device_id
    where u.inicio < j.fim and coalesce(u.fim, now()) > j.ini
  ) s
  where s.seg > 0
$$;

-- Últimas 24 h: leituras a cada 5 min e os períodos em que o ar ficou ligado.
create or replace function public.ar_24h() returns jsonb
language sql stable security definer set search_path = '' as $$
  with dev as (select id from ar.device where owner = auth.uid() and ar.is_master())
  select jsonb_build_object(
    'leituras', coalesce((select jsonb_agg(jsonb_build_object('em', l.em, 't', l.t) order by l.em)
                          from ar.leitura l join dev on dev.id = l.device_id where l.em > now() - interval '24 hours'), '[]'::jsonb),
    'uso', coalesce((select jsonb_agg(jsonb_build_object('inicio', u.inicio, 'fim', u.fim) order by u.inicio)
                     from ar.uso u join dev on dev.id = u.device_id where coalesce(u.fim, now()) > now() - interval '24 hours'), '[]'::jsonb))
$$;

revoke all on function ar.historico(), public.ar_uso_periodo(date, date), public.ar_24h() from public, anon, authenticated;
grant execute on function public.ar_uso_periodo(date, date), public.ar_24h() to authenticated;
