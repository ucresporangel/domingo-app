interface OrnamentProps {
  className?: string;
  glyph?: string;
}

/** Divisor ornamental: línea — emoji — línea, como en una invitación impresa. */
export function Ornament({ className = "", glyph = "❤️" }: OrnamentProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-10 bg-[var(--color-gold-subtle)] opacity-50" />
      <span className="text-sm leading-none">{glyph}</span>
      <span className="h-px w-10 bg-[var(--color-gold-subtle)] opacity-50" />
    </div>
  );
}
