'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const MAX_OFFSET = 28;
const CX = 200;
const CY = 196;

// Eye geometry
const TOP_Y    = 68;   // tip of upper lid
const BOT_Y    = 324;  // tip of lower lid
const MID_Y    = 196;  // vertical center (lids meet here)

// Each lid fills the entire eye so there is never a gap when closed
const UPPER_LID_PATH =
  `M 20 200 C 80 ${TOP_Y}, 155 ${TOP_Y}, 200 ${TOP_Y} C 245 ${TOP_Y}, 320 ${TOP_Y}, 380 200` +
  ` L 380 ${BOT_Y} L 20 ${BOT_Y} Z`;

const LOWER_LID_PATH =
  `M 20 200 C 80 ${BOT_Y}, 155 ${BOT_Y}, 200 ${BOT_Y} C 245 ${BOT_Y}, 320 ${BOT_Y}, 380 200` +
  ` L 380 ${TOP_Y} L 20 ${TOP_Y} Z`;

const EYE_COLORS: { grad: [string, string, string, string]; fiber: string }[] = [
  { grad: ['#C8E8FA', '#4AAAD8', '#1660A0', '#072040'], fiber: '#0A2A50' },
  { grad: ['#B8E8C0', '#30B060', '#0C6030', '#022010'], fiber: '#083020' },
  { grad: ['#DEB888', '#A05820', '#582800', '#200800'], fiber: '#3A1800' },
  { grad: ['#C8CCD8', '#707888', '#303848', '#101820'], fiber: '#181E28' },
  { grad: ['#F0D060', '#D08010', '#784000', '#281400'], fiber: '#402000' },
  { grad: ['#C8A0E8', '#8040C0', '#3A0878', '#100020'], fiber: '#280050' },
];

function buildFibers(colorIdx: number) {
  const { fiber } = EYE_COLORS[colorIdx];
  return Array.from({ length: 56 }, (_, i) => {
    const angle = (i / 56) * Math.PI * 2;
    const seed  = ((i * 7 + 3) % 11) / 11;
    return (
      <line key={i}
        x1={CX + Math.cos(angle) * (34 + seed * 10)}
        y1={CY + Math.sin(angle) * (34 + seed * 10)}
        x2={CX + Math.cos(angle) * (78 + seed * 16)}
        y2={CY + Math.sin(angle) * (78 + seed * 16)}
        stroke={fiber} strokeWidth={0.9} strokeOpacity={0.08 + seed * 0.18}
      />
    );
  });
}

const ALL_FIBERS = EYE_COLORS.map((_, i) => buildFibers(i));

type BlinkPhase = 'open' | 'closing' | 'opening';

