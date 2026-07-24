import { useEffect, useState } from "react";

/**
 * Detecta si el usuario tiene activado "Reducir movimiento" (VoiceOver / Ajustes de iOS
 * también respetan esta media query). Se usa para simplificar o cancelar animaciones
 * complejas (como el botón "No" huyendo por la pantalla).
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return reduced;
}
