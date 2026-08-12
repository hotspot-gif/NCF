import React from 'react';

interface VoLTEMockupProps {
  brand: string;
  step: number;
  platform: 'ios' | 'android';
}

interface ScreenConfig {
  title: string;
  backLabel?: string;
  items: Array<{
    label: string;
    sublabel?: string;
    value?: string;
    type: 'nav' | 'toggle' | 'header' | 'section';
    active?: boolean;
    highlighted?: boolean;
  }>;
}

const getScreenConfig = (brand: string, stepIndex: number): ScreenConfig => {
  const configs: Record<string, ScreenConfig[]> = {
    ios: [
      {
        title: 'Settings',
        items: [
          { label: 'Wi-Fi', value: 'TIM', type: 'nav' },
          { label: 'Bluetooth', value: 'On', type: 'nav' },
          { label: 'Cellular', type: 'nav', highlighted: true },
          { label: 'Personal Hotspot', value: 'Off', type: 'nav' },
          { label: 'Notifications', type: 'nav' },
          { label: 'Sounds & Haptics', type: 'nav' },
        ],
      },
      {
        title: 'Cellular',
        backLabel: 'Settings',
        items: [
          { label: 'Cellular Data', type: 'toggle', active: true },
          { label: 'Cellular Data Options', type: 'nav', highlighted: true },
          { label: 'Network Selection', type: 'nav' },
          { label: 'Carrier Services', type: 'nav' },
          { label: 'SIM PIN', type: 'nav' },
          { label: 'Wi-Fi Calling', value: 'Off', type: 'nav' },
          { label: 'VoLTE', type: 'toggle', active: false },
        ],
      },
      {
        title: 'Cellular Data Options',
        backLabel: 'Cellular',
        items: [
          { label: 'Voice & Data', value: 'LTE', type: 'nav', highlighted: true },
          { label: 'Data Roaming', type: 'toggle', active: true },
          { label: 'Wi-Fi Assist', type: 'toggle', active: true },
          { label: 'Low Data Mode', type: 'toggle', active: false },
        ],
      },
      {
        title: 'Voice & Data',
        backLabel: 'Cellular Data Options',
        items: [
          { label: '5G Auto', type: 'nav' },
          { label: '5G On', type: 'nav' },
          { label: 'LTE', type: 'nav' },
          { label: 'Enable VoLTE', type: 'toggle', active: false, highlighted: true },
        ],
      },
      {
        title: 'Voice & Data',
        backLabel: 'Cellular Data Options',
        items: [
          { label: '5G Auto', type: 'nav' },
          { label: '5G On', type: 'nav' },
          { label: 'LTE', type: 'nav' },
          { label: 'Enable VoLTE', type: 'toggle', active: true, highlighted: true },
        ],
      },
    ],
    samsung: [
      {
        title: 'Settings',
        items: [
          { label: 'Connections', type: 'nav', highlighted: true },
          { label: 'Sounds and vibration', type: 'nav' },
          { label: 'Notifications', type: 'nav' },
          { label: 'Display', type: 'nav' },
          { label: 'Wallpaper and style', type: 'nav' },
          { label: 'Themes', type: 'nav' },
        ],
      },
      {
        title: 'Connections',
        backLabel: '',
        items: [
          { label: 'Wi-Fi', type: 'toggle', active: true },
          { label: 'Bluetooth', type: 'toggle', active: true },
          { label: 'Offline mode', type: 'toggle', active: false },
          { label: 'Mobile networks', type: 'nav', highlighted: true },
          { label: 'Data usage', type: 'nav' },
          { label: 'SIM manager', type: 'nav' },
          { label: 'Mobile Hotspot and Tethering', type: 'nav' },
        ],
      },
      {
        title: 'Mobile networks',
        backLabel: '',
        items: [
          { label: 'Mobile data', type: 'toggle', active: true },
          { label: 'International data roaming', type: 'toggle', active: false },
          { label: 'App data usage', type: 'nav' },
          { label: 'SIM manager', type: 'nav' },
          { label: 'Router Wi-Fi and tethering', type: 'nav' },
          { label: 'More settings', type: 'nav', highlighted: true },
        ],
      },
      {
        title: 'More settings',
        backLabel: '',
        items: [
          { label: 'VoLTE Calls', sublabel: 'Use LTE network for calls when available', type: 'toggle', active: false, highlighted: true },
          { label: 'Wi-Fi Calling', type: 'toggle', active: false },
          { label: 'Network mode', value: 'LTE/3G/2G', type: 'nav' },
          { label: 'Network operators', type: 'nav' },
        ],
      },
      {
        title: 'More settings',
        backLabel: '',
        items: [
          { label: 'VoLTE Calls', sublabel: 'Use LTE network for calls when available', type: 'toggle', active: true, highlighted: true },
          { label: 'Wi-Fi Calling', type: 'toggle', active: false },
          { label: 'Network mode', value: 'LTE/3G/2G', type: 'nav' },
          { label: 'Network operators', type: 'nav' },
        ],
      },
    ],
    xiaomi: [
      {
        title: 'Settings',
        items: [
          { label: 'SIM cards & mobile networks', type: 'nav', highlighted: true },
          { label: 'Wi-Fi', type: 'nav' },
          { label: 'Bluetooth & device connection', type: 'nav' },
          { label: 'Apps', type: 'nav' },
          { label: 'Notifications & Control center', type: 'nav' },
        ],
      },
      {
        title: 'SIM cards & mobile networks',
        backLabel: '',
        items: [
          { label: 'SIM 1', sublabel: 'Lycamobile', type: 'nav', highlighted: true },
          { label: 'SIM 2', sublabel: 'Not set', type: 'nav' },
          { label: 'Dual SIM settings', type: 'nav' },
          { label: 'Data SIM', value: 'SIM 1', type: 'nav' },
        ],
      },
      {
        title: 'SIM 1 – Lycamobile',
        backLabel: '',
        items: [
          { label: 'Mobile data', type: 'toggle', active: true },
          { label: 'Dual 4G', type: 'toggle', active: true },
          { label: 'VoLTE', sublabel: 'Use VoLTE to improve call quality', type: 'toggle', active: false, highlighted: true },
          { label: 'Preferred network type', value: '5G/4G/3G/2G', type: 'nav' },
          { label: 'Roaming', type: 'nav' },
        ],
      },
      {
        title: 'SIM 1 – Lycamobile',
        backLabel: '',
        items: [
          { label: 'Mobile data', type: 'toggle', active: true },
          { label: 'Dual 4G', type: 'toggle', active: true },
          { label: 'VoLTE', sublabel: 'Use VoLTE to improve call quality', type: 'toggle', active: true, highlighted: true },
          { label: 'Preferred network type', value: '5G/4G/3G/2G', type: 'nav' },
          { label: 'Roaming', type: 'nav' },
        ],
      },
    ],
    huawei: [
      {
        title: 'Settings',
        items: [
          { label: 'Mobile network', type: 'nav', highlighted: true },
          { label: 'Wi-Fi', type: 'nav' },
          { label: 'Bluetooth', type: 'nav' },
          { label: 'Screen & display', type: 'nav' },
          { label: 'Sound', type: 'nav' },
        ],
      },
      {
        title: 'Mobile network',
        backLabel: '',
        items: [
          { label: 'Aeroplane mode', type: 'toggle', active: false },
          { label: 'Mobile data', type: 'toggle', active: true },
          { label: 'SIM management', type: 'nav' },
          { label: 'Personal hotspot', type: 'nav' },
          { label: 'Data usage', type: 'nav' },
          { label: 'More settings', type: 'nav', highlighted: true },
        ],
      },
      {
        title: 'More settings',
        backLabel: '',
        items: [
          { label: 'VoLTE Calls', sublabel: 'Use 4G LTE for HD calls', type: 'toggle', active: false, highlighted: true },
          { label: 'Wi-Fi Calling', type: 'toggle', active: false },
          { label: 'Preferred network type', value: '4G/3G/2G', type: 'nav' },
          { label: 'Access point names', type: 'nav' },
        ],
      },
      {
        title: 'More settings',
        backLabel: '',
        items: [
          { label: 'VoLTE Calls', sublabel: 'Use 4G LTE for HD calls', type: 'toggle', active: true, highlighted: true },
          { label: 'Wi-Fi Calling', type: 'toggle', active: false },
          { label: 'Preferred network type', value: '4G/3G/2G', type: 'nav' },
          { label: 'Access point names', type: 'nav' },
        ],
      },
    ],
    oppo: [
      {
        title: 'Settings',
        items: [
          { label: 'SIM card & mobile data', type: 'nav', highlighted: true },
          { label: 'Wi-Fi', type: 'nav' },
          { label: 'Bluetooth & device connection', type: 'nav' },
          { label: 'Notifications & status bar', type: 'nav' },
          { label: 'Sound & vibration', type: 'nav' },
        ],
      },
      {
        title: 'SIM card & mobile data',
        backLabel: '',
        items: [
          { label: 'SIM card info & settings', type: 'section' },
          { label: 'SIM 1', sublabel: 'Lycamobile', type: 'nav', highlighted: true },
          { label: 'SIM 2', sublabel: 'Not set', type: 'nav' },
          { label: 'General settings', type: 'section' },
          { label: 'Mobile data', type: 'toggle', active: true },
        ],
      },
      {
        title: 'SIM 1 – Lycamobile',
        backLabel: '',
        items: [
          { label: 'Preferred network type', value: '4G', type: 'nav' },
          { label: 'VoLTE', sublabel: 'Make HD quality calls via 4G', type: 'toggle', active: false, highlighted: true },
          { label: 'Wi-Fi Calling', type: 'toggle', active: false },
          { label: 'Data roaming', type: 'toggle', active: false },
          { label: 'Access point names', type: 'nav' },
        ],
      },
      {
        title: 'SIM 1 – Lycamobile',
        backLabel: '',
        items: [
          { label: 'Preferred network type', value: '4G', type: 'nav' },
          { label: 'VoLTE', sublabel: 'Make HD quality calls via 4G', type: 'toggle', active: true, highlighted: true },
          { label: 'Wi-Fi Calling', type: 'toggle', active: false },
          { label: 'Data roaming', type: 'toggle', active: false },
          { label: 'Access point names', type: 'nav' },
        ],
      },
    ],
    oneplus: [
      {
        title: 'Settings',
        items: [
          { label: 'SIM & network settings', type: 'nav', highlighted: true },
          { label: 'Wi-Fi & internet', type: 'nav' },
          { label: 'Bluetooth & device connection', type: 'nav' },
          { label: 'Display', type: 'nav' },
          { label: 'Sound & vibration', type: 'nav' },
        ],
      },
      {
        title: 'SIM & network settings',
        backLabel: '',
        items: [
          { label: 'SIM 1', sublabel: 'Lycamobile', type: 'nav', highlighted: true },
          { label: 'SIM 2', sublabel: 'No SIM', type: 'nav' },
          { label: 'Cellular data', type: 'toggle', active: true },
          { label: 'Mobile data', type: 'toggle', active: true },
        ],
      },
      {
        title: 'SIM 1 – Lycamobile',
        backLabel: '',
        items: [
          { label: 'Preferred network type', value: '4G', type: 'nav' },
          { label: 'VoLTE', sublabel: 'Use VoLTE when available', type: 'toggle', active: false, highlighted: true },
          { label: 'Wi-Fi Calling', type: 'toggle', active: false },
          { label: 'Data roaming', type: 'toggle', active: false },
          { label: 'Network operators', type: 'nav' },
        ],
      },
      {
        title: 'SIM 1 – Lycamobile',
        backLabel: '',
        items: [
          { label: 'Preferred network type', value: '4G', type: 'nav' },
          { label: 'VoLTE', sublabel: 'Use VoLTE when available', type: 'toggle', active: true, highlighted: true },
          { label: 'Wi-Fi Calling', type: 'toggle', active: false },
          { label: 'Data roaming', type: 'toggle', active: false },
          { label: 'Network operators', type: 'nav' },
        ],
      },
    ],
    pixel: [
      {
        title: 'Settings',
        items: [
          { label: 'Network & internet', type: 'nav', highlighted: true },
          { label: 'Connected devices', type: 'nav' },
          { label: 'Apps', type: 'nav' },
          { label: 'Notifications', type: 'nav' },
          { label: 'Battery', type: 'nav' },
        ],
      },
      {
        title: 'Network & internet',
        backLabel: '',
        items: [
          { label: 'Internet', sublabel: 'Lycamobile', type: 'nav' },
          { label: 'Calls & SMS', sublabel: 'Lycamobile', type: 'nav' },
          { label: 'Mobile network', type: 'nav', highlighted: true },
          { label: 'Hotspot & tethering', type: 'nav' },
          { label: 'Data Saver', sublabel: 'Off', type: 'nav' },
          { label: 'VPN', type: 'nav' },
        ],
      },
      {
        title: 'Mobile network',
        backLabel: '',
        items: [
          { label: 'Mobile data', type: 'toggle', active: true },
          { label: 'Roaming', type: 'toggle', active: false },
          { label: 'App data usage', type: 'nav' },
          { label: 'Calls', type: 'nav', highlighted: true },
          { label: 'Preferred network type', value: '4G', type: 'nav' },
        ],
      },
      {
        title: 'Calls',
        backLabel: '',
        items: [
          { label: 'Calls (VoLTE)', sublabel: 'Prefer su 4G (VoLTE)', type: 'toggle', active: false, highlighted: true },
          { label: 'Wi-Fi Calling', type: 'toggle', active: false },
        ],
      },
      {
        title: 'Calls',
        backLabel: '',
        items: [
          { label: 'Calls (VoLTE)', sublabel: 'Prefer su 4G (VoLTE)', type: 'toggle', active: true, highlighted: true },
          { label: 'Wi-Fi Calling', type: 'toggle', active: false },
        ],
      },
    ],
    motorola: [
      {
        title: 'Settings',
        items: [
          { label: 'Mobile network', type: 'nav', highlighted: true },
          { label: 'Wi-Fi', type: 'nav' },
          { label: 'Connected devices', type: 'nav' },
          { label: 'Apps', type: 'nav' },
          { label: 'Notifications', type: 'nav' },
        ],
      },
      {
        title: 'Mobile network',
        backLabel: '',
        items: [
          { label: 'Mobile data', type: 'toggle', active: true, sublabel: 'Access data via mobile network' },
          { label: 'Roaming', sublabel: 'Connect to data while roaming', type: 'toggle', active: false },
          { label: 'App data', type: 'nav', sublabel: '0 B data mobile used' },
          { label: 'VoLTE (Advanced options)', type: 'nav', highlighted: true },
        ],
      },
      {
        title: 'VoLTE (Advanced options)',
        backLabel: '',
        items: [
          { label: 'VoLTE', sublabel: 'Use LTE to improve call quality', type: 'toggle', active: false, highlighted: true },
          { label: 'Preferred network type', value: '4G (recommended)', type: 'nav' },
          { label: 'Network operators', type: 'nav' },
          { label: 'Access point names', type: 'nav' },
        ],
      },
      {
        title: 'VoLTE (Advanced options)',
        backLabel: '',
        items: [
          { label: 'VoLTE', sublabel: 'Use LTE to improve call quality', type: 'toggle', active: true, highlighted: true },
          { label: 'Preferred network type', value: '4G (recommended)', type: 'nav' },
          { label: 'Network operators', type: 'nav' },
          { label: 'Access point names', type: 'nav' },
        ],
      },
    ],
    vivo: [
      {
        title: 'Settings',
        items: [
          { label: 'SIM card & mobile network', type: 'nav', highlighted: true },
          { label: 'Wi-Fi', type: 'nav' },
          { label: 'Bluetooth & device connection', type: 'nav' },
          { label: 'Sound & vibration', type: 'nav' },
          { label: 'Display & brightness', type: 'nav' },
        ],
      },
      {
        title: 'SIM card & mobile network',
        backLabel: '',
        items: [
          { label: 'SIM 1', sublabel: 'Lycamobile', type: 'nav', highlighted: true },
          { label: 'SIM 2', sublabel: 'Not set', type: 'nav' },
          { label: 'Mobile data', type: 'toggle', active: true },
          { label: 'Dual SIM settings', type: 'nav' },
        ],
      },
      {
        title: 'SIM 1 – Lycamobile',
        backLabel: '',
        items: [
          { label: 'Mobile data', type: 'toggle', active: true },
          { label: 'Data roaming', type: 'toggle', active: false },
          { label: 'VoLTE HD', sublabel: 'Use VoLTE to improve call quality', type: 'toggle', active: false, highlighted: true },
          { label: 'Network type', value: '4G (preferred)', type: 'nav' },
          { label: 'Network operators', type: 'nav' },
        ],
      },
      {
        title: 'SIM 1 – Lycamobile',
        backLabel: '',
        items: [
          { label: 'Mobile data', type: 'toggle', active: true },
          { label: 'Data roaming', type: 'toggle', active: false },
          { label: 'VoLTE HD', sublabel: 'Use VoLTE to improve call quality', type: 'toggle', active: true, highlighted: true },
          { label: 'Network type', value: '4G (preferred)', type: 'nav' },
          { label: 'Network operators', type: 'nav' },
        ],
      },
    ],
    nokia: [
      {
        title: 'Settings',
        items: [
          { label: 'Mobile network', type: 'nav', highlighted: true },
          { label: 'Wi-Fi', type: 'nav' },
          { label: 'Connected devices', type: 'nav' },
          { label: 'Apps & notifications', type: 'nav' },
          { label: 'Battery', type: 'nav' },
        ],
      },
      {
        title: 'Mobile network',
        backLabel: '',
        items: [
          { label: 'Mobile data', type: 'toggle', active: true, sublabel: 'Access data via mobile network' },
          { label: 'Roaming', sublabel: 'Connect to data while roaming', type: 'toggle', active: false },
          { label: 'App data', sublabel: '0 B data mobile used', type: 'nav' },
          { label: 'Calls (VoLTE)', type: 'nav', highlighted: true },
          { label: 'Preferred network type', value: '4G (recommended)', type: 'nav' },
        ],
      },
      {
        title: 'Calls (VoLTE)',
        backLabel: '',
        items: [
          { label: 'Calls (VoLTE)', sublabel: 'Use 4G for calls', type: 'toggle', active: false, highlighted: true },
          { label: 'Wi-Fi Calling', type: 'toggle', active: false },
        ],
      },
      {
        title: 'Calls (VoLTE)',
        backLabel: '',
        items: [
          { label: 'Calls (VoLTE)', sublabel: 'Use 4G for calls', type: 'toggle', active: true, highlighted: true },
          { label: 'Wi-Fi Calling', type: 'toggle', active: false },
        ],
      },
    ],
  };

  const brandConfigs = configs[brand] || configs['samsung'];
  return brandConfigs[Math.min(stepIndex, brandConfigs.length - 1)];
};

