-- Depois do botão de devolução, nenhuma mensagem sai para o motorista sem a aprovação do dono
alter table public.whatsapp_queue drop constraint whatsapp_queue_status_check;
alter table public.whatsapp_queue add constraint whatsapp_queue_status_check check (status = any (array['pendente','enviada','aprovar']));
create or replace function public.whatsapp_devolucao_aprovar() returns trigger
language plpgsql security definer set search_path to 'public' as $$
declare d profiles%rowtype;
begin
  select * into d from profiles where id = new.driver_id;
  if new.status = 'pendente' and d.pix_extra->'devolucao' is not null then
    new.status := 'aprovar';
    perform call_edge('motora-push', jsonb_build_object('type', 'master_alert', 'url', '/?abrir=ia&msg=' || new.id,
      'title', 'Aprovar mensagem para ' || split_part(d.name, ' ', 1),
      'body', 'Devolução: nada vai ao motorista sem sua aprovação. Toque para aprovar, editar ou excluir no app.' || E'\n\n' || left(coalesce(new.message, ''), 700)));
  end if;
  return new;
end $$;
revoke execute on function public.whatsapp_devolucao_aprovar() from public, anon, authenticated;
create trigger whatsapp_devolucao_aprovar before insert on public.whatsapp_queue for each row execute function public.whatsapp_devolucao_aprovar();
