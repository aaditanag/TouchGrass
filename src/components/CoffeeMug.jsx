import { useState } from 'react';
import './CoffeeMug.css';

const FACTS = [
  { text: '"I run on coffee and curiosity. Mostly coffee."', tag: '— aadita, probably' },
  { text: 'I once stayed up all night fixing a WebSocket bug and accidentally fixed three other bugs too.', tag: '— true story' },
  { text: 'I design logos the same way I make coffee: slowly, carefully, and with a little chaos.', tag: '— design philosophy' },
];

export default function CoffeeMug({ coffeeRef }) {
  const [fill, setFill] = useState(0);
  const [isPouring, setIsPouring] = useState(false);
  const [factIdx, setFactIdx] = useState(0);

  const handlePour = () => {
    if (isPouring || fill >= 1) return;
    setIsPouring(true);
    setFactIdx(f => (f + 1) % FACTS.length);
    let current = fill;
    const step = () => {
      current = Math.min(1, current + 0.03);
      setFill(current);
      if (current < 1) requestAnimationFrame(step);
      else setIsPouring(false);
    };
    requestAnimationFrame(step);
  };
  const handleReset = () => { setFill(0); setIsPouring(false); };

  /* Coffee fill inside mug body.
     Mug body inner: y from ~90 to ~185 (95px tall).
     At fill=1, liquid fills 88px, starting from y=97 (just below rim). */
  const maxH = 88;
  const liquidH = Math.round(fill * maxH);
  const liquidY = 185 - liquidH; // bottom of mug interior = 185

  const r2 = Math.round(180 - fill * 90);
  const g2 = Math.round(120 - fill * 60);
  const b2 = Math.round(60 - fill * 20);
  const liquidColor = `rgb(${r2},${g2},${b2})`;
  const foamOpacity = fill > 0.6 ? 1 : 0;

  return (
    <section className="coffee-section" id="coffee" ref={coffeeRef}>
      <div className="coffee-header">
        <h2>coffee's on me ☕</h2>
        <p>pour yourself a cup — click the mug to fill</p>
      </div>

      <div className="coffee-interactive">
        {/* MUG */}
        <div
          className="mug-wrapper"
          onClick={handlePour}
          role="button"
          tabIndex={0}
          aria-label="Click to pour coffee"
          onKeyDown={e => e.key === 'Enter' && handlePour()}
        >
          {/* SVG includes steam INSIDE viewBox so nothing is clipped */}
          <svg
            className="mug-svg"
            width="185"
            height="230"
            viewBox="0 0 185 230"
            aria-hidden="true"
          >
            <defs>
              <clipPath id="mugBodyClip">
                <path d="M30 90 Q26 190 80 200 Q134 190 130 90 Z"/>
              </clipPath>
              <linearGradient id="mugBodyGrad" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#f0ebe0"/>
                <stop offset="40%" stopColor="#fff8f0"/>
                <stop offset="100%" stopColor="#d4cfc4"/>
              </linearGradient>
              <linearGradient id="liquidFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#e8d5b7" stopOpacity={foamOpacity}/>
                <stop offset="18%" stopColor={liquidColor}/>
                <stop offset="100%" stopColor={liquidColor} stopOpacity="0.92"/>
              </linearGradient>
            </defs>

            {/* Steam lines — inside viewBox (y 10→50) */}
            {fill > 0.25 && (
              <>
                <path d="M58 50 Q55 38 58 26 Q61 14 58 6"
                  stroke="rgba(200,185,160,0.7)" strokeWidth="2" fill="none" strokeLinecap="round">
                  <animateTransform attributeName="transform" type="translate" values="0 0;-2 -6;0 0" dur="2s" repeatCount="indefinite"/>
                </path>
                <path d="M80 48 Q77 35 80 22 Q83 10 80 3"
                  stroke="rgba(200,185,160,0.65)" strokeWidth="2" fill="none" strokeLinecap="round">
                  <animateTransform attributeName="transform" type="translate" values="0 0;2 -8;0 0" dur="2.4s" repeatCount="indefinite"/>
                </path>
                <path d="M102 50 Q99 38 102 26 Q105 14 102 6"
                  stroke="rgba(200,185,160,0.55)" strokeWidth="2" fill="none" strokeLinecap="round">
                  <animateTransform attributeName="transform" type="translate" values="0 0;-1 -7;0 0" dur="2.8s" repeatCount="indefinite"/>
                </path>
              </>
            )}

            {/* Mug body */}
            <path
              d="M30 90 Q26 190 80 200 Q134 190 130 90 Z"
              fill="url(#mugBodyGrad)"
              stroke="#d4cfc4" strokeWidth="1.8"
            />

            {/* Coffee fill */}
            {fill > 0 && (
              <rect
                x="26" y={liquidY}
                width="108" height={liquidH + 15}
                fill="url(#liquidFill)"
                clipPath="url(#mugBodyClip)"
              />
            )}

            {/* Rim */}
            <ellipse cx="80" cy="90" rx="50" ry="12" fill="#f0ebe0" stroke="#d4cfc4" strokeWidth="2"/>
            <ellipse cx="80" cy="90" rx="43" ry="9" fill="#e8e3d8"/>

            {/* Handle */}
            <path
              d="M130 115 Q168 115 168 148 Q168 180 130 178"
              stroke="#d4cfc4" strokeWidth="14" fill="none" strokeLinecap="round"
            />
            <path
              d="M130 115 Q160 115 160 148 Q160 178 130 178"
              stroke="#f0ebe0" strokeWidth="8" fill="none" strokeLinecap="round"
            />

            {/* Little leaf decoration */}
            <text x="65" y="162" fontSize="18" fontFamily="serif" opacity="0.3">🌿</text>

            {/* % label */}
            {fill > 0.15 && (
              <text
                x="80" y={Math.max(liquidY + 22, 170)}
                textAnchor="middle"
                fontFamily="'Caveat',cursive"
                fontSize="13"
                fill="rgba(255,255,255,0.75)"
              >
                {Math.round(fill * 100)}%
              </text>
            )}

            {/* Saucer */}
            <ellipse cx="80" cy="206" rx="58" ry="10" fill="#e0dbd0" stroke="#d4cfc4" strokeWidth="1.5"/>
            <ellipse cx="80" cy="205" rx="48" ry="7" fill="#ebe6da"/>
          </svg>
        </div>

        {/* Controls */}
        <div className="fill-controls">
          <div className="fill-label">
            <span>{fill === 0 ? '🫗' : fill < 0.5 ? '😊' : fill < 1 ? '☕' : '🥰'}</span>
            {fill === 0 ? 'empty mug — click to pour!'
              : fill < 0.5 ? 'getting there...'
              : fill < 1 ? 'almost perfect!'
              : 'perfectly full ✦'}
          </div>
          <button className="pour-btn" onClick={handlePour} disabled={fill >= 1}>
            {fill >= 1 ? 'all filled up!' : 'pour ☕'}
          </button>
          {fill > 0 && (
            <button className="reset-btn" onClick={handleReset}>start over</button>
          )}
        </div>

        {/* Fun fact */}
        <div className="coffee-facts">
          <div className="coffee-fact-card">
            <p>{FACTS[factIdx].text}</p>
            <div className="fact-tag">{FACTS[factIdx].tag}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
