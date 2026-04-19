import React from 'react';

/** Stylised L-shaped interferometer (ground-based network vibe, not an official LVK logo). */
export function GroundInterferometerIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" aria-hidden>
      <rect
        x="8"
        y="8"
        width="104"
        height="104"
        rx="16"
        className="stroke-white/20"
        strokeWidth="2"
        fill="rgba(255,122,24,0.08)"
      />
      <path
        d="M28 60h32M60 28v64M60 60h32"
        stroke="currentColor"
        className="text-gw-orange"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle
        cx="60"
        cy="60"
        r="6"
        fill="currentColor"
        className="text-gw-orange"
      />
    </svg>
  );
}

/** Triangle constellation hinting at space-based / LISA-style geometry. */
export function SpaceTriangleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" aria-hidden>
      <rect
        x="8"
        y="8"
        width="104"
        height="104"
        rx="16"
        className="stroke-white/20"
        strokeWidth="2"
        fill="rgba(168,85,247,0.08)"
      />
      <path
        d="M60 28 L92 88 L28 88 Z"
        stroke="currentColor"
        className="text-gw-purple"
        strokeWidth="3"
        strokeLinejoin="round"
        fill="none"
      />
      <circle
        cx="60"
        cy="28"
        r="5"
        fill="currentColor"
        className="text-gw-purple"
      />
      <circle
        cx="92"
        cy="88"
        r="5"
        fill="currentColor"
        className="text-gw-purple"
      />
      <circle
        cx="28"
        cy="88"
        r="5"
        fill="currentColor"
        className="text-gw-purple"
      />
    </svg>
  );
}

/** Pulsar / timing array hint (dot grid + pulse). */
export function PtaPulsarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" aria-hidden>
      <rect
        x="8"
        y="8"
        width="104"
        height="104"
        rx="16"
        className="stroke-white/20"
        strokeWidth="2"
        fill="rgba(34,197,94,0.06)"
      />
      <path
        d="M20 70 Q40 30 60 70 T100 70"
        stroke="currentColor"
        className="text-emerald-400"
        strokeWidth="3"
        fill="none"
      />
      {[24, 44, 64, 84].map((x) => (
        <circle
          key={x}
          cx={x}
          cy="95"
          r="3"
          fill="currentColor"
          className="text-white/35"
        />
      ))}
    </svg>
  );
}
