import { AnimatedText } from "../components/ui/AnimatedText";
import { GlassButton } from "../components/ui/GlassButton";
import { EscapingNoButton } from "../components/EscapingNoButton";
import { FloatingHearts } from "../components/ui/FloatingHearts";

interface TheQuestionSceneProps {
  onAccept: () => void;
}

export function TheQuestionScene({ onAccept }: TheQuestionSceneProps) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-10 px-8 text-center">
      <FloatingHearts count={3} />

      <AnimatedText
        as="h1"
        text="¿Aceptarías tener una cita conmigo este domingo?"
        className="font-display text-[clamp(1.65rem,7vw,2.5rem)] font-medium leading-tight tracking-tight"
      />

      <div className="flex items-center gap-4">
        <GlassButton variant="primary" onClick={onAccept}>
          Sí ❤️
        </GlassButton>
        <EscapingNoButton />
      </div>
    </div>
  );
}
