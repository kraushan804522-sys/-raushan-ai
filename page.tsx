 "use client";
import { useState } from "react";

type Message = { role: "user" | "assistant"; text: string };

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState("");

  async function send(text = prompt) {
    const clean = text.trim();
    if (!clean || busy) return;
    setError("");
    setPrompt("");
    const next = [...messages, { role: "user" as const, text: clean }];
    setMessages(next);
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, apiKey: apiKey.trim() || undefined })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setMessages([...next, { role: "assistant", text: data.reply }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return <div className="shell">
    <aside className="side">
      <div className="brand"><div className="logo">✦</div><div>NOVA <span className="gold">AI</span><div className="muted">PERSONAL ASSISTANT</div></div></div>
      <button className="newchat" onClick={() => { setMessages([]); setError(""); }}>＋ New conversation</button>
      <div className="muted">YOUR AI WORKSPACE</div>
      <div className="sidecard"><strong className="gold">Gemini powered</strong><br/><span className="muted">Ask questions, write, learn, plan, brainstorm and solve problems.</span></div>
    </aside>
    <main className="main">
      <header className="top">
        <div><strong>AI Assistant</strong><div className="muted">A helpful assistant for your everyday tasks</div></div>
        <div className="settings">
          <input aria-label="Gemini API key" type={showKey ? "text" : "password"} placeholder="Gemini API key (optional)" value={apiKey} onChange={e=>setApiKey(e.target.value)} />
          <button className="smallbtn" onClick={()=>setShowKey(!showKey)}>{showKey ? "Hide" : "Show"}</button>
        </div>
      </header>
      {messages.length === 0 ? <section className="welcome">
        <div className="pill">✦ YOUR AI COMPANION</div>
        <h1>What can I help you <span className="gold">with today?</span></h1>
        <p>Ask anything. Get help with ideas, study, writing, coding, planning and more.</p>
        <div className="suggestions">
          {["Explain a difficult topic simply","Write a professional message","Help me build an app","Give me a study plan"].map(s=><button key={s} onClick={()=>send(s)}>✧ &nbsp;{s}</button>)}
        </div>
      </section> : <section className="messages">
        {messages.map((m,i)=><div key={i} className={`msg ${m.role}`}>{m.text}</div>)}
        {busy && <div className="msg assistant muted">Thinking…</div>}
        {error && <div className="error">{error}</div>}
      </section>}
      {messages.length===0 && error && <div className="error" style={{textAlign:"center"}}>{error}</div>}
      <section className="composer">
        <div className="composebox">
          <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Message Nova AI…" />
          <button className="send" disabled={busy || !prompt.trim()} onClick={()=>send()}>{busy ? "…" : "Send"}</button>
        </div>
        <div className="foot">AI can make mistakes. Check important information. Your API key is used only for the chat request.</div>
      </section>
    </main>
  </div>;
}