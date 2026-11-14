-- Nossa casinha: máxima e mínima do quarto por dia (14/11/2026), para o gráfico "Temperatura máxima · últimos 7 dias".
-- A placa manda o estado a cada 3 s (ar_device_sync); o gatilho guarda a maior e a menor leitura do dia (horário de Brasília).
-- Só grava quando a máxima ou a mínima mudam. A placa não mudou.
create table if not exists ar.temp_dia (
  device_id text not null references ar.device(id) on delete cascade,
  dia date not null,
  max numeric(4,1) not null,
  max_em timestamptz not null,
  min numeric(4,1) not null,
  primary key (device_id, dia)
);
alter table ar.temp_dia enable row level security;  -- sem políticas: só pelas funções abaixo

create or replace function ar.grava_temp() returns trigger
language plpgsql security definer set search_path = '' as $$
declare t numeric(4,1);
begin
  begin t := (new.state->'sala'->>'t')::numeric; exception when others then return null; end;
  if t is null or t < -20 or t > 60 then return null; end if;
  insert into ar.temp_dia as x (device_id, dia, max, max_em, min)
    values (new.id, (now() at time zone 'America/Sao_Paulo')::date, t, now(), t)
  on conflict (device_id, dia) do update set
    max = greatest(x.max, excluded.max),
    max_em = case when excluded.max > x.max then excluded.max_em else x.max_em end,
    min = least(x.min, excluded.min)
  where excluded.max > x.max or excluded.min < x.min;
  return null;
end $$;

drop trigger if exists ar_device_temp on ar.device;
create trigger ar_device_temp after update of state on ar.device
  for each row when (new.state->'sala'->>'t' is not null) execute function ar.grava_temp();

-- Dono (master): dias com leitura dos últimos p_dias dias (hoje incluído), da placa ligada à conta.
create or replace function public.ar_temp_dias(p_dias int default 7) returns jsonb
language sql stable security definer set search_path = '' as $$
  select coalesce(jsonb_agg(jsonb_build_object('dia', t.dia, 'max', t.max, 'max_em', t.max_em, 'min', t.min) order by t.dia), '[]'::jsonb)
  from ar.temp_dia t join ar.device d on d.id = t.device_id
  where d.owner = auth.uid() and ar.is_master()
    and t.dia > (now() at time zone 'America/Sao_Paulo')::date - least(greatest(p_dias, 1), 60)
$$;

revoke all on function ar.grava_temp(), public.ar_temp_dias(int) from public, anon, authenticated;
grant execute on function public.ar_temp_dias(int) to authenticated;
