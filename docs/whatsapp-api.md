# WhatsApp oficial (API da Meta) no MOTORA

O app já está pronto para mandar as mensagens dos **motoristas** pelo WhatsApp oficial, sem robô e sem computador ligado.
Fica **desligado** até você ligar em **Configurações → WhatsApp oficial (API da Meta)**.

O que sai pela API (só para motoristas, nunca para você nem para a Dara):

| Mensagem do app | Modelo na Meta | Vai junto |
|---|---|---|
| Novo Pix disponível, Seu Pix vence hoje, Pagamento em atraso, Pix atualizado com multa e juros | `motora_pix_qr` (ou `motora_pix` sem QR) | QR Code em imagem, itens, total, vencimento e o Pix copia e cola |
| Recibo de pagamento / Pagamento confirmado | `motora_recibo` | Recibo em PDF |
| Todo o resto (boas-vindas, contrato, dia do pagamento, comprovante...) | `motora_aviso` | Título e o aviso |

Telefone 1, telefone 2 e 2º motorista recebem a mesma mensagem. Custo: cerca de R$ 0,035 por mensagem (tabela da Meta de 01/10/2026).

## Passo a passo (uma vez só)

**Nunca mande token, senha ou chave secreta em conversa.** Cole só dentro do app, em Configurações.

1. **Conta comercial:** https://business.facebook.com/ (feito).
2. **App da Meta:** https://developers.facebook.com/ → Meus apps → Criar app → tipo **Empresa**, nome **MOTORA**, ligado ao seu portfólio → adicionar o produto **WhatsApp**.
3. **Ligar o número que já está no WhatsApp Business do celular:** em WhatsApp → Configuração da API (ou no Gerenciador do WhatsApp), escolha **adicionar número** e a opção de usar **junto com o aplicativo WhatsApp Business** (coexistência). A confirmação é feita no próprio WhatsApp Business do celular (QR code). Se pedir código por SMS, é preciso o chip (segunda via).
4. **Forma de pagamento:** no Gerenciador do WhatsApp (business.facebook.com → WhatsApp → Configurações de pagamento), cadastre um cartão. Sem isso a Meta não deixa mandar as mensagens do app.
5. **Pegar os 3 números (IDs)** e colar no app:
   - **ID da conta do WhatsApp (WABA)** e **ID do número de telefone**: na página WhatsApp → Configuração da API do app MOTORA.
   - **ID do app**: no topo do painel do app (ou Configurações do app → Básico).
6. **Chave secreta do app:** Configurações do app → Básico → "Chave secreta do app" → Mostrar → colar no app (campo "Chave secreta do app").
7. **Token permanente:** business.facebook.com → Configurações do negócio → Usuários → **Usuários do sistema** → Adicionar (função Administrador) → **Atribuir ativos**: o app MOTORA e a conta do WhatsApp, com controle total → **Gerar token**: app MOTORA, validade **Nunca**, permissões `whatsapp_business_messaging` e `whatsapp_business_management` → copiar e colar no app (campo "Token permanente").
8. **No app:** Configurações → WhatsApp oficial → **Salvar dados**.
9. **Aviso de entrega (Webhook):** no app da Meta, WhatsApp → Configuração → Webhook → Editar: cole o **Endereço** e o **Token de verificação** que aparecem na tela do MOTORA → Verificar e salvar → em "Campos", assine **messages**.
10. **No app:** toque em **Criar modelos na Meta**. A Meta analisa (minutos a 1 dia). Toque em **Ver situação** até os 4 aparecerem "aprovado".
11. **Enviar teste para mim:** chega no seu WhatsApp pessoal (número de `dono_whatsapp`).
12. **Ligar envio.** O robô do computador é desligado sozinho. Pode fechar a janela "Robo do MOTORA" e tirar do início do Windows.

## Como funciona por dentro (para o Claude)

- Função `supabase/functions/motora-whatsapp/index.ts` (`verify_jwt: false`); SQL `supabase/2026-11-25-whatsapp-api.sql` (já aplicado).
- Cron `motora-whatsapp-api` (1 min) só chama a função com a API ligada e mensagem pendente. Manda as linhas `pendente` de `whatsapp_queue` com `driver_id`, criadas depois de ligar e com até 6 h (`api_id`, `api_erro`, `api_tentativas`; 3 erros = aviso ao dono e a mensagem fica na Área IA).
- Dados do Pix vêm da ficha na hora do envio (`pix_amount`, `pix_description`, `pix_due_at`, `pix_code`/`pix_link`, `pix_qr_path` com link assinado de 1 h). Recibo: `arquivo_path` (PDF).
- `motora-push` trata a API ligada como "envio automático funcionando" (`roboFuncionando`): o dono não recebe "WhatsApp para X pronto".
- Webhook: GET confere `wa_verify`; POST só com assinatura `x-hub-signature-256` válida (`wa_app_secret`); falha de entrega vai para `whatsapp_queue.api_erro`.
- Respostas dos motoristas chegam no WhatsApp Business do celular (coexistência); o app não lê nem responde.
