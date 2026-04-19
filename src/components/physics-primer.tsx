import { ChevronDown } from 'lucide-react';

/* ─── Physics concept illustrations ─── */

function ChirpWaveformSVG() {
  const pts =
    '8.0,24.0 8.9,24.0 9.8,23.9 10.8,23.9 11.7,23.8 12.6,23.8 13.5,23.7 14.4,23.6 15.3,23.6 16.2,23.5 17.2,23.4 18.1,23.3 19.0,23.2 19.9,23.1 20.8,23.0 21.8,22.8 22.7,22.7 23.6,22.5 24.5,22.4 25.4,22.3 26.3,22.1 27.2,22.0 28.2,21.8 29.1,21.7 30.0,21.6 30.9,21.5 31.8,21.4 32.8,21.3 33.7,21.3 34.6,21.3 35.5,21.4 36.4,21.4 37.3,21.6 38.2,21.8 39.2,22.0 40.1,22.3 41.0,22.7 41.9,23.1 42.8,23.6 43.8,24.1 44.7,24.7 45.6,25.3 46.5,25.9 47.4,26.5 48.3,27.1 49.2,27.6 50.2,28.1 51.1,28.5 52.0,28.8 52.9,29.0 53.8,29.0 54.8,28.9 55.7,28.5 56.6,28.0 57.5,27.3 58.4,26.5 59.3,25.5 60.2,24.3 61.2,23.1 62.1,21.9 63.0,20.6 63.9,19.4 64.8,18.4 65.8,17.6 66.7,17.0 67.6,16.7 68.5,16.8 69.4,17.3 70.3,18.2 71.2,19.5 72.2,21.1 73.1,22.9 74.0,25.0 74.9,27.0 75.8,29.0 76.8,30.8 77.7,32.2 78.6,33.2 79.5,33.5 80.4,33.2 81.3,32.2 82.2,30.6 83.2,28.3 84.1,25.6 85.0,22.7 85.9,19.7 86.8,16.9 87.8,14.6 88.7,13.0 89.6,12.3 90.5,12.6 91.4,14.0 92.3,16.4 93.2,19.6 94.2,23.3 95.1,27.3 96.0,31.2 96.9,34.5 97.8,36.8 98.8,37.8 99.7,37.4 100.6,35.5 101.5,32.2 102.4,27.4 103.3,23.0 104.2,19.2 105.2,16.5 106.1,15.0 107.0,14.8 107.9,15.7 108.8,17.6 109.8,19.9 110.7,22.5 111.6,25.0 112.5,27.0 113.4,28.3 114.3,28.9 115.2,28.7 116.2,27.9 117.1,26.6 118.0,25.2';
  return (
    <svg viewBox="0 0 130 48" className="h-12 w-full" aria-hidden>
      <line
        x1="8"
        y1="24"
        x2="120"
        y2="24"
        stroke="white"
        strokeWidth="0.4"
        strokeOpacity="0.12"
      />
      <polyline
        points={pts}
        fill="none"
        stroke="#f97316"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M114,24 L121,24 M118,21.5 L121,24 L118,26.5"
        stroke="white"
        strokeWidth="0.5"
        strokeOpacity="0.25"
        fill="none"
      />
      <text
        x="123"
        y="27"
        fontSize="5.5"
        fill="white"
        fillOpacity="0.3"
        fontFamily="monospace"
      >
        t
      </text>
      <text
        x="2"
        y="8"
        fontSize="5.5"
        fill="#f97316"
        fillOpacity="0.55"
        fontFamily="monospace"
      >
        h(t)
      </text>
    </svg>
  );
}

function BinarySystemSVG() {
  return (
    <svg viewBox="0 0 130 60" className="h-14 w-full" aria-hidden>
      <ellipse
        cx="65"
        cy="30"
        rx="48"
        ry="22"
        stroke="white"
        strokeWidth="0.7"
        strokeDasharray="4,3"
        fill="none"
        strokeOpacity="0.18"
      />
      <circle cx="27" cy="30" r="13" fill="#f97316" fillOpacity="0.72" />
      <text
        x="27"
        y="34"
        fontSize="7"
        fill="white"
        textAnchor="middle"
        fontFamily="monospace"
        fontWeight="600"
      >
        m₁
      </text>
      <circle cx="97" cy="30" r="8" fill="#a855f7" fillOpacity="0.72" />
      <text
        x="97"
        y="33.5"
        fontSize="6"
        fill="white"
        textAnchor="middle"
        fontFamily="monospace"
        fontWeight="600"
      >
        m₂
      </text>
    </svg>
  );
}

