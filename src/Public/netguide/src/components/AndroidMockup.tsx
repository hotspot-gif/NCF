import React from 'react';
import { Step } from '../data/tutorialData';

interface AndroidMockupProps {
  step: Step;
  stepIndex: number;
}

const AndroidMockup: React.FC<AndroidMockupProps> = ({ step }) => {
  const { screen } = step;

  const renderToggle = (active: boolean, highlighted: boolean = false) => (
    <div
      className={`relative inline-flex items-center w-12 h-7 rounded-full transition-colors duration-200 ${
        active ? 'bg-[#08dc7d]' : 'bg-gray-400'
      } ${highlighted ? 'ring-2 ring-[#FFDD64] ring-offset-1' : ''}`}
    >
      <span
        className={`inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${
          active ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </div>
  );

  const renderChevron = () => (
    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );

  const renderContent = () => {
    const items = screen.items || [];

    return (
      <div className="flex flex-col h-full bg-white">
        {/* Android Top Bar */}
        <div className="bg-white px-4 pt-2 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            {screen.backLabel !== undefined && (
              <button className="text-gray-700">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <h2 className="text-[16px] font-medium text-[#1c1c1e]">{screen.title}</h2>
          </div>
        </div>

        {/* Search bar */}
        {screen.searchBar && (
          <div className="px-4 py-2">
            <div className="bg-[#F5F5F5] rounded-full flex items-center gap-2 px-4 py-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-gray-400 text-sm">Search settings</span>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto pb-4">
          {items.map((item, idx) => {
            const isHighlighted = item.highlighted;

            if (item.type === 'header') {
              return (
                <div key={idx} className="px-4 pt-4 pb-1 text-xs font-medium uppercase tracking-wider" style={{ color: '#08dc7d' }}>
                  {item.label}
                </div>
              );
            }

            if (item.type === 'info') {
              return (
                <div key={idx} className="px-4 py-5 text-center border-b border-gray-100">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-7 h-7 border-2 border-[#08dc7d] border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs text-gray-500 mt-1">{item.sublabel}</p>
                  </div>
                </div>
              );
            }

            if (item.type === 'toggle') {
              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between px-4 py-3 border-b border-gray-100 ${
                    isHighlighted ? 'bg-green-50' : ''
                  }`}
                >
                  <div>
                    <p className={`text-[14px] font-medium ${isHighlighted ? 'text-[#08dc7d]' : 'text-[#1c1c1e]'}`}>
                      {item.label}
                    </p>
                    {item.sublabel && <p className="text-xs text-gray-400 mt-0.5">{item.sublabel}</p>}
                  </div>
                  {renderToggle(item.active || false, isHighlighted)}
                </div>
              );
            }

            if (item.type === 'selected') {
              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between px-4 py-3 border-b border-gray-100 ${
                    isHighlighted ? 'bg-green-50' : ''
                  }`}
                >
                  <span className="text-[14px] font-semibold" style={{ color: item.color || '#08dc7d' }}>
                    {item.label}
                  </span>
                  <svg className="w-5 h-5" style={{ color: item.color || '#08dc7d' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              );
            }

            if (item.type === 'network') {
              return (
                <div key={idx} className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <span className="text-[14px] text-[#1c1c1e]">{item.label}</span>
                </div>
              );
            }

            // Default: nav
            return (
              <div
                key={idx}
                className={`flex items-center justify-between px-4 py-3 border-b border-gray-100 ${
                  isHighlighted ? 'bg-green-50' : ''
                }`}
              >
                <div>
                  <p className={`text-[14px] font-medium ${isHighlighted ? 'text-[#08dc7d]' : 'text-[#1c1c1e]'}`}>
                    {item.label}
                  </p>
                  {item.sublabel && <p className="text-xs text-gray-400 mt-0.5">{item.sublabel}</p>}
                </div>
                {renderChevron()}
              </div>
            );
          })}
        </div>

        {/* Android Nav Bar */}
        <div className="flex items-center justify-around px-4 py-2 bg-white border-t border-gray-100">
          <button className="text-gray-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="w-4 h-4 rounded-sm border-2 border-gray-400" />
          <button className="w-4 h-4 rounded-full border-2 border-gray-400" />
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center">
      {/* Android Phone Shell */}
      <div
        className="relative"
        style={{
          width: '255px',
          height: '520px',
        }}
      >
        {/* Outer frame */}
        <div
          className="absolute inset-0 rounded-[36px] shadow-2xl"
          style={{
            background: 'linear-gradient(145deg, #2d2d2d, #1a1a1a)',
            padding: '3px',
          }}
        >
          {/* Inner frame */}
          <div
            className="w-full h-full rounded-[34px] overflow-hidden"
            style={{ background: '#111' }}
          >
            {/* Screen area */}
            <div
              className="absolute overflow-hidden"
              style={{
                top: '10px',
                left: '10px',
                right: '10px',
                bottom: '10px',
                borderRadius: '26px',
                background: 'white',
              }}
            >
              {/* Status bar */}
              <div className="flex items-center justify-between px-4 pt-2 pb-1 bg-white">
                <span className="text-[10px] font-semibold text-gray-800">12:30</span>
                {/* Notch / punch hole */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-2">
                  <div className="bg-black rounded-full" style={{ width: '10px', height: '10px' }} />
                </div>
                <div className="flex items-center gap-1">
                  {/* Signal */}
                  <div className="flex items-end gap-[2px]">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-gray-800 rounded-sm" style={{ width: '2px', height: `${3 + i * 2}px` }} />
                    ))}
                  </div>
                  {/* WiFi */}
                  <svg className="w-3 h-3 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1.75 8.5C4.5 5.7 8.05 4 12 4s7.5 1.7 10.25 4.5L20.5 10.25C18.2 7.95 15.25 6.5 12 6.5S5.8 7.95 3.5 10.25L1.75 8.5zm5 5C8.1 12.1 9.95 11.25 12 11.25s3.9.85 5.25 2.25L18.75 12c-1.8-1.85-4.3-3-6.75-3S5.05 10.15 3.25 12l1.5 1.5zm3.5 3.5c.75-.75 1.75-1.25 2.75-1.25s2 .5 2.75 1.25L12 20l-1.75-2.5z" />
                  </svg>
                  {/* Battery */}
                  <div className="text-[9px] font-medium text-gray-800">100%</div>
                </div>
              </div>

              {/* Screen content */}
              <div className="overflow-hidden" style={{ height: 'calc(100% - 26px)' }}>
                {renderContent()}
              </div>
            </div>

            {/* Side buttons */}
            <div
              className="absolute bg-[#2a2a2a] rounded-r-sm"
              style={{ right: '-3px', top: '100px', width: '3px', height: '40px' }}
            />
            <div
              className="absolute bg-[#2a2a2a] rounded-l-sm"
              style={{ left: '-3px', top: '90px', width: '3px', height: '25px' }}
            />
            <div
              className="absolute bg-[#2a2a2a] rounded-l-sm"
              style={{ left: '-3px', top: '125px', width: '3px', height: '45px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AndroidMockup;
