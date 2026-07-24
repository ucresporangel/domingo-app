import { motion } from "framer-motion";
import { AnimatedText } from "../components/ui/AnimatedText";
import { GlassButton } from "../components/ui/GlassButton";
import { FloatingHearts } from "../components/ui/FloatingHearts";
import { Ornament } from "../components/ui/Ornament";

interface GreetingSceneProps {
  onNext: () => void;
}

export function GreetingScene({ onNext }: GreetingSceneProps) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-6 px-6 text-center">
      <FloatingHearts count={6} />
      <FloatingHearts count={4} variant="sparkles" />

      <AnimatedText
        as="h1"
        text="Hola :)"
        className="font-display text-[clamp(2.5rem,10vw,4rem)] font-medium tracking-tight"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Ornament />
      </motion.div>

      <AnimatedText
        as="p"
        text="Hice algo para ti."
        delay={1.3}
        className="font-body text-lg text-[var(--color-text-secondary)]"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-2"
      >
        <GlassButton variant="primary" onClick={onNext} autoFocus>
          Comenzar ❤️
        </GlassButton>
      </motion.div>
    </div>
  );
}
