# MOTORA — instruções para o Claude

## Sobre o dono
- O dono tem um negócio de aluguel de carros e também é motorista de aplicativo (Uber/99).
- Ele é leigo em tecnologia: explique tudo em português simples, sem termos técnicos, passo a passo.
- Não gravar vídeos demonstrativos; mostrar por imagem ou texto, a menos que ele peça vídeo.

## O que é o app
MOTORA é um PWA (página que funciona como app) para gestão de veículos e motoristas de aluguel.
- `index.html` — o app inteiro (telas, lógica). Banco de dados e login no **Supabase**.
- `manifest.json`, `sw.js`, ícones — instalação como app na tela de início.
- `android/` — projeto do APK Android (função motorista). O workflow `build-apk.yml` gera o `motora.apk` quando algo em `android/` muda.
- `apk-version.json` — número da versão do APK; o app mostra o aviso "Nova versão do app" quando ele aumenta. Atualize o APK sempre que o PWA mudar.

## Onde está publicado
- **Netlify:** https://motora-frota.netlify.app (oficial; publica a partir deste repositório). Não mexer nas configurações do Netlify. O projeto antigo `delightful-fudge-34d804` deve ser ignorado.
- **GitHub Pages:** publicado pelo workflow `pages.yml` a cada push na `main` (copia só os arquivos do app).
- Manter o nome do repositório como `motora-frota`.

## Perfis de uso
- **Usuário master (dono):** adiciona e exclui veículos e motoristas, anexa documentos, envia cobranças Pix, vê o financeiro.
- O master pode **entrar na conta real** de um motorista (botão "Entrar na conta", sem a senha dele) pela função `motora-login-as` do Supabase; o botão "Voltar ao master" (ou Sair) devolve a sessão do master. Dentro da conta do motorista não aparecem termos nem pedido de notificações.
- **Motorista:** faz login e vê CRLV-e, contrato, próximo pagamento (QR code, link e botão de copiar) e envia comprovante.

