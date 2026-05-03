"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

const COLORS = ["#f582ae", "#8bd3dd", "#f3d2c1", "#001858", "#fef6e4"];

export default function ConfettiEffect() {
  useEffect(() => {
    let animationId: ReturnType<typeof setTimeout>;

    function fire() {
      confetti({
        particleCount: 1,
        angle: Math.random() * 60 + 60,        
        spread: 80,
        startVelocity: 15,
        gravity: 1,
        drift: Math.random() * 2 - 1,
        ticks: 600,
        origin: { x: Math.random(), y: 0 },     
        colors: [COLORS[Math.floor(Math.random() * COLORS.length)]],
        shapes: ["circle", "square"],
        scalar: 1.3,
        disableForReducedMotion: true,
      });

      animationId = setTimeout(fire, 180);      
    }

    animationId = setTimeout(fire, 500);         

    return () => clearTimeout(animationId);
  }, []);

  return null;
}
