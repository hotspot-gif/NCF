"use client";

import { useState, useEffect } from "react";
import { BarChart3, ClipboardList, Signal } from "lucide-react";
import FeedbackForm from "@/components/FeedbackForm";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const [view, setView] = useState<"form" | "dashboard">("form");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view]);

  return (
    <div className="min-h-screen bg-bg max-w-lg mx-auto relative">
      {/* Header */}
      <header className="sticky top-0 z-50">
        {/* Gradient accent bar */}
        <div className="shimmer-bar h-1" />

        <div className="bg-primary px-5 pt-4 pb-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cms-assets.ldsvcplatform.com/IT/s3fs-public/inline-images/logo_new1.png"
                alt="Lycamobile"
                className="h-7"
              />
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
              <Signal size={10} className="text-accent-green" />
              <span className="text-[9px] text-white/80 font-semibold tracking-wider uppercase">
                TIM Network
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
            </div>
          </div>
          <h1 className="text-white text-lg font-bold leading-tight tracking-tight">
            Network Coverage Feedback
          </h1>
          <p className="text-white/40 text-[11px] mt-0.5 font-medium">
            Sales Team — Post-Migration Report
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-primary-dark flex mx-0 overflow-hidden">
          <button
            onClick={() => setView("form")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold transition-all relative ${
              view === "form"
                ? "bg-bg text-primary"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            <ClipboardList size={14} />
            Submit Report
            {view === "form" && (
              <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-accent-blue rounded-full" />
            )}
          </button>
          <button
            onClick={() => setView("dashboard")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold transition-all relative ${
              view === "dashboard"
                ? "bg-bg text-primary"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            <BarChart3 size={14} />
            View Results
            {view === "dashboard" && (
              <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-accent-blue rounded-full" />
            )}
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="pt-5 pb-8">
        {view === "form" ? <FeedbackForm /> : <Dashboard />}
      </main>

      {/* Footer */}
      <footer className="text-center py-5 border-t border-accent-peach/30 bg-white">
        <div className="flex items-center justify-center gap-2 mb-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cms-assets.ldsvcplatform.com/IT/s3fs-public/2023-09/home_logo.png"
            alt="Lycamobile"
            className="h-4 object-contain opacity-30"
          />
        </div>
        <p className="text-[10px] text-slate-300">
          © {new Date().getFullYear()} Lycamobile Italy — Internal Use Only
        </p>
        <p className="text-[9px] text-slate-200 mt-0.5">
          Network Coverage Feedback System v1.0
        </p>
      </footer>
    </div>
  );
}