function SpinDiagramSVG() {
  return (
    <svg viewBox="0 0 130 75" className="h-16 w-full" aria-hidden>
      <line
        x1="8"
        y1="52"
        x2="122"
        y2="52"
        stroke="white"
        strokeWidth="0.5"
        strokeOpacity="0.12"
        strokeDasharray="5,4"
      />
      <text
        x="65"
        y="63"
        fontSize="4.8"
        fill="white"
        fillOpacity="0.22"
        textAnchor="middle"
        fontFamily="monospace"
      >
        orbital plane
      </text>
      {/* m1 */}
      <circle cx="35" cy="52" r="13" fill="#f97316" fillOpacity="0.68" />
      <text
        x="35"
        y="56"
        fontSize="6.5"
        fill="white"
        textAnchor="middle"
        fontFamily="monospace"
        fontWeight="600"
      >
        m₁
      </text>
      <line
        x1="35"
        y1="38"
        x2="35"
        y2="12"
        stroke="#f97316"
        strokeWidth="1.8"
        strokeOpacity="0.9"
      />
      <path
        d="M31,16 L35,11 L39,16"
        stroke="#f97316"
        strokeWidth="1.4"
        fill="none"
        strokeOpacity="0.9"
        strokeLinejoin="round"
      />
      <text
        x="35"
        y="7"
        fontSize="5"
        fill="#f97316"
        fillOpacity="0.75"
        textAnchor="middle"
        fontFamily="monospace"
      >
        χ₁ &gt; 0
      </text>
      {/* m2 anti-aligned */}
      <circle cx="95" cy="52" r="9" fill="#a855f7" fillOpacity="0.68" />
      <text
        x="95"
        y="56"
        fontSize="6"
        fill="white"
        textAnchor="middle"
        fontFamily="monospace"
        fontWeight="600"
      >
        m₂
      </text>
      <line
        x1="95"
        y1="42"
        x2="95"
        y2="16"
        stroke="#a855f7"
        strokeWidth="1.5"
        strokeOpacity="0.9"
      />
      <path
        d="M91,38 L95,43 L99,38"
        stroke="#a855f7"
        strokeWidth="1.3"
        fill="none"
        strokeOpacity="0.9"
        strokeLinejoin="round"
      />
      <text
        x="95"
        y="11"
        fontSize="5"
        fill="#a855f7"
        fillOpacity="0.75"
        textAnchor="middle"
        fontFamily="monospace"
      >
        χ₂ &lt; 0
      </text>
    </svg>
  );
}

function IntrinsicExtrinsicSVG() {
  return (
    <svg viewBox="0 0 130 58" className="h-12 w-full" aria-hidden>
      <rect
        x="2"
        y="8"
        width="56"
        height="40"
        rx="5"
        fill="#f97316"
        fillOpacity="0.07"
        stroke="#f97316"
        strokeWidth="0.8"
        strokeOpacity="0.4"
      />
      <text
        x="30"
        y="22"
        fontSize="5.5"
        fill="#f97316"
        fillOpacity="0.9"
        textAnchor="middle"
        fontFamily="monospace"
        fontWeight="600"
      >
        intrinsic
      </text>
      <text
        x="30"
        y="33"
        fontSize="4.8"
        fill="white"
        fillOpacity="0.5"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Mc, q, χ₁, χ₂
      </text>
      <text
        x="30"
        y="42"
        fontSize="4.8"
        fill="white"
        fillOpacity="0.5"
        textAnchor="middle"
        fontFamily="monospace"
      >
        dL
      </text>
      <path
        d="M60,28 L70,28 M67,25 L70,28 L67,31"
        stroke="white"
        strokeWidth="0.8"
        strokeOpacity="0.25"
        fill="none"
      />
      <rect
        x="72"
        y="8"
        width="56"
        height="40"
        rx="5"
        fill="#a855f7"
        fillOpacity="0.07"
        stroke="#a855f7"
        strokeWidth="0.8"
        strokeOpacity="0.4"
      />
      <text
        x="100"
        y="22"
        fontSize="5.5"
        fill="#a855f7"
        fillOpacity="0.9"
        textAnchor="middle"
        fontFamily="monospace"
        fontWeight="600"
      >
        extrinsic
      </text>
      <text
        x="100"
        y="33"
        fontSize="4.8"
        fill="white"
        fillOpacity="0.5"
        textAnchor="middle"
        fontFamily="monospace"
      >
        RA, dec, t
      </text>
      <text
        x="100"
        y="42"
        fontSize="4.8"
        fill="white"
        fillOpacity="0.5"
        textAnchor="middle"
        fontFamily="monospace"
      >
        φ, ψ, θJN
      </text>
    </svg>
  );
}

