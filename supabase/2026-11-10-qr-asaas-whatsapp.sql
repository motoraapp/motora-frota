-- Mensagem de Pix de motorista no Asaas leva a imagem do QR code criada pelo Asaas (10/11/2026). Já aplicado no banco.
create or replace function public.whatsapp_anexa_qr_asaas() returns trigger
language plpgsql security definer set search_path = public as $$
declare v_qr text;
begin
  if new.arquivo_path is null and new.title ~* 'pix' and new.title !~* 'recibo|confirmado' then
    select pix_qr_path into v_qr from profiles where id = new.driver_id and asaas_auto_charge_enabled;
    new.arquivo_path := v_qr;
  end if;
  return new;
end $$;
revoke execute on function public.whatsapp_anexa_qr_asaas() from public, anon, authenticated;
drop trigger if exists trg_whatsapp_anexa_qr_asaas on public.whatsapp_queue;
create trigger trg_whatsapp_anexa_qr_asaas before insert on public.whatsapp_queue
  for each row execute function public.whatsapp_anexa_qr_asaas();
