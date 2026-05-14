import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-primary/10 bg-white/70">
      <div className="container-page grid gap-6 py-10 md:grid-cols-3">
        <div>
          <div className="font-bold text-secondary">InAbroad Edupartner</div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">AI-powered overseas education consultancy portal for applications, documents, and admissions support.</p>
        </div>
        <div className="text-sm leading-7">
          <Link href="/about" className="block hover:text-primary">About Us</Link>
          <Link href="/partner-universities" className="block hover:text-primary">Partner Universities</Link>
          <Link href="/student-dashboard" className="block hover:text-primary">Student Dashboard</Link>
          <Link href="/admin" className="block hover:text-primary">Admin Dashboard</Link>
        </div>
        <div className="text-sm leading-7 text-slate-600">
          <div>Admin: kimhazard25@gmail.com</div>
          <div>WhatsApp: +919989713417</div>
          <div className="mt-3">© {new Date().getFullYear()} InAbroad Edupartner</div>
        </div>
      </div>
    </footer>
  );
}