function PSDCurveSVG() {
  return (
    <svg viewBox="0 0 130 60" className="h-12 w-full" aria-hidden>
      <line
        x1="14"
        y1="6"
        x2="14"
        y2="50"
        stroke="white"
        strokeWidth="0.5"
        strokeOpacity="0.18"
      />
      <line
        x1="14"
        y1="50"
        x2="120"
        y2="50"
        stroke="white"
        strokeWidth="0.5"
        strokeOpacity="0.18"
      />
      <path
        d="M11,10 L14,5 L17,10"
        stroke="white"
        strokeWidth="0.5"
        strokeOpacity="0.18"
        fill="none"
      />
      <path
        d="M116,47 L121,50 L116,53"
        stroke="white"
        strokeWidth="0.5"
        strokeOpacity="0.18"
        fill="none"
      />
      <text
        x="67"
        y="58"
        fontSize="5.5"
        fill="white"
        fillOpacity="0.28"
        textAnchor="middle"
        fontFamily="monospace"
      >
        frequency
      </text>
      <text
        x="6"
        y="28"
        fontSize="5.5"
        fill="white"
        fillOpacity="0.28"
        textAnchor="middle"
        transform="rotate(-90,6,28)"
        fontFamily="monospace"
      >
        S(f)
      </text>
      <path
        d="M16,10 C22,14 30,28 42,42 C52,50 62,47 78,40 C90,34 100,24 118,10"
        stroke="#f97316"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M16,10 C22,14 30,28 42,42 C52,50 62,47 78,40 C90,34 100,24 118,10 L118,50 L16,50 Z"
        fill="#f97316"
        fillOpacity="0.05"
      />
      <text
        x="50"
        y="46"
        fontSize="4.5"
        fill="#f97316"
        fillOpacity="0.45"
        textAnchor="middle"
        fontFamily="monospace"
      >
        sensitive band
      </text>
    </svg>
  );
}

function SBIFlowSVG() {
  return (
    <svg viewBox="0 0 130 52" className="h-12 w-full" aria-hidden>
      <rect
        x="3"
        y="14"
        width="24"
        height="20"
        rx="4"
        fill="white"
        fillOpacity="0.04"
        stroke="white"
        strokeWidth="0.7"
        strokeOpacity="0.22"
      />
      <text
        x="15"
        y="27"
        fontSize="7"
        fill="white"
        fillOpacity="0.75"
        textAnchor="middle"
        fontFamily="monospace"
      >
        θ
      </text>
      <path
        d="M28,24 L36,24 M33,21 L36,24 L33,27"
        stroke="white"
        strokeWidth="0.8"
        strokeOpacity="0.28"
        fill="none"
      />
      <rect
        x="37"
        y="10"
        width="34"
        height="28"
        rx="4"
        fill="#f97316"
        fillOpacity="0.07"
        stroke="#f97316"
        strokeWidth="0.8"
        strokeOpacity="0.42"
      />
      <text
        x="54"
        y="22"
        fontSize="5"
        fill="#f97316"
        fillOpacity="0.85"
        textAnchor="middle"
        fontFamily="monospace"
      >
        simulator
      </text>
      <text
        x="54"
        y="33"
        fontSize="6"
        fill="white"
        fillOpacity="0.6"
        textAnchor="middle"
        fontFamily="monospace"
      >
        h(t)
      </text>
      <path
        d="M72,24 L80,24 M77,21 L80,24 L77,27"
        stroke="white"
        strokeWidth="0.8"
        strokeOpacity="0.28"
        fill="none"
      />
      <rect
        x="81"
        y="10"
        width="46"
        height="28"
        rx="4"
        fill="#a855f7"
        fillOpacity="0.07"
        stroke="#a855f7"
        strokeWidth="0.8"
        strokeOpacity="0.42"
      />
      <text
        x="104"
        y="22"
        fontSize="5"
        fill="#a855f7"
        fillOpacity="0.85"
        textAnchor="middle"
        fontFamily="monospace"
      >
        neural net
      </text>
      <text
        x="104"
        y="33"
        fontSize="6"
        fill="white"
        fillOpacity="0.6"
        textAnchor="middle"
        fontFamily="monospace"
      >
        p(θ|d)
      </text>
      <text
        x="65"
        y="48"
        fontSize="4.5"
        fill="white"
        fillOpacity="0.2"
        textAnchor="middle"
        fontFamily="monospace"
      >
        train once · infer in ms
      </text>
    </svg>
  );
}

