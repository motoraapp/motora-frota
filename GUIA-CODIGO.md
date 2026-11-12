# Guia do código do MOTORA (índice por assunto)

**Para a IA, antes de qualquer mudança:**
1. Ache o assunto abaixo. Ele diz o **arquivo** e o **nome** das funções e telas.
2. Ache a **linha** com Grep no `MAPA-LINHAS.md` (ex.: `Grep "saveNewPix" MAPA-LINHAS.md`) ou direto no arquivo.
3. Leia **só aquele trecho** (Read com `offset`/`limit`, ~40 a 120 linhas). **Nunca leia o `index.html` inteiro** (7 mil linhas, linhas enormes).
4. Depois de mudar, rode `node ferramentas/mapa.mjs` para atualizar o mapa. Se criou um assunto novo, acrescente uma linha aqui.
5. As regras de negócio (o que cada coisa deve fazer) ficam no `CLAUDE.md`. Este guia diz **onde** fica cada coisa.
6. A skill `mudar-motora` (`.claude/skills/`) tem este passo a passo; o agente `localizador` (`.claude/agents/`, modelo barato) faz buscas grandes e devolve só arquivo:linha.

Funções do Supabase: o código fica em `supabase/functions/<nome>/`. Para publicar, use `deploy_edge_function` com **todos** os arquivos da pasta (index.ts + comandos.ts/gemini.ts quando houver), sempre com `verify_jwt: false`. O código publicado é igual ao do GitHub; confira a data antes de publicar por cima.

---

## App (tudo em `index.html`)

