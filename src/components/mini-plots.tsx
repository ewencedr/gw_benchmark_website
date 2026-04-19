import React from 'react';

function Axis({
  x = 24,
  y = 16,
  w = 176,
  h = 112,
}: {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
}) {
  return (
    <>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={12}
        fill="rgba(255,255,255,0.02)"
      />
      <line
        x1={x + 12}
        y1={y + h - 16}
        x2={x + w - 12}
        y2={y + h - 16}
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="2"
      />
      <line
        x1={x + 12}
        y1={y + 16}
        x2={x + 12}
        y2={y + h - 16}
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="2"
      />
    </>
  );
}

/**
 * Smooth Gaussian-like bell path. The bezier control points are placed at
 * 70 % and 30 % of half-width from the centre so the shoulders curve
 * smoothly and the tails fall off naturally.
 *
 * Returns an SVG path `d` string from (cx-hw, bY) to (cx+hw, bY) via peak (cx, py).
 */
function bell(cx: number, hw: number, py: number, bY: number): string {
  const l0 = cx - hw;
  const l1 = cx - Math.round(hw * 0.7);
  const l2 = cx - Math.round(hw * 0.25);
  const r2 = cx + Math.round(hw * 0.25);
  const r1 = cx + Math.round(hw * 0.7);
  const r0 = cx + hw;
  return `M ${l0} ${bY} C ${l1} ${bY}, ${l2} ${py}, ${cx} ${py} C ${r2} ${py}, ${r1} ${bY}, ${r0} ${bY}`;
}

/**
 * C2ST — Classifier Two-Sample Test
 *
 * Two overlapping Gaussian distributions (reference=white/dim, approx=purple)
 * with a vertical dashed decision boundary between them. If the distributions
 * are identical the classifier can't separate them (accuracy → 0.5).
 */
export function TwoSampleMini({
  className,
  accent = '#a855f7',
}: {
  className?: string;
  accent?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 224 144"
      fill="none"
      role="img"
      aria-label="C2ST illustration: two overlapping distributions with a decision boundary"
    >
      <Axis />
      {/* Reference p — wider, centred at 100 */}
      <path
        d={bell(100, 66, 38, 112)}
        stroke="rgba(255,255,255,0.30)"
        strokeWidth="8"
        strokeLinecap="round"
      />
      {/* Approx q̂ — slightly narrower, shifted right to 126 */}
      <path
        d={bell(126, 52, 32, 112)}
        stroke={accent}
        strokeWidth="8"
        strokeLinecap="round"
        opacity={0.9}
      />
      {/* Decision boundary */}
      <line
        x1={114}
        y1={28}
        x2={114}
        y2={114}
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="1.5"
        strokeDasharray="5 3"
      />
    </svg>
  );
}

/**
 * Expected Coverage (TARP-style)
 *
 * Nominal credibility level α on x-axis, empirical coverage on y-axis.
 * The dashed diagonal is ideal calibration. The solid curve stays below
 * the diagonal (overconfident: coverage < nominal), with a light fill
 * highlighting the miscalibration area.
 */
