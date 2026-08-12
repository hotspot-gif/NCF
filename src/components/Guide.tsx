"use client";

import { BookOpen, Smartphone, Settings2, RefreshCcw, ArrowRight, ArrowDown } from "lucide-react";
import { translations, type Language } from "@/data/translations";

interface GuideProps {
  language: Language;
}

export default function Guide({ language }: GuideProps) {
  const t = translations[language].guide;

  const renderStepList = (steps: string[]) => (
    <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
      {steps.map((step, index) => (
        <li key={index} className="pl-1">
          {step}
        </li>
      ))}
    </ol>
  );

  return (
    <div className="animate-slide-up px-4 space-y-5">
      <div className="bg-bg-card rounded-3xl p-6 shadow-sm border border-accent-peach/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-3xl bg-accent-blue/10 flex items-center justify-center text-accent-blue">
            <BookOpen size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary">{t.title}</h1>
            <p className="text-sm text-slate-500 mt-1">{t.subtitle}</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-700">
          <div className="rounded-3xl bg-slate-50 p-4 border border-slate-100">
            <h2 className="font-semibold text-sm text-primary mb-2">{t.networkIssueTitle}</h2>
            <p>{t.networkIssueDescription}</p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-4 border border-slate-100">
              <div className="flex items-center gap-2 mb-3">
                <Smartphone size={18} className="text-accent-green" />
                <h3 className="font-semibold text-sm text-primary">{t.androidTitle}</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 mb-2">{t.voLTETitle}</p>
                  {renderStepList(t.androidVoLTESteps)}
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 mb-2">{t.manualSelectionTitle}</p>
                  {renderStepList(t.androidManualSelectionSteps)}
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-50 p-4 border border-slate-100">
              <div className="flex items-center gap-2 mb-3">
                <Settings2 size={18} className="text-accent-purple" />
                <h3 className="font-semibold text-sm text-primary">{t.iphoneTitle}</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 mb-2">{t.voLTETitle}</p>
                  {renderStepList(t.iphoneVoLTESteps)}
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 mb-2">{t.manualSelectionTitle}</p>
                  {renderStepList(t.iphoneManualSelectionSteps)}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-50 p-4 border border-slate-100">
            <div className="flex items-start gap-2 mb-3">
              <RefreshCcw size={18} className="text-accent-yellow" />
              <div>
                <h3 className="font-semibold text-sm text-primary">{t.notesTitle}</h3>
                <p className="text-sm text-slate-500 mt-1">{t.voLTEDescription}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-slate-600">
              <p>{t.noteRestart}</p>
              <p>{t.noteVoLTE}</p>
              <p>{t.noteSamsung}</p>
              <p>{t.noteApple}</p>
              <p>{t.noteOtherAndroid}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
