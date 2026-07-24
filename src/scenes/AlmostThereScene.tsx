import { useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatedText } from "../components/ui/AnimatedText";

interface AlmostThereSceneProps {
  onNext: () => void;
}

export function AlmostThereScene({ onNext }: AlmostThereSceneProps) {
  useEffect(() => {
    const t = setTimeout(onNext, 2400);
    return () => clearTimeout(t);
  }, [onNext]);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {/* Fondo que "respira": pulso muy sutil, la pausa dramática de la historia */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--color-blush) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <AnimatedText
        as="p"
        text="Ya casi..."
        className="relative font-display text-[clamp(1.75rem,7vw,2.5rem)] font-medium"
      />
    </div>
  );
}
