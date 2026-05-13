"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GALLERY_ITEMS } from "@/lib/gallery";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section className="bg-peach py-20 px-6">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-md mx-auto flex flex-col gap-6"
      >
        <motion.div variants={fadeUp} className="text-center">
          <p className="text-navy/50 text-xs font-bold tracking-[0.3em] uppercase mb-1">Gallery</p>
          <h2 className="text-3xl font-bold text-navy">Ngày trọng đại</h2>
        </motion.div>

        {GALLERY_ITEMS.length === 0 ? (
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center gap-3 py-12 border-2 border-dashed border-navy/20 rounded-3xl"
          >
            <span className="text-4xl">📸</span>
            <p className="text-navy font-semibold text-sm">Sắp có ảnh tại đây</p>
            <p className="text-navy-light text-xs text-center max-w-[200px]">
              Ảnh từ ngày lễ tốt nghiệp sẽ được cập nhật sau buổi lễ.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {GALLERY_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.03 }}
                onClick={() => setLightbox(i)}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-navy/10 cursor-pointer bg-cream"
              >
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 200px"
                />
                <div className="absolute bottom-0 inset-x-0 bg-navy/40 backdrop-blur-sm px-3 py-2">
                  <p className="text-cream text-xs font-semibold truncate">{item.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
          )}
        </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={GALLERY_ITEMS[lightbox].src}
                alt={GALLERY_ITEMS[lightbox].caption}
                fill
                className="object-cover"
                sizes="400px"
              />
              <div className="absolute bottom-0 inset-x-0 bg-navy/50 px-4 py-3">
                <p className="text-cream text-sm font-semibold">{GALLERY_ITEMS[lightbox].caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
