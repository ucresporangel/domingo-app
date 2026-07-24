import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MemoryCard } from "../components/game/MemoryCard";
import { GlassButton } from "../components/ui/GlassButton";
import { PersistentLegend } from "../components/PersistentLegend";

interface FlowerMemoryGameProps {
  onNext: () => void;
}

const FLOWERS = ["🌷", "🌸", "🌻", "🌼"]; // 4 pares — corto a propósito, nunca debe frustrar

interface CardState {
  key: string;
  emoji: string;
  matched: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function FlowerMemoryGame({ onNext }: FlowerMemoryGameProps) {
  const cards = useMemo<CardState[]>(
    () =>
      shuffle(
        FLOWERS.flatMap((emoji, i) => [
          { key: `${i}-a`, emoji, matched: false },
          { key: `${i}-b`, emoji, matched: false },
        ])
      ),
    []
  );

  const [state, setState] = useState(cards);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [legendSettled, setLegendSettled] = useState(false);

  const allMatched = state.every((c) => c.matched);

  function handleFlip(key: string) {
    if (busy || flipped.includes(key)) return;
    const next = [...flipped, key];
    setFlipped(next);

    if (next.length === 2) {
      setBusy(true);
      const [a, b] = next;
      const cardA = state.find((c) => c.key === a)!;
      const cardB = state.find((c) => c.key === b)!;

      if (cardA.emoji === cardB.emoji) {
        window.setTimeout(() => {
          setState((prev) =>
            prev.map((c) => (c.key === a || c.key === b ? { ...c, matched: true } : c))
          );
          setFlipped([]);
          setBusy(false);
        }, 500);
      } else {
        window.setTimeout(() => {
          setFlipped([]);
          setBusy(false);
        }, 900);
      }
    }
  }

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 px-6">
      {!legendSettled && (
        <PersistentLegend text="Encuentra las parejas 🌸" onSettle={() => setLegendSettled(true)} />
      )}
      {legendSettled && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="glass w-fit rounded-full px-4 py-1.5 text-center font-body text-xs text-[var(--color-text-secondary)]"
        >
          Encuentra las parejas 🌸
        </motion.div>
      )}

      <div className="grid w-full max-w-xs grid-cols-4 gap-3">
        {state.map((card) => (
          <MemoryCard
            key={card.key}
            emoji={card.emoji}
            isFlipped={flipped.includes(card.key)}
            isMatched={card.matched}
            onClick={() => handleFlip(card.key)}
          />
        ))}
      </div>

      <div className="flex min-h-[3.5rem] items-center">
        {allMatched && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <GlassButton variant="primary" onClick={onNext}>
              Continuar
            </GlassButton>
          </motion.div>
        )}
      </div>
    </div>
  );
}