| Assunto | Onde (funções / telas `#id`) |
|---|---|
| Tela de login, senha, erro de login | `#secLogin`, `handleLogin`, `loginUserInput`, `loginErro`, `showLogin`; primeiro acesso `#modalFirstLogin`, `saveFirstLoginPreferences` |
| Trocar minha senha | seção "TROCAR MINHA SENHA", `#modalSenha` |
| Modo demonstração (dados fictícios) | `demoBuild` (dados), `demoClient` (banco falso), `demoDocBlob` (documentos desenhados), `abrirDemo`, `trocarDemo`, `demoBanner`, `#secDemoEscolha`, `demoAssistente` (IA falsa) |
| Carregar dados do banco | `reload` |
| Visual, temas e aparência | `design-premium.css` (variáveis no topo; seção 19 = regras da revisão de 12/11); `applyDesign`, `fillDesignCfg`, `saveDesign` |
| Janela de confirmação do app (no lugar de confirm/prompt) | `#uiDialogo`, `uiDialogo`, `uiConfirm`, `uiPrompt` |
| Cartões dos motoristas (lista do dono) | `#tblDriversList` em `renderMasterPanel`, `marcarSituacao`, `confirmReceipt`, `rejectReceipt`, `receiptMasterBox` |
| Painel do dono (abas, barra de baixo) | `#secMasterPanel`, `switchMasterTab`, `toggleArea` |
| Painel do motorista (abas CRLV-e, Contrato, Pagamento, Vistoria) | `#secDriverPanel`, `renderDriverPanel`, `switchDriverTab`, `renderDriverExtras`, `renderDriverProfileExtras` (caução/próxima semana) |
| Funções do motorista ligadas/desligadas | seção "FUNÇÕES DO MOTORISTA" |
| Ficha do motorista (dono) | `#modalDriverFile`, `openDriverFile`, `saveDriverFile`, `closeDriverFile` |
| Contratos de locação (PDF A4, wizard, assinatura e histórico) | `#subMasterContracts`, `#dfRentalContractsBox`, `#modalContractWizard`, `#modalContractDetail`, `openContractWizard`, `generateContractPdfBytes`, `buildDefaultClauses`, `openContractDetail`, `renderContractsTab`, `saveLocadorSettings`, `supabase/2026-11-12-modulo-contratos.sql` |
| Forma de cobrança / dia do pagamento / Pix automático do MOTORA | `cobOf`, `dfCobFill`, `dfCobRead`, `dfCobInfo`, `cobResumoHtml` (perto de "DIA DO PAGAMENTO e PAGAMENTO AUTOMÁTICO") |
| Caução | seções "CAUÇÃO DO MOTORISTA" e "CAUÇÃO: quanto já foi pago" (`cauOf`, `cauNext`, `cauStatus`, `dfCauFill`, `dfCauRead`) |
| Multas e despesas do motorista | seção "MULTAS E OUTRAS DESPESAS" (`multasOf`, `multasPendentes`, `dfMultFill`) |
| Ajustes da próxima cobrança | `ajustesOf`, `dfAjRender`, `previsaoProxima` |
| Devolução do veículo | seção "DEVOLUÇÃO DO VEÍCULO" (`devOf`, `devPrevisao`, `dfDevRender`, `dfDevAvisar`, `dfDevReceber`) |
| Novo Pix / Editar / Excluir Pix | `#modalNewPix`, `openNewPix`, `fillNewPixValues`, `newPixParts`, `calcNewPix`, `saveNewPix`, `openEditPix`, `deletePix`; datas: seção "PERÍODO E VENCIMENTO" |
| Pix copia e cola gerado no app (BR Code) | seção "PIX COPIA E COLA GERADO NO APARELHO" (`pixGerarCodigo`, `gerarPixAuto`, `pixRecebedorCarregar/Guardar`), `crc16`, `pixValid`, `renderPixQr`, `previewNewPixQr` |
| Chave Pix (tipos, formato) | seção "CHAVE PIX" (`parsePixKey`, `normalizePixKey`, `pixKeyLooksOk`) |
| Área do Pix | `#modalPixArea`, `renderPixArea` |
| Abatimento dos pagamentos | `allocatePix` |
| Recibo / Corrigir recibo / Meus recibos | seções "RECIBO DE PAGAMENTO", "CORRIGIR RECIBO", "MEUS RECIBOS"; `#modalRecibo`, `#modalCorrigirRecibo`, `#modalMeusRecibos`, `reciboTexto` |
| Cobrar atraso | seção "COBRAR ATRASO" (`atrasoDados`, `cobrarAtraso`) |
| Área IA (mensagens WhatsApp, robô, QR) | `#modalIA`, `openIA`, `renderIA`, `loadIA`, `toggleIA`, `loadRobo` |
| Perguntar à IA (assistente do dono) | seção "PERGUNTAR À IA" (`iaFerramenta`, `iaConfirmarCartao`) |
| Financeiro / relatório / despesas do carro | `#modalFinance`, `openFinance`, `renderFinance`, `switchFinTab`; `#modalReport`; seção "DESPESAS DO VEÍCULO", `#modalExpenses` |
| Ganhos e despesas de aplicativo | seções "GANHOS APLICATIVO" e "DESPESAS DO APLICATIVO" |
| Asaas (configuração) | seção "ASAAS (Financeiro)" |
| Configurações (Gemini, Drive) | seção "CONFIGURAÇÕES", `#modalSettings` |
| Veículos (editar carro, CRLV-e) | `abrirEditarVeiculo`, `#modalEditVeh` |
| CNH (vencida, nova, foto do perfil) | `verifyCnh`, `renderCnhBanner`, `sendNewCnh`, `applyPendingCnh`, `autoReadNewCnhs`; seções "FOTO DO MOTORISTA" e "FOTO DO PERFIL ACOMPANHA A CNH" |
| Leitura automática de documentos (IA) | seção "LEITURA AUTOMÁTICA DE DOCUMENTOS" |
| Cadastro de motorista novo (e-mail com senha) | seção "E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO", `handleAddDriver` |
| Entrar na conta do motorista | seção "MASTER ENTRA NA CONTA REAL DO MOTORISTA" |
| Notificações | seção "NOTIFICAÇÕES OBRIGATÓRIAS", `#modalNotif` |
| Botão Instalar app (APK) | seção "BOTÃO INSTALAR APP" |
| Termos de uso | `#modalTerms` |
| Celular: tabelas viram cartões | CSS `@media (max-width: 639px)`, `rotularTabelas` |
| PWA / cache | `sw.js`, `manifest.json` |

