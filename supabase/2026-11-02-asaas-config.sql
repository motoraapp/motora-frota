-- MOTORA — 02/11/2026 (APLICADO em 02/11/2026)
-- Campos do Asaas no Financeiro: o dono salva a chave da API e o tipo de conta; vê o endereço e o token do webhook.
create or replace function public.set_app_config(p_key text, p_value text)
 returns void language plpgsql security definer set search_path to 'public' as $function$
begin
if not public.is_master() then raise exception 'Apenas o master'; end if;
if p_key not in ('gemini_key', 'drive_url', 'asaas_key', 'asaas_ambiente') then raise exception 'Configuração desconhecida'; end if;
if coalesce(trim(p_value), '') = '' then delete from app_secrets where key = p_key;
else insert into app_secrets (key, value) values (p_key, trim(p_value)) on conflict (key) do update set value = excluded.value; end if;
if p_key = 'asaas_key' then delete from app_secrets where key = 'asaas_chave_pix'; end if; -- conta nova: pega a chave Pix de novo
end $function$;

create or replace function public.master_asaas_info()
 returns jsonb language plpgsql security definer set search_path to 'public' as $function$
begin
if not public.is_master() then raise exception 'Apenas o master'; end if;
return jsonb_build_object(
  'chave', exists(select 1 from app_secrets where key = 'asaas_key'),
  'ambiente', (select value from app_secrets where key = 'asaas_ambiente'),
  'webhook_url', 'https://epswrtcwszhbapaxdpzz.supabase.co/functions/v1/motora-asaas',
  'webhook_token', (select value from app_secrets where key = 'asaas_webhook_token'),
  'chave_pix', (select value from app_secrets where key = 'asaas_chave_pix'));
end $function$;
revoke all on function public.master_asaas_info() from public, anon;
grant execute on function public.master_asaas_info() to authenticated;
