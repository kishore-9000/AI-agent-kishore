import React from "react";
import { Bot, Sparkles, Phone, Mail, Calendar, Volume2, VolumeX, CheckCircle2, MapPin } from "lucide-react";
import { KISHORE_PROFILE } from "../data/kishoreProfile";

interface HeaderProps {
  activeTab: "chat" | "profile" | "prescreen";
  setActiveTab: (tab: "chat" | "profile" | "prescreen") => void;
  onOpenSchedule: () => void;
  voiceEnabled: boolean;
  setVoiceEnabled: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSchedule,
  voiceEnabled,
  setVoiceEnabled,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800 text-slate-100">
      {/* Top recruiter highlight ribbon */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-xs font-medium py-1.5 px-4 text-center text-white flex items-center justify-center gap-4 flex-wrap">
        <span className="flex items-center gap-1.5 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Candidate Status: Available Immediately (0-Day Notice)
        </span>
        <span className="hidden sm:inline text-white/50">•</span>
        <span className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-blue-200" />
          Open to Relocate to Bengaluru & Chennai
        </span>
        <span className="hidden md:inline text-white/50">•</span>
        <span className="hidden md:flex items-center gap-1 text-blue-100">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
          Target: QA Automation / SDET (Entry-Level)
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          {/* Agent & Candidate Brand */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-2 ring-indigo-400/40">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-950 rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-slate-100 text-base sm:text-lg tracking-tight flex items-center gap-1.5">
                  Sara
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> AI Recruiter Assistant
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400 truncate max-w-[210px] sm:max-w-none">
                Official Assistant for <strong className="text-slate-200 font-medium">Kishore Reddy</strong> (QA Automation / SDET)
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="hidden lg:flex items-center bg-slate-900/90 border border-slate-800 rounded-xl p-1 text-sm font-medium">
            <button
              onClick={() => setActiveTab("chat")}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === "chat"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              Ask Sara (AI Chat)
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === "profile"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              Kishore's Resume & Projects
            </button>
            <button
              onClick={() => setActiveTab("prescreen")}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === "prescreen"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              Recruiter Match & Prescreen
            </button>
          </div>

          {/* Quick Actions for HR */}
          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              title={voiceEnabled ? "Voice enabled: Sara will read answers aloud" : "Voice muted: Click to enable audio speech"}
              className={`p-2 sm:px-3 sm:py-2 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                voiceEnabled
                  ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/40 hover:bg-indigo-500/30"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              {voiceEnabled ? <Volume2 className="w-4 h-4 text-indigo-400" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden md:inline">{voiceEnabled ? "Voice: On" : "Voice: Off"}</span>
            </button>

            {/* Schedule Interview */}
            <button
              onClick={onOpenSchedule}
              className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-indigo-600/25 border border-indigo-400/30 flex items-center gap-1.5 transition-all active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Interview</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex lg:hidden items-center justify-around py-2 border-t border-slate-900 text-xs font-medium">
          <button
            onClick={() => setActiveTab("chat")}
            className={`py-1.5 px-3 rounded-md transition-colors ${
              activeTab === "chat" ? "text-indigo-400 font-semibold bg-indigo-500/10" : "text-slate-400"
            }`}
          >
            Chat with Sara
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`py-1.5 px-3 rounded-md transition-colors ${
              activeTab === "profile" ? "text-indigo-400 font-semibold bg-indigo-500/10" : "text-slate-400"
            }`}
          >
            Candidate Profile
          </button>
          <button
            onClick={() => setActiveTab("prescreen")}
            className={`py-1.5 px-3 rounded-md transition-colors ${
              activeTab === "prescreen" ? "text-indigo-400 font-semibold bg-indigo-500/10" : "text-slate-400"
            }`}
          >
            Prescreen Match
          </button>
        </div>
      </div>
    </header>
  );
};
