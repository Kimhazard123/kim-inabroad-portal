import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const decoded = await adminAuth().verifyIdToken(token);
  if (decoded.email !== (process.env.ADMIN_EMAIL || "kimhazard25@gmail.com")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const allowedStatuses = ["Pending", "Applied", "Offer Letter Received", "Visa Processing", "Enrolled", "Rejected"];
  if (body.status && !allowedStatuses.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  await adminDb().collection("applications").doc(params.id).set({ ...body, updatedAt: new Date().toISOString() }, { merge: true });
  return NextResponse.json({ ok: true });
}
