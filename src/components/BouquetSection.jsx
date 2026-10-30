import { useRef, useState } from 'react';
import './BouquetSection.css';

const FLOWERS = [
  { id: 'rose', name: 'Rose', emoji: '🌹', color: '#DC143C' },
  { id: 'lily', name: 'Lily', emoji: '🌸', color: '#FF69B4' },
  { id: 'sunflower', name: 'Sunflower', emoji: '🌻', color: '#FFD700' },
  { id: 'tulip', name: 'Tulip', emoji: '🌷', color: '#9B59B6' },
  { id: 'daisy', name: 'Daisy', emoji: '🌼', color: '#FFFACD' },
  { id: 'lavender', name: 'Lavender', emoji: '💜', color: '#9370DB' },
];

/* ── Individual flower SVG components ── */
function FlowerSVG({ type, cx, cy, size = 1 }) {
  const s = size;
  switch (type) {
    case 'rose': return (
      <g transform={`translate(${cx},${cy}) scale(${s})`}>
        {[0, 60, 120, 180, 240, 300].map((a, i) => (
          <ellipse key={i} cx={Math.cos(a * Math.PI / 180) * 10} cy={Math.sin(a * Math.PI / 180) * 10}
            rx="8" ry="13" fill="#DC143C" opacity="0.88"
            transform={`rotate(${a + 90})`} />
        ))}
        {[0, 72, 144, 216, 288].map((a, i) => (
          <ellipse key={i} cx={Math.cos(a * Math.PI / 180) * 5} cy={Math.sin(a * Math.PI / 180) * 5}
            rx="5" ry="8" fill="#A50022" transform={`rotate(${a + 90})`} />
        ))}
        <circle cx="0" cy="0" r="5" fill="#7a0018" />
      </g>
    );
    case 'lily': return (
      <g transform={`translate(${cx},${cy}) scale(${s})`}>
        {[0, 60, 120, 180, 240, 300].map((a, i) => (
          <ellipse key={i} cx={0} cy={-14} rx="5" ry="14" fill="#FF69B4"
            transform={`rotate(${a})`} />
        ))}
        <circle cx="0" cy="0" r="5" fill="#FF1493" />
        <circle cx="0" cy="0" r="2.5" fill="#FFE4E1" />
        {/* Stamens */}
        {[0, 60, 120, 180, 240, 300].map((a, i) => (
          <line key={i} x1="0" y1="-3" x2={Math.cos((a + 90) * Math.PI / 180) * 5}
            y2={Math.sin((a + 90) * Math.PI / 180) * 5}
            stroke="#FF69B4" strokeWidth="0.7" transform={`rotate(${a})`} />
        ))}
      </g>
    );
    case 'sunflower': return (
      <g transform={`translate(${cx},${cy}) scale(${s})`}>
        {Array.from({ length: 16 }).map((_, i) => {
          const a = i * 22.5;
          return <ellipse key={i} cx={Math.cos(a * Math.PI / 180) * 13} cy={Math.sin(a * Math.PI / 180) * 13}
            rx="3.5" ry="10" fill="#FFD700" transform={`rotate(${a})`} />;
        })}
        <circle cx="0" cy="0" r="8" fill="#8B4513" />
        <circle cx="0" cy="0" r="5" fill="#5C2E00" />
        {[-1.5, 0, 1.5].map(x => [-1.5, 0, 1.5].map((y, j) => (
          <circle key={j} cx={x * 2} cy={y * 2} r="0.7" fill="#c49a2a" opacity="0.6" />
        )))}
      </g>
    );
    case 'tulip': return (
      <g transform={`translate(${cx},${cy}) scale(${s})`}>
        <path d="M0 -18 C-12 -14 -12 0 0 3 C12 0 12 -14 0 -18Z" fill="#9B59B6" />
        <path d="M0 -18 C-5 -14 -5 -4 0 -1 C5 -4 5 -14 0 -18Z" fill="#8E44AD" />
        <ellipse cx="-9" cy="-8" rx="7" ry="12" fill="#A569BD" transform="rotate(-30,-9,-8)" />
        <ellipse cx="9" cy="-8" rx="7" ry="12" fill="#A569BD" transform="rotate(30,9,-8)" />
        <path d="M0 3 L0 16" stroke="#4a7c59" strokeWidth="2.2" strokeLinecap="round" />
        <ellipse cx="-6" cy="12" rx="5.5" ry="2.5" fill="#5a9e6f" transform="rotate(-30,-6,12)" />
      </g>
    );
    case 'daisy': return (
      <g transform={`translate(${cx},${cy}) scale(${s})`}>
        {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((a, i) => (
          <ellipse key={i} cx={0} cy={-13} rx="3.5" ry="12"
            fill="white" stroke="#d4cfc4" strokeWidth="0.4"
            transform={`rotate(${a})`} />
        ))}
        <circle cx="0" cy="0" r="6" fill="#FFD700" />
        <circle cx="0" cy="0" r="3.5" fill="#FFA500" opacity="0.7" />
      </g>
    );
    case 'lavender': return (
      <g transform={`translate(${cx},${cy}) scale(${s})`}>
        <line x1="0" y1="18" x2="0" y2="-6" stroke="#4a7c59" strokeWidth="2.2" strokeLinecap="round" />
        {[-4, -1, 2, -3, 1, -2, 3, -1].map((xo, i) => (
          <ellipse key={i} cx={xo} cy={-8 - i * 3} rx="4" ry="3.5" fill="#9370DB" opacity={0.72 + i * 0.03} />
        ))}
        <ellipse cx="-9" cy="6" rx="6.5" ry="2.5" fill="#5a9e6f" transform="rotate(-25,-9,6)" />
        <ellipse cx="9" cy="6" rx="6.5" ry="2.5" fill="#5a9e6f" transform="rotate(25,9,6)" />
      </g>
    );
    default: return null;
  }
}

