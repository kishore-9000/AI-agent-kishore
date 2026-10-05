import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  Sparkles,
  Volume2,
  VolumeX,
  Copy,
  Check,
  RotateCcw,
  Calendar,
  ExternalLink,
  ChevronRight,
  Globe,
  MessageSquare,
  ShieldCheck,
  CheckCircle,
  Briefcase,
  Code2,
  Clock,
  Link2,
  Award,
  FolderGit2,
} from "lucide-react";
import { ChatMessage, KISHORE_PROFILE } from "../data/kishoreProfile";

interface ChatSaraProps {
  onOpenSchedule: () => void;
  voiceEnabled: boolean;
}

const QUICK_SUGGESTION_CHIPS = [
  {
    label: "Skills",
    query: "What are Kishore's core technical skills and automation tools?",
    icon: Code2,
    color: "text-blue-400",
    border: "border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 hover:border-blue-500/50",
  },
  {
    label: "Experience",
    query: "Tell me about Kishore's QA training and internship experience at QSpiders.",
    icon: Briefcase,
    color: "text-amber-400",
    border: "border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 hover:border-amber-500/50",
  },
  {
    label: "Availability",
    query: "What is Kishore's joining availability, notice period, and relocation preference?",
    icon: Clock,
    color: "text-emerald-400",
    border: "border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 hover:border-emerald-500/50",
  },
  {
    label: "Resume Links",
    query: "Can you share Kishore's resume links, GitHub, LinkedIn, and contact details?",
    icon: Link2,
    color: "text-purple-400",
    border: "border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-500/50",
  },
  {
    label: "Why Hire?",
    query: "Why should we hire Kishore Reddy for our QA Automation / SDET role?",
    icon: Award,
    color: "text-rose-400",
    border: "border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 hover:border-rose-500/50",
  },
  {
    label: "Projects",
    query: "Explain Kishore's E-Commerce Web Application Automation Framework project.",
    icon: FolderGit2,
    color: "text-cyan-400",
    border: "border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 hover:border-cyan-500/50",
  },
];

const INITIAL_MESSAGE: ChatMessage = {
  id: "init-1",
  role: "assistant",
  content: `Hello! I am Sara, the official AI Career Assistant of **Kishore Reddy**.

Kishore is a trained **QA Automation Engineer and SDET fresher** with hands-on expertise in Selenium WebDriver, Core Java, TestNG, SQL data validation, and REST API testing. He has built scalable Page Object Model (POM) frameworks, executed 30+ automation scripts, and solved 400+ SQL practice problems. He is an **immediate joiner (0-day notice)** and is **open to relocate to Bengaluru and Chennai**.

What would you like to know about him — his technical skills, hands-on projects, training at QSpiders, joining availability, or contact details?`,
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
};

