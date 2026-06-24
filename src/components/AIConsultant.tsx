import React, { useState } from "react";
import { ChatMessage, CustomPCBuild } from "../types";
import { Send, Sparkles, MessageSquare, Plus, HelpCircle } from "lucide-react";

interface AIConsultantProps {
  currentBuild: CustomPCBuild;
  chatHistory: ChatMessage[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

export default function AIConsultant({ currentBuild, chatHistory, setChatHistory }: AIConsultantProps) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const starterQuestions = [
    "What is the best GPU for scientific machine learning applications?",
    "Can you troubleshoot a PC that turns on but has no display signal?",
    "Suggest a quiet and highly productive AMD 9000 workstation build.",
    "Does my current custom build require more than an 850W power supply?"
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatHistory: [...chatHistory, userMsg],
          currentBuild
        })
      });

      const data = await response.json();

      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: "bot",
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatHistory((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("AI Assistant error:", error);
      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: "bot",
        text: "We encountered an issue communicating with the AN Computers hardware core on the server. Please verify your connection status.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const importActiveBuild = () => {
    const activePartCount = Object.keys(currentBuild.components).length;
    if (activePartCount === 0) {
      handleSendMessage("I want to build a custom computer, can you recommend some hardware options based on gaming and simulation workloads?");
      return;
    }

    const componentNames = Object.entries(currentBuild.components)
      .map(([type, part]) => part ? `${type.toUpperCase()}: ${part.name}` : "")
      .filter(Boolean)
      .join(", ");

    handleSendMessage(`Review my active custom build configuration and advise on potential bottlenecks or optimization opportunities. Parts: ${componentNames}. Est Total Draw: ${currentBuild.totalWattage}W. Total Cost: $${currentBuild.totalPrice}.`);
  };

  return (
    <div className="py-12 bg-zinc-50 min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="border-b border-zinc-200 pb-5 mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-indigo-600" />
            AI Hardware Consultant
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            Leverage server-side neural hardware models to validate architecture, find bottlenecks, and troubleshoot desktop errors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Quick suggestions sidebar */}
          <div className="space-y-4 lg:col-span-1">
            <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
                <HelpCircle className="h-3.5 w-3.5 text-zinc-500" />
                Inquiry Starters
              </h3>
              
              <div className="space-y-2">
                {starterQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(q)}
                    className="w-full text-left text-[11px] font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 border border-zinc-100 rounded-lg p-2.5 transition-colors leading-relaxed"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={importActiveBuild}
              className="w-full flex items-center justify-center space-x-1.5 rounded-lg border border-dashed border-zinc-300 bg-white hover:bg-zinc-50 py-3 text-xs font-semibold text-zinc-700 transition-colors"
            >
              <Plus className="h-4 w-4 text-zinc-400" />
              <span>Import Configurator Spec</span>
            </button>
          </div>

          {/* Interactive Chat Board */}
          <div className="lg:col-span-3 flex flex-col h-[520px] bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            
            {/* Thread Header */}
            <div className="bg-zinc-900 text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-emerald-400 animate-pulse" />
                <span className="text-xs font-bold font-mono tracking-tight uppercase">AN Labs Core Engine Terminal</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">STATUS: ON-LINE</span>
            </div>

            {/* Conversation Flow */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-zinc-50/50">
              {chatHistory.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] rounded-xl p-4 shadow-xs text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-zinc-900 text-white rounded-tr-none"
                      : "bg-white border border-zinc-200 text-zinc-800 rounded-tl-none whitespace-pre-line"
                  }`}>
                    {/* Render message body */}
                    <div className="font-sans leading-relaxed">{msg.text}</div>
                    <span className="text-[9px] block text-right mt-2 opacity-60 font-mono">{msg.timestamp}</span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-zinc-200 rounded-xl rounded-tl-none p-4 shadow-xs text-xs text-zinc-500 flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-zinc-400 animate-bounce"></span>
                    <span className="h-2 w-2 rounded-full bg-zinc-400 animate-bounce delay-75"></span>
                    <span className="h-2 w-2 rounded-full bg-zinc-400 animate-bounce delay-150"></span>
                    <span className="font-mono text-[10px]">Processing hardware specs...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="border-t border-zinc-200 p-3.5 flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask our architect about bottlenecks, power budgets, or errors..."
                className="flex-1 rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-zinc-900 focus:bg-white text-zinc-800"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="inline-flex items-center justify-center rounded-lg bg-zinc-900 p-2.5 text-white hover:bg-zinc-800 transition-colors disabled:bg-zinc-200 disabled:text-zinc-400"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
}
