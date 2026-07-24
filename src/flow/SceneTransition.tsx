import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

interface SceneTransitionProps {
  sceneKey: string;
  children: ReactNode;
}

/**
 * Transición de escena (400-600ms, sección 9 del plan): fade + slide sutil,
 * ease-out expo estilo Apple. AnimatePresence maneja la salida de la escena anterior.
 */
export function SceneTransition({ sceneKey, children }: SceneTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={sceneKey}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex h-full min-h-0 w-full flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
