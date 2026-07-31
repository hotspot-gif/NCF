export interface TeamUser {
  name: string;
  designation: string;
  office?: string;
}

export const teamUsers: TeamUser[] = [
  // Management
  { name: "Sohan Brinsly Fernando Warnakulasuriya", designation: "Product Manager" },
  { name: "Dilan Fernando", designation: "Hotspot Manager Admin" },
  { name: "Roberto De Stradis", designation: "County Manager Admin" },
  { name: "Prasanga Fernando", designation: "Admin" },
  { name: "Shehan Fernando", designation: "Admin" },
  { name: "Niyamathan Sivapatham", designation: "Regional Manager Admin" },
  { name: "Alfred Sahaya Renaulton", designation: "Regional Manager Admin" },
  { name: "Alberto Stergar", designation: "PF" },
  { name: "Surendran Sugirtharan", designation: "Stock Manager" },

  // Bari
  { name: "Stelwin Kachappilly", designation: "Office Manager Admin", office: "Bari" },
  { name: "Jesuthasan Lindon Francesco", designation: "Zone Manager", office: "Bari" },
  { name: "Hashmi Ahmad", designation: "Zone Manager", office: "Bari" },
  { name: "Sutharsan Surendran", designation: "Zone Manager", office: "Bari" },

  // Napoli
  { name: "Thineshkumar Chanthirakanthan", designation: "Office Manager Admin", office: "Napoli" },
  { name: "Vithunraaj Jeganathan", designation: "Zone Manager", office: "Napoli" },
  { name: "Roy Sooriyakumar Nilanthan", designation: "Zone Manager", office: "Napoli" },
  { name: "Thushshanth Rajeswaran", designation: "Zone Manager", office: "Napoli" },
  { name: "Antonio Pipolo", designation: "Zone Manager", office: "Napoli" },
  { name: "Salsano Antonio", designation: "Zone Manager", office: "Napoli" },
  { name: "Atputharajah Dishanthan", designation: "Zone Manager", office: "Napoli" },
  { name: "Cambrea David", designation: "Zone Manager", office: "Napoli" },

  // Palermo
  { name: "Alfred Remil", designation: "Office Manager Admin", office: "Palermo" },
  { name: "Ruggero Tumamao", designation: "Zone Manager", office: "Palermo" },
  { name: "Jibo Abdallah Dauda", designation: "Zone Manager", office: "Palermo" },
  { name: "Shamika Samarasinha", designation: "Zone Manager", office: "Palermo" },

  // Rome
  { name: "Faizal Nishan Ali", designation: "Office Manager Admin", office: "Rome" },
  { name: "Md Sabbir Alam", designation: "Zone Manager", office: "Rome" },
  { name: "Puthuva Poulose Seby", designation: "Zone Manager", office: "Rome" },
  { name: "Molla Anamulhaque", designation: "Zone Manager", office: "Rome" },
  { name: "Mohammed Moinul Hasan", designation: "Zone Manager", office: "Rome" },
  { name: "Isuru Ramanayaka", designation: "Zone Manager", office: "Rome" },

  // Milan
  { name: "Dimuthu Fernando", designation: "Office Manager Admin", office: "Milan" },
  { name: "Nazrul Islam Waseem", designation: "Zone Manager", office: "Milan" },
  { name: "Alam Fahim", designation: "Zone Manager", office: "Milan" },
  { name: "Farooq Umar", designation: "Zone Manager", office: "Milan" },
  { name: "Shahid Mehmood", designation: "Zone Manager", office: "Milan" },

  // Bologna
  { name: "Thushara Darshana Fernando Widanelage", designation: "Office Manager Admin", office: "Bologna" },
  { name: "Kamal Hossain", designation: "Zone Manager", office: "Bologna" },
  { name: "Dhani Mehedi", designation: "Zone Manager", office: "Bologna" },
  { name: "Ali Shafqat", designation: "Zone Manager", office: "Bologna" },

  // Padova
  { name: "Pratheep Kumaar", designation: "Office Manager Admin", office: "Padova" },
  { name: "Shehab Bapari", designation: "Zone Manager", office: "Padova" },
  { name: "Muzzafar Sikandar", designation: "Zone Manager", office: "Padova" },

  // Torino
  { name: "Santhosh Chandrabalan", designation: "Office Manager Admin", office: "Torino" },
  { name: "Milki Md Masud Alam", designation: "Zone Manager", office: "Torino" },
  { name: "Gueye Khadim", designation: "Zone Manager", office: "Torino" },
  { name: "Hossain Md Sifat", designation: "Zone Manager", office: "Torino" },
];

// Group users by office for the dropdown
export const offices = [
  "Management",
  "Bari",
  "Napoli",
  "Palermo",
  "Rome",
  "Milan",
  "Bologna",
  "Padova",
  "Torino",
] as const;

export function getUsersByOffice(): Record<string, TeamUser[]> {
  const grouped: Record<string, TeamUser[]> = {};

  for (const office of offices) {
    if (office === "Management") {
      grouped[office] = teamUsers.filter((u) => !u.office);
    } else {
      grouped[office] = teamUsers.filter((u) => u.office === office);
    }
  }

  return grouped;
}
