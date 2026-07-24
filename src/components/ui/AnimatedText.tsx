import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface AnimatedTextProps {
  text: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  delay?: number; // segundos antes de empezar
  wordStagger?: number; // segundos entre palabras
}

/**
 * Revela un texto palabra por palabra con fade + slide sutil.
 * Con prefers-reduced-motion activo, colapsa a un fade simple del bloque completo.
 */
export function AnimatedText({
  text,
  as = "p",
  className = "",
  delay = 0,
  wordStagger = 0.05,
}: AnimatedTextProps) {
  const reducedMotion = useReducedMotion();
  const Tag = motion[as];
  const words = text.split(" ");

  if (reducedMotion) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15, delay }}
        className={className}
      >
        {text}
      </motion.p>
    );
  }

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + i * wordStagger,
          }}
          style={{ display: "inline-block", marginRight: "0.3em" }}
          aria-hidden="true"
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
