import type { SVGProps } from "react";

/**
 * Todos los íconos de este archivo son ilustraciones vectoriales propias
 * (line-art, trazo uniforme, sin relleno salvo donde se indica) — no son
 * emoji ni assets externos. Comparten el mismo lenguaje visual: stroke
 * redondeado, 1.4px de grosor relativo, para que se sientan de la misma
 * "familia" sin importar dónde aparezcan.
 */

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Svg({ size = 24, ...props }: IconProps) {
  return <svg width={size} height={size} {...base} {...props} />;
}

/** Corazón — línea continua, un solo trazo. Usado en decoración ambiental y celebración. */
export function IconHeart(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 20.2c-.3 0-.6-.1-.8-.3-2-1.7-3.9-3.4-5.3-5.1C4.3 12.9 3.3 11 3.3 9c0-2.7 2.1-4.8 4.7-4.8 1.6 0 3 .8 4 2.1 1-1.3 2.4-2.1 4-2.1 2.6 0 4.7 2.1 4.7 4.8 0 2-1 3.9-2.6 5.8-1.4 1.7-3.3 3.4-5.3 5.1-.2.2-.5.3-.8.3Z" />
    </Svg>
  );
}

/** Marca de beso — labios estilizados, relleno sólido (usada en el minijuego de besitos) */
export function IconKiss(props: IconProps) {
  return (
    <Svg {...props} fill="currentColor" stroke="none" strokeWidth={0}>
      <path d="M4 10.5c1.6-2 3.2-3 4.6-3 1.1 0 1.8.8 2.4 1.6.6-.8 1.3-1.6 2.4-1.6 1.4 0 3 1 4.6 3-1.1 1-2.2 1.5-3.3 1.9.6.5 1.3.9 2.1 1.1-1 .9-2.3 1.4-3.6 1.4-.9 0-1.6-.4-2.2-1-.6.6-1.3 1-2.2 1-1.3 0-2.6-.5-3.6-1.4.8-.2 1.5-.6 2.1-1.1-1.1-.4-2.2-.9-3.3-1.9Z" />
    </Svg>
  );
}

/** Canasta — silueta tejida simplificada, usada en el minijuego de atrapar */
export function IconBasket(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4.5 10.5h15l-1.4 8.3a1.5 1.5 0 0 1-1.5 1.2H7.4a1.5 1.5 0 0 1-1.5-1.2L4.5 10.5Z" />
      <path d="M4.5 10.5c0-2.2 3.4-3.5 7.5-3.5s7.5 1.3 7.5 3.5" />
      <path d="M12 3.5c-1.6 1.1-2.6 2.5-2.9 3.9M12 3.5c1.6 1.1 2.6 2.5 2.9 3.9" />
      <path d="M9 13.5v4M12 13.5v4M15 13.5v4" opacity="0.55" />
    </Svg>
  );
}

/** Bicicleta — para la actividad de Chapultepec */
export function IconBike(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="6" cy="16.5" r="3.2" />
      <circle cx="18" cy="16.5" r="3.2" />
      <path d="M6 16.5 9.8 9h4.4l3.3 7.5" />
      <path d="M9.8 9 8.4 6.5h-2" />
      <path d="M9.8 9 12.6 13.3H18" />
      <path d="M12.6 13.3 14.2 9" />
    </Svg>
  );
}

/** Huella — representa "ir al zoológico" sin dibujar un animal literal */
export function IconPaw(props: IconProps) {
  return (
    <Svg {...props} strokeWidth={1.2} fill="currentColor" stroke="none">
      <ellipse cx="12" cy="15.2" rx="4.6" ry="3.8" />
      <ellipse cx="6.3" cy="9.6" rx="1.7" ry="2.2" transform="rotate(-18 6.3 9.6)" />
      <ellipse cx="10.4" cy="6.6" rx="1.7" ry="2.3" transform="rotate(-6 10.4 6.6)" />
      <ellipse cx="14.4" cy="6.6" rx="1.7" ry="2.3" transform="rotate(6 14.4 6.6)" />
      <ellipse cx="17.7" cy="9.6" rx="1.7" ry="2.2" transform="rotate(18 17.7 9.6)" />
    </Svg>
  );
}

/** Castillo — torres simples con almenas, para el Castillo de Chapultepec */
export function IconCastle(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 20V9.5M4 9.5h2V7h2v2.5h2M4 9.5H2M8 9.5V20" />
      <path d="M20 20V9.5M20 9.5h-2V7h-2v2.5h-2M20 9.5h2M16 9.5V20" />
      <path d="M8 20v-5c0-1.3 1.8-2.3 4-2.3s4 1 4 2.3v5" />
      <path d="M4 20h16" />
      <path d="M11 15.2v2.3M13 15.2v2.3" />
    </Svg>
  );
}

/** Cuadro enmarcado — representa el museo */
export function IconFrame(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="4" y="4.5" width="16" height="14" rx="1.2" />
      <path d="M7 14.8l3.1-3.4a1.4 1.4 0 0 1 2 0l1.4 1.5a1.4 1.4 0 0 0 2 .05L17.3 11" />
      <circle cx="9" cy="8.3" r="1.15" />
    </Svg>
  );
}

/** Taza — representa "comer/tomar algo juntos" */
export function IconCup(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5.5 9h10.2v6a4 4 0 0 1-4 4h-2.2a4 4 0 0 1-4-4V9Z" />
      <path d="M15.7 10.3h1a2.3 2.3 0 0 1 0 4.6h-1" />
      <path d="M8.3 4.7c-.5.7-.5 1.3 0 2M11.5 4.7c-.5.7-.5 1.3 0 2" />
    </Svg>
  );
}

/* --- Set botánico para el juego de memoria: 4 ilustraciones distintas, mismo lenguaje de línea --- */

export function IconBotanicalTulip(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 13V21" />
      <path d="M12 13c-2.6-.4-4-2.4-4-5.3C9.6 8.4 11 9.6 12 11.4 13 9.6 14.4 8.4 16 7.7c0 2.9-1.4 4.9-4 5.3Z" />
      <path d="M9 20c-1 .1-1.8-.4-2.3-1.3M15 20c1 .1 1.8-.4 2.3-1.3" />
    </Svg>
  );
}

export function IconBotanicalDaisy(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="9" r="1.6" />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={angle}
          cx="12"
          cy="5.6"
          rx="1.1"
          ry="2.1"
          transform={`rotate(${angle} 12 9)`}
        />
      ))}
      <path d="M12 12.5V21" />
    </Svg>
  );
}

export function IconBotanicalLeafBranch(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21c0-6 .3-11.5 4-16" />
      <path d="M12.6 8.4c1.6-.6 3-.4 4-.9" />
      <path d="M11.6 12.4c-1.7-.3-3-.9-4.3-.6" />
      <path d="M11 16.4c-1.7.1-3-.3-4.3.3" />
    </Svg>
  );
}

export function IconBotanicalBud(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21v-9" />
      <path d="M12 12c-3-1-4.6-3.4-4.6-6.6C10.2 5.9 12 7.6 12 10c0-2.4 1.8-4.1 4.6-4.6C16.6 8.6 15 11 12 12Z" />
    </Svg>
  );
}

export const botanicalIcons = [
  IconBotanicalTulip,
  IconBotanicalDaisy,
  IconBotanicalLeafBranch,
  IconBotanicalBud,
];
