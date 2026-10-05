import React, { useState } from "react";
import { Header } from "./components/Header";
import { ChatSara } from "./components/ChatSara";
import { ProfileView } from "./components/ProfileView";
import { PrescreenView } from "./components/PrescreenView";
import { ScheduleModal } from "./components/ScheduleModal";

export default function App() {
  const [activeTab, setActiveTab] = useState<"chat" | "profile" | "prescreen">("chat");
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  // When user clicks "Ask Sara" from Profile or Prescreen view
  const handleAskSara = (prompt: string) => {
    setActiveTab("chat");
    // Dispatch a custom event or let user know
    setTimeout(() => {
      // Find chat input and trigger it or let the user see Sara
      const inputEl = document.querySelector<HTMLInputElement>("input[type='text']");
      if (inputEl) {
        inputEl.value = prompt;
        inputEl.focus();
        // Trigger synthetic input event
        inputEl.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }, 150);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSchedule={() => setIsScheduleOpen(true)}
        voiceEnabled={voiceEnabled}
        setVoiceEnabled={setVoiceEnabled}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pb-8">
        {activeTab === "chat" && (
          <ChatSara
            onOpenSchedule={() => setIsScheduleOpen(true)}
            voiceEnabled={voiceEnabled}
          />
        )}

        {activeTab === "profile" && (
          <ProfileView
            onOpenSchedule={() => setIsScheduleOpen(true)}
            onAskSara={handleAskSara}
          />
        )}

        {activeTab === "prescreen" && (
          <PrescreenView
            onOpenSchedule={() => setIsScheduleOpen(true)}
            onAskSara={handleAskSara}
          />
        )}
      </main>

      {/* Schedule Interview Modal */}
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
      />
    </div>
  );
}
