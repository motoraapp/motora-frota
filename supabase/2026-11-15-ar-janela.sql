-- Nossa casinha: lá fora mais frio = abrir a janela (15/11/2026, pedido do dono; placa versão 20).
-- 1) Cron ar-tempo, a cada 15 min: a função ar-aviso ({tempo:true}) pega a temperatura de lá fora (Open-Meteo,
--    Trindade-GO) e grava o comando {fora: t} para a placa (ar_fora_gravar).
-- 2) A placa, quando o automático ia ligar o ar e lá fora está 3 °C ou mais frio do que o quarto, não liga e põe
--    auto.jan = true no estado. O gatilho ar_device_janela manda o aviso "Abra a janela" (no máximo 1 a cada 2 h).

create or replace function public.ar_fora_gravar(p_t numeric) returns void
language sql security definer set search_path = '' as $$
  insert into ar.cmd (device_id, payload)
  select id, jsonb_build_object('fora', round(p_t, 1)) from ar.device where owner is not null;
$$;
revoke all on function public.ar_fora_gravar(numeric) from public, anon, authenticated;
grant execute on function public.ar_fora_gravar(numeric) to service_role;

alter table ar.device add column if not exists janela_em timestamptz;

create or replace function ar.avisa_janela() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if new.owner is null or (old.janela_em is not null and old.janela_em > now() - interval '2 hours') then return new; end if;
  new.janela_em := now();
  perform public.call_edge('ar-aviso', jsonb_build_object('device_id', new.id, 'title', 'Abra a janela',
    'body', 'Lá fora está ' || coalesce(replace(new.state->>'fora', '.', ','), '?') || ' °C e o quarto '
      || coalesce(replace(new.state->'sala'->>'t', '.', ','), '?') || ' °C. O automático não ligou o ar.'));
  return new;
end $$;
revoke all on function ar.avisa_janela() from public, anon, authenticated;

drop trigger if exists ar_device_janela on ar.device;
create trigger ar_device_janela before update of state on ar.device
  for each row when (coalesce((new.state->'auto'->>'jan')::boolean, false)
                     and not coalesce((old.state->'auto'->>'jan')::boolean, false))
  execute function ar.avisa_janela();

select cron.unschedule('ar-tempo') where exists (select 1 from cron.job where jobname = 'ar-tempo');
select cron.schedule('ar-tempo', '*/15 * * * *', $$select public.call_edge('ar-aviso', '{"tempo": true}'::jsonb)$$);
