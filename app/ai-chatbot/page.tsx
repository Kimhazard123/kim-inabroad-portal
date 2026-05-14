"use client";

import { useState } from "react";
import { Bot, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChatbotPage() {
  const [messages, setMessages] = useState([{ role: "assistant", content: "Hi, I am the InAbroad Edupartner AI assistant. Tell me your preferred country, course, and qualification level." }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send(event: React.FormEvent) {
    event.preventDefault();
    if (!input.trim()) return;
    const next = [...messages, { role: "user", content: input }];
    setMessages(next);
    setInput("");
    setLoading(true);
    const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: input }) });
    const data = await response.json();
    setMessages([...next, { role: "assistant", content: data.reply }]);
    setLoading(false);
  }

  return (
    <main className="container-page py-10">
      <div className="glass mx-auto max-w-3xl rounded-2xl p-5">
        <div className="flex items-center gap-3 border-b border-primary/10 pb-4">
          <div className="rounded-xl bg-primary/10 p-3 text-primary"><Bot className="h-6 w-6" /></div>
          <div><h1 className="text-2xl font-bold text-secondary">AI Chatbot Support</h1><p className="text-sm text-slate-600">Course recommendations, scholarship guidance, FAQs, and admissions support.</p></div>
        </div>
        <div className="grid max-h-[52vh] gap-3 overflow-y-auto py-5">
          {messages.map((message, index) => <div key={index} className={`rounded-xl p-3 text-sm leading-6 ${message.role === "assistant" ? "bg-white text-slate-700" : "ml-auto bg-primary text-white"}`}>{message.content}</div>)}
          {loading && <div className="rounded-xl bg-white p-3 text-sm text-slate-500">Typing...</div>}
        </div>
        <form onSubmit={send} className="flex gap-2">
          <input className="focus-ring flex-1 rounded-lg border border-primary/15 px-4 py-3" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about courses, scholarships, documents..." />
          <Button type="submit" size="icon" aria-label="Send"><Send className="h-4 w-4" /></Button>
        </form>
      </div>
    </main>
  );
}
