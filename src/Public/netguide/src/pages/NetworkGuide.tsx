"use client";

import React, { useState } from 'react';
import IPhoneMockup from '../components/IPhoneMockup';
import AndroidMockup from '../components/AndroidMockup';
import { iosNetworkSteps, androidNetworkSteps } from '../data/tutorialData';

type Platform = 'ios' | 'android';

const NetworkGuide: React.FC = () => {
  const [platform, setPlatform] = useState<Platform>('ios');
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const steps = platform === 'ios' ? iosNetworkSteps : androidNetworkSteps;
  const step = steps[currentStep];

  const handlePlatformChange = (p: Platform) => {
    setPlatform(p);
    setCurrentStep(0);
    setCompleted(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setCompleted(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setCompleted(false);
  };

  const accentColor = platform === 'ios' ? '#245bc1' : '#08dc7d';

  return (
    <div className="px-4 py-6 space-y-5">
      {/* Hero Banner */}
      <div
        className="rounded-2xl p-5 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #21264e 0%, #46286E 100%)' }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10" style={{ background: '#00D7FF' }} />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-10" style={{ background: '#08dc7d' }} />

        <div className="relative z-10">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <svg className="w-6 h-6 text-[#00D7FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-black leading-tight">Network Problems?</h1>
              <p className="text-white/70 text-sm mt-0.5">Select the TIM network manually</p>
            </div>
          </div>
          <p className="text-white/80 text-sm leading-relaxed">
            If your SIM is not working or data works but voice doesn't, follow this step-by-step guide to manually select the TIM network.
          </p>
          {/* Problem indicators */}
          <div className="flex flex-wrap gap-2 mt-3">
            {['SIM not working', 'No voice calls', 'Network issues'].map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(255,200,178,0.2)', color: '#ffc8b2' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Selector */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-1">Select your device</p>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handlePlatformChange('ios')}
            className={`p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-3 ${
              platform === 'ios'
                ? 'border-[#245bc1] shadow-lg'
                : 'border-gray-200 bg-white'
            }`}
            style={platform === 'ios' ? { background: '#EEF4FF' } : {}}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm"
              style={{ background: platform === 'ios' ? '#245bc1' : '#f0f0f0' }}
            >
              <span>🍎</span>
            </div>
            <div className="text-left">
              <p className={`font-bold text-sm ${platform === 'ios' ? 'text-[#245bc1]' : 'text-gray-700'}`}>iPhone</p>
              <p className="text-xs text-gray-400">iOS</p>
            </div>
            {platform === 'ios' && (
              <div className="ml-auto w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#245bc1' }}>
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>

          <button
            onClick={() => handlePlatformChange('android')}
            className={`p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-3 ${
              platform === 'android'
                ? 'border-[#08dc7d] shadow-lg'
                : 'border-gray-200 bg-white'
            }`}
            style={platform === 'android' ? { background: '#EAFFF6' } : {}}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm"
              style={{ background: platform === 'android' ? '#08dc7d' : '#f0f0f0' }}
            >
              <span>🤖</span>
            </div>
            <div className="text-left">
              <p className={`font-bold text-sm ${platform === 'android' ? 'text-[#1a9e5c]' : 'text-gray-700'}`}>Android</p>
              <p className="text-xs text-gray-400">All brands</p>
            </div>
            {platform === 'android' && (
              <div className="ml-auto w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#08dc7d' }}>
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Step Progress */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Step {currentStep + 1} of {steps.length}
          </p>
          <p className="text-xs font-bold" style={{ color: accentColor }}>
            {Math.round(((currentStep + 1) / steps.length) * 100)}% complete
          </p>
        </div>
        <div className="flex gap-1.5">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setCurrentStep(idx); setCompleted(false); }}
              className="h-2 rounded-full flex-1 transition-all duration-300"
              style={{
                background: idx <= currentStep ? accentColor : '#e5e7eb',
              }}
            />
          ))}
        </div>
      </div>

      {/* Completed State */}
      {completed ? (
        <div className="space-y-4">
          {/* Success card */}
          <div
            className="rounded-2xl p-6 text-center"
            style={{ background: 'linear-gradient(135deg, #08dc7d22, #08dc7d11)', border: '2px solid #08dc7d' }}
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: '#08dc7d' }}>
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-black text-[#21264e] mb-2">Connected to TIM! 🎉</h3>
            <p className="text-gray-600 text-sm">Your device is now manually connected to the TIM network via Lycamobile.</p>
          </div>

          {/* Restart button */}
          <button
            onClick={handleReset}
            className="w-full py-3.5 rounded-2xl font-bold text-white transition-all"
            style={{ background: '#21264e' }}
          >
            ↺ Restart Guide
          </button>

          {/* Important notes */}
          <ImportantNotes platform={platform} />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Step Card */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            {/* Step header */}
            <div
              className="px-5 py-4 flex items-center gap-4"
              style={{ background: platform === 'ios' ? '#EEF4FF' : '#EAFFF6' }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-md flex-shrink-0"
                style={{ background: accentColor }}
              >
                {currentStep + 1}
              </div>
              <div>
                <p className="font-black text-[#21264e] text-base">{step.title}</p>
                <p className="text-gray-500 text-xs mt-0.5">{step.description}</p>
              </div>
            </div>

            {/* Phone mockup */}
            <div
              className="py-6 flex items-center justify-center"
              style={{ background: '#f8f9fa' }}
            >
              {platform === 'ios' ? (
                <IPhoneMockup step={step} stepIndex={currentStep} />
              ) : (
                <AndroidMockup step={step} stepIndex={currentStep} />
              )}
            </div>

            {/* Step instruction */}
            <div className="px-5 py-4">
              <div
                className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background: platform === 'ios' ? '#EEF4FF' : '#EAFFF6' }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: accentColor }}
                >
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{step.description}</p>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex-1 py-3.5 rounded-2xl font-bold text-sm transition-all border-2"
              style={{
                borderColor: currentStep === 0 ? '#e5e7eb' : accentColor,
                color: currentStep === 0 ? '#9ca3af' : accentColor,
                background: 'white',
              }}
            >
              ← Previous
            </button>
            <button
              onClick={handleNext}
              className="flex-[2] py-3.5 rounded-2xl font-bold text-sm text-white transition-all shadow-lg"
              style={{ background: accentColor }}
            >
              {currentStep === steps.length - 1 ? '✓ Complete' : 'Next Step →'}
            </button>
          </div>

          {/* All steps list */}
          <AllStepsList steps={steps} currentStep={currentStep} accentColor={accentColor} onStepClick={(i) => { setCurrentStep(i); setCompleted(false); }} />
        </div>
      )}

      {/* Important notes at the bottom when not completed */}
      {!completed && <ImportantNotes platform={platform} />}
    </div>
  );
};

