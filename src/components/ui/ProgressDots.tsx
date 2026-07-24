interface ProgressDotsProps {
  total: number;
  current: number; // índice 0-based
}

export function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div
      className="flex gap-1.5"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current + 1}
      aria-label={`Paso ${current + 1} de ${total}`}
    >
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className="h-1.5 rounded-full transition-all duration-500"
          style={{
            width: i === current ? "1.25rem" : "0.375rem",
            backgroundColor:
              i <= current ? "var(--color-gold-subtle)" : "rgba(58, 49, 40, 0.15)",
          }}
        />
      ))}
    </div>
  );
}
