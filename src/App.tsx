import { SceneTransition } from "./flow/SceneTransition";
import { useSceneFlow } from "./flow/useSceneFlow";
import { ProgressDots } from "./components/ui/ProgressDots";
import { BackgroundAtmosphere } from "./components/BackgroundAtmosphere";
import { GreetingScene } from "./scenes/GreetingScene";
import { ConfessionScene } from "./scenes/ConfessionScene";
import { KissCatchGame } from "./scenes/KissCatchGame";
import { FlowerMemoryGame } from "./scenes/FlowerMemoryGame";
import { AlmostThereScene } from "./scenes/AlmostThereScene";
import { RevealPlanScene } from "./scenes/RevealPlanScene";
import { TheQuestionScene } from "./scenes/TheQuestionScene";
import { CelebrationScene } from "./scenes/CelebrationScene";

function App() {
  const { scene, index, total, next } = useSceneFlow();

  // La pantalla de celebración no debe mostrar los puntos de progreso —
  // ya no hay "avance" que señalar, la historia terminó.
  const showProgress = scene !== "greeting" && scene !== "celebration";

  return (
    <div className="safe-area-frame relative h-[100dvh] w-full overflow-hidden bg-[var(--color-cream)]">
      <BackgroundAtmosphere />

      {showProgress && (
        <div className="absolute right-0 top-0 z-10 flex w-full justify-center pt-[max(0.5rem,env(safe-area-inset-top))]">
          <ProgressDots total={total} current={index} />
        </div>
      )}

      <SceneTransition sceneKey={scene}>
        {scene === "greeting" && <GreetingScene onNext={next} />}
        {scene === "confession" && <ConfessionScene onNext={next} />}
        {scene === "game-hearts" && <KissCatchGame onNext={next} />}
        {scene === "game-memory" && <FlowerMemoryGame onNext={next} />}
        {scene === "almost-there" && <AlmostThereScene onNext={next} />}
        {scene === "reveal-plan" && <RevealPlanScene onNext={next} />}
        {scene === "the-question" && <TheQuestionScene onAccept={next} />}
        {scene === "celebration" && <CelebrationScene />}
      </SceneTransition>
    </div>
  );
}

export default App;
