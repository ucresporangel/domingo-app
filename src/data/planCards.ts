export interface PlanCard {
  id: string;
  emoji: string;
  title: string;
}

// Nota: "llevarte flores" NO está aquí a propósito — es una sorpresa, no se anuncia.
// Edita este array si cambia algo del plan — nada más en el código necesita tocarse.
export const planCards: PlanCard[] = [
  { id: "zoo", emoji: "🦁", title: "Ir al zoológico" },
  { id: "castillo", emoji: "🏰", title: "Visitar el Castillo de Chapultepec" },
  { id: "museo", emoji: "🖼️", title: "Entrar al museo que más se nos antoje" },
  { id: "comida", emoji: "☕", title: "Comer juntos" },
];
