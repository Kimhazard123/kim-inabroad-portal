"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("kimhazard25@gmail.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push(email === "kimhazard25@gmail.com" ? "/admin" : "/student-dashboard");
    } catch {
      setError("Login failed. Check email and password.");
    }
  }

  return (
    <main className="container-page flex min-h-[70vh] items-center justify-center py-10">
      <form onSubmit={login} className="glass w-full max-w-md rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-secondary">Portal Login</h1>
        <label className="mt-6 grid gap-2 text-sm font-medium text-secondary">Email<input className="focus-ring rounded-lg border border-primary/15 px-3 py-3" value={email} onChange={(event) => setEmail(event.target.value)} type="email" /></label>
        <label className="mt-4 grid gap-2 text-sm font-medium text-secondary">Password<input className="focus-ring rounded-lg border border-primary/15 px-3 py-3" value={password} onChange={(event) => setPassword(event.target.value)} type="password" /></label>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        <Button className="mt-6 w-full" type="submit">Login</Button>
      </form>
    </main>
  );
}
