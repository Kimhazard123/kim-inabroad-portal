"use client";

import { Copy, ExternalLink, MessageCircle, Send } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const finderUrl = process.env.NEXT_PUBLIC_COURSE_FINDER_URL || "https://course-finder-a97606.netlify.app/";

export default function FindCoursesPage() {
  const shareText = encodeURIComponent(`Find courses and universities with InAbroad Edupartner: ${finderUrl}`);

  async function copyFinder() {
    await navigator.clipboard.writeText(finderUrl);
  }

  return (
    <main className="container-page py-8">
      <div className="mb-5 flex flex-col gap-4 rounded-2xl bg-secondary p-5 text-white lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Course, University, Tuition & Admission Fee Finder</h1>
          <p className="mt-2 text-sm text-white/80">Powered directly by the official InAbroad integrated finder.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="light"><Link href="/apply"><Send className="mr-2 h-4 w-4" />Apply Now</Link></Button>
          <Button variant="light" onClick={copyFinder}><Copy className="mr-2 h-4 w-4" />Copy</Button>
          <Button asChild variant="light"><a href={`https://wa.me/?text=${shareText}`} target="_blank" rel="noreferrer"><MessageCircle className="mr-2 h-4 w-4" />WhatsApp</a></Button>
          <Button asChild variant="light"><a href={finderUrl} target="_blank" rel="noreferrer"><ExternalLink className="mr-2 h-4 w-4" />Open</a></Button>
        </div>
      </div>

      <div className="glass overflow-hidden rounded-2xl">
        <iframe
          title="InAbroad course and university finder"
          src={finderUrl}
          className="h-[78vh] min-h-[680px] w-full border-0"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <p className="mt-4 text-sm text-slate-600">
        Course and fee data remains synchronized with the finder source at <a className="font-medium text-primary" href={finderUrl}>course-finder-a97606.netlify.app</a>.
      </p>
    </main>
  );
}
