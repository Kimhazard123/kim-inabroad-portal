"use client";

import { useMemo, useState } from "react";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COURSE_FINDER_URL } from "@/lib/course-finder";
import { DegreeLevel, requiredDocuments } from "@/lib/application-logic";

const degreeLevels: DegreeLevel[] = ["Diploma", "Bachelor", "Masters", "PhD"];
const countries = ["Tanzania", "Kenya", "Uganda", "Rwanda", "Zambia", "Nigeria", "Ghana", "India", "Nepal", "Pakistan", "Other"];

export function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [nationality, setNationality] = useState("Tanzania");
  const [degreeLevel, setDegreeLevel] = useState<DegreeLevel>("Bachelor");
  const [hasALevel, setHasALevel] = useState(true);
  const docs = useMemo(() => requiredDocuments(nationality, degreeLevel, hasALevel), [nationality, degreeLevel, hasALevel]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/applications", { method: "POST", body: formData });
    setSubmitting(false);
    if (!response.ok) {
      alert("Application could not be submitted. Please check required fields and try again.");
      return;
    }
    alert("Application submitted successfully. InAbroad Edupartner will contact you shortly.");
    event.currentTarget.reset();
    setStep(1);
  }

  return (
    <form onSubmit={submit} className="glass rounded-2xl p-5 md:p-8">
      <div className="mb-8 grid gap-2 sm:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <button key={item} type="button" onClick={() => setStep(item)} className={`rounded-lg px-4 py-3 text-sm font-semibold ${step === item ? "bg-primary text-white" : "bg-white/70 text-secondary"}`}>
            Step {item}
          </button>
        ))}
      </div>

      {step === 1 && (
        <fieldset className="grid gap-4 md:grid-cols-2">
          <Input name="fullName" label="Full Name" required />
          <Select name="gender" label="Gender" options={["Female", "Male", "Other"]} required />
          <Input name="dateOfBirth" label="Date of Birth" type="date" required />
          <Input name="whatsapp" label="WhatsApp Number" required />
          <Input name="email" label="Email ID" type="email" required />
          <Select name="nationality" label="Nationality" options={countries} value={nationality} onValueChange={setNationality} required />
          <Input name="passportNumber" label="Passport Number" required />
          <Textarea name="address" label="Full Home Address" required />
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className="grid gap-4 md:grid-cols-2">
          <Input name="fatherName" label="Father's Name" />
          <Input name="fatherContact" label="Father's Contact Details" />
          <Input name="fatherEmail" label="Father's Email ID" type="email" />
          <Input name="motherName" label="Mother's Name" />
          <Input name="motherContact" label="Mother's Contact Details" />
          <Input name="motherEmail" label="Mother's Email ID" type="email" />
        </fieldset>
      )}

      {step === 3 && (
        <fieldset className="grid gap-4 md:grid-cols-2">
          <Select name="countryInterested" label="Country interested in" options={countries} required />
          <Input name="course" label="Course" placeholder="Choose from live finder, then enter course name" required />
          <Select name="degreeLevel" label="Degree level" options={degreeLevels} value={degreeLevel} onValueChange={(value) => setDegreeLevel(value as DegreeLevel)} required />
          <Input name="preferredUniversity" label="Preferred university" placeholder="Choose from live finder" required />
          <Input name="intake" label="Intake" placeholder="e.g. September 2026" required />
          <Select name="scholarshipRequired" label="Scholarship required" options={["Yes", "No"]} required />
          <div className="md:col-span-2 rounded-xl border border-primary/15 bg-white/80 p-4">
            <p className="text-sm font-medium text-secondary">Open the live finder to confirm course, university, tuition fee, and admission fee.</p>
            <a className="mt-2 inline-block text-sm font-semibold text-primary" href={COURSE_FINDER_URL} target="_blank" rel="noreferrer">Open integrated course finder</a>
          </div>
        </fieldset>
      )}

      {step === 4 && (
        <fieldset className="grid gap-5">
          {nationality === "Tanzania" && (degreeLevel === "Diploma" || degreeLevel === "Bachelor") && (
            <label className="flex items-center gap-3 rounded-lg bg-white/70 p-3 text-sm">
              <input type="checkbox" checked={hasALevel} onChange={(event) => setHasALevel(event.target.checked)} />
              Student has A-Level Certificate (ACSEE)
            </label>
          )}
          <div>
            <h2 className="text-lg font-semibold text-secondary">Required documents for {nationality} / {degreeLevel}</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {docs.map((doc) => <FileInput key={doc} name={`document_${doc}`} label={doc} />)}
              <FileInput name="recommendationLetters" label="Recommendation letters" />
              <FileInput name="englishProficiency" label="English proficiency documents" />
              <FileInput name="otherDocuments" label="Other supporting documents" />
            </div>
          </div>
        </fieldset>
      )}

      <div className="mt-8 flex flex-wrap justify-between gap-3">
        <Button type="button" variant="outline" onClick={() => setStep((value) => Math.max(1, value - 1))}>Back</Button>
        {step < 4 ? <Button type="button" onClick={() => setStep((value) => Math.min(4, value + 1))}>Next</Button> : <Button type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Submit Application"}</Button>}
      </div>
    </form>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...inputProps } = props;
  return <label className="grid gap-2 text-sm font-medium text-secondary">{label}<input {...inputProps} className="focus-ring rounded-lg border border-primary/15 bg-white px-3 py-3 text-slate-800" /></label>;
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  const { label, ...inputProps } = props;
  return <label className="grid gap-2 text-sm font-medium text-secondary md:col-span-2">{label}<textarea {...inputProps} className="focus-ring min-h-28 rounded-lg border border-primary/15 bg-white px-3 py-3 text-slate-800" /></label>;
}

function Select({ label, options, value, onValueChange, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: string[]; onValueChange?: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-secondary">
      {label}
      <select {...props} value={value} onChange={(event) => onValueChange?.(event.target.value)} className="focus-ring rounded-lg border border-primary/15 bg-white px-3 py-3 text-slate-800">
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function FileInput({ name, label }: { name: string; label: string }) {
  return (
    <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-primary/30 bg-white/80 p-4 text-center text-sm font-medium text-secondary">
      <UploadCloud className="mb-2 h-6 w-6 text-primary" />
      {label}
      <span className="mt-1 text-xs font-normal text-slate-500">PDF, JPG, PNG</span>
      <input className="sr-only" name={name} type="file" accept=".pdf,.jpg,.jpeg,.png" />
    </label>
  );
}
