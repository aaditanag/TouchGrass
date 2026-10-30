import { useEffect, useRef, useState, useCallback } from 'react';
import './Hero.css';
import CarpetScene from './CarpetScene';

/* ── Draggable Cloud ── */
function DraggableCloud({ className, label }) {
  const elRef      = useRef(null);
  const drag       = useRef({ active: false, startX: 0, startY: 0, ox: 0, oy: 0 });
  const [offset, setOffset]   = useState({ x: 0, y: 0 });
  const [grabbed, setGrabbed] = useState(false);

  /* shared move handler */
  const onMove = useCallback((cx, cy) => {
    if (!drag.current.active) return;
    const dx = cx - drag.current.startX;
    const dy = cy - drag.current.startY;
    setOffset({ x: drag.current.ox + dx, y: drag.current.oy + dy });
  }, []);

  /* release — snap back */
  const onUp = useCallback(() => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setGrabbed(false);
    // drift back to 0,0
    setOffset({ x: 0, y: 0 });
  }, []);

  /* Mouse */
  const onMouseDown = (e) => {
    e.preventDefault();
    drag.current = { active: true, startX: e.clientX, startY: e.clientY, ox: offset.x, oy: offset.y };
    setGrabbed(true);
  };
  useEffect(() => {
    const mm = (e) => onMove(e.clientX, e.clientY);
    const mu = () => onUp();
    window.addEventListener('mousemove', mm);
    window.addEventListener('mouseup', mu);
    return () => { window.removeEventListener('mousemove', mm); window.removeEventListener('mouseup', mu); };
  }, [onMove, onUp]);

  /* Touch */
  const onTouchStart = (e) => {
    const t = e.touches[0];
    drag.current = { active: true, startX: t.clientX, startY: t.clientY, ox: offset.x, oy: offset.y };
    setGrabbed(true);
  };
  useEffect(() => {
    const tm = (e) => { const t = e.touches[0]; onMove(t.clientX, t.clientY); };
    const tu = () => onUp();
    window.addEventListener('touchmove', tm, { passive: true });
    window.addEventListener('touchend', tu);
    return () => { window.removeEventListener('touchmove', tm); window.removeEventListener('touchend', tu); };
  }, [onMove, onUp]);

  return (
    <div
      ref={elRef}
      className={`cloud ${className} ${grabbed ? 'cloud-grabbed' : 'cloud-released'}`}
      aria-label={label || 'draggable cloud'}
      role="img"
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px) scale(${grabbed ? 1.18 : 1})`,
        cursor: grabbed ? 'grabbing' : 'grab',
        userSelect: 'none',
        touchAction: 'none',
      }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    />
  );
}

/* ── Reliable useRef-based typewriter ── */
const WORDS = ['Aadita', 'happy.'];

function useTypewriter() {
  const [{ text, done }, setState] = useState({ text: '', done: false });
  const r = useRef({ wordIdx: 0, charIdx: 0, phase: 'typing', text: '' });

  useEffect(() => {
    let timer;
    const tick = () => {
      const s = r.current;
      const word = WORDS[s.wordIdx];

      if (s.phase === 'typing') {
        if (s.charIdx < word.length) {
          s.charIdx++;
          s.text = word.slice(0, s.charIdx);
          setState({ text: s.text, done: false });
          timer = setTimeout(tick, 115);
        } else if (s.wordIdx < WORDS.length - 1) {
          // Finished first word — pause then erase
          timer = setTimeout(() => { s.phase = 'erasing'; tick(); }, 1700);
        } else {
          // Last word — stay forever
          setState({ text: s.text, done: true });
        }
      } else if (s.phase === 'erasing') {
        if (s.text.length > 0) {
          s.text = s.text.slice(0, -1);
          setState({ text: s.text, done: false });
          timer = setTimeout(tick, 65);
        } else {
          s.wordIdx = (s.wordIdx + 1) % WORDS.length;
          s.charIdx = 0;
          s.phase = 'typing';
          timer = setTimeout(tick, 380);
        }
      }
    };

    timer = setTimeout(tick, 600); // initial delay
    return () => clearTimeout(timer);
  }, []); // runs once only

  return { display: text, isDone: done };
}

export default function Hero({ onPaperClick, onCoffeeClick, onBouquetClick }) {
  const [loaded, setLoaded] = useState(false);
  const { display, isDone } = useTypewriter();
  const carpetWrapRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // On mobile: auto-scroll the carpet to centre on mount
  useEffect(() => {
    const el = carpetWrapRef.current;
    if (!el) return;
    const isMobile = window.innerWidth <= 600;
    if (!isMobile) return;
    // SVG is 1100px wide — scroll to centre
    const scrollTo = (1100 - window.innerWidth) / 2;
    el.scrollLeft = scrollTo;
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-sky" />
      <DraggableCloud className="cloud-1" label="cloud one" />
      <DraggableCloud className="cloud-2" label="cloud two" />
      <DraggableCloud className="cloud-3" label="cloud three" />

      <svg className="birds" viewBox="0 0 80 30" aria-hidden="true">
        <path d="M5 18 Q12 10 20 18" stroke="#2c1810" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M25 14 Q33 6 41 14" stroke="#2c1810" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M50 20 Q57 13 64 20" stroke="#2c1810" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
        <path d="M10 8 Q17 1 24 8" stroke="#2c1810" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      </svg>

      <nav className="hero-nav">
        <a href="#about">about</a>
        <a href="#projects">projects</a>
        <a href="#color">colour</a>
        <a href="#contact">say hi</a>
      </nav>

      {/* Tagline — floated in the SKY portion */}
      <div className={`hero-tagline ${loaded ? 'loaded' : ''}`}>
        <h1 className="hero-title">
          I am <span className="typing-word">{display}</span>
          {!isDone && <span className="cursor" aria-hidden="true" />}
        </h1>
        <p className="hero-subtitle">designer · developer · dreamer</p>
        {/* Previous portfolio easter egg */}
        <a
          className="portfolio-peek"
          href="https://aadita-portfolio.vercel.app/"
          target="_blank"
          rel="noreferrer"
          title="my among us themed portfolio ✦"
        >
          👾 also check out my other world →
        </a>
      </div>

      <div className="hero-ground" />

      {/* Trees */}
      <svg className="tree-group left" viewBox="0 0 160 260" aria-hidden="true">
        <rect x="62" y="160" width="18" height="100" fill="#6b3a2a"/>
        <ellipse cx="71" cy="120" rx="54" ry="70" fill="#3d7a4e"/>
        <ellipse cx="71" cy="100" rx="42" ry="55" fill="#4a9060"/>
        <ellipse cx="71" cy="85" rx="30" ry="40" fill="#5aaa72"/>
        <ellipse cx="130" cy="220" rx="28" ry="22" fill="#4a7c59"/>
        <ellipse cx="130" cy="208" rx="20" ry="16" fill="#5a9e6f"/>
        <circle cx="90" cy="193" r="4" fill="#f9e4b7"/>
        <circle cx="90" cy="193" r="2" fill="#f0a500"/>
        <circle cx="50" cy="210" r="3.5" fill="#ffd6d6"/>
        <circle cx="50" cy="210" r="1.8" fill="#e8524a"/>
      </svg>
      <svg className="tree-group right" viewBox="0 0 160 260" aria-hidden="true">
        <rect x="80" y="160" width="18" height="100" fill="#6b3a2a"/>
        <ellipse cx="89" cy="120" rx="54" ry="70" fill="#3d7a4e"/>
        <ellipse cx="89" cy="100" rx="42" ry="55" fill="#4a9060"/>
        <ellipse cx="89" cy="85" rx="30" ry="40" fill="#5aaa72"/>
        <ellipse cx="28" cy="220" rx="28" ry="22" fill="#4a7c59"/>
        <ellipse cx="28" cy="208" rx="20" ry="16" fill="#5a9e6f"/>
        <circle cx="115" cy="193" r="4" fill="#f9e4b7"/>
        <circle cx="115" cy="193" r="2" fill="#f0a500"/>
        <circle cx="140" cy="215" r="3.5" fill="#c8e6c9"/>
        <circle cx="140" cy="215" r="1.8" fill="#66bb6a"/>
      </svg>

      {/* Carpet — on mobile this becomes a horizontal pan zone */}
      <div className="carpet-wrapper" ref={carpetWrapRef}>
        <CarpetScene
          onPaperClick={onPaperClick}
          onCoffeeClick={onCoffeeClick}
          onBouquetClick={onBouquetClick}
        />
        {/* Swipe hint — only visible on mobile via CSS */}
        <div className="carpet-swipe-hint" aria-hidden="true">
          <span>← swipe to explore →</span>
        </div>
      </div>

      <div className="scroll-hint">
        <span>scroll down</span>
        <svg width="16" height="16" viewBox="0 0 18 18">
          <path d="M9 3 L9 15 M5 11 L9 15 L13 11" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
}
