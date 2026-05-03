"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

type FormState = {
  fullName: string;
  rsvpStatus: "attending" | "not_attending" | "maybe" | "";
  message: string;
  phone: string;
};

type SubmitResult = {
  success: boolean;
  guestName?: string;
  error?: string;
};

type Props = {
  onSuccess: (guestName: string) => void;
};

export default function RSVPForm({ onSuccess }: Props) {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    rsvpStatus: "",
    message: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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

    const data: SubmitResult = await res.json();
    setLoading(false);

    if (!res.ok || !data.success) {
      setError(data.error ?? "Có lỗi xảy ra. Vui lòng thử lại.");
      return;
    }

    onSuccess(form.fullName);
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-navy bg-cream text-navy placeholder:text-navy-light/50 focus:outline-none focus:ring-2 focus:ring-pink transition";

  return (
    <section id="rsvp" className="bg-peach py-20 px-6">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-md mx-auto flex flex-col gap-6"
      >
        <motion.div variants={fadeUp} className="text-center">
          <h2 className="text-3xl font-bold text-navy">Nhận Thiệp Mời</h2>
          <p className="text-navy-light mt-2 text-sm">
            Nhập thông tin để nhận thiệp mời cá nhân hóa của bạn.
          </p>
        </motion.div>

        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <motion.div variants={fadeUp}>
            <input
              name="fullName"
              type="text"
              placeholder="Họ và tên *"
              value={form.fullName}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={50}
              className={inputClass}
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <select
              name="rsvpStatus"
              value={form.rsvpStatus}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="" disabled>Xác nhận tham dự *</option>
              <option value="attending">Sẽ tham dự</option>
              <option value="not_attending">Không tham dự</option>
              <option value="maybe">Chưa chắc chắn</option>
            </select>
          </motion.div>

          <motion.div variants={fadeUp}>
            <textarea
              name="message"
              placeholder="Lời chúc (tùy chọn, tối đa 200 ký tự)"
              value={form.message}
              onChange={handleChange}
              maxLength={200}
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <input
              name="phone"
              type="tel"
              placeholder="Số điện thoại (tùy chọn)"
              value={form.phone}
              onChange={handleChange}
              className={inputClass}
            />
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <motion.div variants={fadeUp}>
            <motion.button
              type="submit"
              disabled={loading}
              animate={{ scale: loading ? 1 : [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 bg-pink text-navy font-bold rounded-full shadow-md hover:shadow-lg transition-shadow disabled:opacity-60"
            >
              {loading ? "Đang gửi..." : "Nhận Thiệp"}
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </section>
  );
}
