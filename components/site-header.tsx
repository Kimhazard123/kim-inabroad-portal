"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  ["Home", "/"],
  ["Find Courses", "/find-courses"],
  ["Universities", "/universities"],
  ["Scholarships", "/scholarships"],
  ["Apply", "/apply"],
  ["AI Support", "/ai-chatbot"],
  ["Contact", "/contact"]
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/80 backdrop-blur-xl">
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-primary text-lg font-bold text-white">IE</div>
          <div>
            <div className="font-bold text-secondary">InAbroad Edupartner</div>
            <div className="text-xs text-slate-500">Study Abroad Portal</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-primary/10 hover:text-secondary">
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden gap-2 lg:flex">
          <Button asChild variant="outline"><Link href="/login">Login</Link></Button>
          <Button asChild><Link href="/admin">Admin</Link></Button>
        </div>

        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      <div className={cn("container-page grid gap-2 overflow-hidden transition-all lg:hidden", open ? "max-h-96 pb-4" : "max-h-0")}>
        {nav.map(([label, href]) => (
          <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-primary/10">
            {label}
          </Link>
        ))}
        <div className="grid grid-cols-2 gap-2">
          <Button asChild variant="outline"><Link href="/login">Login</Link></Button>
          <Button asChild><Link href="/admin">Admin</Link></Button>
        </div>
      </div>
    </header>
  );
}
