-- Nossa casinha (14/11/2026): o bloco do ar mostra quem ligou/desligou e a que horas ("Desligado pelo automático às 18:20").
-- O dono viu "Desligado" sem saber que o automático tinha desligado 6 min depois de ligar. Guardado a cada mudança de
-- "power" em ar.device.evento = {power, origem: app|auto|outro, em}; ar_status devolve junto.
alter table ar.device add column if not exists evento jsonb;

create or replace function ar.avisa_ar() returns trigger
language plpgsql security definer set search_path = '' as $$
declare a jsonb; pedido boolean; liga boolean := coalesce((new.state->>'power')::boolean, false);
begin
  pedido := exists (select 1 from ar.cmd where device_id = new.id
              and created_at > now() - interval '90 seconds' and (payload ? 'power' or payload ? 'scan'));
  new.evento := jsonb_build_object('power', liga, 'em', now(), 'origem',
    case when pedido then 'app'
         when liga and coalesce((new.state->'auto'->>'ligou')::boolean, false) then 'auto'
         when not liga and coalesce((old.state->'auto'->>'ligou')::boolean, false) then 'auto'
         else 'outro' end);
  if new.owner is null or (old.aviso_em is not null and old.aviso_em > now() - interval '30 seconds') then return new; end if;
  a := ar.aviso_texto(old.state, new.state, pedido);
  if a is null then return new; end if;
  new.aviso_em := now();
  perform public.call_edge('ar-aviso', jsonb_build_object('device_id', new.id, 'title', a->>'title', 'body', a->>'body'));
  return new;
end $$;

create or replace function public.ar_status() returns jsonb
language sql stable security definer set search_path = '' as $$
  select coalesce(jsonb_agg(jsonb_build_object('id', id, 'name', name, 'state', state, 'rx', rx, 'evento', evento,
    'last_seen', last_seen, 'online', last_seen > now() - interval '20 seconds') order by created_at), '[]'::jsonb)
  from ar.device where owner = auth.uid() and ar.is_master()
$$;

-- Preenche o que já se sabe de hoje: o ar ligou às 18:37 pelo app ("A mimi?").
update ar.device set evento = jsonb_build_object('power', true, 'origem', 'app', 'em', '2026-11-14 21:37:50+00')
  where id = '00003457d10d5020' and evento is null and (state->>'power')::boolean;
