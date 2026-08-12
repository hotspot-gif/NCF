"use client";

import dynamic from "next/dynamic";
import type { Language } from "@/data/translations";

const NetGuide = dynamic(() => import("@/Public/netguide/src/App"), {
  ssr: false,
});

interface GuideProps {
  language: Language;
}

export default function Guide({ language }: GuideProps) {
  return (
    <div className="animate-slide-up">
      <NetGuide />
    </div>
  );
}
