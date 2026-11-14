-- Nossa casinha (14/11/2026, placa versão 9): comando na hora. Cada comando novo em ar.cmd manda um "cutucão" pelo
-- Realtime (broadcast público) no canal ar-<24 primeiros hexa de ar.device.key_hash>. A placa fica com o websocket
-- aberto nesse canal e, ao receber, chama ar_device_sync na hora (antes esperava até 3 s). O cutucão não leva o
-- comando nem dados: quem pega o comando continua sendo o ar_device_sync, com a chave da placa.
create or replace function ar.acorda_placa() returns trigger
language plpgsql security definer set search_path = '' as $$
declare h text;
begin
  select key_hash into h from ar.device where id = new.device_id;
  if h is not null then
    begin perform realtime.send('{}'::jsonb, 'cmd', 'ar-' || left(h, 24), false);
    exception when others then raise warning 'ar.acorda_placa: %', sqlerrm; end;
  end if;
  return null;
end $$;
revoke all on function ar.acorda_placa() from public, anon, authenticated;

drop trigger if exists ar_cmd_acorda on ar.cmd;
create trigger ar_cmd_acorda after insert on ar.cmd for each row execute function ar.acorda_placa();
