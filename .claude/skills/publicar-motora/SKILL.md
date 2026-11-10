---
name: publicar-motora
description: Use sempre que for publicar qualquer mudança do MOTORA (site, banco, funções do Supabase ou robô do PC), mesmo que o dono diga só "coloca no ar" ou "manda pro app". Diz o caminho mais curto de cada tipo, para não reenviar arquivos grandes à toa.
---

# Publicar o MOTORA gastando pouco

Antes de publicar, confirme com o dono, a não ser que ele já tenha pedido nesta conversa.

Reenviar uma função custa caro: o arquivo inteiro passa pela conversa. Por isso, prefira nesta ordem:

1. **Regra no banco** (`apply_migration`, projeto `epswrtcwszhbapaxdpzz`): um gatilho ou função SQL costuma resolver sem tocar em nenhuma função. Salve o SQL em `supabase/AAAA-MM-DD-assunto.sql`.
2. **Site** (`index.html`, `sw.js`): suba o número de `CACHE` no `sw.js`, rode `node ferramentas/mapa.mjs` e faça `git push` para a `main`. É barato.
3. **Robô do PC**: copie `robo-whatsapp/nucleo.js` para `Desktop/Thiago/MOTORA/Robo-MOTORA` (guarde o antigo como `nucleo.js.antes-AAAA-MM-DD`) e grave um valor novo em `app_settings` `whatsapp_robo.reiniciar_em`. Ele religa em cerca de 30 s.
4. **Função do Supabase** (`deploy_edge_function`, `verify_jwt: false`, todos os arquivos da pasta): só quando não houver outro jeito. Uma por vez.

Antes de publicar por cima de uma função, compare com o GitHub: o resultado de `get_edge_function` grande vai para um arquivo, e um script em Node compara sem passar pela conversa.

Testes: use o agente `testador`. O BB está pausado: não mexa em `motora-bb` nem em `Robo-BB`.