export default function EyeTracker() {
  const svgRef        = useRef<SVGSVGElement>(null);
  const timerRef      = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = useRef(false);
  const isBlinking    = useRef(false);
  const isHovered     = useRef(false);

  const [offset,     setOffset]     = useState({ x: 0, y: 0 });
  const [colorIdx,   setColorIdx]   = useState(0);
  const [blinkPhase, setBlinkPhase] = useState<BlinkPhase>('open');
  const [squinting,  setSquinting]  = useState(false);

  // Mouse tracking
  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function onMove(e: MouseEvent) {
      if (reducedMotion.current || !svgRef.current) return;
      const r  = svgRef.current.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width  / 2);
      const dy = e.clientY - (r.top  + r.height / 2);
      const d  = Math.sqrt(dx * dx + dy * dy);
      const s  = d > 0 ? Math.min(MAX_OFFSET / d, 1) : 0;
      setOffset({ x: dx * s, y: dy * s });
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Core blink
  const triggerBlink = useCallback((onDone?: () => void) => {
    if (isBlinking.current) return;
    isBlinking.current = true;
    setBlinkPhase('closing');
    // hold closed briefly before opening (snap shut → brief hold → open)
    timerRef.current = setTimeout(() => {
      setColorIdx(i => (i + 1) % EYE_COLORS.length);
      timerRef.current = setTimeout(() => {
        setBlinkPhase('opening');
        timerRef.current = setTimeout(() => {
          setBlinkPhase('open');
          isBlinking.current = false;
          onDone?.();
        }, 240);
      }, 80); // hold closed for 80ms
    }, 60);
  }, []);

  // Auto-blink
  const scheduleBlink = useCallback(() => {
    timerRef.current = setTimeout(() => {
      if (!isHovered.current) {
        triggerBlink(() => scheduleBlink());
      } else {
        scheduleBlink();
      }
    }, 2500 + Math.random() * 3500);
  }, [triggerBlink]);

  useEffect(() => {
    scheduleBlink();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [scheduleBlink]);

  const handleMouseEnter = useCallback(() => { isHovered.current = true;  setSquinting(true);  }, []);
  const handleMouseLeave = useCallback(() => { isHovered.current = false; setSquinting(false); }, []);
  const handleClick      = useCallback(() => { triggerBlink(); }, [triggerBlink]);

  const { grad }   = EYE_COLORS[colorIdx];
  const fibers     = ALL_FIBERS[colorIdx];
  const gradId     = `iris-${colorIdx}`;
  const irisScaleX = 1 - Math.abs(offset.x) * 0.002;

  // Upper lid: 0 = open, 1 = fully closed (sweeps down)
  // Lower lid: moves opposite, ~35% of upper travel
  const upperScale =
    blinkPhase === 'closing' ? 1 :
    blinkPhase === 'opening' ? 0 :
    squinting ? 0.55 : 0;

  const lowerScale =
    blinkPhase === 'closing' ? 1 :
    blinkPhase === 'opening' ? 0 :
    squinting ? 0.30 : 0;

  // Fast snap shut, slower graceful open
  const upperTransition =
    blinkPhase === 'closing' ? 'transform 0.06s ease-in' :
    blinkPhase === 'opening' ? 'transform 0.22s ease-out' :
    squinting ? 'transform 0.20s ease-out' : 'transform 0.30s ease-in-out';

  const lowerTransition =
    blinkPhase === 'closing' ? 'transform 0.06s ease-in' :
    blinkPhase === 'opening' ? 'transform 0.22s ease-out' :
    squinting ? 'transform 0.20s ease-out' : 'transform 0.30s ease-in-out';

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full max-w-sm cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <defs>
        <clipPath id="lid">
          <path d={`M 20 200 C 80 ${TOP_Y}, 155 ${TOP_Y}, 200 ${TOP_Y} C 245 ${TOP_Y}, 320 ${TOP_Y}, 380 200 C 320 ${BOT_Y}, 245 ${BOT_Y}, 200 ${BOT_Y} C 155 ${BOT_Y}, 80 ${BOT_Y}, 20 200 Z`} />
        </clipPath>

        <clipPath id="irisClip">
          <circle cx={CX} cy={CY} r="100" />
        </clipPath>

        <radialGradient id="sclera" cx="38%" cy="32%" r="68%">
          <stop offset="0%"   stopColor="#FFFFFF" />
          <stop offset="55%"  stopColor="#F4EAD8" />
          <stop offset="100%" stopColor="#CABA9A" />
        </radialGradient>

        <radialGradient id={gradId} cx="44%" cy="36%" r="56%">
          <stop offset="0%"   stopColor={grad[0]} />
          <stop offset="30%"  stopColor={grad[1]} />
          <stop offset="72%"  stopColor={grad[2]} />
          <stop offset="100%" stopColor={grad[3]} />
        </radialGradient>

        <radialGradient id="irisDome" cx="40%" cy="25%" r="50%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.32" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="pupil" cx="36%" cy="28%" r="62%">
          <stop offset="0%"   stopColor="#1C1830" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>

        <radialGradient id="ao" cx="50%" cy="50%" r="50%">
          <stop offset="65%"  stopColor="black" stopOpacity="0" />
          <stop offset="100%" stopColor="black" stopOpacity="0.40" />
        </radialGradient>

        <linearGradient id="topShadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#060A14" stopOpacity="0.52" />
          <stop offset="100%" stopColor="#060A14" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="botShadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#060A14" stopOpacity="0" />
          <stop offset="100%" stopColor="#060A14" stopOpacity="0.20" />
        </linearGradient>

        {/* Upper eyelid skin — slightly warm, lash-line darker at bottom edge */}
        <linearGradient id="upperSkin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#F0DFC8" />
          <stop offset="75%"  stopColor="#D8BFA0" />
          <stop offset="100%" stopColor="#B8906A" />
        </linearGradient>

        {/* Lower eyelid skin — slightly lighter/pinker */}
        <linearGradient id="lowerSkin" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%"   stopColor="#EED8C0" />
          <stop offset="100%" stopColor="#C8A882" />
        </linearGradient>
      </defs>

      {/* ── SCLERA — fixed ───────────────────────────── */}
      <g clipPath="url(#lid)">
        <circle cx={CX} cy={CY} r="220" fill="url(#sclera)" />
        {/* Veins */}
        <path d="M 58 186 Q 108 178 143 190" stroke="#CC8080" strokeWidth="0.8" strokeOpacity="0.38" fill="none" />
        <path d="M 56 210 Q 110 218 144 206" stroke="#CC8080" strokeWidth="0.6" strokeOpacity="0.26" fill="none" />
        <path d="M 342 190 Q 295 182 260 194" stroke="#CC8080" strokeWidth="0.7" strokeOpacity="0.28" fill="none" />
        {/* Tear duct */}
        <ellipse cx="26" cy={CY} rx="22" ry="13" fill="#F0A090" fillOpacity="0.46" />
      </g>

      {/* ── IRIS + PUPIL — moves with cursor ─────────── */}
      <g clipPath="url(#lid)">
        <g clipPath="url(#irisClip)"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            transition: 'transform 0.11s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
        >
          <ellipse cx={CX} cy={CY} rx={96 * irisScaleX} ry={96} fill={`url(#${gradId})`} />
          <g style={{ transform: `scaleX(${irisScaleX})`, transformOrigin: `${CX}px ${CY}px` }}>
            {fibers}
            <circle cx={CX} cy={CY} r="38" fill="none" stroke="white" strokeWidth="2.5" strokeOpacity="0.18" />
          </g>
          <ellipse cx={CX} cy={CY} rx={96 * irisScaleX} ry={96}
            fill="none" stroke="#040C18" strokeWidth="5" strokeOpacity="0.80" />
          <ellipse cx={CX} cy={CY} rx={32 * irisScaleX} ry={32} fill="url(#pupil)" />
          <ellipse cx={CX} cy={CY} rx={96 * irisScaleX} ry={96} fill="url(#irisDome)" />
          {/* Highlights */}
          <ellipse cx={CX - 16} cy={CY - 20} rx="22" ry="14"
            fill="white" fillOpacity="0.84"
            transform={`rotate(-30, ${CX - 16}, ${CY - 20})`} />
          <circle cx={CX + 22} cy={CY + 16} r="5" fill="white" fillOpacity="0.28" />
        </g>
      </g>

      {/* ── AMBIENT OCCLUSION + LID SHADOWS — fixed ── */}
      <g clipPath="url(#lid)">
        <rect x="0" y="0"   width="400" height="400" fill="url(#ao)" />
        <rect x="0" y="0"   width="400" height="210" fill="url(#topShadow)" />
        <rect x="0" y="210" width="400" height="190" fill="url(#botShadow)" />
      </g>

      {/* ── UPPER EYELID — sweeps DOWN ────────────────── */}
      <g clipPath="url(#lid)">
        <g style={{
          transform: `scaleY(${upperScale})`,
          transformOrigin: `200px ${TOP_Y}px`,
          transition: upperTransition,
        }}>
          <path d={UPPER_LID_PATH} fill="url(#upperSkin)" />
          {/* Lash line sits at MID_Y so it lands at the seam when fully closed */}
          <path
            d={`M 30 ${MID_Y} C 100 ${MID_Y - 4}, 160 ${MID_Y - 6}, 200 ${MID_Y - 6} C 240 ${MID_Y - 6}, 305 ${MID_Y - 4}, 370 ${MID_Y}`}
            stroke="#1A0A08" strokeWidth="3.5" strokeOpacity="0.85" fill="none" strokeLinecap="round"
          />
          {/* Eyelash strokes */}
          {[0.18,0.28,0.38,0.48,0.58,0.68,0.78,0.88].map((t, i) => {
            const x = 20 + t * 360;
            const curve = Math.sin(t * Math.PI) * 12;
            return (
              <path key={i}
                d={`M ${x} ${MID_Y - 4} Q ${x + (i % 2 === 0 ? -4 : 4)} ${MID_Y - 14}, ${x + (i % 2 === 0 ? -6 : 6)} ${MID_Y - 22 - curve * 0.5}`}
                stroke="#0D0808" strokeWidth="1.8" strokeOpacity="0.80" fill="none" strokeLinecap="round"
              />
            );
          })}
        </g>
      </g>

      {/* ── LOWER EYELID — sweeps UP ──────────────────── */}
      <g clipPath="url(#lid)">
        <g style={{
          transform: `scaleY(${lowerScale})`,
          transformOrigin: `200px ${BOT_Y}px`,
          transition: lowerTransition,
        }}>
          <path d={LOWER_LID_PATH} fill="url(#lowerSkin)" />
          {/* Lower lash line */}
          <path
            d={`M 30 ${MID_Y} C 100 ${MID_Y + 3}, 160 ${MID_Y + 5}, 200 ${MID_Y + 5} C 240 ${MID_Y + 5}, 305 ${MID_Y + 3}, 370 ${MID_Y}`}
            stroke="#1A0A08" strokeWidth="2" strokeOpacity="0.55" fill="none" strokeLinecap="round"
          />
        </g>
      </g>

      {/* ── EYE OUTLINE — always on top ─────────────── */}
      {/* Upper lid */}
      <path
        d={`M 20 200 C 80 ${TOP_Y}, 155 ${TOP_Y}, 200 ${TOP_Y} C 245 ${TOP_Y}, 320 ${TOP_Y}, 380 200`}
        stroke="#0D1117" strokeWidth="3.5" strokeLinecap="round" fill="none"
      />
      {/* Lower lid */}
      <path
        d={`M 20 200 C 80 ${BOT_Y}, 155 ${BOT_Y}, 200 ${BOT_Y} C 245 ${BOT_Y}, 320 ${BOT_Y}, 380 200`}
        stroke="#0D1117" strokeWidth="2.2" strokeLinecap="round" fill="none"
      />
      {/* Lid crease */}
      <path
        d={`M 60 164 C 120 ${TOP_Y + 12}, 168 ${TOP_Y + 4}, 200 ${TOP_Y + 4} C 232 ${TOP_Y + 4}, 285 ${TOP_Y + 12}, 342 168`}
        stroke="#0D1117" strokeWidth="1.2" strokeOpacity="0.16" strokeLinecap="round" fill="none"
      />
    </svg>
  );
}