const VoLTEMockup: React.FC<VoLTEMockupProps> = ({ brand, step, platform }) => {
  const config = getScreenConfig(brand, step);
  const isIOS = platform === 'ios';

  const renderToggle = (active: boolean, highlighted: boolean = false) => (
    <div
      className={`relative inline-flex items-center w-11 h-6 rounded-full transition-colors ${
        active ? (isIOS ? 'bg-[#08dc7d]' : 'bg-[#08dc7d]') : 'bg-gray-300'
      } ${highlighted ? 'ring-2 ring-[#FFDD64] ring-offset-1' : ''}`}
    >
      <span
        className={`inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
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

  return (
    <div className="flex items-center justify-center">
      <div className="relative" style={{ width: '240px', height: '480px' }}>
        {/* Phone Shell */}
        <div
          className="absolute inset-0 shadow-2xl"
          style={{
            borderRadius: isIOS ? '44px' : '32px',
            background: isIOS
              ? 'linear-gradient(145deg, #d0d0d5, #a8a8ae)'
              : 'linear-gradient(145deg, #2d2d2d, #1a1a1a)',
            padding: '3px',
          }}
        >
          <div
            className="w-full h-full overflow-hidden"
            style={{
              borderRadius: isIOS ? '41px' : '30px',
              background: '#111',
            }}
          >
            {/* Screen */}
            <div
              className="absolute overflow-hidden"
              style={{
                top: '10px',
                left: '10px',
                right: '10px',
                bottom: '10px',
                borderRadius: isIOS ? '34px' : '22px',
                background: isIOS ? '#F2F2F7' : '#fff',
              }}
            >
              {/* Status bar */}
              <div
                className="flex items-center justify-between px-5 pt-2 pb-1"
                style={{ background: isIOS ? '#F2F2F7' : '#fff' }}
              >
                <span className="text-[10px] font-semibold text-gray-800">
                  {isIOS ? '09:41' : '12:30'}
                </span>
                {isIOS ? (
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-2">
                    <div className="bg-black rounded-full" style={{ width: '70px', height: '18px' }} />
                  </div>
                ) : (
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-2">
                    <div className="bg-black rounded-full" style={{ width: '9px', height: '9px' }} />
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <div className="flex items-end gap-[1.5px]">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-gray-800 rounded-sm" style={{ width: '2px', height: `${3 + i * 2}px` }} />
                    ))}
                  </div>
                  {!isIOS && <span className="text-[8px] font-bold text-gray-800">100%</span>}
                  {isIOS && (
                    <div className="relative border border-gray-800 rounded-sm ml-1" style={{ width: '18px', height: '9px' }}>
                      <div className="absolute inset-[1.5px] bg-gray-800 rounded-sm" />
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col h-full" style={{ paddingTop: '2px' }}>
                {/* Nav bar */}
                <div
                  className={`px-3 py-2 ${isIOS ? 'bg-[#F2F2F7]' : 'bg-white border-b border-gray-100'}`}
                >
                  {isIOS ? (
                    <>
                      {config.backLabel !== undefined && (
                        <button className="flex items-center gap-1 text-[#245bc1] text-[11px] font-medium mb-0.5">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                          </svg>
                          {config.backLabel || 'Back'}
                        </button>
                      )}
                      <p className="text-[13px] font-semibold text-center text-[#1c1c1e] -mt-4">
                        {config.title}
                      </p>
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      {config.backLabel !== undefined && (
                        <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                      )}
                      <p className="text-[13px] font-medium text-gray-800">{config.title}</p>
                    </div>
                  )}
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto" style={{ background: isIOS ? '#F2F2F7' : '#fff' }}>
                  <div className={`mx-3 mt-2 rounded-[8px] overflow-hidden ${isIOS ? 'bg-white shadow-sm' : ''}`}>
                    {config.items.map((item, idx) => {
                      const isLast = idx === config.items.length - 1;
                      const hl = item.highlighted;

                      if (item.type === 'section') {
                        return (
                          <div key={idx} className="px-3 pt-3 pb-1 text-[10px] font-medium uppercase tracking-wider text-gray-500">
                            {item.label}
                          </div>
                        );
                      }

                      if (item.type === 'toggle') {
                        return (
                          <div
                            key={idx}
                            className={`flex items-center justify-between px-3 py-2.5 ${
                              hl ? (isIOS ? 'bg-blue-50' : 'bg-green-50') : (isIOS ? 'bg-white' : 'bg-white')
                            } ${!isLast ? 'border-b border-gray-100' : ''}`}
                          >
                            <div className="flex-1 pr-2">
                              <p className={`text-[12px] font-medium ${hl ? (isIOS ? 'text-[#245bc1]' : 'text-[#08dc7d]') : 'text-[#1c1c1e]'}`}>
                                {item.label}
                              </p>
                              {item.sublabel && (
                                <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{item.sublabel}</p>
                              )}
                            </div>
                            {renderToggle(item.active || false, hl)}
                          </div>
                        );
                      }

                      // nav
                      return (
                        <div
                          key={idx}
                          className={`flex items-center justify-between px-3 py-2.5 ${
                            hl ? (isIOS ? 'bg-blue-50' : 'bg-green-50') : (isIOS ? 'bg-white' : 'bg-white')
                          } ${!isLast ? 'border-b border-gray-100' : ''}`}
                        >
                          <div>
                            <p className={`text-[12px] font-medium ${hl ? (isIOS ? 'text-[#245bc1]' : 'text-[#08dc7d]') : 'text-[#1c1c1e]'}`}>
                              {item.label}
                            </p>
                            {item.sublabel && (
                              <p className="text-[10px] text-gray-400 mt-0.5">{item.sublabel}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            {item.value && <span className="text-[11px] text-gray-400">{item.value}</span>}
                            {renderChevron()}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom nav for Android */}
                {!isIOS && (
                  <div className="flex items-center justify-around px-4 py-1.5 bg-white border-t border-gray-100">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <div className="w-3.5 h-3.5 rounded-sm border-2 border-gray-400" />
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-400" />
                  </div>
                )}
              </div>
            </div>

            {/* Side buttons */}
            {isIOS ? (
              <>
                <div className="absolute bg-[#b0b0b5] rounded-l-sm" style={{ left: '-3px', top: '80px', width: '3px', height: '22px' }} />
                <div className="absolute bg-[#b0b0b5] rounded-l-sm" style={{ left: '-3px', top: '110px', width: '3px', height: '22px' }} />
                <div className="absolute bg-[#b0b0b5] rounded-r-sm" style={{ right: '-3px', top: '95px', width: '3px', height: '40px' }} />
              </>
            ) : (
              <>
                <div className="absolute bg-[#2a2a2a] rounded-r-sm" style={{ right: '-3px', top: '90px', width: '3px', height: '35px' }} />
                <div className="absolute bg-[#2a2a2a] rounded-l-sm" style={{ left: '-3px', top: '80px', width: '3px', height: '20px' }} />
                <div className="absolute bg-[#2a2a2a] rounded-l-sm" style={{ left: '-3px', top: '108px', width: '3px', height: '35px' }} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoLTEMockup;
