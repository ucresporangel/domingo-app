import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AnimatedText } from "../components/ui/AnimatedText";
import { Ornament } from "../components/ui/Ornament";
import { FloatingHearts } from "../components/ui/FloatingHearts";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { launchConfetti } from "../lib/confetti";

export function CelebrationScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (canvasRef.current) {
      launchConfetti(canvasRef.current, reducedMotion);
    }
  }, [reducedMotion]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-5 px-8 text-center">
      <FloatingHearts count={5} variant="sparkles" />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center gap-4"
      >
        <AnimatedText
          as="h1"
          text="¡Sabía que aceptarías! ❤️"
          className="font-display text-[clamp(1.75rem,7vw,2.5rem)] font-medium"
        />
        <Ornament />
        <AnimatedText
          as="p"
          text="Ahora solo queda pasar un domingo increíble contigo."
          delay={0.8}
          className="font-body text-lg text-[var(--color-text-secondary)]"
        />
      </motion.div>
    </div>
  );
}
