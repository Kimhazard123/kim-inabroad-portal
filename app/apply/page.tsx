import { ApplicationForm } from "@/components/application-form";

export default function ApplyPage() {
  return (
    <main className="container-page py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary">Smart Student Application</h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">Complete your profile, choose course preferences from the integrated finder, and upload the documents required for your education system.</p>
      </div>
      <ApplicationForm />
    </main>
  );
}
