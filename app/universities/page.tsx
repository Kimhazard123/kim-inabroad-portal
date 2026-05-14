import Link from "next/link";
import { Button } from "@/components/ui/button";
import { sampleUniversities } from "@/lib/course-finder";

export default function UniversitiesPage() {
  return (
    <main className="container-page py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Universities</h1>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">The live partner university list, tuition fees, admission fees, durations, and scholarships are available through the integrated finder.</p>
        </div>
        <Button asChild><Link href="/find-courses">Search Live Finder</Link></Button>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {sampleUniversities.map((university) => (
          <article key={university.name} className="glass rounded-xl p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">U</div>
            <h2 className="mt-5 text-xl font-semibold text-secondary">{university.name}</h2>
            <dl className="mt-4 grid gap-2 text-sm text-slate-600">
              <div><dt className="font-medium text-secondary">Country</dt><dd>{university.country}</dd></div>
              <div><dt className="font-medium text-secondary">Tuition</dt><dd>{university.tuitionFee}</dd></div>
              <div><dt className="font-medium text-secondary">Admission fee</dt><dd>{university.admissionFee}</dd></div>
            </dl>
          </article>
        ))}
      </div>
    </main>
  );
}
