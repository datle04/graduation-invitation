import { EVENT } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-navy py-12 px-6">
      <div className="max-w-md mx-auto flex flex-col items-center text-center gap-4">
        <span className="text-4xl">🎓</span>

        <div>
          <p className="text-cream font-bold text-lg">{EVENT.name}</p>
          <p className="text-cream/60 text-sm mt-0.5">
            {EVENT.school} · {EVENT.faculty}
          </p>
        </div>

        <p className="text-cream/70 text-sm leading-relaxed max-w-xs">
          Cảm ơn bạn đã ghé thăm. Sự hiện diện của bạn là món quà ý nghĩa nhất 🎁
        </p>

        <div className="w-full h-px bg-cream/15 my-2" />

        <p className="text-cream/40 text-xs">
          Made with ♥ · Class of 2026
        </p>
      </div>
    </footer>
  );
}
