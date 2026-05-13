"use client";

import { motion, type Variants } from "framer-motion";
import { EVENT } from "@/lib/constants";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-peach via-peach/60 to-cream/80 flex flex-col items-center justify-center px-6 py-16 overflow-hidden">
      {/* Decorative circles */}
      <motion.div
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-16 w-32 h-32 rounded-full bg-mint opacity-80 pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-1/3 right-12 w-20 h-20 rounded-full bg-pink opacity-80 pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 left-20 w-16 h-16 rounded-full bg-mint opacity-60 pointer-events-none"
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center gap-5 max-w-sm w-full"
      >
        {/* Badge */}
        <motion.div variants={fadeUp}>
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-mint border border-navy/20 text-navy text-xs font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-navy inline-block" />
            CLASS OF 2026
          </span>
        </motion.div>

        {/* Eyebrow */}
        <motion.p variants={fadeUp} className="text-navy/60 text-sm font-semibold tracking-[0.3em] uppercase lg:text-base">
          Thiệp Mời
        </motion.p>

        {/* Main heading */}
        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-6xl font-black text-navy leading-none tracking-tight md:whitespace-nowrap"
        >
          Lễ Tốt Nghiệp
        </motion.h1>

        {/* Name */}
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <span className="w-8 h-px bg-pink" />
          <span className="text-pink font-black italic text-2xl">{EVENT.name}</span>
          <span className="w-8 h-px bg-pink" />
        </motion.div>

        {/* School card */}
        <motion.div
          variants={fadeUp}
          className="w-[90%] bg-cream/80 border border-navy/15 rounded-2xl px-5 py-4 text-center flex flex-col items-center gap-0.5"
        >
          <p className="font-bold text-navy text-sm lg:text-base">{EVENT.school}</p>
          <p className="text-navy-light text-xs mt-0.5 lg:text-sm">{EVENT.faculty}</p>
          <p className="text-navy-light text-xs lg:text-sm">Chuyên ngành {EVENT.major}</p>
        </motion.div>

        {/* CTA */}
        <motion.a
          variants={fadeUp}
          href="#rsvp"
          whileTap={{ scale: 0.97 }}
          className="w-[90%] py-4 bg-pink text-navy font-bold rounded-full border-2 shadow-[4px_4px_0px_0px_#001858] tracking-wide"
        >
          Nhận Thiệp Mời →
        </motion.a>
      </motion.div>
    </section>
  );
}
