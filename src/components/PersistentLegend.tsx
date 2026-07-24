import { motion } from "framer-motion";
import { useEffect } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface PersistentLegendProps {
  text: string;
  /** Cuánto dura la fase grande antes de avisar que ya se puede encoger */
  bigPhaseMs?: number;
  /** Se llama una sola vez, cuando termina la fase grande */
  onSettle: () => void;
}

/**
 * Fase "grande": el texto aparece centrado, ocupando toda la escena, y pulsa
 * (crece y decrece) un par de veces para que sea imposible no leerlo.
 * Este componente SOLO dibuja esa fase grande — el llamador decide dónde y
 * cómo mostrar la versión pequeña y fija después (normalmente fuera de la
 * zona de juego, para que nada caiga "encima" de la instrucción).
 */
export function PersistentLegend({ text, bigPhaseMs = 2400, onSettle }: PersistentLegendProps) {
  const reducedMotion = useReducedMotion();
  const bigDuration = reducedMotion ? 900 : bigPhaseMs;

  useEffect(() => {
    const t = window.setTimeout(onSettle, bigDuration);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bigDuration]);

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-[var(--color-cream)]/90 px-10 text-center backdrop-blur-sm">
      <motion.p
        className="font-display text-[clamp(1.5rem,7.5vw,2.4rem)] font-medium leading-snug"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={
          reducedMotion
            ? { opacity: 1, scale: 1 }
            : { opacity: 1, scale: [0.7, 1.12, 0.96, 1.08, 1] }
        }
        transition={{ duration: bigDuration / 1000, ease: [0.22, 1, 0.36, 1] }}
      >
        {text}
      </motion.p>
    </div>
  );
}
