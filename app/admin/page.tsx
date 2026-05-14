"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Download, Mail, MessageCircle } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { auth, db } from "@/lib/firebase";

type Application = {
  id: string;
  fullName?: string;
  email?: string;
  whatsapp?: string;
  nationality?: string;
  course?: string;
  preferredUniversity?: string;
  status?: string;
  documentLinks?: string[];
  createdAt?: string;
};

const statuses = ["Pending", "Applied", "Offer Letter Received", "Visa Processing", "Enrolled", "Rejected"];

export default function AdminPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [search, setSearch] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      const allowed = user?.email === "kimhazard25@gmail.com";
      setIsAdmin(Boolean(allowed));
      if (!allowed) router.push("/login");
    });
  }, [router]);

  useEffect(() => {
    if (!isAdmin) return;
    const q = query(collection(db, "applications"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      setApplications(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Application)));
    });
  }, [isAdmin]);

  const filtered = useMemo(() => applications.filter((app) => JSON.stringify(app).toLowerCase().includes(search.toLowerCase())), [applications, search]);

  async function updateStatus(id: string, status: string) {
    const token = await auth.currentUser?.getIdToken();
    await fetch(`/api/applications/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ status }) });
  }

  function exportCsv() {
    const headers = ["Name", "Email", "WhatsApp", "Nationality", "Course", "University", "Status"];
    const rows = filtered.map((app) => [app.fullName, app.email, app.whatsapp, app.nationality, app.course, app.preferredUniversity, app.status]);
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell || "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    link.download = "inabroad-applications.csv";
    link.click();
  }

  return (
    <main className="container-page py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Admin Dashboard</h1>
          <p className="mt-2 text-slate-600">Manage applications, statuses, documents, and consultant follow-up.</p>
        </div>
        <Button onClick={exportCsv}><Download className="mr-2 h-4 w-4" />Export CSV</Button>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {statuses.slice(0, 4).map((status) => <div key={status} className="glass rounded-xl p-4"><div className="text-2xl font-bold text-primary">{applications.filter((app) => app.status === status).length}</div><div className="text-sm text-slate-600">{status}</div></div>)}
      </div>
      <input className="focus-ring mt-8 w-full rounded-lg border border-primary/15 bg-white px-4 py-3" placeholder="Search students, courses, universities..." value={search} onChange={(event) => setSearch(event.target.value)} />
      <div className="mt-5 overflow-hidden rounded-2xl border border-primary/10 bg-white/90">
        <div className="hidden grid-cols-[1.2fr_1fr_1fr_1fr_1fr] gap-4 bg-secondary px-4 py-3 text-sm font-semibold text-white md:grid">
          <div>Student</div><div>Course</div><div>University</div><div>Status</div><div>Actions</div>
        </div>
        {filtered.map((app) => (
          <div key={app.id} className="grid gap-4 border-t border-primary/10 px-4 py-4 md:grid-cols-[1.2fr_1fr_1fr_1fr_1fr] md:items-center">
            <div><div className="font-semibold text-secondary">{app.fullName || "Student"}</div><div className="text-sm text-slate-500">{app.email}</div></div>
            <div className="text-sm">{app.course || "-"}</div>
            <div className="text-sm">{app.preferredUniversity || "-"}</div>
            <select value={app.status || "Pending"} onChange={(event) => updateStatus(app.id, event.target.value)} className="rounded-lg border border-primary/15 px-3 py-2 text-sm">
              {statuses.map((status) => <option key={status}>{status}</option>)}
            </select>
            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm" variant="outline"><a href={`mailto:${app.email}`}><Mail className="h-4 w-4" /></a></Button>
              <Button asChild size="sm" variant="outline"><a href={`https://wa.me/${(app.whatsapp || "").replace(/\D/g, "")}`} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" /></a></Button>
              {app.documentLinks?.[0] && <Button asChild size="sm" variant="outline"><a href={app.documentLinks[0]} target="_blank" rel="noreferrer">Docs</a></Button>}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
