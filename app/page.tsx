"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Search, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/stat-card";

const countries = ["UK", "Canada", "Australia", "USA", "Germany", "Malaysia", "UAE", "India"];

export default function HomePage() {
  return (
    <main>
      <section className="container-page grid min-h-[calc(100vh-88px)] items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-2 text-sm font-medium text-secondary">
            <Sparkles className="h-4 w-4 text-primary" />
            AI-powered admissions support
          </div>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight text-secondary sm:text-5xl lg:text-6xl">
            Study Abroad with InAbroad Edupartner
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Search courses, compare universities and fees, upload documents, and track your complete application journey from one secure portal.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/apply">Apply Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/find-courses">Find Courses <Search className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Contact Consultant</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.1 }} className="glass rounded-2xl p-5">
          <div className="rounded-xl bg-gradient-to-br from-secondary to-primary p-6 text-white">
            <GraduationCap className="h-12 w-12" />
            <h2 className="mt-8 text-2xl font-semibold">Premium student portal</h2>
            <p className="mt-3 text-white/80">Connected course finder, document uploads, dashboards, notifications, and AI guidance.</p>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <StatCard value="4-in-1" label="Course, university, tuition, admission finder" />
            <StatCard value="24/7" label="AI chatbot support" />
            <StatCard value="Secure" label="Firebase protected portal" />
          </div>
        </motion.div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Instant course search", "The external course finder is embedded as the portal's primary search and fee comparison system."],
            ["Smart applications", "Adaptive education logic changes document requirements by nationality and degree level."],
            ["Real-time tracking", "Students and admins can follow each status from pending to enrollment."]
          ].map(([title, body]) => (
            <div key={title} className="glass rounded-xl p-6">
              <ShieldCheck className="h-7 w-7 text-primary" />
              <h3 className="mt-5 text-xl font-semibold text-secondary">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-12">
        <div className="flex flex-col gap-5 rounded-2xl bg-secondary p-6 text-white md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Countries available</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {countries.map((country) => <span key={country} className="rounded-full bg-white/10 px-3 py-1 text-sm">{country}</span>)}
            </div>
          </div>
          <Button asChild variant="light">
            <Link href="/universities">View Universities</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
