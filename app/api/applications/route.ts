import { NextResponse } from "next/server";
import { adminDb, adminStorage } from "@/lib/firebase-admin";
import { sendApplicationEmails, sendWhatsAppApplicationAlert } from "@/lib/notifications";
import { rateLimit } from "@/lib/rate-limit";

const allowedTypes = new Set(["application/pdf", "image/jpeg", "image/png"]);
const maxBytes = 8 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "anonymous";
    if (!rateLimit(`application:${ip}`, 5, 60_000)) {
      return NextResponse.json({ error: "Too many submissions. Please wait and try again." }, { status: 429 });
    }

    const formData = await request.formData();
    const application: Record<string, string> = {};
    const files: File[] = [];

    for (const [key, value] of Array.from(formData.entries()))
      if (value instanceof File && value.size > 0) {
        if (!allowedTypes.has(value.type) || value.size > maxBytes) {
          return NextResponse.json({ error: `Invalid file: ${value.name}` }, { status: 400 });
        }
        files.push(value);
      } else if (typeof value === "string") {
        application[key] = value;
      }  
    }
try {
    const db = adminDb();
    const docRef = db.collection("applications").doc();
    const bucket = adminStorage().bucket();
    const documentLinks: string[] = [];

    for (const file of files) {
      const bytes = Buffer.from(await file.arrayBuffer());
      const safeName = file.name.replace(/[^\w.\-]+/g, "_");
      const path = `applications/${docRef.id}/${Date.now()}-${safeName}`;
      const upload = bucket.file(path);
      await upload.save(bytes, { metadata: { contentType: file.type } });
      const [url] = await upload.getSignedUrl({ action: "read", expires: "01-01-2035" });
      documentLinks.push(url);
    }

    await docRef.set({
      ...application,
      status: "Pending",
      documentLinks,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  try {
    
  } catch (error) {
    
  }
  const message =
    error instanceof Error
      ? error.message
      : "Application submission failed";
  return NextResponse.json(
    { error: message },
    { status: 500 }
  );
}
}