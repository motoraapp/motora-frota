-- Palavra secreta e chave do GitHub da IA do dono: só o master grava; ninguém lê pelo app. A palavra fica só como resumo (hash).
create or replace function public.master_ia_codigo(p_palavra text, p_token text) returns void
language plpgsql security definer set search_path to 'public', 'extensions' as $$
declare sal text := encode(gen_random_bytes(16), 'hex');
begin
  if not exists (select 1 from profiles where id = auth.uid() and role = 'master') then raise exception 'apenas o master'; end if;
  if length(coalesce(p_palavra, '')) > 0 then
    if length(p_palavra) < 6 or p_palavra ~ '\s' then raise exception 'A palavra precisa de 6 letras ou mais, sem espaço'; end if;
    insert into app_secrets(key, value) values ('dono_palavra_sal', sal), ('dono_palavra_hash', encode(digest(sal || p_palavra, 'sha256'), 'hex')), ('dono_palavra_erros', '{}')
      on conflict (key) do update set value = excluded.value;
  end if;
  if length(coalesce(p_token, '')) > 0 then
    insert into app_secrets(key, value) values ('github_token_ia', trim(p_token)) on conflict (key) do update set value = excluded.value;
  end if;
end $$;
revoke execute on function public.master_ia_codigo(text, text) from public, anon;
grant execute on function public.master_ia_codigo(text, text) to authenticated;