/* ─── Detectors & terms illustrations ─── */

function LigoSVG() {
  return (
    <svg viewBox="0 0 130 60" className="h-12 w-full" aria-hidden>
      {/* Beam splitter */}
      <circle cx="28" cy="46" r="4" fill="#f97316" fillOpacity="0.8" />
      {/* X arm */}
      <line
        x1="28"
        y1="46"
        x2="118"
        y2="46"
        stroke="#f97316"
        strokeWidth="1.6"
        strokeOpacity="0.65"
      />
      <circle cx="118" cy="46" r="3" fill="#f97316" fillOpacity="0.5" />
      {/* Y arm */}
      <line
        x1="28"
        y1="46"
        x2="28"
        y2="6"
        stroke="#f97316"
        strokeWidth="1.6"
        strokeOpacity="0.65"
      />
      <circle cx="28" cy="6" r="3" fill="#f97316" fillOpacity="0.5" />
      {/* Incoming laser */}
      <line
        x1="4"
        y1="46"
        x2="24"
        y2="46"
        stroke="white"
        strokeWidth="0.8"
        strokeOpacity="0.25"
        strokeDasharray="3,2"
      />
      {/* Arm label */}
      <text
        x="73"
        y="54"
        fontSize="5"
        fill="white"
        fillOpacity="0.3"
        textAnchor="middle"
        fontFamily="monospace"
      >
        4 km arm
      </text>
      <text
        x="13"
        y="27"
        fontSize="5"
        fill="white"
        fillOpacity="0.3"
        textAnchor="middle"
        transform="rotate(-90,13,27)"
        fontFamily="monospace"
      >
        4 km
      </text>
    </svg>
  );
}

function LVKNetworkSVG() {
  return (
    <svg viewBox="0 0 130 72" className="h-14 w-full" aria-hidden>
      {/* Triangulation lines */}
      <line
        x1="22"
        y1="20"
        x2="38"
        y2="58"
        stroke="white"
        strokeWidth="0.6"
        strokeOpacity="0.15"
        strokeDasharray="4,3"
      />
      <line
        x1="38"
        y1="58"
        x2="102"
        y2="32"
        stroke="white"
        strokeWidth="0.6"
        strokeOpacity="0.15"
        strokeDasharray="4,3"
      />
      <line
        x1="102"
        y1="32"
        x2="22"
        y2="20"
        stroke="white"
        strokeWidth="0.6"
        strokeOpacity="0.15"
        strokeDasharray="4,3"
      />
      {/* GW source rings */}
      <circle
        cx="62"
        cy="38"
        r="12"
        fill="none"
        stroke="white"
        strokeWidth="0.5"
        strokeOpacity="0.1"
      />
      <circle
        cx="62"
        cy="38"
        r="20"
        fill="none"
        stroke="white"
        strokeWidth="0.5"
        strokeOpacity="0.06"
      />
      {/* H1 */}
      <circle cx="22" cy="20" r="5.5" fill="#f97316" fillOpacity="0.8" />
      <text
        x="22"
        y="23"
        fontSize="5.5"
        fill="white"
        textAnchor="middle"
        fontFamily="monospace"
        fontWeight="700"
      >
        H1
      </text>
      <text
        x="22"
        y="13"
        fontSize="4.5"
        fill="#f97316"
        fillOpacity="0.6"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Hanford
      </text>
      {/* L1 */}
      <circle cx="38" cy="58" r="5.5" fill="#f97316" fillOpacity="0.8" />
      <text
        x="38"
        y="61"
        fontSize="5.5"
        fill="white"
        textAnchor="middle"
        fontFamily="monospace"
        fontWeight="700"
      >
        L1
      </text>
      <text
        x="38"
        y="69"
        fontSize="4.5"
        fill="#f97316"
        fillOpacity="0.6"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Livingston
      </text>
      {/* V1 */}
      <circle cx="102" cy="32" r="5.5" fill="#a855f7" fillOpacity="0.8" />
      <text
        x="102"
        y="35"
        fontSize="5.5"
        fill="white"
        textAnchor="middle"
        fontFamily="monospace"
        fontWeight="700"
      >
        V1
      </text>
      <text
        x="102"
        y="24"
        fontSize="4.5"
        fill="#a855f7"
        fillOpacity="0.6"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Virgo
      </text>
    </svg>
  );
}

