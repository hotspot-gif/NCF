export type Platform = 'ios' | 'android';
export type TutorialType = 'network' | 'volte';
export type AndroidBrand = 'samsung' | 'xiaomi' | 'huawei' | 'oppo' | 'oneplus' | 'pixel' | 'motorola' | 'vivo' | 'nokia';

export interface Step {
  id: number;
  title: string;
  description: string;
  screen: ScreenData;
}

export interface ScreenData {
  type: 'settings_list' | 'network_list' | 'toggle_screen' | 'cellular_settings' | 'volte_screen' | 'connections_screen' | 'mobile_network' | 'sim_settings';
  title: string;
  backLabel?: string;
  items?: SettingsItem[];
  activeToggle?: string;
  selectedNetwork?: string;
  highlight?: string;
  searchBar?: boolean;
}

export interface SettingsItem {
  label: string;
  sublabel?: string;
  value?: string;
  type: 'nav' | 'toggle' | 'network' | 'selected' | 'header' | 'info';
  active?: boolean;
  highlighted?: boolean;
  color?: string;
}

// ─── iOS NETWORK SELECTION ───────────────────────────────────────────────────
export const iosNetworkSteps: Step[] = [
  {
    id: 1,
    title: 'Open Settings',
    description: 'Tap the ⚙️ Settings app on your iPhone home screen.',
    screen: {
      type: 'settings_list',
      title: 'Settings',
      items: [
        { label: 'Wi-Fi', value: 'TIM', type: 'nav' },
        { label: 'Bluetooth', value: 'On', type: 'nav' },
        { label: 'Cellular', type: 'nav', highlighted: true },
        { label: 'Personal Hotspot', value: 'Off', type: 'nav' },
        { label: 'VPN', value: 'Not Connected', type: 'nav' },
        { label: 'Notifications', type: 'nav' },
        { label: 'Sounds & Haptics', type: 'nav' },
        { label: 'Focus', type: 'nav' },
      ],
      highlight: 'Cellular',
    },
  },
  {
    id: 2,
    title: 'Go to Cellular',
    description: 'Tap "Cellular" to open the cellular settings.',
    screen: {
      type: 'cellular_settings',
      title: 'Cellular',
      backLabel: 'Settings',
      items: [
        { label: 'Cellular Data', type: 'toggle', active: true },
        { label: 'Cellular Data Options', type: 'nav' },
        { label: 'Personal Hotspot', value: 'Off', type: 'nav' },
        { label: 'Network Selection', type: 'nav', highlighted: true },
        { label: 'Carrier Services', type: 'nav' },
        { label: 'SIM PIN', type: 'nav' },
        { label: 'Wi-Fi Calling', value: 'Off', type: 'nav' },
        { label: 'VoLTE', type: 'toggle', active: false },
      ],
      highlight: 'Network Selection',
    },
  },
  {
    id: 3,
    title: 'Open Network Selection',
    description: 'Tap "Network Selection" then turn off "Automatic" to search for networks manually.',
    screen: {
      type: 'toggle_screen',
      title: 'Network Selection',
      backLabel: 'Cellular',
      items: [
        { label: 'Automatic', type: 'toggle', active: false, highlighted: true },
        { label: 'Searching…', type: 'info', sublabel: 'Please wait while your iPhone searches for available networks.' },
      ],
      highlight: 'Automatic',
    },
  },
  {
    id: 4,
    title: 'Select TIM Network',
    description: 'Wait for the search to complete, then select "TIM" from the list of available networks.',
    screen: {
      type: 'network_list',
      title: 'Network Selection',
      backLabel: 'Cellular',
      items: [
        { label: 'Automatic', type: 'toggle', active: false },
        { label: 'TIM', type: 'selected', highlighted: true, color: '#245bc1' },
        { label: 'Iliad', type: 'network' },
        { label: 'Vodafone IT', type: 'network' },
        { label: 'WindTre', type: 'network' },
      ],
      selectedNetwork: 'TIM',
      highlight: 'TIM',
    },
  },
];

