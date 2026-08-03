import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lycamobile Italy | Network Coverage Feedback",
  description:
    "Sales team network coverage feedback tool for Lycamobile Italy — Post TIM Migration.",
  icons: {
    icon: "https://cms-assets.ldsvcplatform.com/IT/s3fs-public/2023-09/MicrosoftTeams-image%20%2813%29.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#21264e",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg text-slate-900 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