// ─── All Steps Overview ───────────────────────────────────────────────────────
const AllStepsList: React.FC<{
  steps: typeof iosNetworkSteps;
  currentStep: number;
  accentColor: string;
  onStepClick: (i: number) => void;
}> = ({ steps, currentStep, accentColor, onStepClick }) => (
  <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
    <div className="px-4 py-3 border-b border-gray-100">
      <p className="font-bold text-[#21264e] text-sm">All Steps</p>
    </div>
    {steps.map((s, idx) => {
      const isDone = idx < currentStep;
      const isActive = idx === currentStep;
      return (
        <button
          key={s.id}
          onClick={() => onStepClick(idx)}
          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
            idx < steps.length - 1 ? 'border-b border-gray-100' : ''
          } ${isActive ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{
              background: isDone || isActive ? accentColor : '#e5e7eb',
              color: isDone || isActive ? 'white' : '#6b7280',
            }}
          >
            {isDone ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              idx + 1
            )}
          </div>
          <p className={`text-sm font-medium ${isActive ? 'text-[#245bc1]' : isDone ? 'text-gray-400' : 'text-gray-700'}`}>
            {s.title}
          </p>
          {isActive && (
            <div className="ml-auto">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: accentColor }} />
            </div>
          )}
        </button>
      );
    })}
  </div>
);

// ─── Important Notes ──────────────────────────────────────────────────────────
const ImportantNotes: React.FC<{ platform: Platform }> = ({ platform }) => (
  <div className="space-y-3">
    {/* Important banner */}
    <div
      className="rounded-2xl p-4"
      style={{ border: '2px solid #FFDD64', background: '#FFFBEB' }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="text-2xl flex-shrink-0">⚠️</div>
        <div>
          <p className="font-black text-[#21264e] text-sm">IMPORTANT</p>
          <ul className="mt-2 space-y-1.5">
            {[
              'Data Roaming must be enabled',
              'Wait for network registration to complete',
              'If needed, repeat the manual search',
              ...(platform === 'android' ? ['Enable 2G if available for better compatibility'] : []),
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span style={{ color: '#FFDD64' }} className="font-bold">•</span>
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Roaming toggle visual */}
      <div
        className="flex items-center justify-between p-3 rounded-xl"
        style={{ background: 'rgba(255,255,255,0.7)' }}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">🌐</span>
          <span className="font-semibold text-sm text-[#21264e]">Data Roaming</span>
        </div>
        <div className="relative inline-flex items-center w-12 h-7 rounded-full bg-[#08dc7d]">
          <span className="inline-block w-5 h-5 bg-white rounded-full shadow translate-x-6" />
        </div>
      </div>
      {platform === 'android' && (
        <div
          className="flex items-center justify-between p-3 rounded-xl mt-2"
          style={{ background: 'rgba(255,255,255,0.7)' }}
        >
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm px-1.5 py-0.5 rounded" style={{ background: '#FFDD64', color: '#21264e' }}>2G</span>
            <span className="font-semibold text-sm text-[#21264e]">Allow 2G</span>
          </div>
          <div className="relative inline-flex items-center w-12 h-7 rounded-full bg-[#08dc7d]">
            <span className="inline-block w-5 h-5 bg-white rounded-full shadow translate-x-6" />
          </div>
        </div>
      )}
    </div>

    {/* Restart phone banner */}
    <div
      className="rounded-2xl p-4 flex items-center gap-4"
      style={{ background: '#21264e' }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(255,255,255,0.1)' }}
      >
        <svg className="w-6 h-6 text-[#08dc7d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </div>
      <div>
        <p className="text-white font-bold text-sm">Restart your {platform === 'ios' ? 'iPhone' : 'phone'}</p>
        <p className="text-white/60 text-xs mt-0.5">to complete the network configuration</p>
      </div>
    </div>

    {/* Connected banner */}
    <div
      className="rounded-2xl p-4 flex items-center justify-between"
      style={{ background: '#08dc7d' }}
    >
      <div className="flex items-center gap-3">
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
        <span className="text-white font-bold text-sm">
          {platform === 'ios' ? 'Connected to TIM network' : 'Lycamobile uses the TIM network in Italy'}
        </span>
      </div>
      <div className="flex flex-col gap-0.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex gap-0.5">
            {[0, 1, 2].map((j) => (
              <div key={j} className="w-1.5 h-1.5 rounded-sm bg-[#e30613]" />
            ))}
          </div>
        ))}
        <span className="text-white font-black text-xs text-center">TIM</span>
      </div>
    </div>
  </div>
);

export default NetworkGuide;
