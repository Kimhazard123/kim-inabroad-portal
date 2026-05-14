"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth, db } from "@/lib/firebase";

type Application = { id: string; course?: string; preferredUniversity?: string; status?: string; documentLinks?: string[] };

export default function StudentDashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => onAuthStateChanged(auth, (user) => {
    setEmail(user?.email || "");
    if (!user) router.push("/login");
  }), [router]);

  useEffect(() => {
    if (!email) return;
    const q = query(collection(db, "applications"), where("email", "==", email));
    return onSnapshot(q, (snapshot) => setApplications(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Application))));
  }, [email]);

  return (
    <main className="container-page py-10">
      <h1 className="text-3xl font-bold text-secondary">Student Dashboard</h1>
      <p className="mt-3 text-slate-600">Track your application status, missing documents, offer letters, and consultant updates.</p>
      {!email && <div className="mt-8 glass rounded-xl p-6"><p>Please login to view your dashboard.</p><Button asChild className="mt-4"><Link href="/login">Login</Link></Button></div>}
      <div className="mt-8 grid gap-5">
        {applications.map((app) => (
          <div key={app.id} className="glass rounded-xl p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div><h2 className="text-xl font-semibold text-secondary">{app.course || "Application"}</h2><p className="text-slate-600">{app.preferredUniversity || "University pending"}</p></div>
              <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">{app.status || "Pending"}</span>
            </div>
            <Button asChild variant="outline" className="mt-5"><Link href="/apply">Upload Missing Documents</Link></Button>
          </div>
        ))}
      </div>
    </main>
  );
}
