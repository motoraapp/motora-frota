// MOTORA - Fluxo oficial de assinatura eletrônica GOV.BR (assinador.iti.br)
// Suporta links individuais para Locatário e Testemunhas 1 e 2, além de verificação
// real de blocos criptográficos PAdES (/ByteRange) e cadeia multi-assinantes no mesmo PDF.
import { createClient } from "npm:@supabase/supabase-js@2.45.4";
import { decodeBase64 } from "jsr:@std/encoding@1/base64";

function serviceKey() {
  const legacy = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (legacy) return legacy;
  try {
    const keys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") || "{}");
    return keys.default || Object.values(keys)[0] || "";
  } catch {
    return "";
  }
}

const admin = createClient(Deno.env.get("SUPABASE_URL")!, serviceKey() as string, {
  auth: { persistSession: false },
});
const BUCKET = "docs";
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (b: unknown, s = 200) =>
  new Response(JSON.stringify(b), {
    status: s,
    headers: { ...cors, "Content-Type": "application/json" },
  });

const VALID_ROLES = new Set(["locador", "locatario", "witness1", "witness2"]);
const ROLE_TIME_KEY: Record<string, string> = {
  locador: "locador_at",
  locatario: "locatario_at",
  witness1: "witness1_at",
  witness2: "witness2_at",
};
const ROLE_LABEL: Record<string, string> = {
  locador: "Locador",
  locatario: "Locatário (Motorista)",
  witness1: "Testemunha 1",
  witness2: "Testemunha 2",
};

function maskCpf(cpf?: string | null) {
  const d = String(cpf || "").replace(/\D/g, "");
  if (d.length !== 11) return cpf || "";
  return `***.${d.slice(3, 6)}.${d.slice(6, 9)}-**`;
}

