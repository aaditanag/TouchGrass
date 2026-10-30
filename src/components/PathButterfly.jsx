import { useEffect, useRef, useState } from 'react';
import './PathButterfly.css';

/*
  Waypoints: [x% of vw, y as absolute px from document top]
  We use % of viewport width for x so it stays responsive.
  y is expressed as a scroll progress fraction mapped to viewport height.
*/
const PATH = [
  { x: 78, y: 6  },
  { x: 16, y: 14 },
  { x: 68, y: 24 },
  { x: 12, y: 34 },
  { x: 72, y: 44 },
  { x: 20, y: 54 },
  { x: 64, y: 64 },
  { x: 18, y: 74 },
  { x: 58, y: 84 },
  { x: 32, y: 93 },
];

function lerp(a, b, t) { return a + (b - a) * t; }

function smoothstep(t) { return t * t * (3 - 2 * t); }

function getPos(progress) {
  const n = PATH.length - 1;
  const raw = Math.min(Math.max(progress, 0), 1) * n;
  const i = Math.min(Math.floor(raw), n - 1);
  const local = smoothstep(raw - i);
  return {
    x: lerp(PATH[i].x, PATH[i + 1].x, local),
    y: lerp(PATH[i].y, PATH[i + 1].y, local),
  };
}

export default function PathButterfly() {
  const [pos, setPos]         = useState({ x: 78, y: 6 });
  const [flipped, setFlipped] = useState(false);
  const [wing, setWing]       = useState(true);   // true = open
  const lastX = useRef(78);

  useEffect(() => {
    /* Wing flap */
    const flapId = setInterval(() => setWing(w => !w), 380);

    /* Scroll tracking */
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total    = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, scrolled / total));
      const p = getPos(progress);
      setFlipped(p.x < lastX.current);
      lastX.current = p.x;
      setPos(p);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // set initial position

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearInterval(flapId);
    };
  }, []);

  /* Wing scale: open=full, closed=narrow */
  const ws = wing ? 1 : 0.45;

  return (
    <div
      className="scroll-butterfly"
      style={{
        left: `${pos.x}vw`,
        top: `${pos.y}vh`,
        transform: `translateX(-50%) translateY(-50%) scaleX(${flipped ? -1 : 1})`,
      }}
      aria-hidden="true"
    >
      <svg width="52" height="44" viewBox="-26 -22 52 44" overflow="visible">
        {/* Upper wings */}
        <ellipse
          cx="-14" cy="-7" rx="17" ry="12" fill="#FF8C94"
          transform={`scale(${ws},1) rotate(-18,-14,-7)`}
          style={{ transition: 'transform 0.16s ease' }}
        />
        <ellipse
          cx="14" cy="-7" rx="17" ry="12" fill="#FF8C94"
          transform={`scale(${ws},1) rotate(18,14,-7)`}
          style={{ transition: 'transform 0.16s ease' }}
        />
        {/* Lower wings */}
        <ellipse
          cx="-12" cy="10" rx="14" ry="9" fill="#FFB347"
          transform={`scale(${ws},1) rotate(22,-12,10)`}
          style={{ transition: 'transform 0.16s ease' }}
        />
        <ellipse
          cx="12" cy="10" rx="14" ry="9" fill="#FFB347"
          transform={`scale(${ws},1) rotate(-22,12,10)`}
          style={{ transition: 'transform 0.16s ease' }}
        />
        {/* Wing spots */}
        <circle cx="-11" cy="-5" r="2.8" fill="rgba(255,255,255,0.55)"/>
        <circle cx="11"  cy="-5" r="2.8" fill="rgba(255,255,255,0.55)"/>
        <circle cx="-9"  cy="9"  r="2"   fill="rgba(255,255,255,0.35)"/>
        <circle cx="9"   cy="9"  r="2"   fill="rgba(255,255,255,0.35)"/>
        {/* Body */}
        <ellipse cx="0" cy="0" rx="2.8" ry="13" fill="#3d1a00"/>
        <ellipse cx="0" cy="-10" rx="2" ry="3" fill="#5a2e00"/>
        {/* Antennae */}
        <path d="M-2.5,-11 Q-10,-22 -12,-26" stroke="#3d1a00" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
        <circle cx="-12" cy="-26" r="2.2" fill="#e8524a"/>
        <path d="M2.5,-11 Q10,-22 12,-26" stroke="#3d1a00" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
        <circle cx="12" cy="-26" r="2.2" fill="#e8524a"/>
      </svg>
    </div>
  );
}