function SourceClassesSVG() {
  return (
    <svg viewBox="0 0 130 65" className="h-14 w-full" aria-hidden>
      {/* Left: BBH — stellar mass, small */}
      <circle cx="22" cy="42" r="7" fill="#f97316" fillOpacity="0.72" />
      <circle cx="40" cy="42" r="5" fill="#a855f7" fillOpacity="0.72" />
      <text
        x="31"
        y="55"
        fontSize="5"
        fill="white"
        fillOpacity="0.45"
        textAnchor="middle"
        fontFamily="monospace"
      >
        ~30 M☉
      </text>
      <text
        x="31"
        y="18"
        fontSize="5.5"
        fill="white"
        fillOpacity="0.6"
        textAnchor="middle"
        fontFamily="monospace"
        fontWeight="600"
      >
        BBH
      </text>
      <text
        x="31"
        y="26"
        fontSize="4.5"
        fill="white"
        fillOpacity="0.35"
        textAnchor="middle"
        fontFamily="monospace"
      >
        LVK / ground
      </text>
      {/* Divider */}
      <line
        x1="65"
        y1="8"
        x2="65"
        y2="62"
        stroke="white"
        strokeWidth="0.5"
        strokeOpacity="0.15"
      />
      {/* Right: MBHB — massive, large */}
      <circle cx="86" cy="38" r="15" fill="#a855f7" fillOpacity="0.5" />
      <circle cx="116" cy="38" r="10" fill="#f97316" fillOpacity="0.5" />
      <text
        x="101"
        y="58"
        fontSize="5"
        fill="white"
        fillOpacity="0.45"
        textAnchor="middle"
        fontFamily="monospace"
      >
        ~10⁶ M☉
      </text>
      <text
        x="101"
        y="12"
        fontSize="5.5"
        fill="white"
        fillOpacity="0.6"
        textAnchor="middle"
        fontFamily="monospace"
        fontWeight="600"
      >
        MBHB
      </text>
      <text
        x="101"
        y="20"
        fontSize="4.5"
        fill="white"
        fillOpacity="0.35"
        textAnchor="middle"
        fontFamily="monospace"
      >
        LISA / space
      </text>
    </svg>
  );
}

function LISAConstellationSVG() {
  return (
    <svg viewBox="0 0 130 75" className="h-14 w-full" aria-hidden>
      {/* Sun */}
      <circle cx="65" cy="48" r="6" fill="white" fillOpacity="0.15" />
      <text
        x="65"
        y="65"
        fontSize="4.5"
        fill="white"
        fillOpacity="0.25"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Sun
      </text>
      {/* Orbit path (dashed ellipse) */}
      <ellipse
        cx="65"
        cy="48"
        rx="50"
        ry="28"
        stroke="white"
        strokeWidth="0.5"
        strokeOpacity="0.1"
        strokeDasharray="4,4"
        fill="none"
      />
      {/* Three spacecraft */}
      <circle cx="65" cy="10" r="4.5" fill="#a855f7" fillOpacity="0.82" />
      <circle cx="22" cy="48" r="4.5" fill="#a855f7" fillOpacity="0.82" />
      <circle cx="108" cy="48" r="4.5" fill="#a855f7" fillOpacity="0.82" />
      {/* Arms */}
      <line
        x1="65"
        y1="14"
        x2="25"
        y2="45"
        stroke="#a855f7"
        strokeWidth="1.2"
        strokeOpacity="0.5"
      />
      <line
        x1="26"
        y1="48"
        x2="104"
        y2="48"
        stroke="#a855f7"
        strokeWidth="1.2"
        strokeOpacity="0.5"
      />
      <line
        x1="105"
        y1="45"
        x2="68"
        y2="14"
        stroke="#a855f7"
        strokeWidth="1.2"
        strokeOpacity="0.5"
      />
      <text
        x="65"
        y="32"
        fontSize="5"
        fill="white"
        fillOpacity="0.3"
        textAnchor="middle"
        fontFamily="monospace"
      >
        2.5 Mkm arms
      </text>
    </svg>
  );
}

