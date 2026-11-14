-- Nossa casinha: avisos no celular pelo próprio app (14/11/2026). Antes os avisos do ar iam como "master_alert" do
-- MOTORA (notificação no app MOTORA + cópia no WhatsApp) e o dono não via. Agora o app Nossa casinha guarda a
-- inscrição de aviso dele (ar.push) e a função ar-aviso manda só para ela.
create table if not exists ar.push (
  endpoint text primary key,
  device_id text not null references ar.device(id) on delete cascade,
  p256dh text not null,
  auth text not null,
  created_at timestamptz not null default now()
);
alter table ar.push enable row level security;

-- Dono (master): guarda a inscrição deste celular para a(s) placa(s) dele.
create or replace function public.ar_push_salvar(p_endpoint text, p_p256dh text, p_auth text) returns int
language plpgsql security definer set search_path = '' as $$
declare n int;
begin
  if not ar.is_master() then raise exception 'sem permissao'; end if;
  if p_endpoint !~ '^https://' or length(p_endpoint) > 1000 or length(p_p256dh) > 200 or length(p_auth) > 100 then raise exception 'inscricao invalida'; end if;
  insert into ar.push (endpoint, device_id, p256dh, auth)
    select p_endpoint, d.id, p_p256dh, p_auth from ar.device d where d.owner = auth.uid() order by d.created_at limit 1
  on conflict (endpoint) do update set p256dh = excluded.p256dh, auth = excluded.auth, device_id = excluded.device_id;
  get diagnostics n = row_count;
  return n;
end $$;

-- Usado pela função ar-aviso (service_role).
create or replace function public.ar_push_lista(p_device text) returns jsonb
language sql stable security definer set search_path = '' as $$
  select coalesce(jsonb_agg(jsonb_build_object('endpoint', endpoint, 'p256dh', p256dh, 'auth', auth)), '[]'::jsonb)
  from ar.push where device_id = p_device
$$;
create or replace function public.ar_push_apagar(p_endpoint text) returns void
language sql security definer set search_path = '' as $$ delete from ar.push where endpoint = p_endpoint $$;

revoke all on function public.ar_push_salvar(text, text, text), public.ar_push_lista(text), public.ar_push_apagar(text) from public, anon, authenticated;
grant execute on function public.ar_push_salvar(text, text, text) to authenticated;
grant execute on function public.ar_push_lista(text), public.ar_push_apagar(text) to service_role;

-- Os gatilhos passam a chamar ar-aviso (e não mais o motora-push).
create or replace function ar.avisa_ar() returns trigger
language plpgsql security definer set search_path = '' as $$
declare a jsonb;
begin
  if new.owner is null or (old.aviso_em is not null and old.aviso_em > now() - interval '30 seconds') then return new; end if;
  a := ar.aviso_texto(old.state, new.state, exists (select 1 from ar.cmd where device_id = new.id
         and created_at > now() - interval '90 seconds' and (payload ? 'power' or payload ? 'scan')));
  if a is null then return new; end if;
  new.aviso_em := now();
  perform public.call_edge('ar-aviso', jsonb_build_object('device_id', new.id, 'title', a->>'title', 'body', a->>'body'));
  return new;
end $$;

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
        perform public.call_edge('ar-aviso', jsonb_build_object('device_id', new.id,
          'title', 'Quarto quente: ' || replace(t::text, '.', ',') || ' °C',
          'body', case when liga then 'O ar está ligado, mas o quarto passou de ' || replace(new.quente_lim::text, '.', ',') || ' °C.'
                       else 'O ar está desligado. Toque para abrir o Nossa casinha.' end,
          'x', 1));
      elsif t <= new.quente_lim - 1 and new.quente_avisado then
        new.quente_avisado := false;
      end if;
    end if;
  exception when others then
    raise warning 'ar.historico: %', sqlerrm;
  end;
  return new;
end $$;
