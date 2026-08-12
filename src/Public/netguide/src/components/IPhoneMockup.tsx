import React from 'react';
import { Step } from '../data/tutorialData';

interface IPhoneMockupProps {
  step: Step;
  stepIndex: number;
}

const IPhoneMockup: React.FC<IPhoneMockupProps> = ({ step }) => {
  const { screen } = step;

  const renderToggle = (active: boolean, highlighted: boolean = false) => (
    <div
      className={`relative inline-flex items-center w-12 h-7 rounded-full transition-colors duration-200 ${
        active ? 'bg-[#08dc7d]' : 'bg-gray-300'
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
    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );

  const renderContent = () => {
    const items = screen.items || [];

    return (
      <div className="flex flex-col h-full bg-[#F2F2F7]">
        {/* iOS Nav Bar */}
        <div className="bg-[#F2F2F7] px-4 py-3 pb-2 relative z-10">
          {screen.backLabel && (
            <button className="flex items-center gap-1 text-[#245bc1] text-sm font-medium mb-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {screen.backLabel}
            </button>
          )}
          <h2 className="text-[17px] font-semibold text-[#1c1c1e] text-center">
            {screen.title}
          </h2>
        </div>

        {/* Search bar for Settings */}
        {screen.type === 'settings_list' && (
          <div className="px-4 pb-2">
            <div className="bg-[#E5E5EA] rounded-[10px] flex items-center gap-2 px-3 py-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-gray-500 text-sm">Search</span>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-4">
          {/* Group items */}
          <div className="bg-white rounded-[10px] overflow-hidden shadow-sm">
            {items.map((item, idx) => {
              const isHighlighted = item.highlighted;
              const isLast = idx === items.length - 1;

              if (item.type === 'header') {
                return (
                  <div key={idx} className="px-4 pt-3 pb-1 text-xs text-gray-500 uppercase tracking-wider font-medium">
                    {item.label}
                  </div>
                );
              }

              if (item.type === 'info') {
                return (
                  <div key={idx} className={`px-4 py-4 text-center ${!isLast ? 'border-b border-gray-100' : ''}`}>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 border-2 border-[#245bc1] border-t-transparent rounded-full animate-spin" />
                      <p className="text-xs text-gray-500">{item.sublabel}</p>
                    </div>
                  </div>
                );
              }

              if (item.type === 'toggle') {
                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between px-4 py-3 ${
                      isHighlighted ? 'bg-[#fff9e6]' : ''
                    } ${!isLast ? 'border-b border-gray-100' : ''}`}
                  >
                    <div>
                      <p className="text-[14px] text-[#1c1c1e] font-medium">{item.label}</p>
                      {item.sublabel && <p className="text-xs text-gray-500">{item.sublabel}</p>}
                    </div>
                    {renderToggle(item.active || false, isHighlighted)}
                  </div>
                );
              }

              if (item.type === 'selected') {
                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between px-4 py-3 ${
                      isHighlighted ? 'bg-blue-50' : ''
                    } ${!isLast ? 'border-b border-gray-100' : ''}`}
                  >
                    <span className="text-[14px] font-semibold" style={{ color: item.color || '#245bc1' }}>
                      {item.label}
                    </span>
                    <svg className="w-5 h-5 text-[#245bc1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                );
              }

              if (item.type === 'network') {
                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between px-4 py-3 ${!isLast ? 'border-b border-gray-100' : ''}`}
                  >
                    <span className="text-[14px] text-[#1c1c1e]">{item.label}</span>
                  </div>
                );
              }

              // Default: nav
              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between px-4 py-3 ${
                    isHighlighted ? 'bg-[#EEF4FF]' : ''
                  } ${!isLast ? 'border-b border-gray-100' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    {isHighlighted && (
                      <svg className="w-5 h-5 text-[#245bc1] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        {item.label === 'Cellular' || item.label === 'Wi-Fi' ? (
                          <path d="M1.75 8.5C4.5 5.7 8.05 4 12 4s7.5 1.7 10.25 4.5L20.5 10.25C18.2 7.95 15.25 6.5 12 6.5S5.8 7.95 3.5 10.25L1.75 8.5zm5 5C8.1 12.1 9.95 11.25 12 11.25s3.9.85 5.25 2.25L18.75 12c-1.8-1.85-4.3-3-6.75-3S5.05 10.15 3.25 12l1.5 1.5zm3.5 3.5c.75-.75 1.75-1.25 2.75-1.25s2 .5 2.75 1.25L12 20l-1.75-2.5z" />
                        ) : item.label === 'Network Selection' ? (
                          <path d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                        ) : item.label === 'Cellular Data Options' ? (
                          <path d="M12 6V4m0 2a2 2 0 100 4 2 2 0 000-4zm0 0C6.477 6 2 9.134 2 13c0 1.059.169 2.079.504 3.051M12 6c5.523 0 10 3.134 10 7 0 1.059-.169 2.079-.504 3.051M12 6l-.001.001M12 6l.001.001m0 0c-3.579 0-6.707 2.146-6.707 4.793 0 1.236.27 2.519.763 3.626m5.944-.827c1.256.861 2.888 1.201 4.514 1.201 3.579 0 6.707-2.146 6.707-4.793 0-1.236-.27-2.519-.763-3.626" />
                        ) : (
                          <path d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                        )}
                      </svg>
                    )}
                    <div>
                      <p className={`text-[14px] ${isHighlighted ? 'text-[#245bc1] font-semibold' : 'text-[#1c1c1e]'}`}>
                        {item.label}
                      </p>
                      {item.sublabel && <p className="text-xs text-gray-500">{item.sublabel}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {item.value && <span className="text-sm text-gray-400">{item.value}</span>}
                    {renderChevron()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center">
      {/* iPhone 14 Pro Shell */}
      <div
        className="relative"
        style={{
          width: '260px',
          height: '530px',
        }}
      >
        {/* Outer frame */}
        <div
          className="absolute inset-0 rounded-[48px] shadow-2xl"
          style={{
            background: 'linear-gradient(145deg, #d0d0d5, #a8a8ae)',
            padding: '3px',
          }}
        >
          {/* Inner frame */}
          <div
            className="w-full h-full rounded-[45px] overflow-hidden"
            style={{ background: '#1a1a1a' }}
          >
            {/* Screen area */}
            <div
              className="absolute overflow-hidden"
              style={{
                top: '12px',
                left: '12px',
                right: '12px',
                bottom: '12px',
                borderRadius: '38px',
                background: '#F2F2F7',
              }}
            >
              {/* Status bar */}
              <div className="flex items-center justify-between px-6 pt-3 pb-1 bg-[#F2F2F7] relative z-10">
                <span className="text-[11px] font-semibold text-[#1c1c1e]">09:41</span>
                <div className="absolute left-1/2 transform -translate-x-1/2 top-2">
                  {/* Dynamic Island */}
                  <div className="bg-black rounded-full" style={{ width: '80px', height: '22px' }} />
                </div>
                <div className="flex items-center gap-1">
                  {/* Signal */}
                  <div className="flex items-end gap-[2px]">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-[#1c1c1e] rounded-sm" style={{ width: '3px', height: `${4 + i * 2}px` }} />
                    ))}
                  </div>
                  {/* WiFi */}
                  <svg className="w-3.5 h-3.5 text-[#1c1c1e]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1.75 8.5C4.5 5.7 8.05 4 12 4s7.5 1.7 10.25 4.5L20.5 10.25C18.2 7.95 15.25 6.5 12 6.5S5.8 7.95 3.5 10.25L1.75 8.5zm5 5C8.1 12.1 9.95 11.25 12 11.25s3.9.85 5.25 2.25L18.75 12c-1.8-1.85-4.3-3-6.75-3S5.05 10.15 3.25 12l1.5 1.5zm3.5 3.5c.75-.75 1.75-1.25 2.75-1.25s2 .5 2.75 1.25L12 20l-1.75-2.5z" />
                  </svg>
                  {/* Battery */}
                  <div className="flex items-center">
                    <div className="relative border border-[#1c1c1e] rounded-sm" style={{ width: '22px', height: '11px' }}>
                      <div className="absolute inset-[2px] left-[2px] right-[4px] bg-[#1c1c1e] rounded-sm" />
                    </div>
                    <div className="bg-[#1c1c1e] rounded-r-sm ml-[1px]" style={{ width: '2px', height: '5px' }} />
                  </div>
                </div>
              </div>

              {/* Screen content */}
              <div className="flex-1 overflow-hidden" style={{ height: 'calc(100% - 42px)' }}>
                {renderContent()}
              </div>
            </div>

            {/* Side buttons */}
            {/* Volume up */}
            <div
              className="absolute bg-[#b0b0b5] rounded-l-sm"
              style={{ left: '-4px', top: '90px', width: '4px', height: '28px' }}
            />
            {/* Volume down */}
            <div
              className="absolute bg-[#b0b0b5] rounded-l-sm"
              style={{ left: '-4px', top: '128px', width: '4px', height: '28px' }}
            />
            {/* Power */}
            <div
              className="absolute bg-[#b0b0b5] rounded-r-sm"
              style={{ right: '-4px', top: '110px', width: '4px', height: '50px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPhoneMockup;
