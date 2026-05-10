"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { EVENT } from "@/lib/constants";

type Props = {
  guestName: string;
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    day: d.toLocaleDateString("vi-VN", { day: "2-digit" }),
    time: d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    month: `${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`,
  };
}

const SPARKLES = [
  { top: "12%", left: "8%",  size: 16, duration: 4 },
  { top: "8%",  right: "12%", size: 12, duration: 3 },
  { top: "45%", left: "5%",  size: 10, duration: 5 },
  { top: "70%", right: "6%", size: 14, duration: 3.5 },
  { bottom: "15%", left: "14%", size: 10, duration: 4.5 },
];

export default function InvitationCard({ guestName }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const formatted = EVENT.date ? formatDate(EVENT.date) : null;

  async function handleDownload() {
    if (!cardRef.current) return;
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
    });
    const link = document.createElement("a");
    link.download = `thiep-moi-${guestName.replace(/\s+/g, "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <section className="bg-[linear-gradient(to_left,#f3d2c1,#f3d2c1cc)] py-16 px-6">
      <div className="max-w-sm mx-auto flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-navy">Thiệp của bạn đây! 🎉</h2>
          <p className="text-navy-light text-sm mt-1">Nhấn tải về để lưu thiệp</p>
        </motion.div>

        {/* Card — entrance from bottom-right */}
        <motion.div
          initial={{ opacity: 0, x: 60, y: 60 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="w-full"
        >
          <div
            ref={cardRef}
            className="relative w-full rounded-3xl border-2 px-8 py-10 flex flex-col items-center text-center gap-4 overflow-hidden shadow-[6px_6px_0px_0px_#001858]"
            style={{
              background: "linear-gradient(to top, #f582ae33, #f3d2c1 40%, #fef6e4)",
            }}
          >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-mint opacity-60 translate-x-6 -translate-y-6" />
            <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-pink opacity-30 -translate-x-4 translate-y-4" />

            {/* Spinning sparkles */}
            {SPARKLES.map((s, i) => (
              <motion.span
                key={i}
                animate={{ rotate: 360 }}
                transition={{ duration: s.duration, repeat: Infinity, ease: "linear" }}
                className="absolute text-pink select-none pointer-events-none z-10"
                style={{
                  top: s.top,
                  left: "left" in s ? s.left : undefined,
                  right: "right" in s ? s.right : undefined,
                  bottom: "bottom" in s ? s.bottom : undefined,
                  fontSize: s.size,
                }}
              >
                ✦
              </motion.span>
            ))}

            <p className="text-navy/50 text-xs font-bold tracking-[0.3em] uppercase z-10">
              Thiệp Mời
            </p>

            <h3 className="text-4xl font-bold text-navy leading-tight z-10">
              Lễ Tốt<br />Nghiệp
            </h3>

            <div className="flex flex-col gap-1 z-10">
              <p className="text-navy-light text-sm">Trân trọng kính mời</p>
              <p className="text-pink font-bold italic text-2xl">{guestName}</p>
              <p className="text-navy-light text-sm">đến tham dự buổi lễ tốt nghiệp của</p>
              <p className="text-navy font-bold text-base">{EVENT.name}</p>
              <p className="text-navy-light text-xs">{EVENT.school} · {EVENT.faculty}</p>
            </div>

            {formatted && (
              <div className="w-full border-y border-navy/15 mt-6 mb-4 py-4 grid grid-cols-3 gap-2 z-10">
                {[
                  { value: formatted.day, label: "Ngày" },
                  { value: formatted.time, label: "Giờ" },
                  { value: formatted.month, label: "Tháng" },
                ].map(({ value, label }) => (
                  <div key={label} className="flex flex-col items-center gap-0.5">
                    <span className="text-navy font-bold text-lg">{value}</span>
                    <span className="text-navy/50 text-xs uppercase tracking-wide">{label}</span>
                  </div>
                ))}
              </div>
            )}

            {(EVENT.address !== "Chưa cập nhật" || EVENT.location !== "Chưa cập nhật") && (
            <div className="w-full flex flex-col items-center gap-1 z-10">
                <p className="text-navy-light text-xs">
                📍 {EVENT.location !== "Chưa cập nhật" ? EVENT.location : EVENT.address}
                </p>
                <p className="text-navy-light text-xs">Dress code: Tự do</p>
            </div>
            )}
        </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full"
        >
          <motion.button
            onClick={handleDownload}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 bg-pink text-navy font-bold rounded-2xl border border-navy shadow-[4px_4px_0px_0px_#001858] text-sm tracking-wide"
          >
            Tải thiệp về 📥
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