// ─── Android NETWORK SELECTION ────────────────────────────────────────────────
export const androidNetworkSteps: Step[] = [
  {
    id: 1,
    title: 'Open Settings',
    description: 'Open the ⚙️ Settings app on your Android phone.',
    screen: {
      type: 'settings_list',
      title: 'Settings',
      searchBar: true,
      items: [
        { label: 'Network & internet', type: 'nav', highlighted: true },
        { label: 'Connected devices', type: 'nav' },
        { label: 'Apps', type: 'nav' },
        { label: 'Notifications', type: 'nav' },
        { label: 'Battery', type: 'nav' },
        { label: 'Storage', type: 'nav' },
        { label: 'Sound & vibration', type: 'nav' },
        { label: 'Display', type: 'nav' },
      ],
      highlight: 'Network & internet',
    },
  },
  {
    id: 2,
    title: 'Go to Mobile Network',
    description: 'Tap "Network & internet" → "Mobile network" → "Network operators".',
    screen: {
      type: 'mobile_network',
      title: 'Network & internet',
      backLabel: '',
      items: [
        { label: 'Internet', sublabel: 'TIM', type: 'nav' },
        { label: 'Calls & SMS', sublabel: 'TIM', type: 'nav' },
        { label: 'Mobile network', type: 'nav', highlighted: true },
        { label: 'Hotspot & tethering', type: 'nav' },
        { label: 'Data Saver', sublabel: 'Off', type: 'nav' },
        { label: 'VPN', type: 'nav' },
      ],
      highlight: 'Mobile network',
    },
  },
  {
    id: 3,
    title: 'Disable Automatic Selection',
    description: 'Tap "Network operators" then turn off "Automatic selection". Your phone will search for networks.',
    screen: {
      type: 'toggle_screen',
      title: 'Network operators',
      backLabel: '',
      items: [
        { label: 'Automatic selection', sublabel: 'Automatically select preferred network', type: 'toggle', active: false, highlighted: true },
        { label: 'Manual search', type: 'info', sublabel: 'Searching for available networks…' },
      ],
      highlight: 'Automatic selection',
    },
  },
  {
    id: 4,
    title: 'Select TIM Network',
    description: 'From the list of available networks, tap "TIM" and wait for your phone to register.',
    screen: {
      type: 'network_list',
      title: 'Network operators',
      backLabel: '',
      items: [
        { label: 'Automatic selection', sublabel: 'Automatically select preferred network', type: 'toggle', active: false },
        { label: 'Manual search', type: 'nav', color: '#08dc7d' },
        { label: 'TIM', type: 'selected', highlighted: true, color: '#08dc7d' },
        { label: 'Iliad', type: 'network' },
        { label: 'Vodafone IT', type: 'network' },
        { label: 'WindTre', type: 'network' },
      ],
      selectedNetwork: 'TIM',
      highlight: 'TIM',
    },
  },
];

// ─── VoLTE Steps per brand ────────────────────────────────────────────────────
export interface VoLTEBrand {
  id: AndroidBrand | 'ios';
  name: string;
  icon: string;
  color: string;
  steps: VoLTEStep[];
  requirements: string[];
}

export interface VoLTEStep {
  path: string;
  highlight?: string;
}

