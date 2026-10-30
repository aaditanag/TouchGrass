import './CarpetScene.css';

/* ── Tiny reusable flower ── */
function Flower({ cx, cy, r = 6, petals = 6, petalColor = '#f9e4b7', centerColor = '#f0a500', rotate = 0 }) {
  const angles = Array.from({ length: petals }, (_, i) => (360 / petals) * i + rotate);
  return (
    <g>
      {angles.map((a, i) => (
        <ellipse
          key={i}
          cx={cx + Math.cos(a * Math.PI / 180) * r}
          cy={cy + Math.sin(a * Math.PI / 180) * r}
          rx={r * 0.55} ry={r * 0.28}
          fill={petalColor}
          transform={`rotate(${a},${cx + Math.cos(a * Math.PI / 180) * r},${cy + Math.sin(a * Math.PI / 180) * r})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={r * 0.42} fill={centerColor} />
    </g>
  );
}

export default function CarpetScene({ onPaperClick, onCoffeeClick, onBouquetClick }) {
  return (
    <svg
      className="carpet-scene"
      viewBox="0 0 680 310"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Picnic carpet scene"
    >
      <defs>
        <pattern id="carpetPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#c0392b"/>
          <rect x="0" y="0" width="10" height="10" fill="#a93226" opacity="0.5"/>
          <rect x="10" y="10" width="10" height="10" fill="#a93226" opacity="0.5"/>
          <circle cx="10" cy="10" r="3" fill="#96281b" opacity="0.6"/>
        </pattern>
        <pattern id="carpetDiamond" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <polygon points="12,2 22,12 12,22 2,12" fill="#96281b" opacity="0.25"/>
        </pattern>
        <filter id="shadow">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#00000040"/>
        </filter>
        <filter id="mugShadow">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#00000050"/>
        </filter>
        <clipPath id="carpetClip">
          <rect x="55" y="68" width="570" height="220" rx="8"/>
        </clipPath>
        <clipPath id="photoClip">
          <rect x="0" y="0" width="90" height="68" rx="2"/>
        </clipPath>
      </defs>

      {/* ─────── CARPET ─────── */}
      <rect x="55" y="68" width="570" height="220" rx="8" fill="url(#carpetPattern)" filter="url(#shadow)"/>
      <rect x="55" y="68" width="570" height="220" rx="8" fill="url(#carpetDiamond)"/>
      {/* Border */}
      <rect x="55" y="68" width="570" height="220" rx="8" fill="none" stroke="#e8c99a" strokeWidth="6"/>
      <rect x="63" y="76" width="554" height="204" rx="5" fill="none" stroke="#96281b" strokeWidth="1.5" strokeDasharray="6 4"/>

      {/* Ornamental corners */}
      {[[72,84],[608,84],[72,280],[608,280]].map(([cx,cy],i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="9" fill="#e8c99a"/>
          <circle cx={cx} cy={cy} r="4.5" fill="#96281b"/>
          <circle cx={cx} cy={cy} r="1.5" fill="#e8c99a"/>
        </g>
      ))}

      {/* Center medallion */}
      <ellipse cx="340" cy="178" rx="40" ry="30" fill="none" stroke="#e8c99a" strokeWidth="1.5" opacity="0.4"/>
      <ellipse cx="340" cy="178" rx="26" ry="18" fill="none" stroke="#e8c99a" strokeWidth="1" opacity="0.3"/>

      {/* Fringe left */}
      {Array.from({length:13}).map((_,i) => (
        <line key={`fl${i}`} x1={55} y1={84+i*16} x2={38} y2={88+i*16}
          stroke="#e8c99a" strokeWidth="2.5" strokeLinecap="round"/>
      ))}
      {/* Fringe right */}
      {Array.from({length:13}).map((_,i) => (
        <line key={`fr${i}`} x1={625} y1={84+i*16} x2={642} y2={88+i*16}
          stroke="#e8c99a" strokeWidth="2.5" strokeLinecap="round"/>
      ))}

      {/* ─────── GRASS / FLOWERS AROUND CARPET ─────── */}
      {/* Top edge flowers */}
      <Flower cx={100} cy={62} r={7} petalColor="#ffd6d6" centerColor="#e8524a"/>
      <Flower cx={148} cy={56} r={6} petalColor="#fff8e7" centerColor="#f0a500" rotate={30}/>
      <Flower cx={200} cy={60} r={5} petalColor="#c8e6c9" centerColor="#66bb6a" petals={5}/>
      <Flower cx={255} cy={54} r={7} petalColor="#f9e4b7" centerColor="#f0a500"/>
      <Flower cx={310} cy={58} r={5} petalColor="#ffd6d6" centerColor="#e8524a" petals={5} rotate={36}/>
      <Flower cx={370} cy={55} r={6} petalColor="#e1bee7" centerColor="#9c27b0" petals={5}/>
      <Flower cx={425} cy={60} r={7} petalColor="#fff8e7" centerColor="#f0a500" rotate={15}/>
      <Flower cx={480} cy={54} r={5} petalColor="#ffd6d6" centerColor="#e8524a" petals={8}/>
      <Flower cx={535} cy={59} r={6} petalColor="#c8e6c9" centerColor="#66bb6a"/>
      <Flower cx={585} cy={62} r={7} petalColor="#f9e4b7" centerColor="#f0a500"/>

      {/* Bottom edge flowers */}
      <Flower cx={90}  cy={294} r={7} petalColor="#fff8e7" centerColor="#f0a500"/>
      <Flower cx={145} cy={298} r={5} petalColor="#ffd6d6" centerColor="#e8524a" petals={5}/>
      <Flower cx={205} cy={293} r={6} petalColor="#e1bee7" centerColor="#9c27b0"/>
      <Flower cx={260} cy={299} r={7} petalColor="#c8e6c9" centerColor="#66bb6a" rotate={20}/>
      <Flower cx={320} cy={294} r={5} petalColor="#f9e4b7" centerColor="#f0a500" petals={8}/>
      <Flower cx={378} cy={298} r={6} petalColor="#ffd6d6" centerColor="#e8524a" petals={5}/>
      <Flower cx={435} cy={293} r={7} petalColor="#fff8e7" centerColor="#f0a500"/>
      <Flower cx={492} cy={298} r={5} petalColor="#c8e6c9" centerColor="#66bb6a" rotate={10}/>
      <Flower cx={545} cy={293} r={6} petalColor="#e1bee7" centerColor="#9c27b0"/>
      <Flower cx={600} cy={298} r={7} petalColor="#f9e4b7" centerColor="#f0a500" petals={5}/>

      {/* ON CARPET small flowers for texture */}
      <Flower cx={88}  cy={175} r={4} petalColor="#e8c99a" centerColor="#c49a2a" petals={4}/>
      <Flower cx={590} cy={175} r={4} petalColor="#e8c99a" centerColor="#c49a2a" petals={4}/>
      <Flower cx={340} cy={108} r={3} petalColor="#e8c99a" centerColor="#c49a2a" petals={4}/>
      <Flower cx={340} cy={248} r={3} petalColor="#e8c99a" centerColor="#c49a2a" petals={4}/>

      {/* ─────── LADY READING/NAPPING ─────── */}
      {/* Dress/body */}
      <ellipse cx="175" cy="225" rx="55" ry="20" fill="#7c5cbf"/>
      <ellipse cx="175" cy="218" rx="42" ry="14" fill="#9b7fe8"/>
      {/* Head */}
      <circle cx="228" cy="210" r="17" fill="#f5c6a0"/>
      {/* Hair */}
      <ellipse cx="228" cy="200" rx="18" ry="11" fill="#2c1810"/>
      <path d="M214 200 Q220 192 228 190 Q236 192 242 200" fill="#2c1810"/>
      <circle cx="240" cy="195" r="7" fill="#2c1810"/>
      {/* Eyes closed */}
      <path d="M221 210 Q224 213 227 210" stroke="#2c1810" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <path d="M230 210 Q233 213 236 210" stroke="#2c1810" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      {/* Smile */}
      <path d="M223 216 Q228 219 232 216" stroke="#c0726a" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
      {/* Arm + book */}
      <path d="M225 222 L205 235" stroke="#f5c6a0" strokeWidth="7" strokeLinecap="round"/>
      <rect x="185" y="226" width="36" height="25" rx="2" fill="#e8c99a" transform="rotate(-8,203,238)"/>
      <rect x="188" y="228" width="16" height="25" rx="1" fill="#d4b896" transform="rotate(-8,196,240)"/>
      <line x1="190" y1="234" x2="202" y2="232" stroke="#b8986e" strokeWidth="0.9" transform="rotate(-8,196,233)"/>
      <line x1="190" y1="238" x2="202" y2="236" stroke="#b8986e" strokeWidth="0.9" transform="rotate(-8,196,237)"/>
      <line x1="190" y1="242" x2="202" y2="240" stroke="#b8986e" strokeWidth="0.9" transform="rotate(-8,196,241)"/>
      {/* Legs */}
      <path d="M130 228 Q115 242 106 252" stroke="#f5c6a0" strokeWidth="9" strokeLinecap="round"/>
      <path d="M138 234 Q124 250 112 258" stroke="#7c5cbf" strokeWidth="7" strokeLinecap="round"/>
      {/* ZZZ */}
      <text x="248" y="200" fontFamily="'Caveat',cursive" fontSize="12" fill="#9b7fe8" opacity="0.7">z</text>
      <text x="257" y="192" fontFamily="'Caveat',cursive" fontSize="9"  fill="#9b7fe8" opacity="0.5">z</text>
      <text x="265" y="185" fontFamily="'Caveat',cursive" fontSize="7"  fill="#9b7fe8" opacity="0.35">z</text>

      {/* ─────── PAPER (clickable → About) ─────── */}
      <g
        className="paper-zone"
        onClick={onPaperClick}
        role="button"
        tabIndex={0}
        aria-label="Click to read about me"
        onKeyDown={e => e.key === 'Enter' && onPaperClick?.()}
      >
        <rect x="335" y="90" width="100" height="130" rx="3" fill="#fdf6e3" stroke="#d4b896" strokeWidth="1.5"
          transform="rotate(4,385,155)"/>
        {Array.from({length:8}).map((_,i) => (
          <line key={i} x1="343" y1={104+i*13} x2="427" y2={104+i*13}
            stroke="#d4b896" strokeWidth="0.8" opacity="0.6"
            transform="rotate(4,385,155)"/>
        ))}
        <text x="346" y="103" fontFamily="'Caveat',cursive" fontSize="9" fill="#4a3728" transform="rotate(4,385,155)">Dear world,</text>
        <text x="344" y="115" fontFamily="'Caveat',cursive" fontSize="7.5" fill="#4a3728" transform="rotate(4,385,155)">I am Aadita ✦</text>
        <text x="346" y="127" fontFamily="'Caveat',cursive" fontSize="7" fill="#6b5240" transform="rotate(4,385,155)">I build things with</text>
        <text x="346" y="138" fontFamily="'Caveat',cursive" fontSize="7" fill="#6b5240" transform="rotate(4,385,155)">love and coffee ☕</text>
        {/* Click hint */}
        <text x="350" y="215" fontFamily="'Caveat',cursive" fontSize="8" fill="#8b6914" opacity="0.75" transform="rotate(4,385,155)">↓ scroll to read</text>
      </g>

      {/* ─────── PHOTO MOCKUP (clickable → About) ─────── */}
      <g
        className="paper-zone"
        onClick={onPaperClick}
        role="button"
        tabIndex={0}
        aria-label="Click to see about section"
        onKeyDown={e => e.key === 'Enter' && onPaperClick?.()}
      >
        {/* Polaroid frame */}
        <rect x="454" y="92" width="96" height="116" rx="3" fill="#fdf6e3" stroke="#d4b896" strokeWidth="1.5"
          transform="rotate(-3,502,150)"/>
        {/* Photo area */}
        <rect x="461" y="98" width="82" height="80" rx="1" fill="#c8e6c9" transform="rotate(-3,502,138)"/>
        {/* Simple landscape in photo */}
        {/* Sky */}
        <rect x="461" y="98" width="82" height="36" rx="1" fill="#c8eaf5" transform="rotate(-3,502,116)"/>
        {/* Sun */}
        <circle cx="480" cy="110" r="7" fill="#f9d71c" transform="rotate(-3,502,116)"/>
        {/* Hills */}
        <ellipse cx="490" cy="138" rx="30" ry="18" fill="#7bc47f" transform="rotate(-3,502,138)"/>
        <ellipse cx="525" cy="142" rx="22" ry="14" fill="#5a9e6f" transform="rotate(-3,502,138)"/>
        {/* Tiny tree */}
        <rect x="514" y="122" width="4" height="20" fill="#6b3a2a" transform="rotate(-3,502,132)"/>
        <ellipse cx="516" cy="116" rx="9" ry="12" fill="#3d7a4e" transform="rotate(-3,502,122)"/>
        {/* Bottom caption */}
        <text x="480" y="200" textAnchor="middle" fontFamily="'Caveat',cursive" fontSize="8.5" fill="#8b6914"
          transform="rotate(-3,502,200)">my happy place</text>
        <text x="480" y="212" textAnchor="middle" fontFamily="'Caveat',cursive" fontSize="7" fill="#b8986e" opacity="0.7"
          transform="rotate(-3,502,212)">click → about me</text>
      </g>

      {/* ─────── COFFEE MUG (clickable → Coffee section) ─────── */}
      <g
        className="paper-zone coffee-on-carpet"
        onClick={onCoffeeClick}
        role="button"
        tabIndex={0}
        aria-label="Click to pour coffee"
        onKeyDown={e => e.key === 'Enter' && onCoffeeClick?.()}
      >
        {/* Coaster */}
        <ellipse cx="565" cy="242" rx="26" ry="7" fill="#8b6914" opacity="0.3"/>
        {/* Mug body */}
        <path d="M546 192 Q543 238 565 244 Q587 238 584 192 Z" fill="#f0ebe0" stroke="#d4cfc4" strokeWidth="1.5"/>
        {/* Coffee fill inside */}
        <path d="M548 208 Q545 238 565 244 Q585 238 582 208 Z" fill="#6b3a2a" opacity="0.85"/>
        {/* Foam */}
        <ellipse cx="565" cy="208" rx="17" ry="5" fill="#e8d5b7"/>
        {/* Rim */}
        <ellipse cx="565" cy="192" rx="20" ry="5" fill="#f0ebe0" stroke="#d4cfc4" strokeWidth="1.5"/>
        {/* Handle */}
        <path d="M584 204 Q600 204 600 220 Q600 236 584 234"
          stroke="#d4cfc4" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <path d="M584 204 Q596 204 596 220 Q596 234 584 234"
          stroke="#f0ebe0" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        {/* Steam lines */}
        <path d="M556 186 Q554 178 557 170" stroke="#c4b89a" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6"/>
        <path d="M565 184 Q563 175 566 166" stroke="#c4b89a" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6"/>
        <path d="M574 186 Q572 178 575 170" stroke="#c4b89a" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6"/>
        {/* Click hint */}
        <text x="565" y="260" textAnchor="middle" fontFamily="'Caveat',cursive" fontSize="7.5" fill="#8b6914" opacity="0.7">click ☕</text>
      </g>

      {/* ─────── WICKER BASKET ─────── */}
      <g transform="translate(290,215)">
        <ellipse cx="0" cy="22" rx="28" ry="8" fill="#c4914a"/>
        <rect x="-28" y="0" width="56" height="22" rx="7" fill="#d4a55a"/>
        <ellipse cx="0" cy="0" rx="28" ry="9" fill="#b87d38"/>
        {[-12,0,12].map((x,i)=>(
          <line key={i} x1={x} y1={0} x2={x} y2={22} stroke="#96611a" strokeWidth="1" opacity="0.5"/>
        ))}
        <path d="M-28 11 Q0 5 28 11" stroke="#96611a" strokeWidth="0.8" fill="none" opacity="0.5"/>
        <path d="M-18 0 Q0 -18 18 0" stroke="#c4914a" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <circle cx="-8" cy="-2" r="6" fill="#e8524a"/>
        <circle cx="2" cy="-5" r="6" fill="#7bc47f"/>
        <circle cx="12" cy="-2" r="6" fill="#f9e4b7"/>
      </g>

      {/* ─────── BOUQUET PROMO (clickable, lower-left carpet area) ─────── */}
      <g
        className="paper-zone"
        onClick={onBouquetClick}
        role="button"
        tabIndex={0}
        aria-label="Make a bouquet"
        onKeyDown={e => e.key === 'Enter' && onBouquetClick?.()}
        transform="translate(78,112)"
      >
        {/* Tiny bouquet SVG — bigger, moved up */}
        {/* Rose */}
        <circle cx="24" cy="24" r="9" fill="#DC143C" opacity="0.9"/>
        <circle cx="24" cy="24" r="5" fill="#A50022"/>
        {/* Lily */}
        <ellipse cx="42" cy="18" rx="7" ry="11" fill="#FF69B4" opacity="0.9"/>
        <ellipse cx="42" cy="18" rx="4" ry="6.5" fill="#FF1493"/>
        {/* Sunflower */}
        {[0,45,90,135,180,225,270,315].map((a,i)=>(
          <ellipse key={i}
            cx={60 + Math.cos(a*Math.PI/180)*9}
            cy={24 + Math.sin(a*Math.PI/180)*9}
            rx="3.5" ry="2.2"
            fill="#FFD700"
            transform={`rotate(${a},${60+Math.cos(a*Math.PI/180)*9},${24+Math.sin(a*Math.PI/180)*9})`}
          />
        ))}
        <circle cx="60" cy="24" r="5.5" fill="#8B4513"/>
        {/* Stems */}
        <line x1="24" y1="33" x2="42" y2="58" stroke="#4a7c59" strokeWidth="2" strokeLinecap="round"/>
        <line x1="42" y1="29" x2="42" y2="58" stroke="#4a7c59" strokeWidth="2" strokeLinecap="round"/>
        <line x1="60" y1="33" x2="42" y2="58" stroke="#4a7c59" strokeWidth="2" strokeLinecap="round"/>
        {/* Ribbon */}
        <path d="M33 58 Q42 64 51 58" stroke="#e8524a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        {/* Call-to-action pill */}
        <rect x="-6" y="66" width="100" height="24" rx="12" fill="rgba(253,246,227,0.88)" stroke="#8b6914" strokeWidth="1.2"/>
        <text x="44" y="82" textAnchor="middle" fontFamily="'Caveat',cursive" fontSize="11" fill="#4a3728">
          🌸 make a bouquet →
        </text>
      </g>
    </svg>
  );
}
