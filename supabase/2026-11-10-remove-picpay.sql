-- PicPay retirado do MOTORA (10/11/2026). Já aplicado no banco.
-- A coluna profiles.picpay_auto_charge_enabled fica, sempre falsa, porque funções publicadas ainda a leem.
select cron.unschedule('motora-picpay-cobrar');
drop function if exists public.master_picpay_info();
create or replace function public.set_app_config(p_key text, p_value text) returns void
language plpgsql security definer set search_path = public as $$
begin
if not public.is_master() then raise exception 'Apenas o master'; end if;
if p_key not in ('gemini_key', 'drive_url', 'asaas_key', 'asaas_ambiente', 'asaas_chave_pix') then raise exception 'Configuração desconhecida'; end if;
if coalesce(trim(p_value), '') = '' then delete from app_secrets where key = p_key;
else insert into app_secrets (key, value) values (p_key, trim(p_value)) on conflict (key) do update set value = excluded.value; end if;
if p_key = 'asaas_key' then delete from app_secrets where key = 'asaas_chave_pix'; end if;
end $$;
