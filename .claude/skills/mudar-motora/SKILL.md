---
name: mudar-motora
description: Use sempre que o dono pedir para mudar, corrigir ou criar algo no app MOTORA (index.html), no robô do WhatsApp ou nas funções do Supabase. Mostra como achar o código pelo índice sem ler arquivos inteiros, economizando tokens.
---

# Mudar o MOTORA gastando pouco

1. **Assunto → lugar:** abra `GUIA-CODIGO.md` (curto) e ache o assunto. Ele diz o arquivo e os nomes das funções/telas.
2. **Nome → linha:** `Grep` o nome no `MAPA-LINHAS.md` ou no próprio arquivo (`output_mode: content`, `-n`). Nunca leia o `MAPA-LINHAS.md` nem o `index.html` inteiros.
3. **Ler só o trecho:** `Read` com `offset` e `limit` (40 a 120 linhas em volta da linha achada). No `index.html` as linhas podem ser enormes: se o Grep mostrar uma linha gigante, use `-o` com um padrão curto (`.{0,80}nome.{0,80}`).
4. **Regra de negócio:** se precisar saber como algo deve funcionar, `Grep` a palavra no `CLAUDE.md` em vez de reler tudo (ele já vem carregado no começo da conversa).
5. **Mudar:** `Edit` pequeno e pontual. Não reformatar nem reordenar.
6. **Depois:**
   - `node ferramentas/mapa.mjs` (atualiza as linhas do mapa);
   - assunto novo → uma linha no `GUIA-CODIGO.md` e a regra no `CLAUDE.md`;
   - novidade no app → exemplo no `demoBuild` (regra do dono);
   - testar no modo demonstração (`?demo=dono` / `?demo=motorista`) antes de publicar.
7. **Buscas grandes** (muitos arquivos, sem saber o nome): use o agente `localizador` (modelo barato), que devolve só `arquivo:linha`.

Explique tudo ao dono em português simples, sem termos técnicos.
