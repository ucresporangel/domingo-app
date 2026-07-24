import { motion } from "framer-motion";
import { useMemo } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface FloatingHeartsProps {
  count?: number;
  variant?: "hearts" | "sparkles";
}

/**
 * Corazones (o chispitas) decorativos de fondo, flotando lentamente en loop
 * infinito. Puramente ambiental (aria-hidden) — nunca interactivo.
 */
export function FloatingHearts({ count = 6, variant = "hearts" }: FloatingHeartsProps) {
  const reducedMotion = useReducedMotion();
  const glyph = variant === "sparkles" ? "✨" : "❤️";

  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${8 + ((i * 137) % 84)}%`,
        size: 14 + ((i * 53) % 18),
        duration: 10 + (i % 4) * 3,
        delay: i * 1.3,
        opacity: 0.16 + (i % 3) * 0.08,
      })),
    [count]
  );

  if (reducedMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute select-none"
          style={{
            left: h.left,
            bottom: 0,
            fontSize: h.size,
            opacity: h.opacity,
          }}
          animate={{ y: ["10vh", "-130vh"], rotate: [0, 15, -10, 0] }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {glyph}
        </motion.span>
      ))}
    </div>
  );
}
