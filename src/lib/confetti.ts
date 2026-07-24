interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  life: number; // 0..1, decrece con el tiempo
}

const PALETTE = ["#F7D9D9", "#E8B4B8", "#D4B483", "#FFF8F0", "#F0E4D4"];

/**
 * Lanza un confeti discreto (máx. 40 partículas, ~2s de vida) sobre un canvas
 * ya montado en el DOM. Pensado para el momento de la respuesta afirmativa — nada exagerado.
 */
export function launchConfetti(canvas: HTMLCanvasElement, reducedMotion: boolean) {
  if (reducedMotion) return; // el momento de celebración sigue existiendo, solo sin partículas físicas

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  const particles: Particle[] = Array.from({ length: 36 }, () => ({
    x: width / 2 + (Math.random() - 0.5) * width * 0.4,
    y: height * 0.35,
    vx: (Math.random() - 0.5) * 4,
    vy: -Math.random() * 6 - 2,
    size: Math.random() * 6 + 4,
    color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.2,
    life: 1,
  }));

  const gravity = 0.15;
  const duration = 2000;
  const start = performance.now();

  function frame(now: number) {
    const elapsed = now - start;
    ctx!.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.vy += gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.life = Math.max(0, 1 - elapsed / duration);

      ctx!.save();
      ctx!.globalAlpha = p.life;
      ctx!.translate(p.x, p.y);
      ctx!.rotate(p.rotation);
      ctx!.fillStyle = p.color;
      ctx!.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx!.restore();
    });

    if (elapsed < duration) {
      requestAnimationFrame(frame);
    } else {
      ctx!.clearRect(0, 0, width, height);
    }
  }

  requestAnimationFrame(frame);
}
