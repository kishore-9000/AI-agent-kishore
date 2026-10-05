import React, { useState } from "react";
import {
  CheckSquare,
  Square,
  Sparkles,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Calendar,
  Send,
  ArrowRight,
  ShieldCheck,
  Building,
  MapPin,
  Clock,
  Layers,
} from "lucide-react";
import { KISHORE_PROFILE } from "../data/kishoreProfile";

interface PrescreenViewProps {
  onOpenSchedule: () => void;
  onAskSara: (prompt: string) => void;
}

const COMMON_REQUIREMENTS = [
  { id: "selenium", name: "Selenium WebDriver & Locators", verified: true, proof: "30+ Selenium scripts with XPath & CSS" },
  { id: "java", name: "Core Java (OOP, Collections)", verified: true, proof: "Core Java certified, exception handling, data structures" },
  { id: "pom", name: "Page Object Model (POM)", verified: true, proof: "Implemented scalable POM in E-Commerce project" },
  { id: "testng", name: "TestNG & Assertions", verified: true, proof: "Parallel test execution, DataProvider, annotations" },
  { id: "sql", name: "SQL & Database Validation", verified: true, proof: "Solved 400+ queries (joins, subqueries, DB asserts)" },
  { id: "postman", name: "Postman API Testing", verified: true, proof: "REST endpoints, JSON assertions, HTTP status codes" },
  { id: "manual", name: "Manual Testing & Jira Defect Cycle", verified: true, proof: "20+ test cases, RTM, Jira bug logging at QSpiders" },
  { id: "maven", name: "Maven & Build Management", verified: true, proof: "Dependency management in automation projects" },
  { id: "git", name: "Git & GitHub Version Control", verified: true, proof: "Frameworks & collections published on GitHub" },
  { id: "relocation", name: "Open to Relocate (Bengaluru/Chennai)", verified: true, proof: "Open and ready to relocate immediately" },
  { id: "notice", name: "Immediate Joiner (0-day notice)", verified: true, proof: "Completed training, available to join right away" },
  { id: "jenkins", name: "CI/CD & Jenkins Pipelines", verified: false, proof: "Basics known, actively building practice pipelines" },
];

export const PrescreenView: React.FC<PrescreenViewProps> = ({ onOpenSchedule, onAskSara }) => {
  const [selectedReqs, setSelectedReqs] = useState<string[]>([
    "selenium",
    "java",
    "pom",
    "testng",
    "sql",
    "postman",
    "manual",
    "relocation",
    "notice",
  ]);

  const toggleReq = (id: string) => {
    setSelectedReqs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totalSelected = selectedReqs.length;
  const verifiedCount = selectedReqs.filter((id) => {
    const item = COMMON_REQUIREMENTS.find((r) => r.id === id);
    return item?.verified;
  }).length;

  const matchScore = totalSelected > 0 ? Math.round((verifiedCount / totalSelected) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            Recruiter Prescreen & Match Evaluation
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            Check Kishore's Fit for Your QA / SDET Role
          </h1>
          <p className="text-sm text-slate-300">
            Select the skills and requirements for your opening to calculate Kishore's match score based on verified artifacts, 30+ automation scripts, and 400+ SQL problem solutions.
          </p>
        </div>
      </div>

      {/* Match Scoreboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Score Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400">Match Percentage</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">
                {matchScore}%
              </span>
              <span className="text-xs text-slate-400">
                ({verifiedCount} of {totalSelected} required)
              </span>
            </div>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-2.5 mt-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${matchScore}%` }}
            ></div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <span>Status:</span>
            <span className="font-semibold text-emerald-400 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> High Match for QA Fresher
            </span>
          </div>
        </div>

        {/* Eligibility Snapshot */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <span className="text-xs font-semibold text-slate-400">Eligibility & Logistics</span>
          <div className="space-y-1.5 text-xs text-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-400" /> Notice Period:
              </span>
              <span className="font-semibold text-emerald-400">Immediate (0 Days)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" /> Relocation:
              </span>
              <span className="font-semibold text-blue-300">Bengaluru / Chennai</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-indigo-400" /> Degree:
              </span>
              <span className="font-semibold text-slate-200">BCA (2026, 8.06 CGPA)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-indigo-400" /> Target Level:
              </span>
              <span className="font-semibold text-slate-200">Fresher / Entry SDET</span>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold text-indigo-300">Recruiter Verdict</div>
            <p className="text-xs text-slate-200 mt-1 leading-relaxed">
              Kishore possesses verified hands-on automation and database validation capabilities, ready to contribute from day one.
            </p>
          </div>

          <button
            onClick={onOpenSchedule}
            className="w-full mt-3 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            Proceed to Interview
          </button>
        </div>
      </div>

      {/* Requirement Checkboxes */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-100">Select Job Criteria to Test Against</h2>
          <span className="text-xs text-slate-400">Click to toggle requirements</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {COMMON_REQUIREMENTS.map((req) => {
            const isSelected = selectedReqs.includes(req.id);
            return (
              <div
                key={req.id}
                onClick={() => toggleReq(req.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                  isSelected
                    ? "bg-slate-800/80 border-indigo-500/40 text-slate-100"
                    : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isSelected ? (
                    <CheckSquare className="w-4 h-4 text-indigo-400" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-500" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold">{req.name}</span>
                    {req.verified ? (
                      <span className="text-[10px] px-2 py-0.2 rounded-full font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Verified
                      </span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.2 rounded-full font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        Basics / In Progress
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">{req.proof}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recruiter Evaluation Q&A with Sara */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h2 className="text-base font-bold text-slate-100">Ask Sara Specific Prescreen Questions</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "How does Kishore design a Page Object Model (POM) framework?",
            "What kind of SQL queries and validations has he done?",
            "How does Kishore handle dynamic web elements and waits in Selenium?",
            "Can Kishore join within 2 days if an offer is extended?",
          ].map((prompt, pIdx) => (
            <button
              key={pIdx}
              onClick={() => onAskSara(prompt)}
              className="text-left p-3.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition-all flex items-center justify-between gap-2 group"
            >
              <span>{prompt}</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0 group-hover:translate-x-1 transition-transform" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