/* ── Picker Card ── */
function FlowerPickerCard({ flower, count, onAdd, disabled }) {
  return (
    <div
      className={`flower-card ${count > 0 ? 'selected' : ''} ${disabled && count === 0 ? 'disabled' : ''}`}
      onClick={() => !disabled && onAdd(flower.id)}
      role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && !disabled && onAdd(flower.id)}
      aria-label={`Add ${flower.name}`}
    >
      <svg width="60" height="60" viewBox="-28 -28 56 56">
        <FlowerSVG type={flower.id} cx={0} cy={0} size={1.35} />
      </svg>
      <span className="flower-name">{flower.name}</span>
      {count > 0 && <span className="flower-count-badge">×{count}</span>}
    </div>
  );
}

/* ── Fan positions for n=1..6 flowers ── */
const FAN_POSITIONS = [
  [{ x: 200, y: 125 }],
  [{ x: 160, y: 145 }, { x: 240, y: 145 }],
  [{ x: 128, y: 168 }, { x: 200, y: 112 }, { x: 272, y: 168 }],
  [{ x: 112, y: 180 }, { x: 165, y: 120 }, { x: 235, y: 120 }, { x: 288, y: 180 }],
  [{ x: 100, y: 192 }, { x: 148, y: 132 }, { x: 200, y: 108 }, { x: 252, y: 132 }, { x: 300, y: 192 }],
  [{ x: 90, y: 204 }, { x: 138, y: 140 }, { x: 184, y: 108 }, { x: 216, y: 108 }, { x: 262, y: 140 }, { x: 310, y: 204 }],
];