## Design e demonstração
- **Design novo / antigo:** em Configurações → "Aparência do app" o dono escolhe o visual do painel dele e o dos motoristas (vale para todos). Fica em `app_settings` chave `design` = `{master, motorista}` ('novo'|'antigo'); padrão sem registro: master novo, motorista antigo. Design novo = tema neutro `tn` (claro: cinza/branco com azul-petróleo #0f5f6b) ou `tnd` (escuro, grafite, segue o celular), cartões arredondados, janelas que sobem de baixo e barra de navegação embaixo (dono: Veículos, Motoristas, Pix, Financeiro, Ajustes; motorista: as abas CRLV-e, Contrato, Pagamento, Vistoria). Os temas de cor antigos (t1–t6) só valem no design antigo.
- **Tela principal do dono:** no topo, resumo com 4 quadrinhos que são atalhos (Veículos, Motoristas, Em atraso, WhatsApp a enviar). Em cada aba, a lista vem primeiro e o formulário de cadastro embaixo; os cartões abrem e fecham tocando no título (cadastro começa fechado; o aparelho lembra a escolha em `localStorage` `motora_dobras`).
- **Botões que abrem e fecham:** Pix, IA, Financeiro e Ajustes (barra de baixo e atalhos do design antigo) usam `toggleArea()`: 1 toque abre, outro toque fecha, e abrir uma área fecha a outra. No design novo as janelas param acima da barra de baixo para ela continuar tocável.
- **Nada arrastado para o lado (dono e motorista):** no celular nenhuma função ou botão pode exigir arrastar para o lado. As tabelas dentro de `.overflow-x-auto` viram cartões (CSS em `@media (max-width: 639px)`; `rotularTabelas()` põe o nome da coluna em `data-label`). Telas novas devem seguir essa regra.
- **Modo demonstração:** login `teste`/`teste` = dono com ~4 meses de dados fictícios; `motorista`/`motorista` = motorista fictício (Marcos Lima). Tudo fica só na memória do aparelho (sessionStorage `motora_demo_v1`): um cliente falso no lugar do Supabase (`demoClient`), sem contas reais, sem banco, sem IA, sem notificações. Faixa "MODO DEMONSTRAÇÃO" no topo; Sair encerra a demonstração. Não criar contas reais `teste`/`motorista` no Supabase.

## Regras de negócio
- Login: usuário = primeiro nome + sobrenome juntos, em minúsculas (ex.: Thiago Gomes Borges → `thiagogomes`); senha = 6 primeiros dígitos do CPF. Campo de usuário com teclado em minúsculas. Caixinha para salvar a senha.
- Login errado mostra uma mensagem de erro; não mostrar mensagem quando o login está certo.
- Cadastro de motorista: ao enviar CNH, comprovante de endereço e CRLV, o app preenche o cadastro sozinho. A cada motorista novo, o dono recebe e-mail com usuário e senha.
- Sempre que uma CNH nova for enviada, a foto do perfil do motorista também é atualizada.
- CNH vencida: aviso na tela principal do dono e do motorista e botão para enviar a CNH nova; quando o motorista atualizar, o dono é avisado e o botão some.
- Botão "Instalar app" no PWA do motorista: aparece só no Android (some no iPhone).
- **Excluir motorista** não apaga nada: `master_delete_driver` muda o perfil para `role = 'excluido'` (com `deleted_at` e `deleted_login`), bloqueia o login para sempre, libera o nome de usuário e o carro. Documentos, Pix, comprovantes, termos e arquivos ficam guardados no app e no Drive.
- Termos de uso: o motorista precisa aceitar se ainda não aceitou ou sempre que os termos mudarem.

## Cobrança Pix (semanal)
- O dono cobra por Pix e confere o pagamento olhando o banco.
- No "Novo Pix" o campo do link do Banco do Brasil foi trocado por **Chave Pix** + tipo (Aleatória, Celular, CPF, CNPJ, E-mail). A chave fica guardada na coluna `pix_link` no formato `chave:tipo|valor` (o banco não ganhou coluna nova). O motorista vê a chave e o tipo com botão Copiar; some quando o comprovante é aceito. Na janela do Pix há uma chave de liga e desliga "Pix com chave" (o app lembra a última escolha).
- **Valor do aluguel do carro:** cada veículo tem `rent_amount` (aba Veículos, coluna "Aluguel/semana", toque para editar; também no cadastro do carro). No Novo Pix ele entra sozinho em "Valores da cobrança".
- **Valores da cobrança (Novo Pix):** Aluguel do carro + **Acréscimo** (motivo + valor, ex.: Caução 1/10) − **Desconto** (motivo + valor, ex.: despesa paga pelo motorista) = Total. A descrição monta sozinha (pode ser editada). Botão "Confirmar e enviar Pix" mostra o resumo antes. "Repetir nas próximas cobranças" guarda o acréscimo em `profiles.pix_extra` e a parcela avança sozinha (1/10 → 2/10 … para depois de 10/10).
- **Caução (ficha do motorista):** valor total + pagamento ("Sem caução", "Já paga (completa)" ou "Parcelada": vezes, valor de cada — calculado sozinho — e parcelas já cobradas). Fica em `profiles.pix_extra.caucao` = `{forma, total, parcelas, valor_parcela, cobradas}`. No Novo Pix a próxima parcela ("Caução 3/10") entra **marcada** e soma no total; o dono pode desmarcar naquela semana. Ao enviar com ela marcada, `cobradas` sobe 1. Ao salvar o Pix o `pix_extra` é mesclado (não apaga a caução).
- **Caução — entrada e quanto já pagou:** parcelada tem "Entrada já paga" (`caucao.entrada`; a parcela sugerida é (total − entrada) ÷ vezes). Pago = entrada + parcelas cobradas cujo Pix já foi pago (`cauStatus`). Aparece no card do motorista ("Caução: R$ X pagos de R$ Y") e na aba Pagamento do motorista ("Sua caução", com barra).
- **Multas e outras despesas (por motorista):** na ficha, com botão de liga/desliga (`pix_extra.multas = {ativo, itens:[{id, desc, valor, data, cobrada, paga}]}`; salva na hora). Só aparece (para o dono e para o motorista) se estiver ligado. Pendentes entram **marcadas** no Novo Pix (dá para desmarcar); ao enviar ficam "cobrada" com a data; contam como pagas quando o Pix daquele dia é pago, ou o dono marca "paga" na ficha.
- **Abatimento automático:** `reallocate_driver_payments` distribui os comprovantes aceitos pelas cobranças (da mais antiga para a mais nova; a sobra quita a seguinte, mesmo criada depois), marca as quitadas como pagas e volta o motorista para "Em dia" se não sobrar nada vencido. Roda quando um comprovante é aceito/recusado, quando uma cobrança nova é criada e na checagem de atraso.
- A cada novo Pix, o motorista recebe notificação com a nova data de pagamento e o aviso de enviar o comprovante pelo app.
- Todo domingo o dono recebe lembrete para enviar as novas cobranças.
- No "Novo Pix" o dono escreve a descrição dos valores cobrados; o motorista vê o valor e a descrição na aba Pagamento.
- Quando o comprovante é aceito (IA conferiu ou o dono confirmou), a chave Pix e o QR somem sozinhos da tela do motorista.
- O master pode **editar** (chave, QR, link, valor, descrição; a data de pagamento continua a mesma e o motorista é avisado) ou **excluir** o Pix enviado (funções `master_edit_pix` e `master_delete_pix` do Supabase).
- **Área do Pix** (botão no painel master): escolhe o motorista numa lista e vê o Pix atual, com botões Enviar novo Pix, Editar e Excluir.
- **Recibo:** ao confirmar o Pix abre um recibo (itens da descrição, todos os pagamentos daquele Pix e total) com botão para enviar pelo WhatsApp do motorista, como texto ou imagem. Também há botão "Recibo" nos comprovantes confirmados e na Área do Pix.
- Um pagamento pode quitar mais de uma cobrança: o app distribui os pagamentos aceitos pelas cobranças da mais antiga para a mais nova (o que sobra quita a seguinte, mesmo enviada depois). O recibo lista todas as cobranças quitadas e mostra "QUITADO" quando não sobra nada; o motorista vê "Este Pix já está pago".
- O motorista só vê as formas de pagamento que o dono preencheu (QR, copia e cola, chave). Todas somem no prazo (segunda 23:59): aparece "Prazo de pagamento encerrado", e ele ainda pode enviar comprovante.
- Prazo do comprovante: segunda-feira 23:59. Quem não enviar vira "Em atraso"; se enviar depois, volta sozinho para "Em dia".

## Área IA (master) — WhatsApp sem robô
- Botão "Área IA" no painel master (e "IA" na barra de baixo do design novo), com número de mensagens para enviar.
- Todo aviso enviado ao motorista (Pix novo, problema no comprovante, CNH etc.) passa pela função `motora-push` (`new_pix` e `driver_alert`), que também cria uma mensagem de WhatsApp pronta na tabela `whatsapp_queue` (status `pendente`/`enviada`). A IA (Gemini) escreve o texto; se ela falhar ou mudar o valor ou a chave Pix, usa uma mensagem padrão.
- O master recebe notificação "WhatsApp para X pronto"; ao tocar, abre `?abrir=ia&msg=<id>` com a mensagem em destaque. O botão Enviar abre o WhatsApp (wa.me) na conversa do motorista com o texto pronto; o dono só aperta enviar. O texto pode ser editado antes. Há "Já enviei", "Enviar de novo" e excluir.
- Botão de liga e desliga da IA: `app_settings` chave `ia_whatsapp` = `{ativo: true|false}` (sem registro = ligada). Desligada, nenhuma mensagem nova é criada.
- Nada é enviado sozinho pelo WhatsApp: não usar robô nem API da Meta sem o dono pedir.

## E-mail, telefones e regras da IA
- Motorista tem **WhatsApp (telefone 1)** `phone`, **Telefone 2** `phone2` e **e-mail** `email` (cadastro novo e ficha). Botões de WhatsApp no cartão do motorista e na Área IA (Tel. 1 / Tel. 2).
- **E-mail:** recibo, mensagens da Área IA e relatório do Financeiro podem ir por e-mail. A IA escreve (`motora-sync` `email_draft`, o conteúdo original nunca muda), o dono confere na janela "Conferir e-mail antes de enviar" e só então envia (`send_email`, só master), pelo script do Google da conta thiagogb20@gmail.com.
- **Regras da IA:** na Área IA o dono adiciona e exclui regras (`app_settings` chave `ia_regras` = `{regras: [...]}`); a IA segue nas mensagens de WhatsApp e nos e-mails.
- **Excluir carro** não apaga nada: `vehicles.deleted_at`; some da lista, motoristas ficam sem carro; CRLV-e, vistoria, despesas e ganhos ficam guardados e aparecem no Financeiro como "(excluído)". `state.allVehicles`/`allVeh()` guardam todos os carros para o histórico.

## Financeiro (master)
- Separar "Aluguéis" e "Ganhos aplicativo" (corridas Uber/99/inDrive). Despesas em aba separada.
- Aba "Aluguéis": Recebido = soma dos pagamentos por Pix no período (valor dos comprovantes aceitos, com a mesma distribuição entre cobranças do recibo); Em aberto = o que falta das cobranças. Período inclui Hoje, Esta semana e "Escolher datas". Área **Filtros**: Aluguéis (motorista, veículo); Ganhos aplicativo (aplicativo, tipo de despesa, veículo).
- Aba "Ganhos aplicativo": lançar ganho (aplicativo, valor, veículo, data — padrão hoje; sem observação) e **Despesas** (tipo: Gasolina, Alimentação, Manutenção... ou "+ Adicionar outra despesa"; valor; data — padrão hoje), na tabela `app_expenses` (só o master). Mostra Ganhos, Despesas e quanto sobrou.
- Ganhos aplicativo: o dono pode enviar o print da tela de ganhos (Uber/99/inDrive) e a IA (`ai_read_files` kind `earning`) preenche aplicativo, valor total e data (o dia com ganho, ou o fim do período, nunca depois de hoje); viagens, horas online e período vão na descrição. Avisa se já existir ganho igual.
- Lembrete diário: das 20:30 às 00:00 (Brasília), de 30 em 30 min, o dono recebe notificação perguntando se já enviou o relatório de ganhos do app do dia. Para sozinho quando existe ganho lançado com a data do dia Também para no dia marcado com o botão "Hoje estou de folga" (tabela `app_days_off`). Tocar na notificação abre direto Controle financeiro → Ganhos aplicativo, no lançamento (`?abrir=ganhos`). O `sw.js` abre o endereço da notificação relativo à pasta do app (funciona no GitHub Pages). (função `app_earning_reminder`, cron `motora-lembrete-ganhos-app`).
- **Gerar relatório** (botão no Financeiro): relatório da aba aberta, com o período e os filtros escolhidos (resumo, por veículo, por motorista, pagamentos, despesas / ganhos). Botões Salvar PDF (imprimir), Compartilhar e E-mail.
- Despesas do veículo: ao escolher a nota/comprovante, a IA (Gemini, `motora-sync` com `ai_read_files` kind `expense`) preenche tipo (usa os tipos existentes ou sugere um novo, criado ao salvar), valor, data e descrição; avisa se a placa da nota for de outro carro.
- Documentos e planilhas vão para o Google Drive da conta do dono (não da esposa).
- **Envio automático ao Drive:** todo documento novo ou alterado vai sozinho (gatilhos do banco → `drive_notify` → `motora-sync`): CNH, comprovante de endereço, contrato, termo de vistoria, comprovantes, Pix, despesas (também quando alteradas), CRLV-e dos veículos (`vehicle_doc`), fotos da vistoria (`inspection`) e termos aceitos (`terms`, arquivo .html).

## Pendências
- Trocar o endereço usado pelo APK para o GitHub Pages (hoje aponta para o Netlify em `android/app/src/main/res/values/strings.xml`). O dono deixou para depois — só fazer quando ele pedir.
- O dono está testando sozinho antes de liberar para os motoristas.
- Integrar com o rastreador Tracker (Ikonn) para bloquear automaticamente o carro do motorista inadimplente.
- Motora 2.0 (monitoramento antifraude): em espera. Só começar com autorização do dono.
- Confirmar se estão funcionando: aviso de CNH vencida, termos de uso, e-mail com usuário e senha, link do Banco do Brasil gerando o QR e Google Drive.

## Cuidados
- Nunca colocar senhas, chaves secretas ou dados pessoais de motoristas neste repositório.
- Antes de alterações grandes, explicar ao dono o que vai mudar e pedir confirmação.
