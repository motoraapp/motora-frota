// Tenta os modelos do Gemini um por um até algum responder. A lista vem do próprio Google, porque muda com o tempo.
// Cópia igual em motora-push e motora-assistente; motora-sync tem a mesma regra em callGemini.
const CONHECIDOS = ["gemini-flash-latest", "gemini-flash-lite-latest", "gemini-2.5-flash", "gemini-2.5-flash-lite"];
const BASE = "https://generativelanguage.googleapis.com/v1beta/models";

export async function modelosGemini(key: string, configurado: string) {
  let doGoogle: string[] = [];
  try {
    const r = await fetch(`${BASE}?pageSize=200`, { headers: { "x-goog-api-key": key }, signal: AbortSignal.timeout(8000) });
    if (r.ok) {
      const j = await r.json();
      doGoogle = (j?.models ?? [])
        .filter((m: { supportedGenerationMethods?: string[] }) => m.supportedGenerationMethods?.includes("generateContent"))
        .map((m: { name: string }) => m.name.replace(/^models\//, ""))
        .filter((n: string) => /^gemini/.test(n) && !/image|tts|audio|live|embedding|robotics|computer|learn|guard/i.test(n));
    }
  } catch { /* sem a lista, usa só os conhecidos */ }
  const flash = doGoogle.filter((n) => /flash/.test(n)), outros = doGoogle.filter((n) => !/flash/.test(n));
  return [...new Set([configurado, ...CONHECIDOS, ...flash, ...outros])].filter(Boolean);
}

// REGRA DO DONO: sempre que a IA for usada, troca de modelo até ter resposta boa. Terminou a lista sem resposta: recomeça, enquanto houver tempo.
// aceita(resposta) decide se a resposta serve; se não servir, tenta o próximo modelo
export async function tentarGemini<T>(key: string, configurado: string, corpo: string, aceita: (j: unknown) => T | null, limiteMs = 60000, porTentativaMs = 15000): Promise<{ valor: T; modelo: string } | null> {
  const inicio = Date.now();
  let modelos = await modelosGemini(key, configurado);
  while (modelos.length) {
    for (const modelo of [...modelos]) {
      const resta = limiteMs - (Date.now() - inicio);
      if (resta < 2000) return null;
      try {
        const r = await fetch(`${BASE}/${modelo}:generateContent`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": key },
          body: corpo,
          signal: AbortSignal.timeout(Math.min(porTentativaMs, resta)),
        });
        if (r.status === 401) return null; // chave errada: outro modelo não resolve
        if (r.status === 404) { modelos = modelos.filter((m) => m !== modelo); continue; } // modelo não existe mais
        if (!r.ok) { console.log("gemini falhou", modelo, r.status); continue; }
        const valor = aceita(await r.json());
        if (valor !== null) return { valor, modelo };
      } catch (e) { console.log("gemini sem resposta", modelo, String(e).slice(0, 120)); }
    }
    await new Promise((ok) => setTimeout(ok, 2000));
  }
  return null;
}
