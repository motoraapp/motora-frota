-- Checagem do robô a cada 30 s: avisa o dono uma vez quando para e outra quando volta
create or replace function public.checa_robo() returns void
language plpgsql security definer set search_path to 'public', 'extensions' as $$
declare
  cfg jsonb := (select value from app_settings where key = 'whatsapp_robo');
  vivo timestamptz := (select (value->>'em')::timestamptz from app_settings where key = 'robo_vivo');
  estado text := (select value->>'problema' from app_settings where key = 'robo_checagem');
  visto timestamptz := (cfg->>'visto_em')::timestamptz;
  problema text;
begin
  if coalesce((cfg->>'ativo')::boolean, false) = false or vivo is null then return; end if;
  if vivo < now() - interval '2 minutes' then
    problema := case when visto > now() - interval '90 seconds' then 'whatsapp' else 'robo' end;
  end if;
  if problema is not null and estado is null then
    perform call_edge('motora-push', jsonb_build_object('type', 'master_alert', 'url', '/?abrir=ia',
      'title', case problema when 'whatsapp' then 'WhatsApp do robô desconectado' else 'Robô do WhatsApp desligado' end,
      'body', case problema when 'whatsapp' then 'O robô está ligado, mas sem conexão com o WhatsApp. As mensagens estão paradas. Toque para ver.'
        else 'O robô parou de responder. Confira se o computador está ligado e com internet. As mensagens estão paradas.' end));
  elsif problema is null and estado is not null then
    perform call_edge('motora-push', jsonb_build_object('type', 'master_alert', 'url', '/?abrir=ia',
      'title', 'Robô do WhatsApp funcionando', 'body', 'A conexão voltou. As mensagens paradas serão enviadas.'));
  end if;
  if problema is distinct from estado and (problema is null or estado is null) then
    insert into app_settings(key, value) values ('robo_checagem', jsonb_build_object('problema', problema))
      on conflict (key) do update set value = excluded.value, updated_at = now();
  end if;
end $$;
revoke execute on function public.checa_robo() from public, anon, authenticated;
select cron.schedule('motora-checa-robo', '30 seconds', 'select public.checa_robo()');
