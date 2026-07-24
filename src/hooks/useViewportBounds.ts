import { useEffect, useState } from "react";
import { readSafeAreaInsets } from "../lib/safeArea";

export interface ViewportBounds {
  width: number;
  height: number;
  /** Zona a evitar (notch / Dynamic Island + margen de respiro), en px desde cada borde */
  safeTop: number;
  safeBottom: number;
  safeLeft: number;
  safeRight: number;
}

function readBounds(): ViewportBounds {
  const insets = readSafeAreaInsets();
  return {
    width: window.innerWidth,
    height: window.visualViewport?.height ?? window.innerHeight,
    // Margen extra fijo (además del safe-area real) para que el botón nunca quede
    // pegado al notch/Dynamic Island ni al borde físico del cristal.
    safeTop: insets.top + 56,
    safeBottom: insets.bottom + 24,
    safeLeft: insets.left + 16,
    safeRight: insets.right + 16,
  };
}

/**
 * Devuelve los límites reales dentro de los cuales el botón "No" puede moverse,
 * recalculados en cada resize/orientationchange (rotar el teléfono, aparición del teclado, etc).
 */
export function useViewportBounds(): ViewportBounds {
  const [bounds, setBounds] = useState<ViewportBounds>(() =>
    typeof window !== "undefined"
      ? readBounds()
      : { width: 375, height: 812, safeTop: 56, safeBottom: 24, safeLeft: 16, safeRight: 16 }
  );

  useEffect(() => {
    const update = () => setBounds(readBounds());
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  return bounds;
}
