-- WHATSAPP DA LOCADORA (25/11/2026, pedido do dono). Já aplicado no Supabase.
-- Número para onde o motorista manda o aviso de devolução (e futuros botões "falar com a locadora").
-- O dono muda em Configurações → "WhatsApp da locadora". Guardado em app_settings whatsapp_locadora = {numero}
-- (só dígitos, com 55). O motorista pode ler esta chave (além de design e driver_features).
insert into public.app_settings (key, value, updated_at)
values ('whatsapp_locadora', '{"numero":"5562994578963"}'::jsonb, now())
on conflict (key) do update set value = excluded.value, updated_at = now();

drop policy if exists todos_leem_config on public.app_settings;
create policy todos_leem_config on public.app_settings
  for select to authenticated
  using (key in ('design', 'driver_features', 'whatsapp_locadora'));

-- o aviso de devolução passa a usar o WhatsApp da locadora (se faltar, o do locador do contrato)
create or replace function public.driver_avisar_devolucao(p_data date, p_motivo text default null)
 returns jsonb
 language plpgsql
 security definer
 set search_path to 'public'
as $f$
declare d profiles; v_hoje date := (now() at time zone 'America/Sao_Paulo')::date; v_fone text;
begin
  select * into d from profiles where id = auth.uid() and role = 'driver';
  if not found then raise exception 'apenas o motorista'; end if;
  if d.vehicle_id is null then raise exception 'você não está com nenhum carro'; end if;
  if p_data is null or p_data < v_hoje + 15 then raise exception 'a devolução precisa ser pelo menos 15 dias depois do aviso'; end if;
  update profiles set pix_extra = coalesce(pix_extra, '{}'::jsonb) || jsonb_build_object('devolucao_pedido',
    jsonb_build_object('em', now(), 'data', p_data, 'motivo', nullif(left(trim(coalesce(p_motivo, '')), 300), '')))
   where id = d.id;
  perform public.call_edge('motora-push', jsonb_build_object('type', 'master_alert', 'url', '/',
    'title', 'Aviso de devolução: ' || split_part(d.name, ' ', 1),
    'body', format('%s avisou que vai devolver o carro em %s. Confira e marque na ficha "Motorista informou a devolução".',
                   d.name, to_char(p_data, 'DD/MM/YYYY'))));
  select nullif(regexp_replace(coalesce(value->>'numero', ''), '\D', '', 'g'), '') into v_fone from app_settings where key = 'whatsapp_locadora';
  if v_fone is null then
    select nullif(regexp_replace(coalesce(value->>'phone', ''), '\D', '', 'g'), '') into v_fone from app_settings where key = 'locador_config';
  end if;
  return jsonb_build_object('ok', true, 'whatsapp', v_fone);
end $f$;
