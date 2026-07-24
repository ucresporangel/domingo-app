import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedText } from "../components/ui/AnimatedText";
import { GlassButton } from "../components/ui/GlassButton";
import { planCards } from "../data/planCards";

interface RevealPlanSceneProps {
  onNext: () => void;
}

// Tinte de fondo del círculo-insignia — variaciones sutiles de la paleta
const BADGE_TINTS = [
  "linear-gradient(135deg, #F7D9D9, #E8B4B8)",
  "linear-gradient(135deg, #F0E4D4, #D4B483)",
  "linear-gradient(135deg, #FFF8F0, #F7D9D9)",
  "linear-gradient(135deg, #E8B4B8, #D4B483)",
];

export function RevealPlanScene({ onNext }: RevealPlanSceneProps) {
  const [shown, setShown] = useState(1);
  const allShown = shown >= planCards.length;

  return (
    <div className="flex h-full min-h-0 w-full flex-col items-center gap-3 overflow-y-auto px-6 pb-5 pt-4">
      <div className="text-center">
        <AnimatedText as="p" text="La verdad..." className="font-display text-lg font-medium" />
        <AnimatedText
          as="p"
          text="todo esto tenía un propósito."
          delay={1}
          className="font-body text-sm text-[var(--color-text-secondary)]"
        />
        <AnimatedText
          as="p"
          text="Quería invitarte a salir. Este es el plan:"
          delay={2}
          className="font-display text-base font-medium"
        />
      </div>

      {/* Un solo panel continuo — es EL plan, no una lista de opciones para elegir */}
      <div className="glass w-full max-w-sm overflow-hidden rounded-3xl">
        {planCards.slice(0, shown).map((card, i) => {
          const isLast = i === shown - 1 && i === planCards.length - 1;
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`flex items-center gap-3 px-4 py-2.5 ${
                isLast ? "" : "border-b border-white/40"
              }`}
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
                style={{ background: BADGE_TINTS[i % BADGE_TINTS.length] }}
              >
                {card.emoji}
              </span>
              <span className="font-body text-sm leading-snug">{card.title}</span>
            </motion.div>
          );
        })}
      </div>

      {!allShown && <GlassButton onClick={() => setShown((s) => s + 1)}>Siguiente</GlassButton>}

      {allShown && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="text-center">
            <AnimatedText
              as="p"
              text="Creo que sería un domingo muy bonito..."
              className="font-body text-sm text-[var(--color-text-secondary)]"
            />
            <AnimatedText
              as="p"
              text="Sobre todo si es contigo. 💛"
              delay={1.2}
              className="font-display text-base font-medium"
            />
          </div>
          <GlassButton variant="primary" onClick={onNext}>
            Continuar
          </GlassButton>
        </motion.div>
      )}
    </div>
  );
}
