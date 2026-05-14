import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { message } = await request.json();
  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      reply: "I can help with course selection, scholarships, documents, and admissions. For live course and fee data, open Find Courses and then submit an application for consultant review."
    });
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are InAbroad Edupartner's study abroad assistant. Give concise, helpful guidance and direct users to the integrated course finder for exact university, tuition, admission fee, and duration data." },
        { role: "user", content: message }
      ]
    })
  });

  if (!response.ok) {
    return NextResponse.json({ reply: "I am having trouble reaching AI support right now. Please contact the consultant or try again shortly." });
  }

  const data = await response.json();
  return NextResponse.json({ reply: data.choices?.[0]?.message?.content || "Please share your preferred country, course, and qualification level." });
}
