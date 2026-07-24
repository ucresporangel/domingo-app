import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { forwardRef } from "react";

interface GlassButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  variant?: "primary" | "neutral";
}

/**
 * Botón glass reutilizable. "primary" lleva un borde dorado + glow suave (se usa
 * para las acciones que de verdad queremos destacar ("Comenzar", "Sí");
 * "neutral" es el estilo por defecto (se usa para "No" y los "Continuar" / "Siguiente").
 */
export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ children, variant = "neutral", className = "", style, ...props }, ref) => {
    const isPrimary = variant === "primary";
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className={`glass rounded-full px-8 py-4 font-body text-base font-medium text-[var(--color-text-primary)] ${
          isPrimary ? "border-2 border-[var(--color-gold-subtle)]" : ""
        } ${className}`}
        style={{
          ...(isPrimary
            ? { boxShadow: "0 6px 24px rgba(212, 180, 131, 0.35), inset 0 1px 0 rgba(255,255,255,0.8)" }
            : undefined),
          ...style,
        }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

GlassButton.displayName = "GlassButton";
