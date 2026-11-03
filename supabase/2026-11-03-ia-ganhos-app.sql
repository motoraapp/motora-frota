-- A IA do WhatsApp (motora-dono) grava ganhos e despesas de aplicativo depois do SIM do dono
grant insert on table public.app_earnings to service_role;
grant insert on table public.app_expenses to service_role;
