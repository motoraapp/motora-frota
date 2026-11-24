-- Nossa casinha (23/11/2026): comandos diretos (texto e áudio) do app para o Claudinho (J7) pela nuvem.
-- O iPhone só grava áudio em página https; o áudio e o texto vão para ar.claudinho_msg, um gatilho acorda
-- o J7 pelo Realtime na hora, e o Claudinho responde de volta na mesma mensagem.

alter table ar.device
  add column if not exists claudinho_hash text,
  add column if not exists claudinho_seen timestamptz;

create table if not exists ar.claudinho_pair (
  code text primary key check (code ~ '^[0-9]{6}$'),
  key_hash text not null,
  expires_at timestamptz not null default now() + interval '15 minutes'
);
alter table ar.claudinho_pair enable row level security;

create table if not exists ar.claudinho_msg (
  id bigserial primary key,
  device_id text not null references ar.device(id) on delete cascade,
  tipo text not null check (tipo in ('texto', 'audio')),
  texto text,
  audio_b64 text,
  audio_mime text,
  resposta text,
  ok boolean,
  estado text not null default 'pendente' check (estado in ('pendente', 'processando', 'respondido', 'erro')),
  created_at timestamptz not null default now(),
  taken_at timestamptz,
  replied_at timestamptz
);
create index if not exists claudinho_msg_dev_idx on ar.claudinho_msg (device_id, id desc);
create index if not exists claudinho_msg_pend_idx on ar.claudinho_msg (device_id, id) where estado = 'pendente';
alter table ar.claudinho_msg enable row level security;

-- Cutucão pelo Realtime para o J7 buscar o pedido na hora (sem levar dados no broadcast).
create or replace function ar.acorda_claudinho() returns trigger
language plpgsql security definer set search_path = '' as $$
declare h text;
begin
  select claudinho_hash into h from ar.device where id = new.device_id;
  if h is not null then
    begin perform realtime.send('{}'::jsonb, 'cmd', 'claudinho-' || left(h, 24), false);
    exception when others then raise warning 'ar.acorda_claudinho: %', sqlerrm; end;
  end if;
  return null;
end $$;
revoke all on function ar.acorda_claudinho() from public, anon, authenticated;

drop trigger if exists ar_claudinho_acorda on ar.claudinho_msg;
create trigger ar_claudinho_acorda after insert on ar.claudinho_msg for each row execute function ar.acorda_claudinho();

-- Estado da casa no app (mantém campos atuais + situação do Claudinho).
create or replace function public.ar_status() returns jsonb
language sql stable security definer set search_path = '' as $$
  select coalesce(jsonb_agg(jsonb_build_object(
    'id', id, 'name', name, 'state', state, 'rx', rx,
    'last_seen', last_seen, 'online', last_seen > now() - interval '20 seconds',
    'claudinho_ok', claudinho_hash is not null,
    'claudinho_online', claudinho_seen > now() - interval '30 seconds',
    'claudinho_seen', claudinho_seen
  ) order by created_at), '[]'::jsonb)
  from ar.device where owner = auth.uid() and ar.is_master()
$$;

-- J7: registra um código de 6 números para o dono ligar o app ao Claudinho.
create or replace function public.ar_claudinho_iniciar(p_code text, p_key text) returns void
language plpgsql security definer set search_path = '' as $$
declare h text;
begin
  if p_code !~ '^[0-9]{6}$' or p_key !~ '^[0-9a-f]{32}$' then raise exception 'codigo/chave invalidos'; end if;
  delete from ar.claudinho_pair where expires_at < now();
  h := encode(extensions.digest(p_key, 'sha256'), 'hex');
  if (select count(*) from ar.claudinho_pair) >= 20 then raise exception 'muitos pareamentos pendentes'; end if;
  insert into ar.claudinho_pair (code, key_hash, expires_at)
  values (p_code, h, now() + interval '15 minutes')
  on conflict (code) do update
    set expires_at = now() + interval '15 minutes'
    where ar.claudinho_pair.key_hash = h;
end $$;

-- App (dono): liga o Claudinho à conta pelo código de 6 números.
create or replace function public.ar_claudinho_parear(p_id text, p_code text) returns void
language plpgsql security definer set search_path = '' as $$
declare h text;
begin
  if not ar.is_master() or not exists (select 1 from ar.device where id = p_id and owner = auth.uid()) then
    raise exception 'sem permissao'; end if;
  if p_code !~ '^[0-9]{6}$' then raise exception 'codigo invalido'; end if;
  delete from ar.claudinho_pair where code = p_code and expires_at > now() returning key_hash into h;
  if h is null then raise exception 'codigo errado ou vencido'; end if;
  update ar.device set claudinho_hash = h, claudinho_seen = now() where id = p_id;
end $$;

