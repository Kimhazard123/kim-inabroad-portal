import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ScholarshipsPage() {
  return (
    <main className="container-page py-10">
      <h1 className="text-3xl font-bold text-secondary">Scholarships</h1>
      <p className="mt-3 max-w-3xl leading-7 text-slate-600">Find scholarship-ready universities through the live finder, then submit your application with scholarship required selected in the smart application form.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {["Merit scholarships", "Early application discounts", "Country-specific awards"].map((item) => (
          <div key={item} className="glass rounded-xl p-6">
            <h2 className="text-xl font-semibold text-secondary">{item}</h2>
            <p className="mt-3 leading-7 text-slate-600">Eligibility depends on academic profile, intake, course, and partner university policy.</p>
          </div>
        ))}
      </div>
      <Button asChild className="mt-8"><Link href="/apply">Apply for Scholarship Review</Link></Button>
    </main>
  );
}
