import { motion, useAnimation, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useViewportBounds } from "../hooks/useViewportBounds";

interface EscapingNoButtonProps {
  onCaught?: () => void;
}

type Phase = "idle" | "confirm" | "escaping" | "caught";

const SPEED = 7; // px por frame, aprox. — "moverse rápidamente"

export function EscapingNoButton({ onCaught }: EscapingNoButtonProps) {
  const reducedMotion = useReducedMotion();
  const bounds = useViewportBounds();
  const [phase, setPhase] = useState<Phase>("idle");

  const btnRef = useRef<HTMLButtonElement>(null);
  const controls = useAnimation();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const velocity = useRef({ vx: 0, vy: 0 });
  const rafId = useRef<number | null>(null);
  const size = useRef({ width: 0, height: 0 });

  const tremble = () =>
    controls.start({
      rotate: [0, -8, 8, -6, 6, -2, 0],
      transition: { duration: 0.4, ease: "easeInOut" },
    });

  function randomVelocity() {
    const angle = Math.random() * Math.PI * 2;
    velocity.current = { vx: Math.cos(angle) * SPEED, vy: Math.sin(angle) * SPEED };
  }

  function startEscaping() {
    const rect = btnRef.current?.getBoundingClientRect();
    if (rect) {
      size.current = { width: rect.width, height: rect.height };
      x.set(rect.left);
      y.set(rect.top);
    }
    randomVelocity();
    setPhase("escaping");
  }

  function handleClick() {
    if (phase === "idle") {
      tremble();
      setPhase("confirm");
    } else if (phase === "confirm") {
      tremble();
      startEscaping();
    } else if (phase === "escaping") {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      tremble();
      setPhase("caught");
      onCaught?.();
      window.setTimeout(() => {
        randomVelocity();
        setPhase("escaping");
      }, 1000);
    }
    // fase "caught": ignoramos clicks extra durante el respiro de 1s
  }

  // Loop de física: rebota dentro de los límites seguros del viewport
  useEffect(() => {
    if (phase !== "escaping" || reducedMotion) return;

    function tick() {
      const minX = bounds.safeLeft;
      const maxX = Math.max(minX, bounds.width - bounds.safeRight - size.current.width);
      const minY = bounds.safeTop;
      const maxY = Math.max(minY, bounds.height - bounds.safeBottom - size.current.height);

      let nx = x.get() + velocity.current.vx;
      let ny = y.get() + velocity.current.vy;

      if (nx < minX) {
        nx = minX;
        velocity.current.vx = Math.abs(velocity.current.vx);
      } else if (nx > maxX) {
        nx = maxX;
        velocity.current.vx = -Math.abs(velocity.current.vx);
      }

      if (ny < minY) {
        ny = minY;
        velocity.current.vy = Math.abs(velocity.current.vy);
      } else if (ny > maxY) {
        ny = maxY;
        velocity.current.vy = -Math.abs(velocity.current.vy);
      }

      x.set(nx);
      y.set(ny);
      rafId.current = requestAnimationFrame(tick);
    }

    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [phase, bounds, reducedMotion, x, y]);

  const label =
    phase === "caught"
      ? "No acepto un “No” por respuesta 😝"
      : phase === "idle"
      ? "No 🙃"
      : "¿Segura? 🤨";

  // Con reduce-motion: nunca perseguimos al cursor. Solo tiembla y avisa, sin física.
  if (reducedMotion) {
    return (
      <motion.button
        animate={controls}
        onClick={() => {
          if (phase === "idle") {
            tremble();
            setPhase("confirm");
          } else {
            tremble();
            setPhase("caught");
            onCaught?.();
            window.setTimeout(() => setPhase("confirm"), 800);
          }
        }}
        className="glass rounded-full px-8 py-4 font-body text-base font-medium"
        aria-live="polite"
      >
        {label}
      </motion.button>
    );
  }

  const isEscaping = phase === "escaping" || phase === "caught";

  return (
    <motion.button
      ref={btnRef}
      animate={controls}
      onClick={handleClick}
      className="glass rounded-full px-8 py-4 font-body text-base font-medium whitespace-nowrap"
      style={
        isEscaping
          ? { position: "fixed", top: 0, left: 0, x, y, zIndex: 50 }
          : undefined
      }
      aria-live="polite"
    >
      {label}
    </motion.button>
  );
}