export function PPPlotMini({
  accent = '#ff7a18',
  className,
}: {
  accent?: string;
  className?: string;
}) {
  const curvePath =
    'M 36 112 C 68 108, 100 84, 130 72 C 155 62, 175 44, 188 32';
  const diagonalPath = 'M 36 112 L 188 32';
  const fillPath = `${curvePath} L 188 32 Z`;

  return (
    <svg
      className={className}
      viewBox="0 0 224 144"
      fill="none"
      role="img"
      aria-label="Expected coverage plot: empirical vs nominal coverage"
    >
      <Axis />
      <text
        x="108"
        y="130"
        fontSize="9"
        fill="rgba(255,255,255,0.35)"
        textAnchor="middle"
      >
        credibility level
      </text>
      <text
        x="22"
        y="72"
        fontSize="9"
        fill="rgba(255,255,255,0.35)"
        textAnchor="middle"
        transform="rotate(-90, 22, 72)"
      >
        expected coverage
      </text>
      <path
        d={diagonalPath}
        stroke="rgba(255,255,255,0.30)"
        strokeWidth="1.5"
        strokeDasharray="6 5"
      />
      <path d={fillPath} fill={accent} opacity={0.1} />
      <path
        d={curvePath}
        stroke={accent}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * P–P Plot
 *
 * Empirical CDF of posterior ranks vs the expected uniform CDF.
 * A calibrated posterior produces a curve on the diagonal. The curve
 * shown bows above the diagonal (underconfident: too many ranks in the
 * middle), giving a clearly different signature from the coverage plot.
 */
export function PPCurveMini({
  accent = '#f59e0b',
  className,
}: {
  accent?: string;
  className?: string;
}) {
  // Curve above diagonal in data space (lower y in SVG) = underconfident
  const curvePath = 'M 36 112 C 82 60, 135 38, 188 32';
  const diagonalPath = 'M 36 112 L 188 32';
  const fillPath = `M 36 112 L 188 32 L 188 32 C 135 38, 82 60, 36 112 Z`;

  return (
    <svg
      className={className}
      viewBox="0 0 224 144"
      fill="none"
      role="img"
      aria-label="P–P plot: empirical rank CDF vs uniform diagonal"
    >
      <Axis />
      <text
        x="108"
        y="130"
        fontSize="9"
        fill="rgba(255,255,255,0.35)"
        textAnchor="middle"
      >
        p
      </text>
      <text
        x="22"
        y="72"
        fontSize="9"
        fill="rgba(255,255,255,0.35)"
        textAnchor="middle"
        transform="rotate(-90, 22, 72)"
      >
        CDF(p)
      </text>
      <path
        d={diagonalPath}
        stroke="rgba(255,255,255,0.30)"
        strokeWidth="1.5"
        strokeDasharray="6 5"
      />
      <path d={fillPath} fill={accent} opacity={0.1} />
      <path
        d={curvePath}
        stroke={accent}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * P–P Plot / SBC rank histogram
 *
 * Bars = empirical rank counts across test events. Under perfect calibration
 * they are uniform (dashed reference line). The U-shape shown here is the
 * classic overconfident signature: true values pile up near the rank extremes.
 */
export function RankHistMini({
  className,
  accent = '#f97316',
}: {
  className?: string;
  accent?: string;
}) {
  // U-shaped heights: overconfident = extremes over-represented
  const rawH = [1.42, 0.95, 0.68, 0.58, 0.56, 0.58, 0.68, 0.95, 1.42];
  const barW = 15;
  const gap = 4;
  const startX = 36;
  const baseY = 112;
  const uniformH = 58;

  return (
    <svg
      className={className}
      viewBox="0 0 224 144"
      fill="none"
      role="img"
      aria-label="SBC rank histogram: U-shape indicates overconfidence"
    >
      <Axis />
      {rawH.map((h, i) => (
        <rect
          key={i}
          x={startX + i * (barW + gap)}
          y={baseY - h * uniformH}
          width={barW}
          height={h * uniformH}
          rx={2}
          fill={accent}
          opacity={0.8}
        />
      ))}
      {/* Uniform reference line */}
      <line
        x1={startX}
        y1={baseY - uniformH}
        x2={startX + rawH.length * (barW + gap) - gap}
        y2={baseY - uniformH}
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="1.5"
        strokeDasharray="5 3"
      />
    </svg>
  );
}

/**
 * KL Divergence
 *
 * p (white, wide) is the reference; q̂ (green, narrow and shifted right) is
 * the approximation. The shaded region on p's left tail — where q̂ ≈ 0 —
 * illustrates why KL(p‖q̂) → ∞ whenever p has mass and q̂ does not.
 * The arrow emphasises asymmetry: KL(p‖q̂) ≠ KL(q̂‖p).
 */
export function KLMini({
  className,
  accent = '#4ade80',
}: {
  className?: string;
  accent?: string;
}) {
  const pPath = bell(106, 74, 36, 112); // wide reference
  const qPath = bell(132, 40, 44, 112); // narrow approx, shifted right

  return (
    <svg
      className={className}
      viewBox="0 0 224 144"
      fill="none"
      role="img"
      aria-label="KL divergence: wide reference p vs narrow shifted approx q"
    >
      <Axis />
      {/* Shaded left-tail region of p where q ≈ 0 */}
      <clipPath id="kl-left-tail">
        <rect x="24" y="0" width="70" height="144" />
      </clipPath>
      <path
        d={pPath}
        fill="rgba(255,255,255,0.08)"
        clipPath="url(#kl-left-tail)"
      />
      {/* Reference p — wide */}
      <path
        d={pPath}
        stroke="rgba(255,255,255,0.30)"
        strokeWidth="8"
        strokeLinecap="round"
      />
      {/* Approx q̂ — narrow, shifted right */}
      <path
        d={qPath}
        stroke={accent}
        strokeWidth="8"
        strokeLinecap="round"
        opacity={0.9}
      />
      {/* Asymmetry arrow: p → q̂ */}
      <line
        x1={88}
        y1={30}
        x2={116}
        y2={30}
        stroke="rgba(255,255,255,0.50)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M 111 25 L 116 30 L 111 35"
        stroke="rgba(255,255,255,0.50)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="84" cy="30" r="2.5" fill="rgba(255,255,255,0.50)" />
    </svg>
  );
}

/**
 * JSD — Jensen–Shannon Divergence
 *
 * Three curves: p (white, left peak), q̂ (green, right peak), and the
 * mixture M = (p + q̂)/2 (dashed, in between). JSD averages two KL
 * divergences from p and q̂ toward M, making it symmetric.
 */
export function JSDMini({
  className,
  accent = '#22c55e',
}: {
  className?: string;
  accent?: string;
}) {
  const pPath = bell(92, 56, 36, 112); // left peak
  const qPath = bell(132, 56, 36, 112); // right peak, same shape
  const mPath = bell(112, 65, 48, 112); // mixture M: centred, slightly wider/flatter

  return (
    <svg
      className={className}
      viewBox="0 0 224 144"
      fill="none"
      role="img"
      aria-label="JSD illustration: p, q and their mixture M"
    >
      <Axis />
      {/* p */}
      <path
        d={pPath}
        stroke="rgba(255,255,255,0.30)"
        strokeWidth="8"
        strokeLinecap="round"
      />
      {/* q̂ */}
      <path
        d={qPath}
        stroke={accent}
        strokeWidth="8"
        strokeLinecap="round"
        opacity={0.9}
      />
      {/* M = (p + q̂)/2 — dashed midpoint */}
      <path
        d={mPath}
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="2"
        strokeDasharray="5 4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * IS-ESS — Importance Sampling Effective Sample Size
 *
 * Bar chart of normalised importance weights w_i ∝ p(θ_i)/q̂(θ_i).
 * One bar dominates (q̂ concentrates mass in the wrong region), making
 * ESS ≈ 1 even though N samples were drawn. The dashed line shows what
 * uniform weights (ESS = N) would look like.
 */
export function ESSMini({
  className,
  accent = '#60a5fa',
}: {
  className?: string;
  accent?: string;
}) {
  // One dominant weight; all others are tiny → low ESS
  const rawH = [3, 5, 4, 8, 72, 6, 5, 4, 6, 3];
  const barW = 12;
  const gap = 4;
  const startX = 40;
  const baseY = 112;
  const maxH = 68;
  const maxVal = Math.max(...rawH);
  const uniformFrac = rawH.reduce((a, b) => a + b, 0) / rawH.length / maxVal;

  return (
    <svg
      className={className}
      viewBox="0 0 224 144"
      fill="none"
      role="img"
      aria-label="IS-ESS: degenerate importance weights with one dominant bar"
    >
      <Axis />
      {rawH.map((h, i) => (
        <rect
          key={i}
          x={startX + i * (barW + gap)}
          y={baseY - (h / maxVal) * maxH}
          width={barW}
          height={(h / maxVal) * maxH}
          rx={2}
          fill={accent}
          opacity={0.35 + 0.65 * (h / maxVal)}
        />
      ))}
      {/* Uniform-weight reference line (= ESS/N = 1 if all bars here) */}
      <line
        x1={startX}
        y1={baseY - uniformFrac * maxH}
        x2={startX + rawH.length * (barW + gap) - gap}
        y2={baseY - uniformFrac * maxH}
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
    </svg>
  );
}

export function DivergenceMini({
  className,
  accent = '#22c55e',
}: {
  className?: string;
  accent?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 224 144"
      fill="none"
      role="img"
      aria-label="Mini divergence illustration"
    >
      <Axis />
      <path
        d="M44 112 C 70 88, 84 50, 112 44 C 140 50, 154 88, 180 112"
        stroke="rgba(255,255,255,0.20)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M52 112 C 74 96, 92 74, 112 68 C 132 74, 150 96, 172 112"
        stroke={accent}
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.92"
      />
      <path
        d="M112 44 L 112 68"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
    </svg>
  );
}
