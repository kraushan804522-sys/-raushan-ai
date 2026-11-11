import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiKey = (typeof body.apiKey === "string" && body.apiKey.trim()) || process.env.GEMINI_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "Gemini API key missing. Enter it above or add GEMINI_API_KEY in your hosting environment settings." }, { status: 400 });

    const messages = Array.isArray(body.messages) ? body.messages : [];
    const history = messages.slice(-20).filter((m: any) => ["user", "assistant"].includes(m.role) && typeof m.text === "string");
    const last = history.pop();
    if (!last || last.role !== "user") return NextResponse.json({ error: "Please send a message." }, { status: 400 });

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const chat = model.startChat({
      history: history.map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.text }]
      }))
    });
    const result = await chat.sendMessage(last.text);
    return NextResponse.json({ reply: result.response.text() });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Gemini request failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}