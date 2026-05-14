import { Mail, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="container-page py-10">
      <h1 className="text-3xl font-bold text-secondary">Contact Consultant</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <a className="glass rounded-xl p-6" href="mailto:kimhazard25@gmail.com"><Mail className="h-7 w-7 text-primary" /><h2 className="mt-4 text-xl font-semibold text-secondary">Email</h2><p className="mt-2 text-slate-600">kimhazard25@gmail.com</p></a>
        <a className="glass rounded-xl p-6" href="https://wa.me/919989713417" target="_blank" rel="noreferrer"><MessageCircle className="h-7 w-7 text-primary" /><h2 className="mt-4 text-xl font-semibold text-secondary">WhatsApp</h2><p className="mt-2 text-slate-600">+919989713417</p></a>
      </div>
    </main>
  );
}
