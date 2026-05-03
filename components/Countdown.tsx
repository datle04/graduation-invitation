"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EVENT } from "@/lib/constants";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calcTimeLeft(target: Date): TimeLeft | null {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="border-2 shadow-[3px_3px_0px_0px_#001858] border-navy rounded-2xl w-20 h-24 md:w-24 md:h-28 flex flex-col gap-2 items-center justify-center overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={display}
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-black text-navy"
        >
          {display}
        </motion.span>
      </AnimatePresence>
      <span className="text-xs text-navy-light font-semibold uppercase tracking-wide">{label}</span>
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!EVENT.date) return;

    const target = new Date(EVENT.date);
    setTimeLeft(calcTimeLeft(target));

    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft(target));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  if (!EVENT.date) {
    return (
      <p className="text-navy-light text-center italic">
        Ngày lễ tốt nghiệp sẽ được cập nhật sớm.
      </p>
    );
  }

  if (!timeLeft) {
    return (
      <p className="text-navy font-semibold text-xl text-center">
        🎓 Lễ tốt nghiệp đang diễn ra!
      </p>
    );
  }

  return (
    <div className="flex gap-4 md:gap-6 justify-center">
      <CountdownUnit value={timeLeft.days} label="Ngày" />
      <CountdownUnit value={timeLeft.hours} label="Giờ" />
      <CountdownUnit value={timeLeft.minutes} label="Phút" />
      <CountdownUnit value={timeLeft.seconds} label="Giây" />
    </div>
  );
}