function BilbyAndSamplersSVG() {
  return (
    <svg viewBox="0 0 130 55" className="h-12 w-full" aria-hidden>
      {/* Posterior curve — Gaussian bell */}
      <path
        d="M10,48 C15,48 20,47 28,42 C35,36 42,20 55,10 C68,20 75,36 82,42 C90,47 95,48 118,48"
        stroke="#a855f7"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M10,48 C15,48 20,47 28,42 C35,36 42,20 55,10 C68,20 75,36 82,42 C90,47 95,48 118,48 L118,48 L10,48 Z"
        fill="#a855f7"
        fillOpacity="0.06"
      />
      {/* Truth line */}
      <line
        x1="55"
        y1="48"
        x2="55"
        y2="6"
        stroke="white"
        strokeWidth="0.8"
        strokeOpacity="0.35"
        strokeDasharray="2,2"
      />
      <text
        x="55"
        y="4"
        fontSize="4.5"
        fill="white"
        fillOpacity="0.35"
        textAnchor="middle"
        fontFamily="monospace"
      >
        true θ
      </text>
      {/* Sample ticks */}
      {[38, 44, 50, 55, 60, 65, 72].map((x) => (
        <line
          key={x}
          x1={x}
          y1="48"
          x2={x}
          y2="44"
          stroke="#f97316"
          strokeWidth="1"
          strokeOpacity="0.55"
        />
      ))}
      {/* Labels */}
      <text
        x="10"
        y="52"
        fontSize="4.5"
        fill="white"
        fillOpacity="0.25"
        fontFamily="monospace"
      >
        nested sampling / MCMC
      </text>
    </svg>
  );
}

/* ─── Card data ─── */

const physicsCards = [
  {
    title: 'Gravitational waves',
    body: 'When two black holes spiral together, they emit ripples in spacetime. LIGO records these as a tiny strain h(t) that sweeps from low to high frequency as the inspiral speeds up — the "chirp" — before the final merger and ringdown.',
    illustration: <ChirpWaveformSVG />,
  },
  {
    title: 'Binary black hole system',
    body: 'The two black holes have masses m₁ ≥ m₂. The chirp mass Mc is the combination most precisely measured from the signal frequency evolution. The mass ratio q = m₂/m₁ ≤ 1 describes how symmetric the pair is.',
    illustration: <BinarySystemSVG />,
  },
  {
    title: 'Aligned spins',
    body: 'Each black hole carries spin. In the aligned-spin approximation used in Levels 0–1, spins can only point parallel or anti-parallel to the orbital axis. χ > 0 is aligned with the orbit; χ < 0 is anti-aligned. The fully precessing case is excluded here.',
    illustration: <SpinDiagramSVG />,
  },
  {
    title: 'Intrinsic vs. extrinsic',
    body: 'Intrinsic parameters describe the binary itself (masses, spins, distance). Extrinsic parameters describe the viewing geometry from Earth: sky position, arrival time, phase, polarisation, and inclination. Level 0 fixes all extrinsic parameters.',
    illustration: <IntrinsicExtrinsicSVG />,
  },
  {
    title: 'Power spectral density',
    body: 'Each detector has a frequency-dependent noise floor S(f). Sensitivity peaks in the middle band — low frequencies are dominated by seismic noise; high frequencies by photon shot noise. A known PSD removes one axis of uncertainty from the benchmark.',
    illustration: <PSDCurveSVG />,
  },
  {
    title: 'Simulation-based inference',
    body: 'Because exact likelihood evaluation requires expensive waveform simulations, SBI methods train a neural network once on many simulated signals to approximate the posterior p(θ|d) directly. Classical nested samplers provide ground-truth reference posteriors for comparison.',
    illustration: <SBIFlowSVG />,
  },
];

