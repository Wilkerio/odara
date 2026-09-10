import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface ContactRequest {
  name: string;
  company?: string;
  email: string;
  volume?: string;
  message?: string;
  subject?: string;
  meetingDate?: string | null;
  marketingConsent?: boolean;
  recaptchaToken: string;
}

const NOTIFY_TO = ["jcbarbara@lumnis.com.br", "assessortecnico@lumnis.com.br"];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function verifyRecaptcha(token: string, remoteip: string | null): Promise<boolean> {
  const secret = Deno.env.get("RECAPTCHA_SECRET_KEY");
  if (!secret) return false;
  const params = new URLSearchParams();
  params.append("secret", secret);
  params.append("response", token);
  if (remoteip) params.append("remoteip", remoteip);
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
  const data = await res.json();
  return !!data.success;
}

async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: ContactRequest;
  try { body = await req.json(); } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const company = (body.company || "").trim();
  const volume = (body.volume || "").trim();
  const message = (body.message || "").trim();
  const subject = (body.subject || "").trim();
  const meetingDateRaw = body.meetingDate || "";
  const marketingConsent = !!body.marketingConsent;
  const recaptchaToken = body.recaptchaToken;

  let meetingDateFmt = "—";
  if (meetingDateRaw) {
    const d = new Date(meetingDateRaw);
    if (!isNaN(d.getTime())) {
      meetingDateFmt = d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
    }
  }

  if (!name || !email || !recaptchaToken) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return new Response(JSON.stringify({ error: "Invalid email" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const recaptchaOk = await verifyRecaptcha(recaptchaToken, req.headers.get("x-forwarded-for"));
  if (!recaptchaOk) {
    return new Response(JSON.stringify({ success: false, error: "reCAPTCHA verification failed" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const smtpUser = Deno.env.get("SMTP_USER");
  const smtpPass = Deno.env.get("SMTP_APP_PASSWORD");
  if (!smtpUser || !smtpPass) {
    console.error("Missing SMTP_USER or SMTP_APP_PASSWORD");
    return new Response(JSON.stringify({ error: "Server configuration error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const rows: [string, string][] = [
    ["Nome", name],
    ["Empresa", company || "—"],
    ["E-mail", email],
    ["Volume", volume || "—"],
    ["Assunto", subject || "—"],
    ["Data preferida da reunião", meetingDateFmt],
    ["Consentimento marketing", marketingConsent ? "Sim" : "Não"],
    ["Mensagem", message || "—"],
  ];

  const htmlBody = `
    <h2>Novo lead do site — Lumnis Capital Partners</h2>
    <table cellpadding="6" cellspacing="0" border="0">
      ${rows.map(([label, value]) => `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`).join("")}
    </table>
  `;
  const textBody = rows.map(([l, v]) => `${l}: ${v}`).join("\n");

  const client = new SMTPClient({
    connection: {
      hostname: "smtp.gmail.com",
      port: 465,
      tls: true,
      auth: { username: smtpUser, password: smtpPass.replace(/\s+/g, "") },
    },
  });

  try {
    await client.send({
      from: `Lumnis Website <${smtpUser}>`,
      to: NOTIFY_TO,
      replyTo: email,
      subject: `Novo lead do site — ${name}${company ? ` (${company})` : ""}`,
      content: textBody,
      html: htmlBody,
    });
    await client.close();
    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("SMTP send error:", err);
    try { await client.close(); } catch { /* ignore */ }
    return new Response(JSON.stringify({ success: false, error: "Failed to send notification" }), {
      status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}

Deno.serve(handler);
