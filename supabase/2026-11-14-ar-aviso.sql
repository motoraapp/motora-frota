-- Nossa casinha: notificação ao dono quando o ar liga ou desliga sem ele ter pedido (14/11/2026).
-- A placa manda o estado a cada 3 s (ar_device_sync). Quando "power" muda e não houve pedido do app/Siri
-- (ar.cmd com "power" ou "scan" nos últimos 90 s), avisa:
--   ligou com auto.ligou = true          -> "Ar ligado pelo automático"
--   desligou e antes auto.ligou = true   -> "Ar desligado pelo automático"
--   outro caso                            -> "Ar ligado/desligado" (horário programado ou controle remoto)
-- Vai por motora-push master_alert (notificação no celular do dono; como todo master_alert, também sai a cópia
-- no WhatsApp pessoal dele, copiaWhatsAppDono). No máximo 1 aviso a cada 30 s.
alter table ar.device add column if not exists aviso_em timestamptz;

-- Regra pura (testável): devolve {title, body} ou null.
create or replace function ar.aviso_texto(p_antes jsonb, p_novo jsonb, p_pedido boolean) returns jsonb
language plpgsql immutable set search_path = '' as $$
declare
  liga boolean := coalesce((p_novo->>'power')::boolean, false);
  antes boolean := coalesce((p_antes->>'power')::boolean, false);
  auto_novo boolean := coalesce((p_novo->'auto'->>'ligou')::boolean, false);
  auto_antes boolean := coalesce((p_antes->'auto'->>'ligou')::boolean, false);
  t text; c text := '';
begin
  if p_antes is null or p_novo is null or liga = antes then return null; end if;
  if liga and auto_novo then t := 'Ar ligado pelo automático';
  elsif not liga and auto_antes and not p_pedido then t := 'Ar desligado pelo automático';
  elsif p_pedido then return null;
  else t := case when liga then 'Ar ligado' else 'Ar desligado' end; c := 'Pelo horário programado ou pelo controle remoto. ';
  end if;
  if p_novo->'sala'->>'t' is not null then c := c || 'Quarto: ' || replace(p_novo->'sala'->>'t', '.', ',') || ' °C. '; end if;
  if liga and p_novo->>'temp' is not null then c := c || 'Ar em ' || (p_novo->>'temp') || ' °C.'; end if;
  return jsonb_build_object('title', t, 'body', trim(c));
end $$;

create or replace function ar.avisa_ar() returns trigger
language plpgsql security definer set search_path = '' as $$
declare a jsonb;
begin
  if new.owner is null or (old.aviso_em is not null and old.aviso_em > now() - interval '30 seconds') then return new; end if;
  a := ar.aviso_texto(old.state, new.state, exists (select 1 from ar.cmd where device_id = new.id
         and created_at > now() - interval '90 seconds' and (payload ? 'power' or payload ? 'scan')));
  if a is null then return new; end if;
  new.aviso_em := now();
  perform public.call_edge('motora-push', jsonb_build_object('type', 'master_alert',
    'title', a->>'title', 'body', a->>'body', 'url', '/ar/'));
  return new;
end $$;

drop trigger if exists ar_device_aviso on ar.device;
create trigger ar_device_aviso before update of state on ar.device
  for each row when (old.state->'power' is distinct from new.state->'power') execute function ar.avisa_ar();

revoke all on function ar.aviso_texto(jsonb, jsonb, boolean), ar.avisa_ar() from public, anon, authenticated;
