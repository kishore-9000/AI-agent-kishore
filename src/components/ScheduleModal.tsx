import React, { useState } from "react";
import {
  X,
  Calendar,
  Mail,
  Phone,
  Linkedin,
  Github,
  Copy,
  Check,
  ExternalLink,
  Clock,
  MapPin,
  Send,
} from "lucide-react";
import { KISHORE_PROFILE } from "../data/kishoreProfile";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose }) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<"tech" | "hr" | "custom">("tech");
  const [companyName, setCompanyName] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");

  if (!isOpen) return null;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const getEmailSubject = () => {
    if (selectedTemplate === "tech") {
      return `Interview Invitation: QA Automation Engineer / SDET Role at ${companyName || "[Your Company]"}`;
    }
    return `Interview Discussion: QA Automation Opportunity for Kishore Reddy`;
  };

  const getEmailBody = () => {
    return `Hi Kishore,

We reviewed your profile and projects via your AI Career Assistant (Sara). We are impressed by your hands-on Selenium WebDriver, Page Object Model (POM), and SQL validation background.

We would like to invite you for an interview:
- Position: QA Automation Engineer / SDET (Entry-Level)
- Proposed Date: ${interviewDate || "[Date]"}
- Proposed Time: ${interviewTime || "[Time]"}
- Mode: Online / Video Call

Please let us know if this time works for you, or propose an alternative time.

Looking forward to speaking with you!

Best regards,
${companyName ? companyName + " Recruitment Team" : "Hiring Team"}`;
  };

  const mailtoUrl = `mailto:${KISHORE_PROFILE.email}?subject=${encodeURIComponent(
    getEmailSubject()
  )}&body=${encodeURIComponent(getEmailBody())}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-5 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">Schedule Interview with Kishore Reddy</h2>
            <p className="text-xs text-slate-400">Direct contact information & instant email invitation</p>
          </div>
        </div>

        {/* Quick Contact Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
          <a
            href={`tel:${KISHORE_PROFILE.phone}`}
            className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 transition-colors flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-2 text-slate-200">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>{KISHORE_PROFILE.phone}</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold uppercase">Call Now</span>
          </a>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-200 truncate mr-2">
              <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
              <span className="truncate">{KISHORE_PROFILE.email}</span>
            </div>
            <button
              onClick={() => handleCopy(KISHORE_PROFILE.email, "email")}
              className="text-[10px] text-indigo-300 font-semibold hover:underline shrink-0"
            >
              {copiedType === "email" ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Status reminder */}
        <div className="bg-indigo-950/30 border border-indigo-500/20 p-3 rounded-xl mb-5 text-xs text-indigo-200 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            Notice Period: <strong>Immediate (0 Days)</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            Relocating: <strong>BLR / MAA</strong>
          </span>
        </div>

        {/* Template Form */}
        <div className="space-y-3 mb-5">
          <label className="text-xs font-semibold text-slate-300 block">Generate Interview Invitation Draft</label>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <input
              type="text"
              placeholder="Your Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="date"
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="relative bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 font-mono whitespace-pre-wrap max-h-36 overflow-y-auto">
            {getEmailBody()}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-800">
          <a
            href={mailtoUrl}
            className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-600/30"
          >
            <Send className="w-4 h-4" />
            Launch Email Client (mailto)
          </a>

          <button
            onClick={() => handleCopy(getEmailBody(), "draft")}
            className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            {copiedType === "draft" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedType === "draft" ? "Draft Copied!" : "Copy Draft"}</span>
          </button>
        </div>

        {/* Social Links Footer */}
        <div className="mt-4 pt-3 flex items-center justify-center gap-4 text-xs text-slate-400">
          <a
            href={KISHORE_PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400 flex items-center gap-1 transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5" /> LinkedIn Profile
          </a>
          <span>•</span>
          <a
            href={KISHORE_PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-slate-200 flex items-center gap-1 transition-colors"
          >
            <Github className="w-3.5 h-3.5" /> GitHub Profile
          </a>
        </div>
      </div>
    </div>
  );
};
