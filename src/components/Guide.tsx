"use client";

import { useState } from "react";
import { BookOpen, Smartphone, Settings2, RefreshCcw, ArrowRight, ArrowDown } from "lucide-react";
import { translations, type Language } from "@/data/translations";

interface GuideProps {
  language: Language;
}

export default function Guide({ language }: GuideProps) {
  const t = translations[language].guide;
  const [guideType, setGuideType] = useState<"volte" | "manual">("volte");
  const [deviceType, setDeviceType] = useState<"android" | "iphone">("android");

  const renderStepList = (steps: string[]) => (
    <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
      {steps.map((step, index) => (
        <li key={index} className="pl-1">
          {step}
        </li>
      ))}
    </ol>
  );

  const selectedSteps =
    guideType === "volte"
      ? deviceType === "android"
        ? t.androidVoLTESteps
        : t.iphoneVoLTESteps
      : deviceType === "android"
      ? t.androidManualSelectionSteps
      : t.iphoneManualSelectionSteps;

  const guideTitle = guideType === "volte" ? t.voLTETitle : t.manualSelectionTitle;
  const guideSubtitle = guideType === "volte" ? t.voLTEDescription : t.manualSelectionDescription;

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

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setGuideType("volte")}
            className={`rounded-2xl border px-4 py-3 text-left transition-all ${
              guideType === "volte"
                ? "bg-accent-blue/10 border-accent-blue text-accent-blue"
                : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
            }`}
          >
            <div className="flex items-center gap-2 font-semibold mb-1">
              <ArrowRight size={16} />
              {t.voLTETitle}
            </div>
            <p className="text-xs text-slate-500">{t.voLTEDescription}</p>
          </button>

          <button
            type="button"
            onClick={() => setGuideType("manual")}
            className={`rounded-2xl border px-4 py-3 text-left transition-all ${
              guideType === "manual"
                ? "bg-accent-green/10 border-accent-green text-accent-green"
                : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
            }`}
          >
            <div className="flex items-center gap-2 font-semibold mb-1">
              <ArrowDown size={16} />
              {t.manualSelectionTitle}
            </div>
            <p className="text-xs text-slate-500">{t.manualSelectionDescription}</p>
          </button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setDeviceType("android")}
            className={`rounded-2xl border px-4 py-3 text-left transition-all ${
              deviceType === "android"
                ? "bg-accent-purple/10 border-accent-purple text-accent-purple"
                : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
            }`}
          >
            <div className="flex items-center gap-2 font-semibold">
              <Smartphone size={16} />
              {t.androidTitle}
            </div>
          </button>
          <button
            type="button"
            onClick={() => setDeviceType("iphone")}
            className={`rounded-2xl border px-4 py-3 text-left transition-all ${
              deviceType === "iphone"
                ? "bg-accent-yellow/10 border-accent-yellow text-accent-yellow"
                : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
            }`}
          >
            <div className="flex items-center gap-2 font-semibold">
              <Settings2 size={16} />
              {t.iphoneTitle}
            </div>
          </button>
        </div>

        <div className="mt-6 rounded-3xl bg-slate-950 border border-slate-800 p-5 text-white">
          <div className="mb-4 flex items-center justify-between gap-4 rounded-3xl bg-slate-900 p-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">{guideType === "volte" ? t.voLTETitle : t.manualSelectionTitle}</p>
              <h2 className="text-lg font-semibold">{deviceType === "android" ? t.androidTitle : t.iphoneTitle}</h2>
            </div>
            <div className="text-xs text-slate-400">{t.selectNetworkLabel}</div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-slate-900 p-4">
              <p className="text-sm text-slate-300 mb-3">{guideSubtitle}</p>
              {renderStepList(selectedSteps)}
            </div>
            <div className="rounded-3xl bg-slate-900 p-4">
              <div className="h-full rounded-3xl bg-slate-800 p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-slate-700 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">
                    {deviceType === "android" ? "Android UI" : "iOS UI"}
                  </span>
                  <div className="flex gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                  </div>
                </div>
                <div className="space-y-3">
                  {selectedSteps.map((step, index) => (
                    <div key={index} className="rounded-2xl bg-slate-900 border border-slate-700 p-3">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Step {index + 1}</p>
                      <p className="mt-1 text-sm text-slate-200">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-3xl bg-slate-50 p-4 border border-slate-100">
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
  );
}
