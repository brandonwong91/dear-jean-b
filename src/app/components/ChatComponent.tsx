"use client";

import { useState } from "react";

export default function ChatComponent() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [userMessage] }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble responding right now. ♡",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white/90 rounded-3xl shadow-lg">
      <div className="h-[400px] overflow-y-auto mb-4 p-4 bg-pink-50 rounded-2xl">
        {messages.length === 0 ? (
          <div className="text-center text-pink-400 py-8">
            Hello! I&apos;m Dear Daniel! Let&apos;s chat! ♡
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-4 ${
                msg.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-3 rounded-2xl ${
                  msg.role === "user" ? "bg-blue-100" : "bg-pink-200"
                } max-w-[80%]`}
              >
                <p className="text-gray-800">{msg.content}</p>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="text-center">
            <div className="inline-block p-3 bg-pink-200 rounded-2xl">
              <p className="text-gray-800">Typing... ♪</p>
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here... ♡"
            className="w-full p-3 rounded-xl border-2 border-pink-200 focus:outline-none focus:border-pink-400 text-gray-400 text-base font-medium tracking-wide"
            disabled={isLoading}
          />
          <span className="absolute right-3 bottom-3 text-sm text-pink-400">
            {input.length} ♪
          </span>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-pink-400 hover:bg-pink-500 text-white rounded-xl transition-colors disabled:opacity-50"
        >
          Send ♡
        </button>
      </form>
    </div>
  );
}
