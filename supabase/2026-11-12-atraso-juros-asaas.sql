-- MOTORA — 12/11/2026: Juros e multa por inadimplência alinhados ao Asaas (10% multa + 2% ao mês pro rata die, QR estático sem tarifa)

-- 1) Configuração padrão em app_settings (editável pelo dono em Configurações)
insert into public.app_settings (key, value)
values (
  'atraso_config',
  jsonb_build_object(
    'ativo', true,
    'multa_pct', 10,
    'juros_mes_pct', 2,
    'vigencia_desde', '2026-11-12'
  )
)
on conflict (key) do nothing;

-- 2) Permite ao motorista ler atraso_config para exibir o cálculo atualizado no app
drop policy if exists todos_leem_config on public.app_settings;
create policy todos_leem_config on public.app_settings
  for select to authenticated
  using (key = any (array['design'::text, 'driver_features'::text, 'atraso_config'::text]));
