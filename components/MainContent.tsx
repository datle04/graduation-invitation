"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import RSVPForm from "@/components/RSVPForm";
import ConfettiEffect from "./ConfettiEffect";
import CountdownSection from "./CountdownSection";
import EventInfo from "./EventInfo";
import InvitationCard from "./InvitationCard";
import Gallery from "./Gallery";
import Footer from "./Footer";

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
        <InvitationCard guestName={submittedName} />
      )}
      {/* <Gallery /> */}
      <Footer/>
    </main>
  );
}
