-- REMOVER O WHATSAPP OFICIAL (API da Meta) (25/11/2026, pedido do dono: "remova tudo sobre a api da meta").
-- Desfaz o antigo supabase/2026-11-25-whatsapp-api.sql (apagado do repositório). O envio continua pelo robô do PC.

-- 1) cron e funções da tela
select cron.unschedule('motora-whatsapp-api') where exists (select 1 from cron.job where jobname = 'motora-whatsapp-api');
drop function if exists public.master_whatsapp_api_info();
drop function if exists public.master_whatsapp_api_salvar(jsonb);

-- 2) set_app_config volta à lista de antes (sem wa_token e wa_app_secret)
create or replace function public.set_app_config(p_key text, p_value text)
 returns void language plpgsql security definer set search_path to 'public' as $function$
begin
if not public.is_master() then raise exception 'Apenas o master'; end if;
if p_key not in ('gemini_key', 'drive_url', 'asaas_key', 'asaas_ambiente', 'asaas_chave_pix') then raise exception 'Configuração desconhecida'; end if;
if coalesce(trim(p_value), '') = '' then delete from app_secrets where key = p_key;
else insert into app_secrets (key, value) values (p_key, trim(p_value)) on conflict (key) do update set value = excluded.value; end if;
if p_key = 'asaas_key' then delete from app_secrets where key = 'asaas_chave_pix'; end if;
end $function$;

-- 3) configuração e segredos da API
delete from public.app_settings where key = 'whatsapp_api';
delete from public.app_secrets where key in ('wa_verify', 'wa_token', 'wa_app_secret');

-- 4) colunas da fila usadas só pela API
drop index if exists public.whatsapp_queue_api_id;
alter table public.whatsapp_queue drop column if exists api_id;
alter table public.whatsapp_queue drop column if exists api_erro;
alter table public.whatsapp_queue drop column if exists api_tentativas;
