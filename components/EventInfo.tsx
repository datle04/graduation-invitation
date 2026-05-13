"use client";

import { motion, type Variants } from "framer-motion";
import { EVENT } from "@/lib/constants";
import { FiCalendar } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { PiShirtFoldedLight } from "react-icons/pi";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function InfoCard({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex items-start gap-4 bg-cream border-1 shadow-[3px_3px_0px_0px_#001858] rounded-2xl px-5 py-4"
    >
      <div className="w-12 h-12 rounded-xl border-1 bg-mint flex items-center justify-center shrink-0 text-xl">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-navy/50 text-xs font-bold tracking-widest uppercase lg:text-sm">{label}</p>
        {children}
      </div>
    </motion.div>
  );
}

function formatEventDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })} · ${d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}`;
}

export default function EventInfo() {
  return (
    <section className="bg-peach py-20 px-6">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-md mx-auto flex flex-col gap-6"
      >
        <motion.div variants={fadeUp} className="flex flex-col gap-1 ">
          <p className="text-navy/50 text-xs font-bold tracking-[0.3em] uppercase lg:text-sm">
            Chi tiết sự kiện
          </p>
          <h2 className="text-4xl font-black text-navy leading-tight">
            Thông tin<br />buổi lễ
          </h2>
        </motion.div>

        <InfoCard icon={<FiCalendar />} label="Ngày & Giờ">
          <p className="text-navy font-semibold text-sm">
            {EVENT.date ? formatEventDate(EVENT.date) : "Sẽ cập nhật sớm"}
          </p>
        </InfoCard>

        <InfoCard icon={<IoLocationOutline />} label="Địa điểm">
          <p className="text-navy font-semibold text-sm">{EVENT.location}</p>
          {/* <p className="text-navy-light text-xs">{EVENT.address}</p> */}
          {EVENT.mapsUrl && (
            <a
              href={EVENT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink text-sm font-semibold mt-1 hover:underline"
            >
              Mở Google Maps →
            </a>
          )}
        </InfoCard>

        <InfoCard icon={<PiShirtFoldedLight />} label="Dress Code">
          <p className="text-navy font-semibold text-sm">Tự do</p>
        </InfoCard>
      </motion.div>
    </section>
  );
}
