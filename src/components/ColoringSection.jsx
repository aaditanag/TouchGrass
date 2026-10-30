import { useState } from 'react';
import './ColoringSection.css';

const COLORS = [
  '#e74c3c', '#e67e22', '#f1c40f', '#2ecc71',
  '#1abc9c', '#3498db', '#9b59b6', '#e91e63',
  '#ff8a65', '#a5d6a7', '#fff176', '#b39ddb',
  '#80cbc4', '#f48fb1', '#ffd54f', '#4a7c59',
];

// All elements start uncoloured (#ffffff) like a real coloring book
const REGIONS = [
  'sky', 'sun', 'grass_main', 'grass1', 'grass2',
  'trunk', 'leaves1', 'leaves2', 'leaves3',
  'bush1', 'bush2', 'bench', 'bench_legs',
  'path', 'butterfly_top', 'butterfly_bottom',
  'flower1_petals', 'flower1_center',
  'flower2_petals', 'flower2_center',
  'flower3_petals', 'flower3_center',
];

export default function ColoringSection() {
  const [selectedColor, setSelectedColor] = useState('#e74c3c');
  const [fills, setFills] = useState(() =>
    Object.fromEntries(REGIONS.map(id => [id, '#ffffff']))
  );

  const handleRegionClick = (id) => {
    setFills(prev => ({ ...prev, [id]: selectedColor }));
  };

  const handleReset = () => {
    setFills(Object.fromEntries(REGIONS.map(id => [id, '#ffffff'])));
  };

  const f = (id) => fills[id] || '#ffffff';

  return (
    <section className="color-section" id="color">
      <div className="color-header">
        <h2>colour with me 🎨</h2>
        <p>growing up I learned art & drawing — tap any shape to fill it with colour</p>
      </div>

      {/* Palette */}
      <div className="palette" role="group" aria-label="Color palette">
        {COLORS.map(c => (
          <button
            key={c}
            className={`palette-swatch ${selectedColor === c ? 'selected' : ''}`}
            style={{ background: c }}
            onClick={() => setSelectedColor(c)}
            title={c}
            aria-label={`Select color ${c}`}
          />
        ))}
      </div>

      <p className="color-hint">pick a colour above, then click anywhere on the drawing ✦</p>

      {/* SVG Park Coloring Canvas — Clean black & white outline coloring book */}
      <div className="coloring-canvas-wrap">
        <svg
          className="coloring-svg"
          viewBox="0 0 480 340"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Coloring scene: park with sun, tree, flowers, bench, butterfly"
        >
          {/* ── SKY ── */}
          <rect
            id="sky" className="colorable"
            x="0" y="0" width="480" height="210"
            fill={f('sky')}
            stroke="#2c1810" strokeWidth="1.8"
            onClick={() => handleRegionClick('sky')}
            aria-label="Sky"
          />

          {/* ── SUN ── */}
          <circle
            id="sun" className="colorable"
            cx="65" cy="55" r="30"
            fill={f('sun')}
            stroke="#2c1810" strokeWidth="1.8"
            onClick={() => handleRegionClick('sun')}
            aria-label="Sun"
          />
          {/* Sun rays — visible dark line art */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1={65 + Math.cos(i * 45 * Math.PI / 180) * 35}
              y1={55 + Math.sin(i * 45 * Math.PI / 180) * 35}
              x2={65 + Math.cos(i * 45 * Math.PI / 180) * 46}
              y2={55 + Math.sin(i * 45 * Math.PI / 180) * 46}
              stroke="#2c1810" strokeWidth="2.4" strokeLinecap="round"
            />
          ))}

          {/* ── BIRDS IN SKY ── */}
          <path d="M195 55 Q205 47 215 55 Q225 47 235 55" stroke="#2c1810" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
          <path d="M235 42 Q243 35 251 42 Q259 35 267 42" stroke="#2c1810" strokeWidth="1.8" fill="none" strokeLinecap="round"/>

          {/* ── BUTTERFLY ── */}
          <g>
            <ellipse
              id="butterfly_top" className="colorable"
              cx="312" cy="74" rx="15" ry="10"
              fill={f('butterfly_top')}
              stroke="#2c1810" strokeWidth="1.6"
              transform="rotate(-20, 312, 74)"
              onClick={() => handleRegionClick('butterfly_top')}
            />
            <ellipse
              className="colorable"
              cx="330" cy="78" rx="12" ry="8"
              fill={f('butterfly_top')}
              stroke="#2c1810" strokeWidth="1.6"
              transform="rotate(-20, 330, 78)"
              onClick={() => handleRegionClick('butterfly_top')}
            />
            <ellipse
              id="butterfly_bottom" className="colorable"
              cx="314" cy="91" rx="13" ry="8"
              fill={f('butterfly_bottom')}
              stroke="#2c1810" strokeWidth="1.6"
              transform="rotate(20, 314, 91)"
              onClick={() => handleRegionClick('butterfly_bottom')}
            />
            <ellipse
              className="colorable"
              cx="328" cy="88" rx="10" ry="7"
              fill={f('butterfly_bottom')}
              stroke="#2c1810" strokeWidth="1.6"
              transform="rotate(20, 328, 88)"
              onClick={() => handleRegionClick('butterfly_bottom')}
            />
            {/* Butterfly body */}
            <line x1="321" y1="72" x2="321" y2="94" stroke="#2c1810" strokeWidth="2" strokeLinecap="round"/>
          </g>

          {/* ── BACKGROUND HILLS ── */}
          <ellipse
            id="grass1" className="colorable"
            cx="110" cy="210" rx="150" ry="38"
            fill={f('grass1')}
            stroke="#2c1810" strokeWidth="1.8"
            onClick={() => handleRegionClick('grass1')}
          />
          <ellipse
            id="grass2" className="colorable"
            cx="380" cy="218" rx="130" ry="32"
            fill={f('grass2')}
            stroke="#2c1810" strokeWidth="1.8"
            onClick={() => handleRegionClick('grass2')}
          />

          {/* ── FOREGROUND FIELD ── */}
          <rect
            id="grass_main" className="colorable"
            x="0" y="210" width="480" height="130"
            fill={f('grass_main')}
            stroke="#2c1810" strokeWidth="1.8"
            onClick={() => handleRegionClick('grass_main')}
          />

          {/* ── WINDING PARK PATH ── */}
          <path
            id="path" className="colorable"
            d="M210 210 C215 250 175 280 155 340 L325 340 C305 280 265 250 270 210 Z"
            fill={f('path')}
            stroke="#2c1810" strokeWidth="1.8"
            onClick={() => handleRegionClick('path')}
          />

          {/* ── BIG TREE ── */}
          <rect
            id="trunk" className="colorable"
            x="86" y="160" width="22" height="100" rx="3"
            fill={f('trunk')}
            stroke="#2c1810" strokeWidth="1.8"
            onClick={() => handleRegionClick('trunk')}
          />
          <ellipse
            id="leaves1" className="colorable"
            cx="97" cy="135" rx="55" ry="70"
            fill={f('leaves1')}
            stroke="#2c1810" strokeWidth="1.8"
            onClick={() => handleRegionClick('leaves1')}
          />
          <ellipse
            id="leaves2" className="colorable"
            cx="97" cy="115" rx="43" ry="55"
            fill={f('leaves2')}
            stroke="#2c1810" strokeWidth="1.8"
            onClick={() => handleRegionClick('leaves2')}
          />
          <ellipse
            id="leaves3" className="colorable"
            cx="97" cy="98" rx="30" ry="38"
            fill={f('leaves3')}
            stroke="#2c1810" strokeWidth="1.8"
            onClick={() => handleRegionClick('leaves3')}
          />

          {/* ── BUSHES (Right) ── */}
          <ellipse
            id="bush1" className="colorable"
            cx="390" cy="208" rx="42" ry="30"
            fill={f('bush1')}
            stroke="#2c1810" strokeWidth="1.8"
            onClick={() => handleRegionClick('bush1')}
          />
          <ellipse
            id="bush2" className="colorable"
            cx="424" cy="216" rx="28" ry="22"
            fill={f('bush2')}
            stroke="#2c1810" strokeWidth="1.8"
            onClick={() => handleRegionClick('bush2')}
          />

          {/* ── PARK BENCH ── */}
          <rect
            id="bench" className="colorable"
            x="315" y="218" width="80" height="9" rx="2"
            fill={f('bench')}
            stroke="#2c1810" strokeWidth="1.8"
            onClick={() => handleRegionClick('bench')}
          />
          <rect
            className="colorable"
            x="315" y="230" width="80" height="10" rx="2"
            fill={f('bench')}
            stroke="#2c1810" strokeWidth="1.8"
            onClick={() => handleRegionClick('bench')}
          />
          <rect
            id="bench_legs" className="colorable"
            x="322" y="240" width="8" height="22" rx="2"
            fill={f('bench_legs')}
            stroke="#2c1810" strokeWidth="1.8"
            onClick={() => handleRegionClick('bench_legs')}
          />
          <rect
            className="colorable"
            x="380" y="240" width="8" height="22" rx="2"
            fill={f('bench_legs')}
            stroke="#2c1810" strokeWidth="1.8"
            onClick={() => handleRegionClick('bench_legs')}
          />

          {/* ── FLOWER 1 (Left) ── */}
          <g>
            {[0, 60, 120, 180, 240, 300].map((a, j) => (
              <ellipse
                key={j} className="colorable"
                cx={165 + Math.cos(a * Math.PI / 180) * 11}
                cy={215 + Math.sin(a * Math.PI / 180) * 11}
                rx="6" ry="3.5"
                fill={f('flower1_petals')}
                stroke="#2c1810" strokeWidth="1.4"
                transform={`rotate(${a},${165 + Math.cos(a * Math.PI / 180) * 11},${215 + Math.sin(a * Math.PI / 180) * 11})`}
                onClick={() => handleRegionClick('flower1_petals')}
              />
            ))}
            <circle
              id="flower1_center" className="colorable"
              cx="165" cy="215" r="5"
              fill={f('flower1_center')}
              stroke="#2c1810" strokeWidth="1.4"
              onClick={() => handleRegionClick('flower1_center')}
            />
          </g>

          {/* ── FLOWER 2 (Center) ── */}
          <g>
            {[0, 72, 144, 216, 288].map((a, j) => (
              <ellipse
                key={j} className="colorable"
                cx={260 + Math.cos(a * Math.PI / 180) * 10}
                cy={208 + Math.sin(a * Math.PI / 180) * 10}
                rx="5" ry="3"
                fill={f('flower2_petals')}
                stroke="#2c1810" strokeWidth="1.4"
                transform={`rotate(${a},${260 + Math.cos(a * Math.PI / 180) * 10},${208 + Math.sin(a * Math.PI / 180) * 10})`}
                onClick={() => handleRegionClick('flower2_petals')}
              />
            ))}
            <circle
              id="flower2_center" className="colorable"
              cx="260" cy="208" r="4.5"
              fill={f('flower2_center')}
              stroke="#2c1810" strokeWidth="1.4"
              onClick={() => handleRegionClick('flower2_center')}
            />
          </g>

          {/* ── FLOWER 3 (Right) ── */}
          <g>
            {[0, 60, 120, 180, 240, 300].map((a, j) => (
              <ellipse
                key={j} className="colorable"
                cx={455 + Math.cos(a * Math.PI / 180) * 9}
                cy={205 + Math.sin(a * Math.PI / 180) * 9}
                rx="5" ry="3"
                fill={f('flower3_petals')}
                stroke="#2c1810" strokeWidth="1.4"
                transform={`rotate(${a},${455 + Math.cos(a * Math.PI / 180) * 9},${205 + Math.sin(a * Math.PI / 180) * 9})`}
                onClick={() => handleRegionClick('flower3_petals')}
              />
            ))}
            <circle
              id="flower3_center" className="colorable"
              cx="455" cy="205" r="4.5"
              fill={f('flower3_center')}
              stroke="#2c1810" strokeWidth="1.4"
              onClick={() => handleRegionClick('flower3_center')}
            />
          </g>

          {/* Clean outer frame around drawing */}
          <rect x="0" y="0" width="480" height="340" fill="none" stroke="#2c1810" strokeWidth="3" rx="4"/>
        </svg>
      </div>

      <button className="color-reset" onClick={handleReset}>reset colours ↺</button>
    </section>
  );
}