## Robô do WhatsApp (PC do dono)

Código: `robo-whatsapp/nucleo.js` (lógica) + `robo.js` (liga). No PC roda a cópia em `Desktop/Thiago/MOTORA/Robo-MOTORA` (copiar o `nucleo.js` e pedir o reinício: `app_settings.whatsapp_robo.reiniciar_em`). Testes: `robo-whatsapp/test/robo.test.js` (para rodar, a pasta precisa de `node_modules`: use um link para `Desktop/Thiago/MOTORA/Robo-MOTORA/node_modules`).

| Assunto | Onde |
|---|---|
| Conexão, QR, queda, pareamento pelo número | `nucleo.js`: `abrir`, `aoMudar`, `aoCair`, `reabrirQr`, `verificarPareamento`; sessão guardada: `restaurar`, `guardar` |
| Envio das mensagens da fila (1 por minuto) | `nucleo.js`: `ciclo`, `enviar`, `enviarCopias`, `marcarEnviada` |
| Mensagem recebida (comprovante, dono, desconhecido) | `nucleo.js`: `aoReceber`, `tratarRecebida`, `receberArquivo` |
| Conversa que já existia (não responde) | `nucleo.js`: `conversaAntiga`, `aoHistorico`; servidor: `motora-robo/index.ts` `acao "atendimento"` (status `antiga`) |
| Atendimento de desconhecido, Dara, IA do cliente | servidor `supabase/functions/motora-robo/index.ts` `acao "atendimento"`, `"atendimento_fila"`, `"locadora_respondeu"`; textos em `motora-robo/comandos.ts` (`saudacao`, `textoDara`, `promptCliente`...); no robô `entregarAtendimento`, `chamarDara` |
| Urgência da mensagem do motorista | `comandos.ts`: `nivelPorPalavras`, `promptNivel`, `MINUTOS_NIVEL`; `index.ts`: `nivelDaMensagem` |
| CONFIRMAR / RECUSAR comprovante | `motora-robo/index.ts` `acao "mensagem"`, `comandos.ts` `lerComando`, `escolher` |
| Pedidos do dono pela IA (SIM) e áudio | `supabase/functions/motora-dono/index.ts`; no robô `ouvirDono` |

## Funções do servidor (Supabase)

| Função | Para que serve / onde mexer |
|---|---|
| `motora-push` | notificações e mensagens de WhatsApp (`sendToDriver`, `textoNovoPix`, recibo PDF `gerarPdfRecibo`, `type` "new_pix", "driver_alert", "master_alert", "cobranca", "boas_vindas", "todos_*") |
| `motora-lembretes` | lembretes (dono 8h30, motorista 12h e 19h, atraso 9h) e **Pix automático do MOTORA** 10h (`pixAutomatico`, `codigoPix`) |
| `motora-asaas` | cobrança automática, confirmação pelo banco e Pix parcial/autorização (`cobrarMotorista`, `pagamentoRecebido`, `pixParcialMotorista`, `autorizarParcial`) |
| `motora-robo` | ponte com o robô do WhatsApp (ver acima) |
| `motora-bb` | pausada (conferência no extrato do BB; código fora do GitHub, ver CLAUDE.md) |
| `motora-dono` | IA do dono pelo WhatsApp (`propor_*`, `executar`) |
| `motora-assistente` | "Perguntar à IA" do app |
| `motora-codigo` | mudança de tela pela IA (ramo `teste-ia`) |
| `motora-backup` | backup diário |
| `motora-ler-veiculos` | lê cor/ano do CRLV-e |
| `motora-sync` | leitura de comprovante pela IA (**não está no GitHub**, só no Supabase) |
| `gemini.ts` (cópia em várias funções) | `tentarGemini`: troca de modelo até responder (regra fixa do dono) |

Horários (crons): ver `select jobname, schedule from cron.job` no Supabase (UTC = Brasília + 3h). SQL de cada mudança: `supabase/*.sql` (lista no fim do `MAPA-LINHAS.md`).
