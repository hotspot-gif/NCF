"use client";

import React, { useState } from 'react';
import VoLTEMockup from '../components/VoLTEMockup';
import { volteBrands, VoLTEBrand } from '../data/tutorialData';

const VoLTEGuide: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<VoLTEBrand>(volteBrands[0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const totalSteps = selectedBrand.steps.length;
  const isIOS = selectedBrand.id === 'ios';

  const handleBrandSelect = (brand: VoLTEBrand) => {
    setSelectedBrand(brand);
    setCurrentStep(0);
    setCompleted(false);
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
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

  const accentColor = isIOS ? '#245bc1' : '#08dc7d';
  const bgAccent = isIOS ? '#EEF4FF' : '#EAFFF6';

  // Group brands for display
  const iosBrand = volteBrands.find(b => b.id === 'ios')!;
  const androidBrands = volteBrands.filter(b => b.id !== 'ios');

  return (
    <div className="px-4 py-6 space-y-5">
      {/* Hero Banner */}
      <div
        className="rounded-2xl p-5 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #46286E 0%, #21264e 100%)' }}
      >
        <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-10" style={{ background: '#00D7FF' }} />
        <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full opacity-10" style={{ background: '#FFDD64' }} />
        <div className="relative z-10">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <svg className="w-6 h-6 text-[#FFDD64]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-black">Enable VoLTE</h1>
              <p className="text-white/70 text-sm mt-0.5">Voice over LTE – HD call quality</p>
            </div>
          </div>
          <p className="text-white/80 text-sm leading-relaxed">
            VoLTE allows HD-quality calls over 4G/5G. If data works but voice doesn't, enabling VoLTE fixes the issue.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {['HD Voice', 'Faster connect', 'Data + Calls', 'Better quality'].map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(255,221,100,0.2)', color: '#FFDD64' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Device Selector */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-1">Select your device brand</p>

        {/* iOS Option */}
        <div className="mb-2">
          <button
            onClick={() => handleBrandSelect(iosBrand)}
            className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-3 ${
              selectedBrand.id === 'ios'
                ? 'border-[#245bc1]'
                : 'border-gray-200 bg-white'
            }`}
            style={selectedBrand.id === 'ios' ? { background: '#EEF4FF' } : {}}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm flex-shrink-0"
              style={{ background: selectedBrand.id === 'ios' ? '#245bc1' : '#f0f0f0' }}
            >
              🍎
            </div>
            <div className="text-left flex-1">
              <p className={`font-bold text-sm ${selectedBrand.id === 'ios' ? 'text-[#245bc1]' : 'text-gray-700'}`}>
                iPhone (iOS)
              </p>
              <p className="text-xs text-gray-400">Settings → Cellular → VoLTE</p>
            </div>
            {selectedBrand.id === 'ios' && (
              <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#245bc1' }}>
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        </div>

        {/* Android brands */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
            <p className="font-bold text-xs text-gray-500 uppercase tracking-wider">Android Brands</p>
          </div>
          <div className="grid grid-cols-2">
            {androidBrands.map((brand, idx) => {
              const isSelected = selectedBrand.id === brand.id;
              const isLast = idx >= androidBrands.length - 2;
              return (
                <button
                  key={brand.id}
                  onClick={() => handleBrandSelect(brand)}
                  className={`p-3 flex items-center gap-2.5 transition-all text-left ${
                    idx % 2 === 0 ? 'border-r border-gray-100' : ''
                  } ${!isLast ? 'border-b border-gray-100' : ''} ${
                    isSelected ? '' : 'hover:bg-gray-50'
                  }`}
                  style={isSelected ? { background: '#EAFFF6' } : {}}
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                    style={{ background: isSelected ? '#08dc7d' : '#f0f0f0' }}
                  >
                    📱
                  </div>
                  <div>
                    <p className={`font-semibold text-xs leading-tight ${isSelected ? 'text-[#08dc7d]' : 'text-gray-700'}`}>
                      {brand.name.split(' /')[0].split(' –')[0]}
                    </p>
                    {brand.name.includes('/') && (
                      <p className="text-[10px] text-gray-400 leading-tight">
                        {brand.name.split('/ ')[1] || ''}
                      </p>
                    )}
                  </div>
                  {isSelected && (
                    <div className="ml-auto w-4 h-4 rounded-full flex items-center justify-center" style={{ background: '#08dc7d' }}>
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Path breadcrumb */}
      <div
        className="p-3 rounded-xl flex items-center gap-2 flex-wrap"
        style={{ background: bgAccent }}
      >
        <span className="text-xs font-bold text-gray-500">Path:</span>
        {selectedBrand.steps.map((s, idx) => (
          <React.Fragment key={idx}>
            <button
              onClick={() => { setCurrentStep(idx); setCompleted(false); }}
              className="text-xs font-semibold transition-colors"
              style={{ color: idx === currentStep ? accentColor : '#9ca3af' }}
            >
              {s.path.split(' → ').pop()}
            </button>
            {idx < selectedBrand.steps.length - 1 && (
              <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Progress */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Step {currentStep + 1} of {totalSteps}
          </p>
          <p className="text-xs font-bold" style={{ color: accentColor }}>
            {Math.round(((currentStep + 1) / totalSteps) * 100)}% complete
          </p>
        </div>
        <div className="flex gap-1.5">
          {selectedBrand.steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setCurrentStep(idx); setCompleted(false); }}
              className="h-2 rounded-full flex-1 transition-all duration-300"
              style={{ background: idx <= currentStep ? accentColor : '#e5e7eb' }}
            />
          ))}
        </div>
      </div>

      {/* Completed state */}
      {completed ? (
        <div className="space-y-4">
          <div
            className="rounded-2xl p-6 text-center"
            style={{ background: `${accentColor}15`, border: `2px solid ${accentColor}` }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
              style={{ background: accentColor }}
            >
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-black text-[#21264e] mb-1">VoLTE Enabled! 🎉</h3>
            <p className="text-gray-600 text-sm mb-3">
              You can now make HD quality calls on your {selectedBrand.name}.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-bold" style={{ background: accentColor }}>
              <span>VoLTE</span>
              <span className="opacity-70">|</span>
              <span>HD Voice Active</span>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="w-full py-3.5 rounded-2xl font-bold text-white"
            style={{ background: '#21264e' }}
          >
            ↺ Start Again
          </button>

          <VoLTEVerification />
          <VoLTETroubleshooting />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Step card */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            {/* Step header */}
            <div className="px-5 py-4 flex items-center gap-4" style={{ background: bgAccent }}>
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-md flex-shrink-0"
                style={{ background: accentColor }}
              >
                {currentStep + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: accentColor }}>
                    {selectedBrand.name}
                  </span>
                </div>
                <p className="font-black text-[#21264e] text-base">{selectedBrand.steps[currentStep].path.split(' → ').pop()}</p>
                <p className="text-gray-500 text-xs mt-0.5">
                  {selectedBrand.steps[currentStep].path}
                </p>
              </div>
            </div>

            {/* Phone mockup */}
            <div className="py-6 flex items-center justify-center bg-[#f8f9fa]">
              <VoLTEMockup
                brand={selectedBrand.id}
                step={currentStep}
                platform={isIOS ? 'ios' : 'android'}
              />
            </div>

            {/* Instruction */}
            <div className="px-5 py-4">
              <div
                className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background: bgAccent }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: accentColor }}
                >
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#21264e] mb-0.5">
                    {currentStep === totalSteps - 1 ? 'Final Step – Enable VoLTE' : `Go to: ${selectedBrand.steps[currentStep].path.split(' → ').pop()}`}
                  </p>
                  <p className="text-xs text-gray-500">
                    {currentStep === totalSteps - 1
                      ? `Toggle the VoLTE switch to ON (green). This enables HD Voice calls over the 4G network.`
                      : `Navigate to ${selectedBrand.steps[currentStep].path} and tap to continue.`}
                  </p>
                </div>
              </div>

              {/* Highlighted option */}
              {selectedBrand.steps[currentStep].highlight && (
                <div
                  className="mt-3 flex items-center gap-2 p-3 rounded-xl"
                  style={{ background: '#FFFBEB', border: '1px solid #FFDD64' }}
                >
                  <span className="text-[#FFDD64] font-bold">👆</span>
                  <p className="text-xs font-semibold text-gray-700">
                    Tap: <span style={{ color: accentColor }}>{selectedBrand.steps[currentStep].highlight}</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <p className="font-bold text-xs text-gray-500 uppercase tracking-wider mb-2">Requirements</p>
            <div className="space-y-2">
              {selectedBrand.requirements.map((req, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: accentColor }}>
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">{req}</span>
                </div>
              ))}
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
              {currentStep === totalSteps - 1 ? '✓ Enable VoLTE' : 'Next Step →'}
            </button>
          </div>

          {/* Step list */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="font-bold text-[#21264e] text-sm">Navigation Path</p>
            </div>
            {selectedBrand.steps.map((s, idx) => {
              const isDone = idx < currentStep;
              const isActive = idx === currentStep;
              const stepLabel = s.path.split(' → ').pop() || s.path;
              return (
                <button
                  key={idx}
                  onClick={() => { setCurrentStep(idx); setCompleted(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
                    idx < selectedBrand.steps.length - 1 ? 'border-b border-gray-100' : ''
                  } ${isActive ? (isIOS ? 'bg-blue-50' : 'bg-green-50') : 'hover:bg-gray-50'}`}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: isDone || isActive ? accentColor : '#e5e7eb',
                      color: isDone || isActive ? 'white' : '#6b7280',
                    }}
                  >
                    {isDone ? '✓' : idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs font-medium ${isActive ? '' : isDone ? 'text-gray-400' : 'text-gray-700'}`}
                      style={isActive ? { color: accentColor } : {}}>
                      {stepLabel}
                    </p>
                    {idx > 0 && (
                      <p className="text-[10px] text-gray-400">{s.path}</p>
                    )}
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: accentColor }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom info */}
      {!completed && (
        <>
          <VoLTEVerification />
          <VoLTETroubleshooting />
        </>
      )}
    </div>
  );
};

// ─── VoLTE Verification ───────────────────────────────────────────────────────
const VoLTEVerification: React.FC = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
    <h3 className="font-black text-[#21264e] text-sm mb-3">How to verify VoLTE is active</h3>
    <div className="space-y-3">
      <div
        className="p-3 rounded-xl flex items-start gap-3"
        style={{ background: '#EEF4FF' }}
      >
        <span className="text-xl">①</span>
        <div>
          <p className="font-bold text-sm text-[#21264e]">Check the status bar</p>
          <p className="text-xs text-gray-500 mt-0.5">During a call, you should see:</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            {['VoLTE', '4G', 'HD', 'LTE'].map((badge) => (
              <span
                key={badge}
                className="text-xs font-black px-2 py-1 rounded text-white"
                style={{ background: '#245bc1' }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div
        className="p-3 rounded-xl flex items-start gap-3"
        style={{ background: '#EAFFF6' }}
      >
        <span className="text-xl">②</span>
        <div>
          <p className="font-bold text-sm text-[#21264e]">Make a test call</p>
          <p className="text-xs text-gray-500 mt-0.5">
            If the screen stays on 4G/4G+ during the call, VoLTE is working correctly.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// ─── VoLTE Troubleshooting ────────────────────────────────────────────────────
const VoLTETroubleshooting: React.FC = () => (
  <div
    className="rounded-2xl p-4"
    style={{ border: '2px solid #ffc8b2', background: '#FFF5F0' }}
  >
    <div className="flex items-center gap-2 mb-3">
      <span className="text-xl">🔧</span>
      <p className="font-black text-[#21264e] text-sm">VoLTE option not visible?</p>
    </div>
    <div className="space-y-2">
      {[
        'Verify your smartphone is VoLTE compatible',
        'Update your phone software to the latest version',
        'Ensure your Lycamobile SIM is active and working',
        'Check you have 4G coverage in your area',
        'Restart your phone and try again',
        'If the problem persists, contact Lycamobile Customer Service',
      ].map((item, i) => (
        <div key={i} className="flex items-start gap-2">
          <div
            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: '#08dc7d' }}
          >
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-xs text-gray-700">{item}</p>
        </div>
      ))}
    </div>
  </div>
);

export default VoLTEGuide;
