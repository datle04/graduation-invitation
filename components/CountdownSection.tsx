"use client";

import { motion } from "framer-motion";
import Countdown from "@/components/Countdown";
import { EVENT } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function formatEventDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    date: d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }),
    time: d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
  };
}

export default function CountdownSection() {
  const formatted = EVENT.date ? formatEventDate(EVENT.date) : null;

  return (
    <section className="bg-cream py-20 px-6">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col items-center gap-6 text-center"
      >
        <motion.p variants={fadeUp} className="text-navy/50 text-xs font-bold tracking-[0.3em] uppercase">
          Đếm ngược đến ngày trọng đại
        </motion.p>

        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-navy leading-tight">
          Chỉ còn ít ngày<br />nữa thôi!
        </motion.h2>

        <motion.div variants={fadeUp}>
          <Countdown />
        </motion.div>

        {formatted && (
          <motion.p variants={fadeUp} className="text-navy-light text-sm flex items-center gap-2">
            <span>📅 {formatted.date}</span>
            <span className="text-navy/30">·</span>
            <span>🕗 {formatted.time}</span>
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
