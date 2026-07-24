import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { IconHeart } from "./icons";

/**
 * Fondo compartido por todas las escenas: manchas de color muy difuminadas que
 * respiran lentamente (dan profundidad sin ruido visual) más un trazo grande
 * y casi invisible de nuestro propio ícono de corazón, a modo de marca de agua
 * editorial — el tipo de detalle que una revista de diseño usaría, no un emoji.
 */
export function BackgroundAtmosphere() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -left-24 -top-24 h-72 w-72 rounded-full"
        style={{
          background:
            "radial-gradient(circle, var(--color-blush-deep) 0%, transparent 70%)",
          filter: "blur(60px)",
          opacity: 0.55,
        }}
        animate={
          reducedMotion
            ? undefined
            : { x: [0, 18, 0], y: [0, 12, 0], scale: [1, 1.06, 1] }
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-16 h-80 w-80 rounded-full"
        style={{
          background: "radial-gradient(circle, var(--color-gold-subtle) 0%, transparent 70%)",
          filter: "blur(70px)",
          opacity: 0.28,
        }}
        animate={
          reducedMotion
            ? undefined
            : { x: [0, -14, 0], y: [0, -10, 0], scale: [1, 1.08, 1] }
        }
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, var(--color-beige) 0%, transparent 75%)",
          filter: "blur(80px)",
          opacity: 0.35,
        }}
        animate={reducedMotion ? undefined : { scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Marca de agua editorial: un solo trazo de corazón, enorme y casi invisible */}
      <IconHeart
        size={420}
        className="absolute -bottom-24 -right-28 text-[var(--color-blush-deep)] opacity-[0.07]"
        strokeWidth={0.7}
      />

      {/* Grano sutil: le quita el aspecto "plano" al gradiente sin pesar nada (CSS puro) */}
      <div className="absolute inset-0 opacity-[0.035] [background-image:url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22120%22%20height%3D%22120%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E')]" />
    </div>
  );
}
