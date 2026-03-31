export function RippleDivider() {
  return (
    <div className="relative h-16 w-full overflow-hidden">
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="M0 30 Q150 10 300 30 T600 30 T900 30 T1200 30"
          fill="none"
          stroke="url(#ripple-gradient)"
          strokeWidth="1"
          className="animate-pulse-glow"
        />
        <path
          d="M0 35 Q150 50 300 35 T600 35 T900 35 T1200 35"
          fill="none"
          stroke="url(#ripple-gradient)"
          strokeWidth="0.5"
          className="animate-pulse-glow"
          style={{ animationDelay: '2s' }}
        />
        <defs>
          <linearGradient
            id="ripple-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#f97316" stopOpacity="0" />
            <stop offset="30%" stopColor="#f97316" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#a855f7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