/* ── Bouquet SVG ── */
function BouquetSVG({ orderedList, svgRef }) {
  const WIDTH = 400, HEIGHT = 440;
  const stemBase = { x: 200, y: 368 };
  const n = orderedList.length;
  if (n === 0) return null;
  const coords = FAN_POSITIONS[n - 1];

  return (
    <svg ref={svgRef} id="bouquet-svg" width={WIDTH} height={HEIGHT}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`} xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width={WIDTH} height={HEIGHT} fill="#fdfaf2" rx="10" />
      <rect x="6" y="6" width={WIDTH - 12} height={HEIGHT - 12} fill="none"
        stroke="#d4c5a0" strokeWidth="1.5" strokeDasharray="6 4" rx="8" />

      {/* Stems */}
      {coords.map((pos, i) => (
        <path key={i}
          d={`M${pos.x} ${pos.y + 20} Q${(pos.x + stemBase.x) / 2} ${(pos.y + stemBase.y * 1.1) / 2.05} ${stemBase.x} ${stemBase.y}`}
          stroke="#4a7c59" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.82" />
      ))}

      {/* Wrap paper cone */}
      <path d={`M${stemBase.x - 60} ${stemBase.y - 12} L${stemBase.x - 32} ${stemBase.y + 58} L${stemBase.x + 32} ${stemBase.y + 58} L${stemBase.x + 60} ${stemBase.y - 12} Z`}
        fill="#fdf6e3" stroke="#d4c5a0" strokeWidth="1.5" />
      {/* Cone shadow */}
      <path d={`M${stemBase.x - 60} ${stemBase.y - 12} L${stemBase.x - 32} ${stemBase.y + 58} L${stemBase.x} ${stemBase.y + 18} Z`}
        fill="#f0e6c8" opacity="0.65" />
      {/* Wrap pattern */}
      {[0, 1, 2].map(i => (
        <line key={i} x1={stemBase.x - 55 + i * 16} y1={stemBase.y - 8}
          x2={stemBase.x - 30 + i * 12} y2={stemBase.y + 52}
          stroke="#d4c5a0" strokeWidth="0.8" opacity="0.4" />
      ))}
      {/* Ribbon */}
      <path d={`M${stemBase.x - 42} ${stemBase.y + 8} Q${stemBase.x} ${stemBase.y - 12} ${stemBase.x + 42} ${stemBase.y + 8}`}
        stroke="#e8524a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* Ribbon bow */}
      <path d={`M${stemBase.x} ${stemBase.y - 5} C${stemBase.x - 16} ${stemBase.y - 22} ${stemBase.x - 20} ${stemBase.y - 8} ${stemBase.x} ${stemBase.y - 6}`}
        fill="#e8524a" opacity="0.85" />
      <path d={`M${stemBase.x} ${stemBase.y - 5} C${stemBase.x + 16} ${stemBase.y - 22} ${stemBase.x + 20} ${stemBase.y - 8} ${stemBase.x} ${stemBase.y - 6}`}
        fill="#e8524a" opacity="0.85" />
      <circle cx={stemBase.x} cy={stemBase.y - 6} r="4.5" fill="#c0392b" />

      {/* Flowers in selection order (left to right in fan) */}
      {orderedList.map((type, i) => (
        <FlowerSVG key={i} type={type} cx={coords[i].x} cy={coords[i].y} size={1.65} />
      ))}

      {/* Corner florals */}
      <text x="16" y="28" fontSize="18" fontFamily="serif" opacity="0.25">✿</text>
      <text x={WIDTH - 32} y="28" fontSize="18" fontFamily="serif" opacity="0.25">✿</text>
      <text x="16" y={HEIGHT - 12} fontSize="14" fontFamily="serif" opacity="0.2">✦</text>
      <text x={WIDTH - 28} y={HEIGHT - 12} fontSize="14" fontFamily="serif" opacity="0.2">✦</text>
    </svg>
  );
}

/* ── Main component ── */
export default function BouquetSection({ bouquetRef }) {
  // Track ORDER of selection as an array, not a map
  const [selectionOrder, setSelectionOrder] = useState([]); // e.g. ['rose','lily','rose']
  const [bouquetMade, setBouquetMade] = useState(false);
  const svgRef = useRef(null);

  const MAX = 6;
  const counts = selectionOrder.reduce((acc, id) => { acc[id] = (acc[id] || 0) + 1; return acc; }, {});

  const handleAdd = (id) => {
    if (selectionOrder.length >= MAX) return;
    setSelectionOrder(prev => [...prev, id]);
    setBouquetMade(false);
  };

  const handleRemove = (id) => {
    setSelectionOrder(prev => {
      const idx = prev.lastIndexOf(id);
      if (idx === -1) return prev;
      return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
    });
    setBouquetMade(false);
  };

  const handleBuild = () => selectionOrder.length > 0 && setBouquetMade(true);
  const handleReset = () => { setSelectionOrder([]); setBouquetMade(false); };

  const handleDownload = async () => {
    if (!svgRef.current) return;
    const svgStr = new XMLSerializer().serializeToString(svgRef.current);
    const svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      const CARD_H = 170;
      const canvas = document.createElement('canvas');
      canvas.width = 400; canvas.height = 440 + CARD_H;
      const ctx = canvas.getContext('2d');
      // background
      ctx.fillStyle = '#fdfaf2'; ctx.fillRect(0, 0, 400, canvas.height);
      // bouquet
      ctx.drawImage(img, 0, 0, 400, 440);
      // message card
      ctx.fillStyle = '#fdf6e3'; ctx.fillRect(18, 448, 364, 154);
      ctx.strokeStyle = '#d4c5a0'; ctx.setLineDash([5, 4]);
      ctx.lineWidth = 1.5; ctx.strokeRect(18, 448, 364, 154); ctx.setLineDash([]);
      ctx.textAlign = 'center'; ctx.fillStyle = '#4a3728';
      const lines = [
        { text: "I'm happy you are here.", font: "italic 15px Georgia", y: 476 },
        { text: "Hope these flowers bring a little joy to your face,", font: "15px Georgia", y: 500 },
        { text: "because you look better when you smile. 🌸", font: "15px Georgia", y: 522 },
        { text: "— love, aadita", font: "italic 18px Georgia", y: 556, color: '#c0392b' },
      ];
      lines.forEach(l => {
        ctx.font = l.font; ctx.fillStyle = l.color || '#4a3728';
        ctx.fillText(l.text, 200, l.y);
      });
      canvas.toBlob(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'bouquet-from-aadita.png';
        a.click();
      }, 'image/png');
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <section className="bouquet-section" id="bouquet" ref={bouquetRef}>
      <div className="bouquet-header">
        <h2>pick your flowers 🌸</h2>
        <p>choose up to 6 flowers — they'll arrange in the order you pick them</p>
      </div>

      {/* Flower picker */}
      <div className="flower-picker">
        {FLOWERS.map(f => (
          <FlowerPickerCard key={f.id} flower={f}
            count={counts[f.id] || 0}
            onAdd={handleAdd}
            disabled={selectionOrder.length >= MAX && !counts[f.id]}
          />
        ))}
      </div>

      {/* Selected order chips */}
      {selectionOrder.length > 0 && (
        <div className="selection-chips">
          {selectionOrder.map((id, i) => {
            const f = FLOWERS.find(x => x.id === id);
            return (
              <span key={i} className="chip">
                {f.emoji} {f.name}
                <button className="chip-remove" onClick={() => handleRemove(id)} title="Remove">✕</button>
              </span>
            );
          })}
        </div>
      )}

      <p className="selection-status">
        {selectionOrder.length === 0
          ? 'click a flower to add it to your bouquet ✦'
          : selectionOrder.length < 3
            ? `${selectionOrder.length} of 6 — add a few more!`
            : selectionOrder.length < MAX
              ? `${selectionOrder.length} of 6 selected — or build now!`
              : '6 of 6 — ready to bloom! 🌺'}
      </p>

      <button className="build-btn" onClick={handleBuild} disabled={selectionOrder.length < 1}>
        🌿 make my bouquet
      </button>

      {/* Generated bouquet */}
      {bouquetMade && (
        <div className="bouquet-result">
          <div className="bouquet-canvas-wrap">
            <BouquetSVG orderedList={selectionOrder} svgRef={svgRef} />
          </div>

          <div className="message-card">
            <p>I'm happy you are here.<br />Hope these flowers bring a little joy to your face,<br />because you look better when you smile. 🌸</p>
            <p className="message-sig">— love, aadita</p>
          </div>

          <div className="bouquet-actions">
            <button className="download-btn" onClick={handleDownload}>⬇ download bouquet</button>
            <button className="reset-bouquet-btn" onClick={handleReset}>pick new flowers ↺</button>
          </div>
        </div>
      )}
    </section>
  );
}
