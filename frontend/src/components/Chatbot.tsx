"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { Bot, Loader2, MessageCircle, RotateCcw, Send, Sparkles, X } from "lucide-react";
import { sendChatMessage, type ChatTurn } from "@/lib/api";

type ChatMessage = ChatTurn & { id: number };

const welcomeMessage: ChatMessage = {
  id: 1,
  role: "assistant",
  content:
    "Hi! I'm Smitraj's portfolio assistant. Ask me about his skills, experience, projects, education, or this portfolio.",
};

const suggestions = [
  "Tell me about Smitraj",
  "What are his skills?",
  "Show me his projects",
  "Tell me about his experience",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const requestId = useRef(0);

  useEffect(() => {
    const node = scrollRef.current;
    if (isOpen && node) node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
  }, [isOpen, isLoading, messages]);

  const startNewChat = () => {
    requestId.current += 1;
    setMessages([{ ...welcomeMessage, id: Date.now() }]);
    setInput("");
    setIsLoading(false);
  };

  const sendMessage = async (rawMessage: string) => {
    const content = rawMessage.trim();
    if (!content || isLoading) return;

    const history = messages
      .slice(1)
      .slice(-8)
      .map(({ role, content: text }) => ({ role, content: text }));
    const userMessage: ChatMessage = { id: Date.now(), role: "user", content };
    const currentRequest = ++requestId.current;
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const answer = await sendChatMessage(content, history);
      if (requestId.current === currentRequest) {
        setMessages((current) => [...current, { id: Date.now() + 1, role: "assistant", content: answer }]);
      }
    } catch {
      if (requestId.current === currentRequest) {
        setMessages((current) => [
          ...current,
          {
            id: Date.now() + 1,
            role: "assistant",
            content: "I couldn't connect just now. Please try again in a moment.",
          },
        ]);
      }
    } finally {
      if (requestId.current === currentRequest) setIsLoading(false);
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(input);
    }
  };

  return (
    <>
      {isOpen && (
        <section
          aria-label="Smitraj's portfolio assistant"
          className="chat-window fixed bottom-24 right-3 sm:right-6 z-50 flex h-[min(620px,calc(100dvh-7rem))] w-[calc(100vw-1.5rem)] max-w-[400px] flex-col overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-950 shadow-2xl shadow-black/40 light:border-slate-200 light:bg-white"
          role="dialog"
        >
          <header className="flex items-center justify-between border-b border-slate-800 light:border-slate-200 px-4 py-3.5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400"><Bot className="h-5 w-5" /></span>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold">Portfolio Assistant</h2>
                <p className="flex items-center gap-1.5 text-xs text-slate-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Ask about Smitraj</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button type="button" onClick={startNewChat} aria-label="Start a new chat" title="New chat" className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-brand-400 light:hover:bg-slate-100"><RotateCcw className="h-4 w-4" /></button>
              <button type="button" onClick={() => setIsOpen(false)} aria-label="Close chat" className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white light:hover:bg-slate-100 light:hover:text-slate-900"><X className="h-4 w-4" /></button>
            </div>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4" role="log" aria-live="polite" aria-relevant="additions text">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[88%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-sm leading-6 ${message.role === "user" ? "rounded-br-md bg-brand-600 text-white" : "rounded-bl-md border border-slate-800 bg-slate-900 text-slate-200 light:border-slate-200 light:bg-slate-50 light:text-slate-800"}`}>
                  {message.content}
                </div>
              </div>
            ))}

            {messages.length === 1 && !isLoading && (
              <div className="pt-1">
                <p className="mb-2 text-xs font-medium text-slate-500">Try asking</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <button key={suggestion} type="button" onClick={() => void sendMessage(suggestion)} className="rounded-full border border-slate-700 px-3 py-1.5 text-left text-xs text-slate-300 transition-colors hover:border-brand-500/60 hover:text-brand-300 light:border-slate-300 light:text-slate-700 light:hover:text-brand-700">
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start" aria-label="Assistant is typing">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-slate-800 bg-slate-900 px-4 py-3 light:border-slate-200 light:bg-slate-50">
                  <span className="typing-dot" /><span className="typing-dot typing-dot-delay-1" /><span className="typing-dot typing-dot-delay-2" />
                  <span className="sr-only">Assistant is typing</span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={submit} className="border-t border-slate-800 bg-slate-950/80 p-3 light:border-slate-200 light:bg-white">
            <div className="flex items-end gap-2 rounded-xl border border-slate-700 bg-slate-900 p-2 focus-within:border-brand-500/70 light:border-slate-300 light:bg-slate-50">
              <label className="sr-only" htmlFor="portfolio-chat-input">Message the portfolio assistant</label>
              <textarea
                id="portfolio-chat-input"
                rows={1}
                maxLength={500}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about the portfolio..."
                className="max-h-28 min-h-9 flex-1 resize-y bg-transparent px-1.5 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 light:text-slate-900"
              />
              <button type="submit" disabled={!input.trim() || isLoading} aria-label="Send message" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white transition-colors hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-40">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-slate-500">Answers are based on information in this portfolio.</p>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close portfolio assistant" : "Open portfolio assistant"}
        aria-expanded={isOpen}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-900/40 transition-all hover:scale-105 hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
      >
        {isOpen ? <X className="h-5 w-5" /> : <><MessageCircle className="h-5 w-5" /><Sparkles className="absolute right-3 top-3 h-3 w-3 text-cyan-200" /></>}
      </button>
    </>
  );
}
