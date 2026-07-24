import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { GlassButton } from "../components/ui/GlassButton";
import { CountdownRing } from "../components/ui/CountdownRing";
import { PersistentLegend } from "../components/PersistentLegend";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface KissCatchGameProps {
  onNext: () => void;
}

interface FallingKiss {
  id: number;
  x: number;
  y: number;
  size: number;
  resolved: boolean;
}

interface Burst {
  id: number;
  x: number;
  y: number;
}

const GAME_DURATION_MS = 15000; // 15s de cuenta regresiva
const END_GRACE_MS = 1200;
const SPAWN_INTERVAL_MS = 850;
const FALL_SPEED_PX_S = 130;
const BASKET_WIDTH = 84;
const BASKET_HEIGHT = 50;
const CATCH_TOLERANCE = BASKET_WIDTH / 2 + 16;
const LEGEND_TEXT = "Desliza la canasta de izquierda a derecha para atrapar besitos 💋";

// Ángulos fijos para las chispitas del "burst" — se ven parejas y controladas
const BURST_ANGLES = [-70, -25, 25, 70, 130, 180, 235, 285];

export function KissCatchGame({ onNext }: KissCatchGameProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 320, height: 420 });

  const basketX = useMotionValue(containerSize.width / 2 - BASKET_WIDTH / 2);
  const basketXRef = useRef(containerSize.width / 2);
  const basketScale = useMotionValue(1);

  const [kisses, setKisses] = useState<FallingKiss[]>([]);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [score, setScore] = useState(0);
  const [remainingMs, setRemainingMs] = useState(GAME_DURATION_MS);
  const [gameOver, setGameOver] = useState(false);
  const [legendSettled, setLegendSettled] = useState(false);

  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const nextSpawnRef = useRef(0);
  const idRef = useRef(0);
  const kissesRef = useRef<FallingKiss[]>([]);

  const didInitialMeasure = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    function applyMeasurement(width: number, height: number) {
      setContainerSize({ width, height });
      if (!didInitialMeasure.current) {
        // Solo centramos la canasta en la primera medición — después, si el
        // contenedor cambia de tamaño (p. ej. la leyenda se encoge y libera
        // espacio), solo actualizamos catchLineY, sin recentrar la canasta.
        didInitialMeasure.current = true;
        const centerX = width / 2;
        basketX.set(centerX - BASKET_WIDTH / 2);
        basketXRef.current = centerX;
      } else {
        const maxX = Math.max(0, width - BASKET_WIDTH);
        const clamped = Math.min(maxX, Math.max(0, basketX.get()));
        basketX.set(clamped);
        basketXRef.current = clamped + BASKET_WIDTH / 2;
      }
    }

    const rect = el.getBoundingClientRect();
    applyMeasurement(rect.width, rect.height);

    // ResizeObserver detecta CUALQUIER cambio real de tamaño del contenedor
    // (no solo el resize de la ventana) — incluyendo el que provoca la leyenda
    // al encogerse, que antes dejaba a catchLineY con un valor viejo y hacía
    // que el "atrape" se detectara tarde.
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (cr) applyMeasurement(cr.width, cr.height);
    });
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const catchLineY = containerSize.height - BASKET_HEIGHT - 10;

  useEffect(() => {
    if (reducedMotion) {
      const t = setTimeout(() => setGameOver(true), 1200);
      return () => clearTimeout(t);
    }

    function bounceBasket() {
      basketScale.set(1.25);
      window.setTimeout(() => basketScale.set(1), 180);
    }

    function tick(now: number) {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      setRemainingMs(Math.max(0, GAME_DURATION_MS - elapsed));

      if (elapsed < GAME_DURATION_MS && elapsed >= nextSpawnRef.current) {
        nextSpawnRef.current = elapsed + SPAWN_INTERVAL_MS + Math.random() * 400;
        const size = 30 + Math.random() * 12;
        const margin = size;
        const x = margin + Math.random() * Math.max(1, containerSize.width - margin * 2);
        idRef.current += 1;
        kissesRef.current = [
          ...kissesRef.current,
          { id: idRef.current, x, y: -size, size, resolved: false },
        ];
      }

      const dy = (FALL_SPEED_PX_S * 16.7) / 1000;
      const newBursts: Burst[] = [];
      kissesRef.current = kissesRef.current
        .map((k) => {
          if (k.resolved) return { ...k, y: k.y + dy };
          const prevY = k.y;
          const newY = k.y + dy;
          if (newY >= catchLineY && prevY < catchLineY) {
            const caught = Math.abs(k.x - basketXRef.current) < CATCH_TOLERANCE;
            if (caught) {
              setScore((s) => s + 1);
              newBursts.push({ id: k.id, x: k.x, y: catchLineY });
              bounceBasket();
              return { ...k, y: newY, resolved: true };
            }
          }
          return { ...k, y: newY };
        })
        .filter((k) => k.y < containerSize.height + 60);

      if (newBursts.length > 0) {
        setBursts((prev) => [...prev, ...newBursts]);
        newBursts.forEach((b) => {
          window.setTimeout(() => {
            setBursts((prev) => prev.filter((x) => x.id !== b.id));
          }, 750);
        });
      }

      setKisses([...kissesRef.current]);

      if (elapsed > GAME_DURATION_MS + END_GRACE_MS) {
        setGameOver(true);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, containerSize.width, catchLineY]);

  function handleDrag() {
    if (gameOver) return;
    basketXRef.current = basketX.get() + BASKET_WIDTH / 2;
  }

  function nudgeBasket(delta: number) {
    if (gameOver) return;
    const maxX = Math.max(0, containerSize.width - BASKET_WIDTH);
    const next = Math.min(maxX, Math.max(0, basketX.get() + delta));
    basketX.set(next);
    basketXRef.current = next + BASKET_WIDTH / 2;
  }

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col px-6 pt-4">
      {/* Marcador y cronómetro: siempre visibles, en cada costado */}
      <div className="relative z-30 mb-1 flex items-center justify-between px-1">
        <motion.span
          key={score}
          initial={{ scale: 1.35 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 12 }}
          className="glass rounded-full px-4 py-1.5 font-body text-sm font-medium text-[var(--color-text-secondary)]"
        >
          💋 {score} besitos
        </motion.span>
        {!reducedMotion && <CountdownRing totalMs={GAME_DURATION_MS} remainingMs={remainingMs} />}
      </div>

      {/* La instrucción, ya asentada, vive en su PROPIA fila — nunca dentro de la
          zona de caída, así los besitos jamás pasan "por encima" de ella. */}
      {legendSettled && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="glass relative z-30 mx-auto mb-2 w-fit rounded-full px-4 py-1.5 text-center font-body text-xs text-[var(--color-text-secondary)]"
        >
          {LEGEND_TEXT}
        </motion.div>
      )}

      <div
        ref={containerRef}
        className="relative mt-2 min-h-0 flex-1 overflow-hidden"
        style={{ touchAction: "none" }}
      >
        {!legendSettled && (
          <PersistentLegend text={LEGEND_TEXT} onSettle={() => setLegendSettled(true)} />
        )}

        {!reducedMotion &&
          kisses
            .filter((k) => !k.resolved || k.y < catchLineY + 4)
            .map((k) => (
              <span
                key={k.id}
                className="absolute select-none"
                style={{ left: k.x - k.size / 2, top: k.y, fontSize: k.size, lineHeight: 1 }}
              >
                💋
              </span>
            ))}

        {bursts.map((b) => (
          <div key={`burst-${b.id}`} className="absolute" style={{ left: b.x, top: b.y }}>
            {BURST_ANGLES.map((angle, i) => (
              <motion.span
                key={angle}
                className="absolute select-none text-base"
                initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
                animate={{
                  x: Math.cos((angle * Math.PI) / 180) * 34,
                  y: Math.sin((angle * Math.PI) / 180) * 34,
                  opacity: 0,
                  scale: 1,
                }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                {i % 2 === 0 ? "💋" : "✨"}
              </motion.span>
            ))}
            <motion.span
              className="absolute select-none text-2xl"
              initial={{ scale: 0.6, opacity: 1, y: 0 }}
              animate={{ scale: 1.9, opacity: 0, y: -26 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              💋
            </motion.span>
          </div>
        ))}

        <motion.div
          role="slider"
          aria-label="Canasta — desliza o usa las flechas para moverla"
          aria-valuemin={0}
          aria-valuemax={Math.max(0, containerSize.width - BASKET_WIDTH)}
          aria-valuenow={Math.round(basketX.get())}
          aria-disabled={gameOver}
          tabIndex={gameOver ? -1 : 0}
          drag={gameOver ? false : "x"}
          dragConstraints={{ left: 0, right: Math.max(0, containerSize.width - BASKET_WIDTH) }}
          dragElastic={0}
          dragMomentum={false}
          onDrag={handleDrag}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") nudgeBasket(-24);
            if (e.key === "ArrowRight") nudgeBasket(24);
          }}
          style={{
            x: basketX,
            scale: basketScale,
            position: "absolute",
            bottom: 8,
            width: BASKET_WIDTH,
            height: BASKET_HEIGHT,
          }}
          className={`glass flex items-center justify-center rounded-2xl text-3xl shadow-[0_6px_16px_rgba(58,49,40,0.18)] ${
            gameOver ? "" : "cursor-grab active:cursor-grabbing"
          }`}
        >
          🧺
        </motion.div>
      </div>

      <div className="flex min-h-[4.5rem] items-center justify-center pb-8 pt-3">
        {gameOver && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="font-display text-xl font-medium">Te debo {score} besitos 💋</p>
            <GlassButton variant="primary" onClick={onNext}>
              Continuar
            </GlassButton>
          </motion.div>
        )}
      </div>
    </div>
  );
}
