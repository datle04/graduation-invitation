"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import RSVPForm from "@/components/RSVPForm";
import ConfettiEffect from "./ConfettiEffect";
import CountdownSection from "./CountdownSection";
import EventInfo from "./EventInfo";

export default function MainContent() {
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  return (
    <main>
      <ConfettiEffect />
      <HeroSection />
      <CountdownSection />
      <EventInfo/>
      <RSVPForm onSuccess={(name) => setSubmittedName(name)} />
      {submittedName && (
        <p className="text-center text-navy py-8">
          Xin chào <strong>{submittedName}</strong>! Thiệp mời sẽ hiển thị ở đây.
        </p>
      )}
    </main>
  );
}
