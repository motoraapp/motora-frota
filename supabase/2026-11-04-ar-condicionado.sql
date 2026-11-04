-- Ar-condicionado (Gree ESP32): área isolada "ar" no projeto motora. Não toca nas tabelas do MOTORA.
create schema if not exists ar;
revoke all on schema ar from public, anon, authenticated;

create table if not exists ar.device (
  id text primary key check (id ~ '^[0-9a-f]{16}$'),
  key_hash text not null,
  owner uuid references auth.users(id) on delete set null,
  name text not null default 'Ar-condicionado',
  state jsonb, rx jsonb,
  pair_code text, pair_until timestamptz,
  last_seen timestamptz, created_at timestamptz not null default now()
);
create table if not exists ar.cmd (
  id bigserial primary key,
  device_id text not null references ar.device(id) on delete cascade,
  payload jsonb not null,
  created_at timestamptz not null default now(),
  taken_at timestamptz
);
create index if not exists cmd_device_taken on ar.cmd (device_id, taken_at);
alter table ar.device enable row level security;
alter table ar.cmd enable row level security;

-- Placa: a cada ~3 s manda estado e último sinal; recebe comandos pendentes (até 60 s de idade).
create or replace function public.ar_device_sync(p_id text, p_key text, p_state jsonb default null, p_rx jsonb default null, p_pair text default null)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare d ar.device; h text; cmds jsonb;
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
  update ar.device set
    state = coalesce(p_state, state), rx = coalesce(p_rx, rx), last_seen = now(),
    pair_code = coalesce(p_pair, pair_code),
    pair_until = case when p_pair is not null then now() + interval '10 minutes' else pair_until end
  where id = p_id;
  with c as (
    update ar.cmd set taken_at = now()
    where device_id = p_id and taken_at is null and created_at > now() - interval '60 seconds'
    returning id, payload)
  select coalesce(jsonb_agg(payload order by id), '[]'::jsonb) into cmds from c;
  delete from ar.cmd where device_id = p_id and created_at < now() - interval '1 day';
  return jsonb_build_object('cmds', cmds, 'dono', d.owner is not null);
end $$;

create or replace function ar.is_master() returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'master')
$$;

-- Dono (login master do MOTORA): liga a placa à conta com o código de 6 números mostrado no app de casa.
create or replace function public.ar_pair(p_code text) returns text
language plpgsql security definer set search_path = '' as $$
declare v text;
begin
  if not ar.is_master() then raise exception 'sem permissao'; end if;
  update ar.device set owner = auth.uid(), pair_code = null, pair_until = null
  where pair_code = p_code and pair_until > now() returning id into v;
  if v is null then raise exception 'codigo errado ou vencido'; end if;
  return v;
end $$;

create or replace function public.ar_status() returns jsonb
language sql stable security definer set search_path = '' as $$
  select coalesce(jsonb_agg(jsonb_build_object('id', id, 'name', name, 'state', state, 'rx', rx,
    'last_seen', last_seen, 'online', last_seen > now() - interval '20 seconds') order by created_at), '[]'::jsonb)
  from ar.device where owner = auth.uid() and ar.is_master()
$$;

create or replace function public.ar_send(p_id text, p_payload jsonb) returns bigint
language plpgsql security definer set search_path = '' as $$
declare v bigint;
begin
  if not ar.is_master() or not exists (select 1 from ar.device where id = p_id and owner = auth.uid()) then
    raise exception 'sem permissao'; end if;
  if jsonb_typeof(p_payload) <> 'object' or length(p_payload::text) > 500 then raise exception 'comando invalido'; end if;
  if (select count(*) from ar.cmd where device_id = p_id and created_at > now() - interval '1 minute') > 60 then
    raise exception 'muitos comandos'; end if;
  insert into ar.cmd (device_id, payload) values (p_id, p_payload) returning id into v;
  return v;
end $$;

create or replace function public.ar_unpair(p_id text) returns void
language sql security definer set search_path = '' as $$
  update ar.device set owner = null where id = p_id and owner = auth.uid() and ar.is_master()
$$;

revoke all on function public.ar_device_sync(text,text,jsonb,jsonb,text), public.ar_pair(text), public.ar_status(),
  public.ar_send(text,jsonb), public.ar_unpair(text), ar.is_master() from public, anon, authenticated;
grant execute on function public.ar_device_sync(text,text,jsonb,jsonb,text) to anon, authenticated;
grant execute on function public.ar_pair(text), public.ar_status(), public.ar_send(text,jsonb), public.ar_unpair(text) to authenticated;