export const volteBrands: VoLTEBrand[] = [
  {
    id: 'ios',
    name: 'iPhone (iOS)',
    icon: '🍎',
    color: '#245bc1',
    requirements: ['iOS 12.2 or later', 'Active Lycamobile SIM', '4G/5G coverage'],
    steps: [
      { path: 'Settings', highlight: 'Settings' },
      { path: 'Settings → Cellular', highlight: 'Cellular' },
      { path: 'Settings → Cellular → Cellular Data Options', highlight: 'Cellular Data Options' },
      { path: 'Settings → Cellular → Cellular Data Options → Voice & Data', highlight: 'Voice & Data' },
      { path: 'Enable VoLTE', highlight: 'VoLTE' },
    ],
  },
  {
    id: 'samsung',
    name: 'Samsung Galaxy',
    icon: '📱',
    color: '#1428A0',
    requirements: ['Android 8.0 or later', 'Active Lycamobile SIM', '4G coverage'],
    steps: [
      { path: 'Settings', highlight: 'Settings' },
      { path: 'Connections', highlight: 'Connections' },
      { path: 'Mobile networks', highlight: 'Mobile networks' },
      { path: 'VoLTE Calls', highlight: 'VoLTE Calls' },
      { path: 'Enable VoLTE', highlight: 'VoLTE' },
    ],
  },
  {
    id: 'xiaomi',
    name: 'Xiaomi / Redmi / POCO',
    icon: '📱',
    color: '#FF6900',
    requirements: ['MIUI 10 or later', 'Active Lycamobile SIM', '4G coverage'],
    steps: [
      { path: 'Settings', highlight: 'Settings' },
      { path: 'SIM cards & mobile networks', highlight: 'SIM cards & mobile networks' },
      { path: 'Select your SIM', highlight: 'Select SIM' },
      { path: 'Enable VoLTE', highlight: 'VoLTE' },
    ],
  },
  {
    id: 'huawei',
    name: 'Huawei / Honor',
    icon: '📱',
    color: '#CF0A2C',
    requirements: ['EMUI 9.0 or later', 'Active Lycamobile SIM', '4G coverage'],
    steps: [
      { path: 'Settings', highlight: 'Settings' },
      { path: 'Mobile network', highlight: 'Mobile network' },
      { path: 'More settings', highlight: 'More settings' },
      { path: 'Enable VoLTE Calls', highlight: 'VoLTE Calls' },
    ],
  },
  {
    id: 'oppo',
    name: 'OPPO / realme',
    icon: '📱',
    color: '#1D6038',
    requirements: ['ColorOS 6.0 or later', 'Active Lycamobile SIM', '4G coverage'],
    steps: [
      { path: 'Settings', highlight: 'Settings' },
      { path: 'SIM card & mobile data', highlight: 'SIM card & mobile data' },
      { path: 'Select your SIM', highlight: 'Select SIM' },
      { path: 'Enable VoLTE', highlight: 'VoLTE' },
    ],
  },
  {
    id: 'oneplus',
    name: 'OnePlus',
    icon: '📱',
    color: '#EB0028',
    requirements: ['OxygenOS 5.0 or later', 'Active Lycamobile SIM', '4G coverage'],
    steps: [
      { path: 'Settings', highlight: 'Settings' },
      { path: 'SIM & network settings', highlight: 'SIM & network settings' },
      { path: 'Select your SIM', highlight: 'Select SIM' },
      { path: 'Enable VoLTE', highlight: 'VoLTE' },
    ],
  },
  {
    id: 'pixel',
    name: 'Google Pixel',
    icon: '📱',
    color: '#4285F4',
    requirements: ['Android 9 or later', 'Active Lycamobile SIM', '4G coverage'],
    steps: [
      { path: 'Settings', highlight: 'Settings' },
      { path: 'Network & internet', highlight: 'Network & internet' },
      { path: 'Mobile network', highlight: 'Mobile network' },
      { path: 'Calls', highlight: 'Calls' },
      { path: 'Enable Calls (VoLTE)', highlight: 'VoLTE' },
    ],
  },
  {
    id: 'motorola',
    name: 'Motorola',
    icon: '📱',
    color: '#5C2D91',
    requirements: ['Android 9 or later', 'Active Lycamobile SIM', '4G coverage'],
    steps: [
      { path: 'Settings', highlight: 'Settings' },
      { path: 'Mobile network', highlight: 'Mobile network' },
      { path: 'VoLTE (Advanced options)', highlight: 'VoLTE' },
      { path: 'Enable VoLTE', highlight: 'VoLTE' },
    ],
  },
  {
    id: 'vivo',
    name: 'vivo',
    icon: '📱',
    color: '#415FFF',
    requirements: ['FuntouchOS 9 or later', 'Active Lycamobile SIM', '4G coverage'],
    steps: [
      { path: 'Settings', highlight: 'Settings' },
      { path: 'SIM card & mobile network', highlight: 'SIM card & mobile network' },
      { path: 'Select your SIM', highlight: 'Select SIM' },
      { path: 'Enable VoLTE HD', highlight: 'VoLTE HD' },
    ],
  },
  {
    id: 'nokia',
    name: 'Nokia / HMD',
    icon: '📱',
    color: '#124191',
    requirements: ['Android 9 or later', 'Active Lycamobile SIM', '4G coverage'],
    steps: [
      { path: 'Settings', highlight: 'Settings' },
      { path: 'Mobile network', highlight: 'Mobile network' },
      { path: 'Calls (VoLTE)', highlight: 'Calls (VoLTE)' },
      { path: 'Enable VoLTE', highlight: 'VoLTE' },
    ],
  },
];
