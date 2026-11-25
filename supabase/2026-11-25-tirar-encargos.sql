-- TIRAR MULTA E JUROS PELO APP (25/11/2026, pedido do dono; antes foi feito à mão para o Soyer). Já aplicado no Supabase.
--
-- 1) pix_volta_qr_semana(driver): parte comum (sem repetir código). Se o app do motorista está com o QR de atraso
--    (multa e juros) ou parcial, volta o QR da semana guardado em pix_extra.qr_semana. Usada por master_mudar_dia e
--    master_tirar_encargos. Interna: só as funções do banco chamam.
-- 2) master_mudar_dia passa a usar essa parte comum (o resto não muda).
-- 3) master_tirar_encargos(driver): para cada cobrança vencida e em aberto, grava a linha R$ 0,00
--    "Multa e juros dispensados pela locadora [atraso:<id>]" (a multa daquela cobrança não volta: é a mesma marca que o
--    app, o Asaas e os lembretes já usam para não cobrar multa duas vezes) e passa o vencimento para hoje, 23:59
--    (os juros contados até agora somem). Se não pagar até hoje, só os juros voltam a contar a partir de amanhã.
--    Volta o Pix da semana, roda o abatimento (fica "Em dia" se não sobrar nada vencido).

create or replace function public.pix_volta_qr_semana(p_driver uuid)
 returns jsonb language plpgsql security definer set search_path to 'public' as $f$
declare d profiles; ex jsonb; sem jsonb;
begin
  select * into d from profiles where id = p_driver and role = 'driver';
  if not found then return jsonb_build_object('restaurado', false, 'sem_qr', false); end if;
  ex := coalesce(d.pix_extra, '{}'::jsonb);
  if not (ex ? 'atraso_qr' or ex ? 'parcial') then return jsonb_build_object('restaurado', false, 'sem_qr', false); end if;
  sem := ex->'qr_semana';
  if sem is null or nullif(sem->>'sent_at', '')::timestamptz is distinct from d.pix_sent_at
     or (sem->>'code' is null and sem->>'qr_path' is null) then
    return jsonb_build_object('restaurado', false, 'sem_qr', true); -- o dono troca o código pelo "Editar Pix enviado"
  end if;
  if ex ? 'asaas' and sem->>'qr' is not null then ex := jsonb_set(ex, '{asaas,qr}', to_jsonb(sem->>'qr')); end if;
  ex := ex - 'atraso_qr' - 'parcial';
  perform set_config('motora.keep_pix_dates', '1', true);
  update profiles set pix_code = sem->>'code', pix_qr_path = sem->>'qr_path',
         pix_amount = coalesce(nullif(sem->>'amount', '')::numeric, pix_amount), pix_extra = ex
   where id = p_driver;
  perform set_config('motora.keep_pix_dates', '', true);
  return jsonb_build_object('restaurado', true, 'sem_qr', false);
end $f$;
revoke all on function public.pix_volta_qr_semana(uuid) from public, anon, authenticated;

create or replace function public.master_mudar_dia(p_driver uuid, p_dia int, p_mover boolean default true)
 returns jsonb language plpgsql security definer set search_path to 'public' as $f$
declare
  d profiles; h pix_history; ex jsonb; q jsonb; v_amount numeric;
  v_date date; v_due timestamptz;
  nomes text[] := array['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'];