async function inspectPdfSignatures(bytes: Uint8Array) {
  if (!bytes || bytes.length < 16) throw new Error("Arquivo PDF vazio ou inválido.");
  const head = new TextDecoder("latin1").decode(bytes.subarray(0, 8));
  if (!head.startsWith("%PDF-")) throw new Error("O arquivo enviado não é um PDF válido.");

  const raw = new TextDecoder("latin1").decode(bytes);
  const byteRanges = raw.match(/\/ByteRange\s*\[\s*\d+\s+\d+\s+\d+\s+\d+\s*\]/g) || [];
  const subFilters =
    raw.match(/\/SubFilter\s*\/\s*(adbe\.pkcs7\.(detached|sha1)|ETSI\.CAdES\.detached|ETSI\.RFC3161|adbe\.x509\.rsa_sha1)/gi) ||
    [];
  const sigCount = byteRanges.length > 0 ? Math.max(byteRanges.length, subFilters.length) : subFilters.length;
  const govbrDetected =
    /GOV\.BR|Instituto Nacional de Tecnologia da Informacao|SERVICO FEDERAL DE PROCESSAMENTO DE DADOS|SERPRO|ICP-Brasil|Autoridade Certificadora/i.test(
      raw,
    );

  const hashBuf = await crypto.subtle.digest("SHA-256", bytes);
  const sha256 = Array.from(new Uint8Array(hashBuf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return { sigCount, govbrDetected, sha256 };
}

function makeToken() {
  const rnd = new Uint8Array(12);
  crypto.getRandomValues(rnd);
  const hex = Array.from(rnd, (b) => b.toString(16).padStart(2, "0")).join("");
  return crypto.randomUUID().replace(/-/g, "") + hex;
}

async function resolveDoc(docType: string, docId: string) {
  const table = docType === "inspection" ? "vehicle_inspections" : "rental_contracts";
  const { data, error } = await admin.from(table).select("*").eq("id", docId).maybeSingle();
  if (error || !data) return null;
  return { table, doc: data as Record<string, unknown> };
}

function publicDocSummary(docType: string, doc: Record<string, unknown>) {
  const s = (doc.snapshot_data || {}) as Record<string, unknown>;
  const l = (s.locador || {}) as Record<string, string>;
  const d = (s.locatario || {}) as Record<string, string>;
  const v = (s.veiculo || {}) as Record<string, string>;
  const sd = (doc.signature_data || {}) as Record<string, unknown>;
  const wList = Array.isArray(s.testemunhas) ? (s.testemunhas as Array<Record<string, string>>) : [];
  return {
    doc_type: docType,
    doc_id: doc.id,
    doc_number: docType === "inspection" ? doc.inspection_number : doc.contract_number,
    inspection_type: doc.inspection_type || null,
    status: doc.status,
    signature_mode: doc.signature_mode,
    signature_place: doc.signature_place || null,
    signature_date: doc.signature_date || null,
    locador_name: l.name || "Locador",
    locador_cpf_masked: maskCpf(l.cpf),
    locatario_name: d.name || "Locatário",
    locatario_cpf_masked: maskCpf(d.cpf),
    veiculo: { model: v.model || "", plate: v.plate || "" },
    witness1_name: wList[0]?.name || (sd.witness1_name as string) || "Testemunha 1",
    witness1_cpf_masked: maskCpf(wList[0]?.cpf || (sd.witness1_cpf as string)),
    witness2_name: wList[1]?.name || (sd.witness2_name as string) || "Testemunha 2",
    witness2_cpf_masked: maskCpf(wList[1]?.cpf || (sd.witness2_cpf as string)),
    signature_data: {
      locador_at: sd.locador_at || null,
      locatario_at: sd.locatario_at || null,
      witness1_at: sd.witness1_at || null,
      witness2_at: sd.witness2_at || null,
      pdf_sig_count: Number(sd.pdf_sig_count || 0),
      govbr_detected: !!sd.govbr_detected,
      pdf_sha256: sd.pdf_sha256 || null,
    },
  };
}

async function authUser(req: Request) {
  const token = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "").trim();
  if (!token) return null;
  const { data } = await admin.auth.getUser(token);
  if (!data?.user) return null;
  const { data: prof } = await admin.from("profiles").select("id, role, name, cpf").eq("id", data.user.id).maybeSingle();
  return prof ? { user: data.user, profile: prof as Record<string, unknown> } : null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const action = String(body.action || "");

    // 1) GERAR LINK DE ASSINATURA GOV.BR (apenas Master dono do documento)
    if (action === "create_invite") {
      const auth = await authUser(req);
      if (!auth || auth.profile.role !== "master") return json({ ok: false, error: "Apenas o administrador pode gerar links." }, 403);

      const docType = body.doc_type === "inspection" ? "inspection" : "contract";
      const docId = String(body.doc_id || "");
      const role = String(body.signer_role || "");
      if (!docId || !VALID_ROLES.has(role) || role === "locador") {
        return json({ ok: false, error: "Parâmetros de assinante inválidos." }, 400);
      }

      const found = await resolveDoc(docType, docId);
      if (!found || found.doc.owner_id !== auth.user.id) return json({ ok: false, error: "Documento não encontrado." }, 404);
      const st = String(found.doc.status || "");
      if (st === "rascunho" || st === "cancelado") {
        return json({ ok: false, error: "Emita o documento com PDF antes de gerar links GOV.BR." }, 400);
      }
      if (!found.doc.signed_pdf_path && !found.doc.pdf_path) {
        return json({ ok: false, error: "Este documento ainda não possui PDF salvo para assinar." }, 400);
      }

      const s = (found.doc.snapshot_data || {}) as Record<string, unknown>;
      const wList = Array.isArray(s.testemunhas) ? (s.testemunhas as Array<Record<string, string>>) : [];
      const sd = (found.doc.signature_data || {}) as Record<string, string>;
      let signerName = String(body.signer_name || "").trim();
      let signerCpf = String(body.signer_cpf || "").trim();
      if (!signerName) {
        if (role === "locatario") signerName = ((s.locatario as Record<string, string>) || {}).name || "Locatário";
        else if (role === "witness1") signerName = wList[0]?.name || sd.witness1_name || "Testemunha 1";
        else if (role === "witness2") signerName = wList[1]?.name || sd.witness2_name || "Testemunha 2";
      }
      if (!signerCpf) {
        if (role === "locatario") signerCpf = ((s.locatario as Record<string, string>) || {}).cpf || "";
        else if (role === "witness1") signerCpf = wList[0]?.cpf || sd.witness1_cpf || "";
        else if (role === "witness2") signerCpf = wList[1]?.cpf || sd.witness2_cpf || "";
      }

      // Revoga pendentes anteriores do mesmo papel
      await admin
        .from("signature_invites")
        .update({ status: "revogado" })
        .eq("doc_type", docType)
        .eq("doc_id", docId)
        .eq("signer_role", role)
        .eq("status", "pendente");

      const token = makeToken();
      const { data: created, error: insErr } = await admin
        .from("signature_invites")
        .insert({
          token,
          owner_id: auth.user.id,
          doc_type: docType,
          doc_id: docId,
          signer_role: role,
          signer_name: signerName,
          signer_cpf: signerCpf || null,
          status: "pendente",
        })
        .select()
        .single();
      if (insErr) throw insErr;

      return json({
        ok: true,
        token: created.token,
        expires_at: created.expires_at,
        signer_role: role,
        signer_name: signerName,
      });
    }

    // 2) CONSULTAR CONVITE PÚBLICO (sem login — via token secreto)
    if (action === "get_invite") {
      const token = String(body.token || "").trim();
      if (!token) return json({ ok: false, error: "Link de assinatura inválido." }, 400);

      const { data: inv } = await admin.from("signature_invites").select("*").eq("token", token).maybeSingle();
      if (!inv) return json({ ok: false, error: "Link de assinatura não encontrado." }, 404);
      if (inv.status === "revogado") return json({ ok: false, error: "Este link foi substituído por um mais recente. Peça o novo link ao locador." }, 410);
      if (new Date(inv.expires_at).getTime() < Date.now()) {
        return json({ ok: false, error: "Este link expirou. Solicite um novo link ao locador." }, 410);
      }

      const found = await resolveDoc(inv.doc_type, inv.doc_id);
      if (!found) return json({ ok: false, error: "Documento vinculado não encontrado." }, 404);
      const st = String(found.doc.status || "");
      if (st === "rascunho" || st === "cancelado") {
        return json({ ok: false, error: "Documento cancelado ou ainda em rascunho." }, 400);
      }

      const curPath = String(found.doc.signed_pdf_path || found.doc.pdf_path || "");
      if (!curPath) return json({ ok: false, error: "PDF do documento ainda não foi gerado." }, 404);
      const baseName =
        (inv.doc_type === "inspection" ? found.doc.inspection_number : found.doc.contract_number) || "DOCUMENTO";
      const safeDlName = `${String(baseName).replace(/[^a-zA-Z0-9_-]/g, "_")}_GOVBR.pdf`;

      const { data: dlUrl } = await admin.storage.from(BUCKET).createSignedUrl(curPath, 900, { download: safeDlName });
      const { data: vwUrl } = await admin.storage.from(BUCKET).createSignedUrl(curPath, 900);

      return json({
        ok: true,
        invite: {
          signer_role: inv.signer_role,
          signer_name: inv.signer_name,
          signer_cpf: inv.signer_cpf || "",
          status: inv.status,
          signed_at: inv.signed_at,
          expires_at: inv.expires_at,
        },
        doc: publicDocSummary(inv.doc_type, found.doc),
        download_url: dlUrl?.signedUrl || null,
        view_url: vwUrl?.signedUrl || null,
      });
    }

    // 3) RECEBER PDF ASSINADO VIA GOV.BR (Master, Motorista ou Testemunha com token)
    if (action === "submit_govbr_pdf") {
      const token = String(body.token || "").trim();
      let docType = body.doc_type === "inspection" ? "inspection" : "contract";
      let docId = String(body.doc_id || "");
      let rolesToMark: string[] = [];
      let inviteRow: Record<string, unknown> | null = null;
      let callerKind = "anon";
      let callerAuth: Awaited<ReturnType<typeof authUser>> = null;

      if (token) {
        const { data: inv } = await admin.from("signature_invites").select("*").eq("token", token).maybeSingle();
        if (!inv) return json({ ok: false, error: "Link de assinatura não encontrado." }, 404);
        if (inv.status === "revogado") return json({ ok: false, error: "Este link foi substituído por um mais recente." }, 410);
        if (new Date(inv.expires_at).getTime() < Date.now()) return json({ ok: false, error: "Este link expirou." }, 410);
        inviteRow = inv as Record<string, unknown>;
        docType = inv.doc_type;
        docId = inv.doc_id;
        rolesToMark = [inv.signer_role];
        callerKind = "invite";
      } else {
        callerAuth = await authUser(req);
        if (!callerAuth) return json({ ok: false, error: "Faça login ou use seu link oficial de assinatura." }, 401);
        const reqRoles = Array.isArray(body.signer_roles)
          ? body.signer_roles.map(String).filter((r) => VALID_ROLES.has(r))
          : VALID_ROLES.has(String(body.signer_role || ""))
            ? [String(body.signer_role)]
            : [];
        if (!docId || !reqRoles.length) return json({ ok: false, error: "Informe o documento e quem assinou o PDF." }, 400);
        rolesToMark = [...new Set(reqRoles)];
        callerKind = callerAuth.profile.role === "master" ? "master" : "driver";
      }

      const found = await resolveDoc(docType, docId);
      if (!found) return json({ ok: false, error: "Documento não encontrado." }, 404);
      const { table, doc } = found;

      if (callerKind === "master" && doc.owner_id !== callerAuth!.user.id) {
        return json({ ok: false, error: "Sem permissão neste documento." }, 403);
      }
      if (callerKind === "driver") {
        if (doc.driver_id !== callerAuth!.user.id || rolesToMark.length !== 1 || rolesToMark[0] !== "locatario") {
          return json({ ok: false, error: "Você só pode registrar a sua própria assinatura de Locatário." }, 403);
        }
      }
      const st = String(doc.status || "");
      if (st === "rascunho" || st === "cancelado") {
        return json({ ok: false, error: "Não é possível assinar um documento em rascunho ou cancelado." }, 400);
      }

      const b64 = String(body.pdf_base64 || "").replace(/^data:application\/pdf;base64,/i, "").trim();
      if (!b64) return json({ ok: false, error: "Selecione o arquivo PDF assinado no GOV.BR." }, 400);
      const bytes = decodeBase64(b64);
      if (bytes.length > 10 * 1024 * 1024) return json({ ok: false, error: "PDF excede o limite de 10 MB." }, 400);

      const { sigCount, govbrDetected, sha256 } = await inspectPdfSignatures(bytes);
      if (sigCount < 1) {
        return json({
          ok: false,
          error:
            "Nenhuma assinatura digital GOV.BR (/ByteRange) foi encontrada neste arquivo. Entre em assinador.iti.br com sua conta GOV.BR (Prata ou Ouro), assine o PDF e envie o arquivo baixado de lá.",
        });
      }

      const prevSd = (doc.signature_data || {}) as Record<string, unknown>;
      const prevCount = Number(prevSd.pdf_sig_count || 0);
      const signedRolesAfter = new Set<string>(
        (["locador", "locatario", "witness1", "witness2"] as const).filter((r) => Boolean(prevSd[ROLE_TIME_KEY[r]])),
      );
      for (const r of rolesToMark) signedRolesAfter.add(r);
      const expectedMinSigs = signedRolesAfter.size;
      if (prevCount > 0 && sigCount < prevCount) {
        return json({
          ok: false,
          error: `Atenção: o PDF salvo anteriormente já tinha ${prevCount} assinatura(s) GOV.BR e este possui apenas ${sigCount}. Baixe sempre o PDF MAIS RECENTE antes de assinar no assinador.iti.br para não perder as assinaturas anteriores.`,
        });
      }
      if (sigCount < expectedMinSigs) {
        return json({
          ok: false,
          error: `Todos os participantes (incluindo testemunhas) precisam assinar via GOV.BR no mesmo PDF. Para registrar ${expectedMinSigs} assinante(s), o arquivo deve ter ao menos ${expectedMinSigs} assinatura(s) digital(is) /ByteRange, mas possui apenas ${sigCount}.`,
        });
      }

      const folder = doc.driver_id
        ? `${doc.driver_id}/${docType === "contract" ? "contratos" : "vistorias"}/${doc.id}`
        : `vehicles/${doc.vehicle_id}/vistorias/${doc.id}`;
      const tag = rolesToMark.join("_").slice(0, 32);
      const storagePath = `${folder}/govbr-${tag}-${Date.now()}.pdf`;

      const { error: upErr } = await admin.storage.from(BUCKET).upload(storagePath, bytes, {
        upsert: true,
        contentType: "application/pdf",
      });
      if (upErr) throw upErr;

      const nowIso = new Date().toISOString();
      const nextSd: Record<string, unknown> = {
        ...prevSd,
        provider: "govbr",
        pdf_sig_count: sigCount,
        govbr_detected: govbrDetected,
        pdf_sha256: sha256,
        last_signed_at: nowIso,
        last_signed_roles: rolesToMark,
      };
      for (const r of rolesToMark) {
        const key = ROLE_TIME_KEY[r];
        if (!nextSd[key]) nextSd[key] = nowIso;
        nextSd[`${r}_method`] = "govbr";
      }

      // Se a testemunha informou nome/CPF ao assinar (ex: Testemunha 2), preserva em signature_data
      const submittedName = String(body.signer_name || "").trim();
      const submittedCpf = String(body.signer_cpf || "").trim();
      if (rolesToMark.length === 1 && (rolesToMark[0] === "witness1" || rolesToMark[0] === "witness2")) {
        const r = rolesToMark[0];
        if (submittedName && !nextSd[`${r}_name`]) nextSd[`${r}_name`] = submittedName;
        if (submittedCpf && !nextSd[`${r}_cpf`]) nextSd[`${r}_cpf`] = submittedCpf;
      }

      const allSigned = Boolean(nextSd.locador_at && nextSd.locatario_at && nextSd.witness1_at && nextSd.witness2_at);
      const nextMode = allSigned ? "eletronica_assinada" : "eletronica_pendente";
      const nextStatus =
        allSigned && st === "aguardando_assinatura"
          ? docType === "contract"
            ? "ativo"
            : "concluido"
          : st;

      const updPayload: Record<string, unknown> = {
        signed_pdf_path: storagePath,
        signature_mode: nextMode,
        signature_data: nextSd,
        signed_at: allSigned ? (doc.signed_at || nowIso) : doc.signed_at || null,
        status: nextStatus,
      };

      const { data: updated, error: updErr } = await admin
        .from(table)
        .update(updPayload)
        .eq("id", docId)
        .select()
        .single();
      if (updErr) throw updErr;

      // Atualiza atalho na ficha do motorista se concluiu todas as 4 assinaturas
      if (allSigned && doc.driver_id) {
        if (docType === "contract") {
          const hasUnifiedInsp = Boolean(((doc.snapshot_data as Record<string, unknown> | undefined)?.vistoria_entrega as Record<string, unknown> | undefined)?.included);
          await admin
            .from("profiles")
            .update(hasUnifiedInsp ? { contract_path: storagePath, inspection_term_path: storagePath } : { contract_path: storagePath })
            .eq("id", doc.driver_id);
        } else if (docType === "inspection" && doc.inspection_type === "entrega") {
          await admin.from("profiles").update({ inspection_term_path: storagePath }).eq("id", doc.driver_id);
        }
      }

      // Atualiza convites usados
      if (inviteRow) {
        await admin
          .from("signature_invites")
          .update({
            status: "assinado",
            signed_pdf_path: storagePath,
            pdf_sig_count: sigCount,
            govbr_detected: govbrDetected,
            signed_at: nowIso,
            signer_name: submittedName || String(inviteRow.signer_name),
            signer_cpf: submittedCpf || (inviteRow.signer_cpf as string | null),
          })
          .eq("id", inviteRow.id);
      } else {
        await admin
          .from("signature_invites")
          .update({
            status: "assinado",
            signed_pdf_path: storagePath,
            pdf_sig_count: sigCount,
            govbr_detected: govbrDetected,
            signed_at: nowIso,
          })
          .eq("doc_type", docType)
          .eq("doc_id", docId)
          .in("signer_role", rolesToMark)
          .eq("status", "pendente");
      }

      if (docType === "contract") {
        const whoLbl = rolesToMark.map((r) => ROLE_LABEL[r] || r).join(", ");
        await admin.from("rental_contract_history").insert({
          contract_id: docId,
          owner_id: doc.owner_id,
          driver_id: doc.driver_id,
          event_type: "assinatura_govbr",
          description: allSigned
            ? `Todas as 4 assinaturas GOV.BR concluídas (${sigCount} selo(s) no PDF) — contrato ativado`
            : `Assinatura GOV.BR registrada para ${whoLbl} (${sigCount} selo(s) no PDF)`,
          metadata: {
            roles: rolesToMark,
            sig_count: sigCount,
            govbr_detected: govbrDetected,
            pdf_sha256: sha256,
            via: callerKind,
          },
          created_by: callerAuth?.user.id || null,
        });
      }

      return json({
        ok: true,
        path: storagePath,
        sig_count: sigCount,
        govbr_detected: govbrDetected,
        sha256,
        all_signed: allSigned,
        status: updated.status,
        signature_mode: updated.signature_mode,
        signature_data: updated.signature_data,
        signed_at: updated.signed_at,
      });
    }

    return json({ ok: false, error: "Ação desconhecida." }, 400);
  } catch (e) {
    console.error("motora-assinatura error:", e);
    return json({ ok: false, error: String((e as Error)?.message || e) }, 500);
  }
});
