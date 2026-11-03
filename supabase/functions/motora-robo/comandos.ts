// Regras sem banco (testadas em robo-whatsapp/test): comparar telefones e entender a resposta do dono.
// (62) 99999-9999, 5562999999999 e 556299999999 viram a mesma chave: DDD + últimos 8 dígitos (o 9º dígito varia)
export function chaveFone(t: unknown): string | null {
  let n = String(t ?? "").replace(/\D/g, "").replace(/^0+/, "");
  if (n.length >= 12 && n.startsWith("55")) n = n.slice(2);
  if (n.length !== 10 && n.length !== 11) return null;
  return n.slice(0, 2) + n.slice(-8);
}
export type Comando = { confirmar: boolean; resto: string } | null;
// a mensagem precisa começar com a palavra: "vou confirmar depois" não vale
export function lerComando(texto: unknown): Comando {
  const t = String(texto ?? "").trim().replace(/\*/g, "");
  const m = t.match(/^(confirmar|recusar)(?=\s|$)\s*([\s\S]*)$/i);
  return m ? { confirmar: m[1].toLowerCase() === "confirmar", resto: m[2].trim().slice(0, 300) } : null;
}
const norm = (s: unknown) => String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
export type Aberto = { id: string; nome: string };
export type Escolha = { id: string; nome: string; motivo: string } | { resposta: string };
// Só decide quando não há dúvida de qual motorista é. Dinheiro: na dúvida, pergunta.
export function escolher(abertos: Aberto[], c: { confirmar: boolean; resto: string }): Escolha {
  const palavra = c.confirmar ? "CONFIRMAR" : "RECUSAR";
  if (!abertos.length) return { resposta: "Não há comprovante aguardando sua decisão." };
  const t = norm(c.resto);
  // aceita o nome inteiro ou só o começo dele ("Soyer", "Soyer Marshall")
  const nomeNoInicio = (a: Aberto) => {
    const palavras = norm(a.nome).split(/\s+/).filter(Boolean), dig = t.split(/\s+/).filter(Boolean);
    let n = 0;
    while (n < palavras.length && n < dig.length && palavras[n] === dig[n]) n++;
    return n;
  };
  const pontos = abertos.map((a) => ({ a, n: nomeNoInicio(a) }));
  const maior = Math.max(0, ...pontos.map((x) => x.n));
  const achados = maior > 0 ? pontos.filter((x) => x.n === maior) : []; // quem bate mais palavras do nome
  const lista = () => [...new Set(abertos.map((a) => a.nome.split(/\s+/)[0]))].map((n) => `${palavra} ${n}`).join("\nou\n");
  if (achados.length) {
    const nomes = new Set(achados.map((x) => norm(x.a.nome)));
    if (nomes.size > 1) return { resposta: `Mais de um motorista com esse nome. Use o nome completo:\n${[...new Set(achados.map((x) => `${palavra} ${x.a.nome}`))].join("\nou\n")}` };
    if (achados.length > 1) return { resposta: `${achados[0].a.nome} tem ${achados.length} comprovantes abertos. Decida pelo app.` };
    const { a, n } = achados[0];
    return { id: a.id, nome: a.nome, motivo: String(c.resto).split(/\s+/).slice(n).join(" ") };
  }
  if (abertos.length > 1) return { resposta: `Há ${abertos.length} comprovantes abertos. Diga qual:\n${lista()}` };
  // um só aberto: CONFIRMAR sozinho vale; com outro texto pode ser engano de nome, então pergunta
  if (c.confirmar && t) return { resposta: `O comprovante aberto é de ${abertos[0].nome}. Para confirmar, responda só: CONFIRMAR` };
  return { id: abertos[0].id, nome: abertos[0].nome, motivo: c.resto };
}
export function extensao(mime: unknown): string | null {
  const m = String(mime ?? "").toLowerCase().split(";")[0].trim();
  if (m === "application/pdf") return "pdf";
  if (m === "image/jpeg" || m === "image/jpg") return "jpg";
  if (m === "image/png") return "png";
  if (m === "image/webp") return "webp";
  return null;
}

// ---------- atendimento de número desconhecido ----------
export function foneBonito(t: unknown): string {
  let n = String(t ?? "").replace(/\D/g, "");
  if (n.length >= 12 && n.startsWith("55")) n = n.slice(2);
  if (n.length === 11) return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
  if (n.length === 10) return `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`;
  return n;
}
export function primeiroNome(nome: unknown): string {
  return String(nome ?? "").replace(/[*_~`\n\r]/g, " ").trim().split(/\s+/)[0].slice(0, 30);
}
export function saudacao(nome: unknown, agora = new Date()): string {
  const h = Number(agora.toLocaleString("en-GB", { hour: "2-digit", hourCycle: "h23", timeZone: "America/Sao_Paulo" }));
  const oi = h < 12 ? "Bom dia" : h < 18 ? "Boa tarde" : "Boa noite";
  const n = primeiroNome(nome);
  return `${oi}${n ? ", " + n : ""}! Sou a assistente virtual da Motora Locadora. Vou chamar o Thiago ou a Dara para atender você.`;
}
export function textoDara(fone: unknown): string {
  return `Dara, aqui é a assistente virtual do Thiago. Ele deve estar ocupado em corrida e não viu a mensagem. Tem um número perguntando sobre aluguel de carro: ${foneBonito(fone)}. O que ele me perguntar vou encaminhar direto para você e sua resposta vou enviar para ele e intermediar a conversa do seu número.`;
}
export function textoDaraMotorista(nome: unknown, fone: unknown, mensagens: string[], minutos: number): string {
  const msg = mensagens.length ? `e mandou esta mensagem:\n\n${mensagens.join("\n")}` : "e mandou o arquivo que segue abaixo.";
  return `Dara, aqui é a assistente virtual do Thiago. O motorista ${String(nome ?? "")} ${foneBonito(fone)} está tentando falar com o Thiago ${msg}\n\nO Thiago não respondeu há ${minutos} minutos. Você pode responder?\n\nComo funciona: o que você escrever aqui eu envio para ele pelo número da locadora, e o que ele mandar eu trago para você. Se houver mais de uma conversa aberta, toque em Responder na mensagem da pessoa. Para encerrar, responda ENCERRAR.`;
}
export type Conversa = { id: string; chave: string; nome: string | null; telefone: string };
// para quem vai a resposta da Dara: pela mensagem citada; sem citar, só se houver uma conversa aberta
export function escolherConversa(abertas: Conversa[], citado: unknown): { conversa: Conversa } | { resposta: string } {
  const m = String(citado ?? "").match(/\(\d{2}\) \d{4,5}-\d{4}/);
  if (m) {
    const k = chaveFone(m[0]), c = abertas.find((a) => a.chave === k);
    return c ? { conversa: c } : { resposta: `A conversa com ${m[0]} não está mais aberta.` };
  }
  if (abertas.length === 1) return { conversa: abertas[0] };
  return { resposta: `Há ${abertas.length} conversas abertas: ${abertas.map((a) => foneBonito(a.telefone)).join(", ")}. Segure a mensagem da pessoa, toque em Responder e escreva.` };
}
