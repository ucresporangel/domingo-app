let probe: HTMLDivElement | null = null;

function getProbe(): HTMLDivElement {
  if (probe) return probe;
  probe = document.createElement("div");
  probe.style.position = "fixed";
  probe.style.top = "0";
  probe.style.left = "0";
  probe.style.visibility = "hidden";
  probe.style.pointerEvents = "none";
  probe.style.paddingTop = "env(safe-area-inset-top, 0px)";
  probe.style.paddingBottom = "env(safe-area-inset-bottom, 0px)";
  probe.style.paddingLeft = "env(safe-area-inset-left, 0px)";
  probe.style.paddingRight = "env(safe-area-inset-right, 0px)";
  document.body.appendChild(probe);
  return probe;
}

/** Lee los 4 safe-area-insets actuales del dispositivo, en píxeles reales. */
export function readSafeAreaInsets() {
  const el = getProbe();
  const cs = getComputedStyle(el);
  return {
    top: parseFloat(cs.paddingTop) || 0,
    bottom: parseFloat(cs.paddingBottom) || 0,
    left: parseFloat(cs.paddingLeft) || 0,
    right: parseFloat(cs.paddingRight) || 0,
  };
}
