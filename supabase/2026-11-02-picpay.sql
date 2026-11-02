-- MOTORA — 02/11/2026: pagamento automático pelo PicPay (conta PJ), como opção ao Asaas na ficha do motorista.
alter table public.profiles add column if not exists picpay_auto_charge_enabled boolean not null default false;
alter table public.profiles drop constraint if exists profiles_um_pagamento_automatico;
alter table public.profiles add constraint profiles_um_pagamento_automatico check (not (asaas_auto_charge_enabled and picpay_auto_charge_enabled));

create or replace function public.set_app_config(p_key text, p_value text)
 returns void language plpgsql security definer set search_path to 'public' as $function$
begin
if not public.is_master() then raise exception 'Apenas o master'; end if;
if p_key not in ('gemini_key', 'drive_url', 'asaas_key', 'asaas_ambiente', 'picpay_client_id', 'picpay_client_secret', 'picpay_webhook_token', 'picpay_ambiente') then raise exception 'Configuração desconhecida'; end if;
if coalesce(trim(p_value), '') = '' then delete from app_secrets where key = p_key;
else insert into app_secrets (key, value) values (p_key, trim(p_value)) on conflict (key) do update set value = excluded.value; end if;
if p_key = 'asaas_key' then delete from app_secrets where key = 'asaas_chave_pix'; end if;
end $function$;

-- não devolve nenhum segredo: só diz se já foi colocado
create or replace function public.master_picpay_info()
 returns jsonb language plpgsql security definer set search_path to 'public' as $function$
begin
if not public.is_master() then raise exception 'Apenas o master'; end if;
return jsonb_build_object(
  'credenciais', exists(select 1 from app_secrets where key = 'picpay_client_id') and exists(select 1 from app_secrets where key = 'picpay_client_secret'),
  'ambiente', (select value from app_secrets where key = 'picpay_ambiente'),
  'webhook_url', 'https://epswrtcwszhbapaxdpzz.supabase.co/functions/v1/motora-picpay',
  'webhook_token', exists(select 1 from app_secrets where key = 'picpay_webhook_token'));
end $function$;
revoke all on function public.master_picpay_info() from public, anon;
grant execute on function public.master_picpay_info() to authenticated;

-- pagamento confirmado pelo PicPay não vai para a conferência da IA (igual ao Asaas)
create or replace function public.receipt_sets_em_dia()
 returns trigger language plpgsql security definer set search_path to 'public' as $function$
declare v_hist uuid;
begin
  select id into v_hist from pix_history
   where driver_id = new.driver_id and paid_at is null and sent_at < new.created_at
   order by sent_at desc limit 1;
  if v_hist is not null then
    update pix_history set receipt_id = new.id where id = v_hist;
  else
    perform drive_notify(jsonb_build_object('type', 'receipt', 'receipt_id', new.id));
  end if;
  if coalesce(new.ai_result->>'origem', '') not in ('asaas', 'picpay') then
    perform call_edge('motora-sync', jsonb_build_object('type', 'verify_receipt', 'receipt_id', new.id));
  end if;
  return new;
end $function$;

-- todo dia às 08:05 de Brasília
select cron.unschedule(jobname) from cron.job where jobname = 'motora-picpay-cobrar';
select cron.schedule('motora-picpay-cobrar', '5 11 * * *', $c$
select net.http_post(url := 'https://epswrtcwszhbapaxdpzz.supabase.co/functions/v1/motora-picpay',
  headers := jsonb_build_object('Content-Type', 'application/json', 'x-cron-token', (select value from public.app_secrets where key = 'cron_token')),
  body := '{"acao":"cobrar"}'::jsonb, timeout_milliseconds := 120000)
$c$);