const detectorCards = [
  {
    title: 'LIGO — the US interferometers',
    body: 'LIGO (Laser Interferometer Gravitational-Wave Observatory) operates two identical 4 km L-shaped detectors: H1 in Hanford, Washington and L1 in Livingston, Louisiana. Each arm uses laser light to measure length changes a thousand times smaller than a proton.',
    illustration: <LigoSVG />,
  },
  {
    title: 'LVK network — H1, L1, V1',
    body: 'LVK stands for LIGO–Virgo–KAGRA. Virgo (V1) is a 3 km detector near Pisa, Italy, operated by the European Gravitational Observatory. KAGRA (K1) is a 3 km detector in the Kamioka mine, Japan. Together, three or more detectors enable sky localisation by triangulation.',
    illustration: <LVKNetworkSVG />,
  },
  {
    title: 'BBH & MBHB — source classes',
    body: "A binary black hole (BBH) is the primary LVK source: two stellar-mass black holes of tens of solar masses. A massive black-hole binary (MBHB) involves black holes of millions to billions of solar masses — these are LISA's primary target and produce much longer, louder signals.",
    illustration: <SourceClassesSVG />,
  },
  {
    title: 'LISA — the space antenna',
    body: 'LISA (Laser Interferometer Space Antenna) is a planned ESA mission launching in the 2030s. Three spacecraft in a triangular constellation orbit the Sun at 2.5 million km arm length. It is sensitive to gravitational waves a million times lower in frequency than LIGO.',
    illustration: <LISAConstellationSVG />,
  },
  {
    title: 'TDI — Time Delay Interferometry',
    body: 'In LISA, the three spacecraft cannot maintain equal arm lengths precisely, so raw laser signals cannot be combined like a standard interferometer. Time Delay Interferometry (TDI) is a post-processing technique that synthesises virtual equal-arm baselines from the recorded data. TDI 1.5 is the standard used in early LISA benchmark designs.',
    illustration: null,
  },
  {
    title: 'Bilby & nested sampling',
    body: 'Bilby is an open-source Python package for Bayesian gravitational-wave parameter estimation. It wraps several samplers — primarily nested sampling algorithms like Dynesty — that explore the posterior by gradually refining a set of live points. These classical samplers provide the reference posteriors against which SBI methods are scored.',
    illustration: <BilbyAndSamplersSVG />,
  },
];

type CardDef = { title: string; body: string; illustration: React.ReactNode };

function PrimerCard({ title, body, illustration }: CardDef) {
  return (
    <div className="bg-card/40 flex flex-col rounded-2xl border border-white/8 p-4">
      {illustration && <div className="mb-2">{illustration}</div>}
      <p className="mb-1.5 text-sm font-semibold text-white">{title}</p>
      <p className="text-xs leading-relaxed text-white/55">{body}</p>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[10px] font-semibold tracking-[0.15em] text-white/28 uppercase">
      {children}
    </p>
  );
}

export function PhysicsPrimer() {
  return (
    <details className="group">
      <summary className="flex cursor-pointer list-none items-center justify-between rounded-2xl border border-white/10 bg-white/3 px-5 py-4 transition-colors select-none hover:bg-white/5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <span className="bg-gw-orange/60 h-2.5 w-2.5 rounded-full" />
            <span className="bg-gw-purple/55 h-2.5 w-2.5 rounded-full" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/45" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white/80">
              Physics concepts &amp; glossary
            </p>
            <p className="text-xs text-white/38">
              Expand for illustrated explanations of all key terms — safe to
              skip for physicists.
            </p>
          </div>
        </div>
        <ChevronDown className="h-4 w-4 shrink-0 text-white/35 transition-transform duration-300 group-open:rotate-180" />
      </summary>

      <div className="mt-4 space-y-7">
        <div>
          <SectionLabel>Physics concepts</SectionLabel>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {physicsCards.map((c) => (
              <PrimerCard key={c.title} {...c} />
            ))}
          </div>
        </div>
        <div>
          <SectionLabel>Detectors, experiments &amp; terms</SectionLabel>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {detectorCards.map((c) => (
              <PrimerCard key={c.title} {...c} />
            ))}
          </div>
        </div>
      </div>
    </details>
  );
}
