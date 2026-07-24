interface CountdownRingProps {
  totalMs: number;
  remainingMs: number;
  size?: number;
}

export function CountdownRing({ totalMs, remainingMs, size = 52 }: CountdownRingProps) {
  const pct = Math.max(0, Math.min(1, remainingMs / totalMs));
  const strokeWidth = 3;
  const r = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * r;
  const seconds = Math.max(0, Math.ceil(remainingMs / 1000));

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="rgba(58, 49, 40, 0.12)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="var(--color-gold-subtle)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${circumference * pct} ${circumference}`}
          style={{ transition: "stroke-dasharray 0.2s linear" }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-body text-sm font-medium tabular-nums">
        {seconds}
      </span>
    </div>
  );
}
