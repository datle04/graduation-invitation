"use client";

import { motion } from "framer-motion";
import { EVENT } from "@/lib/constants";
import Countdown from "./Countdown";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-cream">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-4"
      >
        <motion.p variants={fadeUp} className="text-mint font-semibold tracking-widest uppercase text-sm">
          Trân trọng kính mời
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="text-4xl md:text-5xl font-bold text-navy leading-tight"
        >
          {EVENT.name}
        </motion.h1>

        <motion.div variants={fadeUp} className="flex flex-col gap-1">
          <p className="text-navy-light text-base">{EVENT.school}</p>
          <p className="text-navy-light text-sm">{EVENT.faculty} — {EVENT.major}</p>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-2">
          <p className="text-navy font-semibold text-lg">
            🎓 Lễ Tốt Nghiệp
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-4 w-full">
          <Countdown />
        </motion.div>

        <motion.a
          variants={fadeUp}
          href="#rsvp"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="mt-4 px-8 py-3 bg-pink text-navy font-semibold rounded-full shadow-md transition-shadow hover:shadow-lg"
        >
          Nhận Thiệp Mời
        </motion.a>
      </motion.div>
    </section>
  );
}
