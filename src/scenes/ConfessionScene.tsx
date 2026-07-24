import { useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatedText } from "../components/ui/AnimatedText";

interface ConfessionSceneProps {
  onNext: () => void;
}

export function ConfessionScene({ onNext }: ConfessionSceneProps) {
  // Auto-avanza tras dar tiempo de leer (sección 3 del plan: "auto-avanza tras animación de texto")
  useEffect(() => {
    const t = setTimeout(onNext, 4200);
    return () => clearTimeout(t);
  }, [onNext]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 px-8 text-center">
      <motion.span
        aria-hidden="true"
        className="mb-2 font-mono text-sm text-[var(--color-gold-subtle)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {"</> "}
      </motion.span>

      <AnimatedText
        as="p"
        text="Quería invitarte de una forma diferente..."
        className="font-display text-[clamp(1.5rem,6vw,2.25rem)] font-medium"
      />
      <AnimatedText
        as="p"
        text="así que mejor te hice esto."
        delay={1.6}
        className="font-body text-lg text-[var(--color-text-secondary)]"
      />
    </div>
  );
}