-- App (dono): envia comando por texto ou áudio diretamente para o Claudinho.
create or replace function public.ar_claudinho_enviar(
  p_id text, p_tipo text, p_texto text default null, p_audio text default null, p_mime text default null
) returns bigint
language plpgsql security definer set search_path = '' as $$
declare v bigint; has_c boolean; txt text; aud text; mm text;
begin
  if not ar.is_master() then raise exception 'sem permissao'; end if;
  select (claudinho_hash is not null) into has_c from ar.device where id = p_id and owner = auth.uid();
  if has_c is null then raise exception 'sem permissao'; end if;
  if not has_c then raise exception 'claudinho nao ligado'; end if;
  if p_tipo not in ('texto', 'audio') then raise exception 'tipo invalido'; end if;
  if (select count(*) from ar.claudinho_msg where device_id = p_id and created_at > now() - interval '1 minute') >= 30 then
    raise exception 'muitos comandos'; end if;

  if p_tipo = 'texto' then
    txt := trim(coalesce(p_texto, ''));
    if txt = '' or length(txt) > 500 then raise exception 'texto invalido'; end if;
  else
    aud := trim(coalesce(p_audio, ''));
    if aud = '' or length(aud) > 2000000 then raise exception 'audio invalido'; end if;
    mm := left(trim(coalesce(p_mime, 'audio/mp4')), 60);
  end if;

  delete from ar.claudinho_msg where device_id = p_id and created_at < now() - interval '2 days';
  insert into ar.claudinho_msg (device_id, tipo, texto, audio_b64, audio_mime)
  values (p_id, p_tipo, txt, aud, mm) returning id into v;
  return v;
end $$;

-- App (dono): lista as últimas mensagens trocadas com o Claudinho (sem o áudio bruto).
create or replace function public.ar_claudinho_mensagens(p_id text, p_limite int default 20) returns jsonb
language sql stable security definer set search_path = '' as $$
  select coalesce(jsonb_agg(row_to_json(t) order by t.id), '[]'::jsonb)
  from (
    select m.id, m.tipo, m.texto, m.resposta, m.ok, m.estado, m.created_at, m.replied_at
    from ar.claudinho_msg m
    join ar.device d on d.id = m.device_id
    where m.device_id = p_id and d.owner = auth.uid() and ar.is_master()
    order by m.id desc
    limit least(greatest(coalesce(p_limite, 20), 1), 50)
  ) t
$$;

-- J7 (Claudinho): busca pedidos pendentes e atualiza sinal de vida.
create or replace function public.ar_claudinho_sync(p_key text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare d text; h text; msgs jsonb;
begin
  if p_key !~ '^[0-9a-f]{32}$' then raise exception 'chave invalida'; end if;
  h := encode(extensions.digest(p_key, 'sha256'), 'hex');
  select id into d from ar.device where claudinho_hash = h and owner is not null limit 1;
  if d is null then
    return jsonb_build_object('pareado', false, 'msgs', '[]'::jsonb);
  end if;
  update ar.device set claudinho_seen = now() where id = d;
  update ar.claudinho_msg set estado = 'erro', resposta = 'O Claudinho não respondeu a tempo.', audio_b64 = null
  where device_id = d and estado in ('pendente', 'processando') and created_at <= now() - interval '120 seconds';
  with pegos as (
    select id from ar.claudinho_msg
    where device_id = d and estado = 'pendente' and created_at > now() - interval '120 seconds'
    order by id limit 5 for update skip locked
  ), upd as (
    update ar.claudinho_msg m set estado = 'processando', taken_at = now()
    from pegos where m.id = pegos.id
    returning m.id, m.tipo, m.texto, m.audio_b64, m.audio_mime
  )
  select coalesce(jsonb_agg(jsonb_build_object(
    'id', id, 'tipo', tipo, 'texto', texto, 'audio_b64', audio_b64, 'audio_mime', audio_mime
  ) order by id), '[]'::jsonb) into msgs from upd;
  return jsonb_build_object('pareado', true, 'msgs', msgs);
end $$;

-- J7 (Claudinho): grava a resposta (e o texto ouvido, se veio de áudio) e apaga o áudio bruto.
create or replace function public.ar_claudinho_responder(
  p_key text, p_msg_id bigint, p_texto text, p_resposta text, p_ok boolean
) returns void
language plpgsql security definer set search_path = '' as $$
declare d text; h text;
begin
  if p_key !~ '^[0-9a-f]{32}$' then raise exception 'chave invalida'; end if;
  h := encode(extensions.digest(p_key, 'sha256'), 'hex');
  select id into d from ar.device where claudinho_hash = h and owner is not null limit 1;
  if d is null then raise exception 'chave errada'; end if;
  update ar.claudinho_msg set
    texto = coalesce(nullif(left(trim(coalesce(p_texto, '')), 500), ''), texto),
    resposta = left(coalesce(p_resposta, ''), 2000),
    ok = coalesce(p_ok, false),
    estado = 'respondido',
    audio_b64 = null,
    replied_at = now()
  where id = p_msg_id and device_id = d;
end $$;

revoke all on function
  public.ar_claudinho_iniciar(text,text),
  public.ar_claudinho_parear(text,text),
  public.ar_claudinho_enviar(text,text,text,text,text),
  public.ar_claudinho_mensagens(text,int),
  public.ar_claudinho_sync(text),
  public.ar_claudinho_responder(text,bigint,text,text,boolean)
from public, anon, authenticated;

grant execute on function
  public.ar_claudinho_parear(text,text),
  public.ar_claudinho_enviar(text,text,text,text,text),
  public.ar_claudinho_mensagens(text,int)
to authenticated;

grant execute on function
  public.ar_claudinho_iniciar(text,text),
  public.ar_claudinho_sync(text),
  public.ar_claudinho_responder(text,bigint,text,text,boolean)
to anon, authenticated;
