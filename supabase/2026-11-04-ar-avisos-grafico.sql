-- Ar-condicionado: histórico do quarto (gráfico) e avisos no celular. Só mexe na área "ar".
alter table ar.device
  add column if not exists power_since timestamptz,
  add column if not exists avisos jsonb not null default '{"offline": true, "quente": 30, "ligado_h": 8}',
  add column if not exists alerta jsonb not null default '{}';
create table if not exists ar.leitura (
  device_id text not null references ar.device(id) on delete cascade,
  at timestamptz not null default now(), t real, u real, power boolean,
  primary key (device_id, at));
alter table ar.leitura enable row level security;

-- Placa: igual antes + anota quando o ar ligou e guarda 1 leitura do quarto a cada 5 min (8 dias).
create or replace function public.ar_device_sync(p_id text, p_key text, p_state jsonb default null, p_rx jsonb default null, p_pair text default null)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare d ar.device; h text; cmds jsonb; st jsonb; was boolean; isOn boolean;
begin
  if p_id !~ '^[0-9a-f]{16}$' or p_key !~ '^[0-9a-f]{32}$' then raise exception 'id/chave invalidos'; end if;
  if p_pair is not null and p_pair !~ '^[0-9]{6}$' then raise exception 'codigo invalido'; end if;
  h := encode(extensions.digest(p_key, 'sha256'), 'hex');
  select * into d from ar.device where id = p_id for update;
  if not found then
    delete from ar.device where owner is null and created_at < now() - interval '1 day';
    if (select count(*) from ar.device where owner is null) >= 20 then raise exception 'muitas placas sem dono'; end if;
    insert into ar.device (id, key_hash) values (p_id, h) returning * into d;
  elsif d.key_hash <> h then
    raise exception 'chave errada';
  end if;
  st := coalesce(p_state, d.state);
  was := coalesce((d.state->>'power')::boolean, false); isOn := coalesce((st->>'power')::boolean, false);
  update ar.device set
    state = st, rx = coalesce(p_rx, rx), last_seen = now(),
    pair_code = coalesce(p_pair, pair_code),
    pair_until = case when p_pair is not null then now() + interval '10 minutes' else pair_until end,
    power_since = case when isOn and (not was or power_since is null) then now() when not isOn then null else power_since end
  where id = p_id;
  if st ? 'sala' and not exists (select 1 from ar.leitura where device_id = p_id and at > now() - interval '5 minutes') then
    insert into ar.leitura (device_id, t, u, power)
      values (p_id, (st->'sala'->>'t')::real, (st->'sala'->>'u')::real, isOn) on conflict do nothing;
    delete from ar.leitura where device_id = p_id and at < now() - interval '8 days';
  end if;
  with c as (
    update ar.cmd set taken_at = now()
    where device_id = p_id and taken_at is null and created_at > now() - interval '60 seconds'
    returning id, payload)
  select coalesce(jsonb_agg(payload order by id), '[]'::jsonb) into cmds from c;
  delete from ar.cmd where device_id = p_id and created_at < now() - interval '1 day';
  return jsonb_build_object('cmds', cmds, 'dono', d.owner is not null);
end $$;

create or replace function public.ar_status() returns jsonb
language sql stable security definer set search_path = '' as $$
  select coalesce(jsonb_agg(jsonb_build_object('id', id, 'name', name, 'state', state, 'rx', rx, 'avisos', avisos,
    'power_since', power_since, 'last_seen', last_seen, 'online', last_seen > now() - interval '20 seconds') order by created_at), '[]'::jsonb)
  from ar.device where owner = auth.uid() and ar.is_master()
$$;

-- Gráfico: leituras das últimas p_horas (1 a 168).
create or replace function public.ar_historico(p_id text, p_horas int default 24) returns jsonb
language sql stable security definer set search_path = '' as $$
  select coalesce(jsonb_agg(jsonb_build_array(extract(epoch from l.at)::bigint, l.t, l.u, l.power) order by l.at), '[]'::jsonb)
  from ar.leitura l join ar.device d on d.id = l.device_id
  where l.device_id = p_id and d.owner = auth.uid() and ar.is_master()
    and l.at > now() - make_interval(hours => least(greatest(coalesce(p_horas, 24), 1), 168))
$$;

