// Regras sem banco (testadas em robo-whatsapp/test): comparar telefones e entender a resposta do dono.
// (62) 99999-9999, 5562999999999 e 556299999999 viram a mesma chave: DDD + últimos 8 dígitos (o 9º dígito varia)
export function chaveFone(t: unknown): string | null {
  let n = String(t ?? "").replace(/\D/g, "").replace(/^0+/, "");
  if (n.length >= 12 && n.startsWith("55")) n = n.slice(2);
  if (n.length !== 10 && n.length !== 11) return null;
  return n.slice(0, 2) + n.slice(-8);
}
export type Comando = { confirmar: boolean; codigo: string; motivo: string } | "ajuda" | null;
// só aceita a palavra + código de 4 dígitos: dinheiro não pode depender de "ok" solto na conversa
export function lerComando(texto: unknown): Comando {
  const t = String(texto ?? "").trim().replace(/\*/g, "");
  const m = t.match(/^(confirmar|recusar)\s+(\d{4})\b\s*([\s\S]*)$/i);
  if (m) return { confirmar: m[1].toLowerCase() === "confirmar", codigo: m[2], motivo: m[3].trim().slice(0, 300) };
  if (/^(confirmar|recusar)\b/i.test(t)) return "ajuda";
  return null;
}
export function extensao(mime: unknown): string | null {
  const m = String(mime ?? "").toLowerCase().split(";")[0].trim();
  if (m === "application/pdf") return "pdf";
  if (m === "image/jpeg" || m === "image/jpg") return "jpg";
  if (m === "image/png") return "png";
  if (m === "image/webp") return "webp";
  return null;
}
