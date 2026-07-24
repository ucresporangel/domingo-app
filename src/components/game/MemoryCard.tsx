import { motion } from "framer-motion";

interface MemoryCardProps {
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export function MemoryCard({ emoji, isFlipped, isMatched, onClick }: MemoryCardProps) {
  const revealed = isFlipped || isMatched;

  return (
    <button
      onClick={onClick}
      disabled={revealed}
      aria-label={revealed ? `Flor ${emoji}` : "Carta bocabajo"}
      className="aspect-square [perspective:800px]"
      style={{ cursor: isMatched ? "default" : "pointer" }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: revealed ? 180 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Reverso: mismo motivo en todas las cartas, como el dorso de una baraja */}
        <div
          className="glass absolute inset-0 flex items-center justify-center rounded-2xl text-2xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          🌸
        </div>
        {/* Frente: la flor real de esta carta */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-2xl text-3xl transition-colors"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: isMatched ? "var(--color-blush)" : "var(--color-white-glass)",
            boxShadow: isMatched
              ? "0 0 0 2px var(--color-gold-subtle) inset"
              : "inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          {emoji}
        </div>
      </motion.div>
    </button>
  );
}