begin
  if not is_master() then raise exception 'apenas o master'; end if;
  if p_dia is null or p_dia < 0 or p_dia > 6 then raise exception 'dia inválido'; end if;
  select * into d from profiles where id = p_driver and role = 'driver';
  if not found then raise exception 'motorista não encontrado'; end if;

  update profiles set payment_day_of_week = p_dia where id = p_driver;

  if not coalesce(p_mover, false) or d.pix_sent_at is null then
    return jsonb_build_object('movido', false, 'dia', p_dia);
  end if;
  select * into h from pix_history where driver_id = p_driver and sent_at = d.pix_sent_at and paid_at is null order by created_at desc limit 1;
  if not found then
    return jsonb_build_object('movido', false, 'dia', p_dia, 'motivo', 'sem cobrança em aberto');
  end if;

  v_date := (public.next_due(now(), p_dia) at time zone 'America/Sao_Paulo')::date;
  v_due := (v_date + time '23:59:59') at time zone 'America/Sao_Paulo';

  ex := coalesce(d.pix_extra, '{}'::jsonb);
  -- o Asaas e o Pix automático não criam outra cobrança para a nova data
  if ex ? 'asaas' then ex := jsonb_set(ex, '{asaas,vencimento}', to_jsonb(v_date::text)); end if;
  if coalesce((ex->>'pix_auto')::boolean, false) or ex ? 'pix_auto_venc' then ex := ex || jsonb_build_object('pix_auto_venc', v_date::text); end if;

  perform set_config('motora.keep_pix_dates', '1', true);
  update profiles set pix_due_at = v_due, late_checked_due = null, pix_extra = ex where id = p_driver;
  perform set_config('motora.keep_pix_dates', '', true);
  update pix_history set due_at = v_due where id = h.id;
  q := public.pix_volta_qr_semana(p_driver);
  perform reallocate_driver_payments(p_driver);
  select coalesce(pix_amount, h.amount) into v_amount from profiles where id = p_driver;

  perform public.call_edge('motora-push', jsonb_build_object(
    'type', 'driver_alert', 'driver_id', p_driver, 'url', '/?aba=pagamento',
    'title', 'Dia do pagamento alterado',
    'body', format('Seu pagamento agora é todo(a) %s. O Pix de R$ %s vence %s, %s, até 23:59.',
                   nomes[p_dia + 1], translate(to_char(v_amount, 'FM999,990.00'), ',.', '.,'),
                   nomes[p_dia + 1], to_char(v_date, 'DD/MM'))));

  return jsonb_build_object('movido', true, 'dia', p_dia, 'vencimento', v_date, 'valor', v_amount,
    'status', (select payment_status from profiles where id = p_driver)) || q;
end $f$;

create or replace function public.master_tirar_encargos(p_driver uuid)
 returns jsonb language plpgsql security definer set search_path to 'public' as $f$
declare
  d profiles; c record; n int := 0; tot numeric := 0; q jsonb;
  v_hoje date := (now() at time zone 'America/Sao_Paulo')::date;
  v_due timestamptz;
begin
  if not is_master() then raise exception 'apenas o master'; end if;
  select * into d from profiles where id = p_driver and role = 'driver';
  if not found then raise exception 'motorista não encontrado'; end if;
  v_due := (v_hoje + time '23:59:59') at time zone 'America/Sao_Paulo';

  for c in select h.* from pix_history h
            where h.driver_id = p_driver and h.paid_at is null and coalesce(h.amount, 0) > 0 and h.due_at < now()
              and coalesce(h.description, '') !~* '^\s*Multa\M' and coalesce(h.description, '') !~* '\[atraso:'
  loop
    if not exists (select 1 from pix_history t where t.driver_id = p_driver and t.description ilike '%[atraso:' || c.id || ']%') then
      insert into pix_history (driver_id, vehicle_id, sent_at, due_at, amount, description)
      values (p_driver, c.vehicle_id, c.sent_at + interval '5 seconds', v_due, 0,
              'Multa e juros dispensados pela locadora [atraso:' || c.id || ']');
    end if;
    update pix_history set due_at = v_due where id = c.id;
    n := n + 1; tot := tot + c.amount;
  end loop;
  if n = 0 then return jsonb_build_object('tirado', false, 'motivo', 'nenhuma cobrança vencida em aberto'); end if;

  if d.pix_due_at is not null and d.pix_due_at < now() then
    perform set_config('motora.keep_pix_dates', '1', true);
    update profiles set pix_due_at = v_due, late_checked_due = null where id = p_driver;
    perform set_config('motora.keep_pix_dates', '', true);
  end if;
  q := public.pix_volta_qr_semana(p_driver);
  perform reallocate_driver_payments(p_driver);
  return jsonb_build_object('tirado', true, 'cobrancas', n, 'valor', tot, 'vencimento', v_hoje,
    'pix', (select pix_amount from profiles where id = p_driver),
    'status', (select payment_status from profiles where id = p_driver)) || q;
end $f$;

revoke execute on function public.master_tirar_encargos(uuid) from public, anon;
grant execute on function public.master_tirar_encargos(uuid) to authenticated;
