"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

type RsvpStatus = "attending" | "not_attending" | "maybe" | "";

type FormState = {
  fullName: string;
  rsvpStatus: RsvpStatus;
  message: string;
  phone: string;
};

type Props = {
  onSuccess: (guestName: string) => void;
};

const RSVP_OPTIONS: { value: Exclude<RsvpStatus, "">; label: string; emoji: string }[] = [
  { value: "attending", label: "Chắc chắn rồi", emoji: "✅" },
  { value: "maybe", label: "Chưa chắc", emoji: "🤔" },
  { value: "not_attending", label: "Không thể", emoji: "😢" },
];

const labelClass = "text-navy text-xs font-bold tracking-widest uppercase mb-1.5 block lg:text-sm";
const inputClass =
  "w-full px-4 py-3 rounded-xl bg-cream border border-navy/10 text-navy text-sm placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-pink transition";

export default function RSVPForm({ onSuccess }: Props) {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    rsvpStatus: "",
    message: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleInput(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.rsvpStatus) {
      setError("Vui lòng chọn xác nhận tham dự.");
      return;
    }

    setLoading(true);
    setError(null);

    const res = await fetch("/api/guests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: form.fullName,
        rsvpStatus: form.rsvpStatus,
        message: form.message || undefined,
        phone: form.phone || undefined,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok || !data.success) {
      setError(data.error ?? "Có lỗi xảy ra. Vui lòng thử lại.");
      return;
    }

    onSuccess(form.fullName);
  }

  return (
    <section id="rsvp" className="bg-cream py-20 px-6">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-md mx-auto flex flex-col items-center gap-6"
      >
        {/* Badge + heading */}
        <motion.div variants={fadeUp} className="flex flex-col items-center gap-3 text-center">
          <span className="px-4 py-1.5 rounded-full border bg-mint text-navy text-sm font-bold tracking-widest uppercase">
            RSVP
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-navy leading-tight">
            Nhập tên để nhận thiệp
          </h2>
          <p className="text-navy-light text-sm">
            Mình sẽ tạo thiệp mời cá nhân hóa cho bạn ✨
          </p>
        </motion.div>

        {/* Form card */}
        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit}
          className="w-full bg-peach border  rounded-3xl shadow-[4px_4px_0px_0px_#001858] px-6 py-7 flex flex-col gap-5"
        >
          {/* Họ và tên */}
          <div>
            <label className={labelClass}>Họ và tên *</label>
            <input
              name="fullName"
              type="text"
              placeholder="Nguyễn Văn A"
              value={form.fullName}
              onChange={handleInput}
              required
              minLength={2}
              maxLength={50}
              className={inputClass}
            />
          </div>

          {/* RSVP toggle */}
          <div>
            <label className={labelClass}>Bạn sẽ đến chứ?</label>
            <div className="grid grid-cols-3 gap-2">
              {RSVP_OPTIONS.map((opt) => {
                const selected = form.rsvpStatus === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({ ...prev, rsvpStatus: opt.value }));
                      setError(null);
                    }}
                    className={`flex items-center gap-1 px-2 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      selected
                        ? "bg-mint border-navy text-navy shadow-[2px_2px_0px_0px_#001858]"
                        : "bg-cream border-navy/20 text-navy/60 hover:border-navy/40"
                    }
                     lg:text-sm
                    `}
                  >
                    <span>{opt.emoji}</span>
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lời chúc */}
          <div>
            <label className={labelClass}>Lời chúc (tuỳ chọn)</label>
            <textarea
              name="message"
              placeholder="Chúc mừng Đạt nha 🎉"
              value={form.message}
              onChange={handleInput}
              maxLength={200}
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Số điện thoại */}
          <div>
            <label className={labelClass}>Số điện thoại (tuỳ chọn)</label>
            <input
              name="phone"
              type="tel"
              placeholder="0901 234 567"
              value={form.phone}
              onChange={handleInput}
              className={inputClass}
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-xs text-center"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            animate={loading ? {} : { scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="w-[95%] mx-auto py-4 bg-pink text-navy font-bold rounded-2xl border-2 border-navy shadow-[4px_4px_0px_0px_#001858] text-sm lg:text-base tracking-wide disabled:opacity-60 transition-transform cursor-pointer"
          >
            {loading ? "Đang gửi..." : "Gửi xác nhận & xem thiệp"}
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
}
