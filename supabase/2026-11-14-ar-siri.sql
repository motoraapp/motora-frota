-- Siri do "Nossa casinha": atalho do iPhone manda a frase para a função ar-siri, que usa uma chave só do dono.
-- A chave fica guardada só como hash (siri_hash). O app gera e mostra a chave uma vez (ar_siri_gerar).
alter table ar.device add column if not exists siri_hash text;

-- Dono (master): cria uma chave nova para a placa dele (a anterior deixa de valer).
create or replace function public.ar_siri_gerar() returns text
language plpgsql security definer set search_path = '' as $$
declare v text; d text;
begin
  if not ar.is_master() then raise exception 'sem permissao'; end if;
  select id into d from ar.device where owner = auth.uid() order by created_at limit 1;
  if d is null then raise exception 'sem placa'; end if;
  v := encode(extensions.gen_random_bytes(16), 'hex');
  update ar.device set siri_hash = encode(extensions.digest(v, 'sha256'), 'hex') where id = d;
  return v;
end $$;

-- Dono: apaga a chave (o atalho para de funcionar).
create or replace function public.ar_siri_apagar() returns void
language sql security definer set search_path = '' as $$
  update ar.device set siri_hash = null where owner = auth.uid() and ar.is_master()
$$;

-- Só a função ar-siri (service_role): placa da chave, com o estado atual.
create or replace function public.ar_siri_dispositivo(p_chave text) returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object('id', id, 'state', state, 'online', last_seen > now() - interval '20 seconds')
  from ar.device
  where p_chave ~ '^[0-9a-f]{32}$' and siri_hash = encode(extensions.digest(p_chave, 'sha256'), 'hex') and owner is not null
  limit 1
$$;

-- Só a função ar-siri: grava os comandos para a placa (mesmos limites do app).
create or replace function public.ar_siri_mandar(p_chave text, p_cmds jsonb) returns int
language plpgsql security definer set search_path = '' as $$
declare d text; c jsonb; n int := 0;
begin
  select id into d from ar.device
  where p_chave ~ '^[0-9a-f]{32}$' and siri_hash = encode(extensions.digest(p_chave, 'sha256'), 'hex') and owner is not null;
  if d is null then raise exception 'chave errada'; end if;
  if jsonb_typeof(p_cmds) <> 'array' or jsonb_array_length(p_cmds) > 12 then raise exception 'comando invalido'; end if;
  if (select count(*) from ar.cmd where device_id = d and created_at > now() - interval '1 minute') > 60 then
    raise exception 'muitos comandos'; end if;
  for c in select * from jsonb_array_elements(p_cmds) loop
    if jsonb_typeof(c) <> 'object' or length(c::text) > 500 then raise exception 'comando invalido'; end if;
    insert into ar.cmd (device_id, payload) values (d, c);
    n := n + 1;
  end loop;
  return n;
end $$;

revoke all on function public.ar_siri_gerar(), public.ar_siri_apagar(), public.ar_siri_dispositivo(text),
  public.ar_siri_mandar(text, jsonb) from public, anon, authenticated;
grant execute on function public.ar_siri_gerar(), public.ar_siri_apagar() to authenticated;
grant execute on function public.ar_siri_dispositivo(text), public.ar_siri_mandar(text, jsonb) to service_role;
