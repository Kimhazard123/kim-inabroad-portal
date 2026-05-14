import { Resend } from "resend";

const adminEmail = process.env.ADMIN_EMAIL || "kimhazard25@gmail.com";
const adminWhatsApp = process.env.ADMIN_WHATSAPP || "+919989713417";

export async function sendApplicationEmails(application: Record<string, string>, documentLinks: string[]) {
  if (!process.env.RESEND_API_KEY) return { skipped: true };
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM_EMAIL || "InAbroad Edupartner <onboarding@resend.dev>";
  const summary = Object.entries(application).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join("");
  const docs = documentLinks.map((link) => `<li><a href="${link}">${link}</a></li>`).join("");

  await resend.emails.send({
    from,
    to: adminEmail,
    subject: "New Student Application Received",
    html: `<h2>New Student Application Received</h2><ul>${summary}</ul><h3>Documents</h3><ul>${docs}</ul>`
  });

  if (application.email) {
    await resend.emails.send({
      from,
      to: application.email,
      subject: "InAbroad Edupartner application received",
      html: `<p>Dear ${application.fullName || "Student"},</p><p>Your application has been received. Our consultant will contact you shortly.</p>`
    });
  }

  return { skipped: false };
}

export async function sendWhatsAppApplicationAlert(application: Record<string, string>) {
  const message = `New Student Application Received\nStudent: ${application.fullName || "-"}\nNationality: ${application.nationality || "-"}\nCourse: ${application.course || "-"}\nUniversity: ${application.preferredUniversity || "-"}\nWhatsApp: ${application.whatsapp || "-"}\nDashboard: ${process.env.NEXT_PUBLIC_APP_URL || ""}/admin`;

  if (process.env.WHATSAPP_PROVIDER === "twilio" && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    const credentials = Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString("base64");
    await fetch(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`, {
      method: "POST",
      headers: { Authorization: `Basic ${credentials}`, "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ From: process.env.TWILIO_WHATSAPP_FROM || "", To: `whatsapp:${adminWhatsApp}`, Body: message })
    });
    return { skipped: false };
  }

  if (process.env.WHATSAPP_CLOUD_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID) {
    await fetch(`https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.WHATSAPP_CLOUD_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({ messaging_product: "whatsapp", to: adminWhatsApp.replace("+", ""), type: "text", text: { body: message } })
    });
    return { skipped: false };
  }

  return { skipped: true };
}
