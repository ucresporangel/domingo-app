import { useCallback, useState } from "react";

export const SCENES = [
  "greeting",
  "confession",
  "game-hearts",
  "game-memory",
  "almost-there",
  "reveal-plan",
  "the-question",
  "celebration",
] as const;

export type Scene = (typeof SCENES)[number];

const STORAGE_KEY = "domingo-app:scene";

function readInitialScene(): number {
  try {
    // sessionStorage (no localStorage): si recarga a la mitad no rejuega los
    // juegos, pero no persiste si comparte el link con alguien más por error.
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const idx = SCENES.indexOf(saved as Scene);
      if (idx >= 0) return idx;
    }
  } catch {
    // sessionStorage puede fallar en modo privado — no es crítico, seguimos desde el inicio
  }
  return 0;
}

export function useSceneFlow() {
  const [index, setIndex] = useState<number>(readInitialScene);

  const goTo = useCallback((scene: Scene) => {
    const idx = SCENES.indexOf(scene);
    if (idx < 0) return;
    setIndex(idx);
    try {
      sessionStorage.setItem(STORAGE_KEY, scene);
    } catch {
      /* no-op */
    }
  }, []);

  const next = useCallback(() => {
    setIndex((i) => {
      const nextIdx = Math.min(i + 1, SCENES.length - 1);
      try {
        sessionStorage.setItem(STORAGE_KEY, SCENES[nextIdx]);
      } catch {
        /* no-op */
      }
      return nextIdx;
    });
  }, []);

  return {
    scene: SCENES[index],
    index,
    total: SCENES.length,
    next,
    goTo,
  };
}
