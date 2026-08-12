"use client";

import React, { useState } from 'react';
import NetworkGuide from './pages/NetworkGuide';
import VoLTEGuide from './pages/VoLTEGuide';

type Tab = 'network' | 'volte';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('network');

  return (
    <div className="min-h-screen" style={{ background: '#fff7f2', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <header style={{ background: '#21264e' }} className="sticky top-0 z-50 shadow-2xl">
        <div className="max-w-lg mx-auto px-4 pt-4 pb-0">
          {/* Branding Row */}
          <div className="flex items-center justify-between mb-4">
            {/* Lycamobile Logo */}
            <div className="flex items-center gap-2">
              <img
                src="https://cms-assets.ldsvcplatform.com/IT/s3fs-public/inline-images/logo_new1.png"
                alt="Lycamobile"
                className="h-8 object-contain"
              />
            </div>

            {/* TIM Logo */}
            <div className="flex items-center gap-1.5 bg-white rounded-xl px-3 py-2 shadow-lg">
              <img
                src="https://risorsec.tim.it/content/dam/flytoco-areapubblica-aemfe/tim_it/img/temi/2025/logo_0033A1.png"
                alt="TIM"
                className="h-6 object-contain"
              />
            </div>
          </div>

          {/* Tab navigation */}
          <div className="flex gap-1 p-1 rounded-t-2xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <button
              onClick={() => setActiveTab('network')}
              className="flex-1 py-3 px-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2"
              style={{
                background: activeTab === 'network' ? '#fff7f2' : 'transparent',
                color: activeTab === 'network' ? '#21264e' : 'rgba(255,255,255,0.55)',
                boxShadow: activeTab === 'network' ? '0 2px 12px rgba(0,0,0,0.15)' : 'none',
              }}
            >
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                style={{ color: activeTab === 'network' ? '#245bc1' : 'rgba(255,255,255,0.55)' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
              <span className="whitespace-nowrap">Select Network</span>
            </button>
            <button
              onClick={() => setActiveTab('volte')}
              className="flex-1 py-3 px-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2"
              style={{
                background: activeTab === 'volte' ? '#fff7f2' : 'transparent',
                color: activeTab === 'volte' ? '#21264e' : 'rgba(255,255,255,0.55)',
                boxShadow: activeTab === 'volte' ? '0 2px 12px rgba(0,0,0,0.15)' : 'none',
              }}
            >
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                style={{ color: activeTab === 'volte' ? '#46286E' : 'rgba(255,255,255,0.55)' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="whitespace-nowrap">Enable VoLTE</span>
            </button>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="max-w-lg mx-auto pb-8">
        <div key={activeTab} className="animate-slide-up">
          {activeTab === 'network' ? <NetworkGuide /> : <VoLTEGuide />}
        </div>
      </main>
    </div>
  );
};

export default App;
