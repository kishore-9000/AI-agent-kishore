import React, { useState } from "react";
import {
  User,
  Phone,
  Mail,
  Linkedin,
  Github,
  MapPin,
  Calendar,
  Award,
  CheckCircle2,
  FolderGit2,
  Database,
  Code2,
  Layers,
  Terminal,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileCheck,
  AlertCircle,
  Briefcase,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { KISHORE_PROFILE } from "../data/kishoreProfile";

interface ProfileViewProps {
  onOpenSchedule: () => void;
  onAskSara: (prompt: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onOpenSchedule, onAskSara }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedProject, setExpandedProject] = useState<string>("ecommerce-framework");

  const categories = ["All", "Automation Testing", "Programming & Database", "Manual Testing & QA Methodologies", "API Testing & Dev Tools"];

  const filteredSkills =
    selectedCategory === "All"
      ? KISHORE_PROFILE.skillsData
      : KISHORE_PROFILE.skillsData.filter((c) => c.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Candidate Hero Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Available to Join Immediately (0-Day Notice)
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Open to Relocate: Bengaluru, Chennai
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100 tracking-tight">
                {KISHORE_PROFILE.name}
              </h1>
              <p className="text-base sm:text-lg text-indigo-400 font-medium mt-1">
                QA Automation Engineer • Software Test Engineer • SDET (Entry-Level)
              </p>
            </div>

            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              {KISHORE_PROFILE.summary}
            </p>

            {/* Quick Contact & Profile Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs sm:text-sm">
              <a
                href={`tel:${KISHORE_PROFILE.phone}`}
                className="px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700 text-slate-200 transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{KISHORE_PROFILE.phone}</span>
              </a>
              <a
                href={`mailto:${KISHORE_PROFILE.email}`}
                className="px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700 text-slate-200 transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>{KISHORE_PROFILE.email}</span>
              </a>
              <a
                href={KISHORE_PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-blue-300 transition-colors flex items-center gap-2"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
              <a
                href={KISHORE_PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700 text-slate-200 transition-colors flex items-center gap-2"
              >
                <Github className="w-4 h-4 text-slate-300" />
                <span>GitHub ({KISHORE_PROFILE.githubHandle})</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>
          </div>

          {/* Action Callout Box */}
          <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl flex flex-col gap-3 min-w-[260px] w-full lg:w-auto shrink-0 shadow-lg">
            <div className="text-xs text-slate-400">Recruiter Fast-Track</div>
            <div className="text-sm font-semibold text-slate-200">Interested in hiring Kishore?</div>
            <button
              onClick={onOpenSchedule}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              Schedule Interview
            </button>
            <button
              onClick={() => onAskSara("Why should we hire Kishore for our QA / SDET role?")}
              className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Ask Sara: "Why Hire Kishore?"
            </button>
          </div>
        </div>
      </div>

      {/* Proof of Work Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {KISHORE_PROFILE.metrics.map((m, idx) => (
          <div
            key={idx}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center hover:border-indigo-500/40 transition-colors shadow-sm"
          >
            <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              {m.value}
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1">{m.label}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">{m.desc}</div>
          </div>
        ))}
      </div>

      {/* Projects Deep Dive */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-100">Featured QA Projects & Automation Architecture</h2>
          </div>
          <span className="text-xs text-slate-400">Published on GitHub</span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {KISHORE_PROFILE.projects.map((proj) => {
            const isExpanded = expandedProject === proj.id;
            return (
              <div
                key={proj.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 transition-all shadow-md hover:border-slate-700"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                        {proj.role}
                      </span>
                      <span className="text-xs text-slate-400">{proj.period}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-100">{proj.title}</h3>
                    <p className="text-xs sm:text-sm text-indigo-300/90">{proj.tagline}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onAskSara(`Tell me more about Kishore's ${proj.title}`)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Ask Sara
                    </button>
                    <button
                      onClick={() => setExpandedProject(isExpanded ? "" : proj.id)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      title={isExpanded ? "Collapse details" : "Expand details"}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {proj.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-5 pt-4 border-t border-slate-800 space-y-4 text-xs sm:text-sm">
                    <div>
                      <h4 className="font-semibold text-slate-200 mb-2">Key Test Execution & Implementation Highlights:</h4>
                      <ul className="space-y-1.5">
                        {proj.keyHighlights.map((hl, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2 text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-200 mb-2">Technical Architecture:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {proj.architecturePoints.map((arch, aIdx) => (
                          <div
                            key={aIdx}
                            className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-xl"
                          >
                            <span className="font-semibold text-indigo-400 block mb-0.5">{arch.title}</span>
                            <span className="text-slate-300 text-xs leading-relaxed">{arch.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Skills Matrix */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-100">Technical Competencies & QA Skill Matrix</h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white font-semibold shadow-sm"
                    : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSkills.map((cat, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-200 text-sm sm:text-base">{cat.category}</h3>
                <span className="text-[11px] text-slate-400">{cat.skills.length} skills</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => {
                  const isProficient = skill.level === "Proficient";
                  const isHandsOn = skill.level === "Hands-on";

                  return (
                    <div
                      key={sIdx}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 ${
                        isProficient
                          ? "bg-slate-800/90 text-slate-200 border-slate-700"
                          : isHandsOn
                          ? "bg-slate-800/60 text-slate-300 border-slate-750"
                          : "bg-slate-900/70 text-slate-400 border-slate-800"
                      }`}
                    >
                      <span>{skill.name}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-semibold uppercase tracking-wider ${
                          isProficient
                            ? "bg-emerald-500/20 text-emerald-400"
                            : isHandsOn
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-amber-500/20 text-amber-400"
                        }`}
                      >
                        {skill.level}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience, Education & Certifications Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Experience / Training */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-slate-100">QA Experience & Hands-On Training</h2>
          </div>

          {KISHORE_PROFILE.experience.map((exp, idx) => (
            <div key={idx} className="space-y-2 border-l-2 border-indigo-500/60 pl-4 py-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">{exp.role}</h3>
                  <div className="text-xs text-indigo-400 font-medium">{exp.company}</div>
                </div>
                <span className="text-[11px] text-slate-400 font-medium shrink-0">{exp.period}</span>
              </div>
              <div className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                {exp.type}
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 mt-2">
                {exp.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-1.5">
                    <span className="text-indigo-400 mt-0.5">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Education & Certifications */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-bold text-slate-100">Education</h2>
            </div>
            {KISHORE_PROFILE.education.map((edu, idx) => (
              <div key={idx} className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-200 text-sm">{edu.degree}</h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {edu.score}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{edu.institution}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Graduation: {edu.period}</span>
                  <span className="text-indigo-400 font-medium">{edu.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-bold text-slate-100">Certifications</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {KISHORE_PROFILE.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/60 border border-slate-800 p-2.5 rounded-xl flex items-start gap-2"
                >
                  <FileCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-slate-200">{cert.name}</div>
                    <div className="text-[10px] text-slate-400">{cert.issuer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Honest Strengths & Growth Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-slate-100">Key Strengths & Core Differentiators</h3>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm">
            {KISHORE_PROFILE.strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-300">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-slate-100">Transparent Areas to Improve</h3>
          </div>
          <div className="space-y-2.5 text-xs sm:text-sm">
            {KISHORE_PROFILE.areasToImprove.map((item, idx) => (
              <div key={idx} className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-200">{item.area}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium">
                    {item.status}
                  </span>
                </div>
                <p className="text-slate-400 text-xs">{item.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
