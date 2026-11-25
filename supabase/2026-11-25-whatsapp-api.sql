-- WHATSAPP OFICIAL (API da Meta) NO LUGAR DO ROBÔ (25/11/2026, pedido do dono). Já aplicado no Supabase.
-- Função motora-whatsapp (verify_jwt: false). Fica desligada até o dono ligar em Configurações.
-- Só manda para os motoristas (o dono pediu: nada para ele nem para a Dara).

-- 1) fila: resultado do envio pela API
alter table public.whatsapp_queue add column if not exists api_id text;
alter table public.whatsapp_queue add column if not exists api_erro text;
alter table public.whatsapp_queue add column if not exists api_tentativas int not null default 0;
create index if not exists whatsapp_queue_api_id on public.whatsapp_queue (api_id) where api_id is not null;

-- 2) configuração (sem segredos) e palavra de verificação do aviso da Meta
insert into public.app_settings (key, value, updated_at)
values ('whatsapp_api', '{"ativo": false, "versao": "v21.0"}'::jsonb, now())
on conflict (key) do nothing;
insert into public.app_secrets (key, value)
values ('wa_verify', replace(gen_random_uuid()::text, '-', ''))
on conflict (key) do nothing;

-- 3) o dono salva o token e a chave secreta do app pelo mesmo caminho das outras chaves
create or replace function public.set_app_config(p_key text, p_value text)
 returns void language plpgsql security definer set search_path to 'public' as $function$
begin
if not public.is_master() then raise exception 'Apenas o master'; end if;
if p_key not in ('gemini_key', 'drive_url', 'asaas_key', 'asaas_ambiente', 'asaas_chave_pix', 'wa_token', 'wa_app_secret') then raise exception 'Configuração desconhecida'; end if;
if coalesce(trim(p_value), '') = '' then delete from app_secrets where key = p_key;
else insert into app_secrets (key, value) values (p_key, trim(p_value)) on conflict (key) do update set value = excluded.value; end if;
if p_key = 'asaas_key' then delete from app_secrets where key = 'asaas_chave_pix'; end if;
end $function$;

-- 4) o que a tela de Configurações mostra (nunca devolve o token)
create or replace function public.master_whatsapp_api_info()
 returns jsonb language plpgsql security definer set search_path to 'public' as $f$
begin
  if not is_master() then raise exception 'apenas o master'; end if;
  return jsonb_build_object(
    'config', coalesce((select value from app_settings where key = 'whatsapp_api'), '{}'::jsonb),
    'tem_token', exists (select 1 from app_secrets where key = 'wa_token'),
    'tem_app_secret', exists (select 1 from app_secrets where key = 'wa_app_secret'),
    'verify_token', (select value from app_secrets where key = 'wa_verify'),
    'webhook_url', 'https://epswrtcwszhbapaxdpzz.supabase.co/functions/v1/motora-whatsapp',
    'pendentes_erro', (select count(*) from whatsapp_queue where status = 'pendente' and api_erro is not null and created_at > now() - interval '1 day'));
end $f$;

-- 5) salvar IDs e ligar/desligar. Ligar exige token e ID do número e DESLIGA o robô (os dois nunca juntos).
create or replace function public.master_whatsapp_api_salvar(p jsonb)
 returns jsonb language plpgsql security definer set search_path to 'public' as $f$
declare c jsonb := coalesce((select value from app_settings where key = 'whatsapp_api'), '{}'::jsonb);
begin
  if not is_master() then raise exception 'apenas o master'; end if;
  if p ? 'waba_id' then c := c || jsonb_build_object('waba_id', nullif(regexp_replace(p->>'waba_id', '\D', '', 'g'), '')); end if;
  if p ? 'phone_id' then c := c || jsonb_build_object('phone_id', nullif(regexp_replace(p->>'phone_id', '\D', '', 'g'), '')); end if;
  if p ? 'app_id' then c := c || jsonb_build_object('app_id', nullif(regexp_replace(p->>'app_id', '\D', '', 'g'), '')); end if;
  if p ? 'ativo' then
    if (p->>'ativo')::boolean then
      if not exists (select 1 from app_secrets where key = 'wa_token') or coalesce(c->>'phone_id', '') = '' then
        raise exception 'Coloque o token e o ID do número antes de ligar.';
      end if;
      c := c || jsonb_build_object('ativo', true, 'ativado_em', now());
      update app_settings set value = coalesce(value, '{}'::jsonb) || '{"ativo": false}'::jsonb, updated_at = now() where key = 'whatsapp_robo';
    else
      c := c || jsonb_build_object('ativo', false);
    end if;
  end if;
  insert into app_settings (key, value, updated_at) values ('whatsapp_api', c, now())
  on conflict (key) do update set value = excluded.value, updated_at = now();
  return c;
end $f$;

revoke execute on function public.master_whatsapp_api_info() from public, anon;
revoke execute on function public.master_whatsapp_api_salvar(jsonb) from public, anon;
grant execute on function public.master_whatsapp_api_info() to authenticated;
grant execute on function public.master_whatsapp_api_salvar(jsonb) to authenticated;

-- 6) a cada minuto, só se a API estiver ligada e houver mensagem pendente
select cron.schedule('motora-whatsapp-api', '* * * * *', $$
select public.call_edge('motora-whatsapp', '{"acao":"enviar_fila"}'::jsonb)
 where exists (select 1 from public.app_settings where key = 'whatsapp_api' and coalesce((value->>'ativo')::boolean, false))
   and exists (select 1 from public.whatsapp_queue where status = 'pendente' and driver_id is not null and created_at > now() - interval '6 hours')
$$);