-- Ajustes dos avisos: offline (sim/não), quente (°C ou null = desligado), ligado_h (horas ou null = desligado).
create or replace function public.ar_set_avisos(p_id text, p_avisos jsonb) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare a jsonb; q numeric; l int;
begin
  if not ar.is_master() or not exists (select 1 from ar.device where id = p_id and owner = auth.uid()) then
    raise exception 'sem permissao'; end if;
  q := nullif(p_avisos->>'quente', '')::numeric; l := nullif(p_avisos->>'ligado_h', '')::int;
  if q is not null and (q < 20 or q > 45) then raise exception 'temperatura do aviso entre 20 e 45'; end if;
  if l is not null and (l < 1 or l > 24) then raise exception 'horas do aviso entre 1 e 24'; end if;
  a := jsonb_build_object('offline', coalesce((p_avisos->>'offline')::boolean, true), 'quente', q, 'ligado_h', l);
  update ar.device set avisos = a, alerta = '{}' where id = p_id;
  return a;
end $$;

-- A cada minuto: avisa o dono (notificação do MOTORA + cópia no WhatsApp dele) uma vez por situação.
create or replace function ar.alertas() returns void language plpgsql security definer set search_path = '' as $$
declare d ar.device; al jsonb; t numeric; nome text;
  off boolean; quente boolean; longo boolean;
begin
  for d in select * from ar.device where owner is not null loop
    al := d.alerta; nome := d.name; t := (d.state->'sala'->>'t')::numeric;
    off := coalesce((d.avisos->>'offline')::boolean, true) and d.last_seen < now() - interval '10 minutes';
    quente := not off and d.avisos->>'quente' is not null and t is not null
      and t >= case when al ? 'quente' then (d.avisos->>'quente')::numeric - 1 else (d.avisos->>'quente')::numeric end;
    longo := not off and d.avisos->>'ligado_h' is not null and d.power_since is not null
      and d.power_since < now() - make_interval(hours => (d.avisos->>'ligado_h')::int);
    if off and not al ? 'offline' then
      perform public.call_edge('motora-push', jsonb_build_object('type', 'master_alert', 'url', '/ar/',
        'title', nome || ' sem internet', 'body', 'A placa do ar não responde há 10 minutos. Horários e modo automático continuam na placa, mas o app de fora de casa não alcança. Confira a tomada e o Wi-Fi.'));
      al := al || '{"offline": true}';
    elsif not off and al ? 'offline' then
      perform public.call_edge('motora-push', jsonb_build_object('type', 'master_alert', 'url', '/ar/',
        'title', nome || ' voltou', 'body', 'A placa do ar está de novo conectada.'));
      al := al - 'offline';
    end if;
    if quente and not al ? 'quente' then
      perform public.call_edge('motora-push', jsonb_build_object('type', 'master_alert', 'url', '/ar/',
        'title', 'Quarto com ' || replace(trim(to_char(t, 'FM990.0')), '.', ',') || ' °C',
        'body', 'O quarto passou de ' || (d.avisos->>'quente') || ' °C. Toque para ligar o ar.'));
      al := al || '{"quente": true}';
    elsif not quente and al ? 'quente' then al := al - 'quente';
    end if;
    if longo and not al ? 'ligado' then
      perform public.call_edge('motora-push', jsonb_build_object('type', 'master_alert', 'url', '/ar/',
        'title', nome || ' ligado há mais de ' || (d.avisos->>'ligado_h') || ' h',
        'body', 'O ar está ligado desde ' || to_char(d.power_since at time zone 'America/Sao_Paulo', 'DD/MM HH24:MI') || '. Toque se quiser desligar.'));
      al := al || '{"ligado": true}';
    elsif not longo and al ? 'ligado' then al := al - 'ligado';
    end if;
    if al is distinct from d.alerta then update ar.device set alerta = al where id = d.id; end if;
  end loop;
end $$;

revoke all on function public.ar_historico(text,int), public.ar_set_avisos(text,jsonb), ar.alertas() from public, anon, authenticated;
grant execute on function public.ar_historico(text,int), public.ar_set_avisos(text,jsonb) to authenticated;
revoke all on function public.ar_device_sync(text,text,jsonb,jsonb,text), public.ar_status() from public, anon, authenticated;
grant execute on function public.ar_device_sync(text,text,jsonb,jsonb,text) to anon, authenticated;
grant execute on function public.ar_status() to authenticated;
select cron.schedule('ar-alertas', '* * * * *', 'select ar.alertas()');
