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
- **Motorista:** faz login e vê CRLV-e, contrato, próximo pagamento (QR code, link e botão de copiar) e envia comprovante.

## Regras de negócio
- Login: usuário = primeiro nome + sobrenome juntos, em minúsculas (ex.: Thiago Gomes Borges → `thiagogomes`); senha = 6 primeiros dígitos do CPF. Campo de usuário com teclado em minúsculas. Caixinha para salvar a senha.
- Login errado mostra uma mensagem de erro; não mostrar mensagem quando o login está certo.
- Cadastro de motorista: ao enviar CNH, comprovante de endereço e CRLV, o app preenche o cadastro sozinho. A cada motorista novo, o dono recebe e-mail com usuário e senha.
- Sempre que uma CNH nova for enviada, a foto do perfil do motorista também é atualizada.
- CNH vencida: aviso na tela principal do dono e do motorista e botão para enviar a CNH nova; quando o motorista atualizar, o dono é avisado e o botão some.
- Botão "Instalar app" no PWA do motorista: aparece só no Android (some no iPhone).
- Termos de uso: o motorista precisa aceitar se ainda não aceitou ou sempre que os termos mudarem.

## Cobrança Pix (semanal)
- O dono cobra por Pix e confere o pagamento olhando o banco.
- Ele gera a cobrança como link de pagamento do Banco do Brasil; ao colar o link, o app pega o Pix copia e cola e gera o QR code.
- A cada novo Pix, o motorista recebe notificação com a nova data de pagamento e o aviso de enviar o comprovante pelo app.
- Todo domingo o dono recebe lembrete para enviar as novas cobranças.
- Prazo do comprovante: segunda-feira 23:59. Quem não enviar vira "Em atraso"; se enviar depois, volta sozinho para "Em dia".

## Financeiro (master)
- Separar "Aluguéis" e "Ganhos aplicativo" (corridas Uber/99/inDrive). Despesas em aba separada.
- Documentos e planilhas vão para o Google Drive da conta do dono (não da esposa).

## Pendências
- Trocar o endereço usado pelo APK para o GitHub Pages (hoje aponta para o Netlify em `android/app/src/main/res/values/strings.xml`). O dono deixou para depois — só fazer quando ele pedir.
- O dono está testando sozinho antes de liberar para os motoristas.
- Integrar com o rastreador Tracker (Ikonn) para bloquear automaticamente o carro do motorista inadimplente.
- Motora 2.0 (monitoramento antifraude): em espera. Só começar com autorização do dono.
- Confirmar se estão funcionando: aviso de CNH vencida, termos de uso, e-mail com usuário e senha, link do Banco do Brasil gerando o QR e Google Drive.

## Cuidados
- Nunca colocar senhas, chaves secretas ou dados pessoais de motoristas neste repositório.
- Antes de alterações grandes, explicar ao dono o que vai mudar e pedir confirmação.