export const ChatSara: React.FC<ChatSaraProps> = ({ onOpenSchedule, voiceEnabled }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Handle Speech Synthesis
  const handleSpeak = (text: string, id: string) => {
    if (!("speechSynthesis" in window)) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown symbols for cleaner voice audio
    const cleanText = text
      .replace(/\*\*/g, "")
      .replace(/###/g, "")
      .replace(/[-*]\s/g, "")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    // Pick female or pleasant English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) =>
        (v.name.includes("Female") || v.name.includes("Samantha") || v.name.includes("Zira") || v.name.includes("Google UK English Female") || v.name.includes("Natural")) &&
        v.lang.startsWith("en")
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  // Copy text to clipboard
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Send message
  const handleSend = async (messageText?: string) => {
    const query = (messageText || input).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: "u-" + Date.now(),
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }

      const data = await response.json();
      const assistantReply =
        data.reply ||
        "I'm here to help you know more about Kishore's profile. Would you like to schedule an interview or know anything else about Kishore?";

      const assistantMsg: ChatMessage = {
        id: "a-" + Date.now(),
        role: "assistant",
        content: assistantReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);

      if (voiceEnabled) {
        handleSpeak(assistantReply, assistantMsg.id);
      }
    } catch (err) {
      console.error("Chat error:", err);
      // Resilient fallback so conversation never breaks
      const fallbackReply = `Kishore is a QA Automation Engineer skilled in Selenium WebDriver, Core Java, TestNG, and SQL validation. He is available to join immediately and open to relocate to Bengaluru or Chennai. 

For direct coordination or scheduling an interview, you can reach him directly at +91 9390542261 or kishorreddy9000@gmail.com.

Would you like to schedule an interview or know anything else about Kishore?`;

      const fallbackMsg: ChatMessage = {
        id: "a-" + Date.now(),
        role: "assistant",
        content: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleResetChat = () => {
    window.speechSynthesis?.cancel();
    setSpeakingId(null);
    setMessages([INITIAL_MESSAGE]);
  };

  // Render text with markdown-like parsing (bold, lists, links)
  const renderFormattedText = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      // Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      // Check if bullet point
      const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("• ") || /^\d+\.\s/.test(line.trim());
      const cleanLine = line.replace(/^[-•]\s/, "").replace(/^\d+\.\s/, "");

      // Simple parser for bold **text** and links [text](url)
      const parseSegments = (str: string) => {
        // Regex to split by bold or link
        const parts = str.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s)]+)/g);
        return parts.map((part, pIdx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={pIdx} className="font-semibold text-slate-100">
                {part.slice(2, -2)}
              </strong>
            );
          }
          if (part.startsWith("http://") || part.startsWith("https://")) {
            return (
              <a
                key={pIdx}
                href={part}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-400 hover:text-indigo-300 underline font-medium inline-flex items-center gap-0.5"
              >
                {part.includes("linkedin") ? "LinkedIn Profile" : part.includes("github") ? "GitHub Profile" : part}
                <ExternalLink className="w-3 h-3 inline" />
              </a>
            );
          }
          return part;
        });
      };

      if (isBullet) {
        return (
          <div key={idx} className="flex items-start gap-2 my-1 pl-2">
            <span className="text-indigo-400 font-bold mt-1 text-xs">•</span>
            <div className="flex-1 text-slate-200">{parseSegments(cleanLine)}</div>
          </div>
        );
      }

      return (
        <p key={idx} className="my-1 text-slate-200 leading-relaxed">
          {parseSegments(line)}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] sm:h-[calc(100vh-7rem)] max-w-5xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
      {/* Top Banner with Recruiter Quick Assist Info */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 sm:p-4 mb-3 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-slate-100">Sara • AI Career Assistant</h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Ready to Answer
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
              <Globe className="w-3 h-3 text-indigo-400" />
              Trained exclusively on Kishore Reddy's verified resume & projects • Replies in English, Telugu & Hindi
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={handleResetChat}
            title="Reset conversation"
            className="px-2.5 py-1.5 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Chat</span>
          </button>
          <button
            onClick={onOpenSchedule}
            className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors flex items-center gap-1 shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Connect with Kishore</span>
          </button>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto rounded-2xl bg-slate-950/60 border border-slate-800/80 p-3 sm:p-5 space-y-4 shadow-inner">
        {messages.map((msg) => {
          const isSara = msg.role === "assistant";
          const mentionsInterview =
            isSara &&
            (msg.content.toLowerCase().includes("schedule an interview") ||
              msg.content.toLowerCase().includes("contact kishore") ||
              msg.content.toLowerCase().includes("+91 9390542261"));

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 sm:gap-3.5 ${
                isSara ? "justify-start" : "justify-end"
              }`}
            >
              {isSara && (
                <div className="w-8 h-8 rounded-lg bg-indigo-600/90 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/20 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-3.5 sm:p-4 text-sm transition-all ${
                  isSara
                    ? "bg-slate-900 border border-slate-800/90 text-slate-200 rounded-tl-sm shadow-sm"
                    : "bg-indigo-600 text-white rounded-tr-sm shadow-md shadow-indigo-600/20"
                }`}
              >
                {/* Header label for Sara */}
                {isSara && (
                  <div className="flex items-center justify-between gap-3 pb-2 mb-2 border-b border-slate-800/80 text-[11px] text-slate-400">
                    <span className="font-semibold text-indigo-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Sara (Kishore's Assistant)
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>
                )}

                {/* Formatted Text Content */}
                <div className="text-xs sm:text-sm">
                  {renderFormattedText(msg.content)}
                </div>

                {/* If Sara provides contact details or suggests scheduling an interview, display quick action card */}
                {mentionsInterview && (
                  <div className="mt-3 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 bg-indigo-950/30 -mx-2 -mb-2 p-2.5 rounded-b-xl">
                    <div className="text-xs text-indigo-300 font-medium flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      Ready for Interview Invitation
                    </div>
                    <button
                      onClick={onOpenSchedule}
                      className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-all shadow-sm"
                    >
                      <Calendar className="w-3 h-3" />
                      Schedule Now
                    </button>
                  </div>
                )}

                {/* Message action controls for Sara */}
                {isSara && (
                  <div className="flex items-center justify-end gap-1 mt-2.5 pt-1.5 text-slate-400">
                    <button
                      onClick={() => handleSpeak(msg.content, msg.id)}
                      title={speakingId === msg.id ? "Stop voice" : "Read aloud"}
                      className={`p-1 rounded hover:bg-slate-800 transition-colors ${
                        speakingId === msg.id ? "text-indigo-400 bg-indigo-500/20" : "hover:text-slate-300"
                      }`}
                    >
                      {speakingId === msg.id ? (
                        <VolumeX className="w-3.5 h-3.5" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleCopy(msg.content, msg.id)}
                      title="Copy message"
                      className="p-1 rounded hover:bg-slate-800 hover:text-slate-300 transition-colors"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              {!isSara && (
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex items-start gap-3 justify-start">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-1">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-sm p-4 text-xs text-slate-400 flex items-center gap-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
              </div>
              <span>Sara is reviewing Kishore's verified QA records...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Clickable Quick Suggestion Chips for HR */}
      <div className="py-2.5">
        <div className="flex items-center justify-between mb-1.5 px-0.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Quick HR Prescreen Topics:
          </span>
          <span className="text-[10px] text-slate-500 hidden sm:inline">
            Click any chip to ask Sara instantly
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {QUICK_SUGGESTION_CHIPS.map((chip, idx) => {
            const Icon = chip.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(chip.query)}
                disabled={loading}
                title={chip.query}
                className={`group shrink-0 px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-sm ${chip.border}`}
              >
                <Icon className={`w-3.5 h-3.5 ${chip.color} shrink-0 group-hover:scale-110 transition-transform`} />
                <span className="text-slate-200">{chip.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="mt-1 flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-2xl p-1.5 sm:p-2 focus-within:border-indigo-500/80 transition-all shadow-lg"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Sara about Kishore's Selenium experience, SQL problem count, notice period..."
          className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-2 sm:px-4 sm:py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20 active:scale-95"
        >
          <span className="hidden sm:inline">Ask Sara</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
