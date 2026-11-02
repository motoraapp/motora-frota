-- MOTORA — período, vencimento e correção de recibo por cobrança (02/11/2026)
-- APLICADO em 02/11/2026.
-- Nada existente é apagado. Cobrança antiga sem período continua valendo do vencimento + 6 dias.

alter table public.profiles add column if not exists pix_next jsonb;           -- pedido passageiro do Novo Pix: {due, start, end}
alter table public.profiles add column if not exists pix_period_start date;
alter table public.profiles add column if not exists pix_period_end date;

alter table public.pix_history add column if not exists period_start date;
alter table public.pix_history add column if not exists period_end date;
alter table public.pix_history add column if not exists recibo_descricao text; -- itens corrigidos; a descrição original continua guardada
alter table public.pix_history add column if not exists corrigido_em timestamptz;

create or replace function public.profiles_pix_dates()
 returns trigger language plpgsql as $f$
declare v_due date;
begin
if current_setting('motora.keep_pix_dates', true) = '1' then return new; end if;
if new.role = 'driver' and (new.pix_code is not null or new.pix_qr_path is not null) and (tg_op = 'INSERT' or new.pix_code is distinct from old.pix_code or new.pix_qr_path is distinct from old.pix_qr_path or new.pix_sent_at is distinct from old.pix_sent_at) then
  v_due := nullif(new.pix_next->>'due', '')::date;
  new.pix_sent_at := now();
  new.pix_due_at := case when v_due is not null
    then (v_due + time '23:59:59') at time zone 'America/Sao_Paulo'
    else public.next_due(now(), coalesce(new.payment_day_of_week, 1)::int) end;
  new.pix_period_start := coalesce(nullif(new.pix_next->>'start', '')::date, (new.pix_due_at at time zone 'America/Sao_Paulo')::date);
  new.pix_period_end := coalesce(nullif(new.pix_next->>'end', '')::date, new.pix_period_start + 6);
elsif tg_op = 'UPDATE' then
  new.pix_sent_at := old.pix_sent_at;
  new.pix_due_at := old.pix_due_at;
  new.pix_period_start := old.pix_period_start;
  new.pix_period_end := old.pix_period_end;
end if;
new.pix_next := null;
return new;
end $f$;

create or replace function public.profiles_after_change()
 returns trigger language plpgsql security definer set search_path to 'public' as $function$
begin
if new.role <> 'driver' then return new; end if;
if new.pix_sent_at is not null and (tg_op = 'INSERT' or new.pix_sent_at is distinct from old.pix_sent_at) then
insert into pix_history (driver_id, sent_at, due_at, amount, description, period_start, period_end) values (new.id, new.pix_sent_at, new.pix_due_at, new.pix_amount, new.pix_description, new.pix_period_start, new.pix_period_end);
end if;
if new.cnh_path is not null and (tg_op = 'INSERT' or new.cnh_path is distinct from old.cnh_path) then perform drive_notify(jsonb_build_object('type', 'doc', 'driver_id', new.id, 'col', 'cnh_path')); end if;
if new.address_path is not null and (tg_op = 'INSERT' or new.address_path is distinct from old.address_path) then perform drive_notify(jsonb_build_object('type', 'doc', 'driver_id', new.id, 'col', 'address_path')); end if;
if new.contract_path is not null and (tg_op = 'INSERT' or new.contract_path is distinct from old.contract_path) then perform drive_notify(jsonb_build_object('type', 'doc', 'driver_id', new.id, 'col', 'contract_path')); end if;
if new.inspection_term_path is not null and (tg_op = 'INSERT' or new.inspection_term_path is distinct from old.inspection_term_path) then perform drive_notify(jsonb_build_object('type', 'doc', 'driver_id', new.id, 'col', 'inspection_term_path')); end if;
return new;
end $function$;

-- muda vencimento e período do Pix em aberto (Editar Pix)
create or replace function public.master_pix_datas(p_driver uuid, p_due date, p_start date, p_end date)
 returns void language plpgsql security definer set search_path to 'public' as $f$
declare d profiles; v_due timestamptz;
begin
  if not is_master() then raise exception 'apenas o master'; end if;
  if p_due is null or p_start is null or p_end is null or p_end < p_start then raise exception 'período inválido'; end if;
  select * into d from profiles where id = p_driver and role = 'driver';
  if not found or d.pix_sent_at is null then raise exception 'este motorista não tem Pix enviado'; end if;
  v_due := (p_due + time '23:59:59') at time zone 'America/Sao_Paulo';
  perform set_config('motora.keep_pix_dates', '1', true);
  update profiles set pix_due_at = v_due, pix_period_start = p_start, pix_period_end = p_end, late_checked_due = null where id = p_driver;
  perform set_config('motora.keep_pix_dates', '', true);
  update pix_history set due_at = v_due, period_start = p_start, period_end = p_end where driver_id = p_driver and sent_at = d.pix_sent_at and paid_at is null;
  perform reallocate_driver_payments(p_driver);
end $f$;

-- corrige o recibo de uma cobrança: muda só o texto e o período; valor, pagamento e comprovante não mudam
create or replace function public.master_corrigir_recibo(p_history uuid, p_descricao text, p_start date, p_end date)
 returns void language plpgsql security definer set search_path to 'public' as $f$
begin
  if not is_master() then raise exception 'apenas o master'; end if;
  if p_start is null or p_end is null or p_end < p_start then raise exception 'período inválido'; end if;
  update pix_history set recibo_descricao = nullif(trim(p_descricao), ''), period_start = p_start, period_end = p_end, corrigido_em = now() where id = p_history;
  if not found then raise exception 'cobrança não encontrada'; end if;
end $f$;

revoke execute on function public.master_pix_datas(uuid, date, date, date) from public, anon;
revoke execute on function public.master_corrigir_recibo(uuid, text, date, date) from public, anon;
grant execute on function public.master_pix_datas(uuid, date, date, date) to authenticated;
grant execute on function public.master_corrigir_recibo(uuid, text, date, date) to authenticated;
