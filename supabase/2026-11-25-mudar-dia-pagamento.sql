-- MUDAR DIA DO PAGAMENTO e levar junto a cobrança em aberto (25/11/2026, pedido do dono; caso da Argelia)
-- Já aplicado no Supabase (projeto epswrtcwszhbapaxdpzz).
--
-- 1) asaas_set_partial_qr: antes de trocar o QR da semana por um QR de atraso (multa e juros) ou parcial,
--    guarda o QR da semana em pix_extra.qr_semana = {sent_at, code, qr_path, amount, qr}. Só guarda uma vez por cobrança
--    (pix_sent_at), então o guardado é sempre o QR original da semana.
-- 2) master_mudar_dia(p_driver, p_dia, p_mover): grava o dia (0=domingo ... 6=sábado). Com p_mover e cobrança em aberto:
--    o vencimento passa para o próximo dia escolhido (hoje conta), sem multa e juros; o QR da semana volta para o app
--    (sai o de atraso/parcial); o Asaas e o Pix automático do MOTORA não criam outra cobrança para essa data;
--    o abatimento roda e o motorista volta para "Em dia" se não houver outra cobrança vencida; o motorista é avisado.

create or replace function public.asaas_set_partial_qr(p_driver uuid, p_code text, p_qr_path text, p_amount numeric, p_extra jsonb)
 returns void
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare d profiles; v_extra jsonb := coalesce(p_extra, '{}'::jsonb);
begin
  select * into d from public.profiles where id = p_driver and role = 'driver';
  if found and d.pix_sent_at is not null and (d.pix_code is not null or d.pix_qr_path is not null) then
    if nullif(d.pix_extra->'qr_semana'->>'sent_at', '')::timestamptz is distinct from d.pix_sent_at then
      v_extra := v_extra || jsonb_build_object('qr_semana', jsonb_build_object(
        'sent_at', d.pix_sent_at, 'code', d.pix_code, 'qr_path', d.pix_qr_path, 'amount', d.pix_amount, 'qr', d.pix_extra->'asaas'->>'qr'));
    else
      v_extra := v_extra || jsonb_build_object('qr_semana', d.pix_extra->'qr_semana');
    end if;
  end if;
  perform set_config('motora.keep_pix_dates', '1', true);
  update public.profiles
  set pix_code = p_code,
      pix_qr_path = p_qr_path,
      pix_link = null,
      pix_amount = p_amount,
      pix_extra = v_extra
  where id = p_driver and role = 'driver';
end $function$;

create or replace function public.master_mudar_dia(p_driver uuid, p_dia int, p_mover boolean default true)
 returns jsonb
 language plpgsql
 security definer
 set search_path to 'public'
as $f$
declare
  d profiles; h pix_history; ex jsonb; sem jsonb;
  v_date date; v_due timestamptz; v_code text; v_qr_path text; v_amount numeric;
  restaurado boolean := false; sem_qr boolean := false;
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
  v_code := d.pix_code; v_qr_path := d.pix_qr_path; v_amount := d.pix_amount;
  -- QR de atraso (multa e juros) ou parcial no app: volta o QR da semana guardado
  if ex ? 'atraso_qr' or ex ? 'parcial' then
    sem := ex->'qr_semana';
    if sem is not null and nullif(sem->>'sent_at', '')::timestamptz = d.pix_sent_at and (sem->>'code' is not null or sem->>'qr_path' is not null) then
      v_code := sem->>'code'; v_qr_path := sem->>'qr_path'; v_amount := coalesce(nullif(sem->>'amount', '')::numeric, h.amount);
      if ex ? 'asaas' and sem->>'qr' is not null then ex := jsonb_set(ex, '{asaas,qr}', to_jsonb(sem->>'qr')); end if;
      ex := ex - 'atraso_qr' - 'parcial';
      restaurado := true;
    else
      sem_qr := true; -- não há QR da semana guardado: o dono troca o código pelo "Editar Pix enviado"
    end if;
  end if;
  -- o Asaas e o Pix automático não criam outra cobrança para a nova data
  if ex ? 'asaas' then ex := jsonb_set(ex, '{asaas,vencimento}', to_jsonb(v_date::text)); end if;
  if coalesce((ex->>'pix_auto')::boolean, false) or ex ? 'pix_auto_venc' then ex := ex || jsonb_build_object('pix_auto_venc', v_date::text); end if;

  perform set_config('motora.keep_pix_dates', '1', true);
  update profiles set pix_due_at = v_due, late_checked_due = null, pix_extra = ex,
         pix_code = v_code, pix_qr_path = v_qr_path, pix_amount = v_amount
   where id = p_driver;
  perform set_config('motora.keep_pix_dates', '', true);
  update pix_history set due_at = v_due where id = h.id;
  perform reallocate_driver_payments(p_driver);

  perform public.call_edge('motora-push', jsonb_build_object(
    'type', 'driver_alert', 'driver_id', p_driver, 'url', '/?aba=pagamento',
    'title', 'Dia do pagamento alterado',
    'body', format('Seu pagamento agora é todo(a) %s. O Pix de R$ %s vence %s, %s, até 23:59.',
                   nomes[p_dia + 1], translate(to_char(coalesce(v_amount, h.amount), 'FM999,990.00'), ',.', '.,'),
                   nomes[p_dia + 1], to_char(v_date, 'DD/MM'))));

  return jsonb_build_object('movido', true, 'dia', p_dia, 'vencimento', v_date, 'valor', coalesce(v_amount, h.amount),
    'restaurado', restaurado, 'sem_qr', sem_qr,
    'status', (select payment_status from profiles where id = p_driver));
end $f$;

revoke execute on function public.master_mudar_dia(uuid, int, boolean) from public, anon;
grant execute on function public.master_mudar_dia(uuid, int, boolean) to authenticated;
revoke execute on function public.asaas_set_partial_qr(uuid, text, text, numeric, jsonb) from public, anon, authenticated;
