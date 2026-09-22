"use client";
import { useState } from "react";
import Link from "next/link";

export default function AIPage() {
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hello! I am your Genesis AI Companion. Need help with math, science, or any homework?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    // Mock AI Response
    setTimeout(() => {
      setMessages([...newMessages, { 
        role: "ai", 
        content: "I am analyzing your question. (API integration will be required to fetch real responses). If you need human help, you can escalate this." 
      }]);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-6 rounded-2xl shadow-lg flex justify-between items-center text-white">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">🧠 AI Study Companion</h2>
          <p className="text-indigo-200 text-sm mt-1">24/7 automated learning support</p>
        </div>
        <Link href="/dashboard/support" className="bg-white text-indigo-900 px-4 py-2 rounded-lg font-bold text-sm hover:bg-indigo-50 transition">
          Ask a Human Teacher
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[600px]">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-sm' 
                  : 'bg-gray-100 text-gray-800 rounded-tl-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
          <form onSubmit={handleSend} className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..." 
              className="flex-1 px-4 py-3 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 bg-white"
            />
            <button type="submit" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}