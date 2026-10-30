import { useEffect, useRef, useState } from 'react';
import './StampsSection.css';

const PROJECTS = [
  {
    title: 'AI Traffic Violation Detector',
    country: 'Computer Vision',
    desc: 'YOLOv8 + OpenCV pipeline detecting helmet violations, triple riding & red-light offences. EasyOCR plate recognition + automated e-challan via Flask & MongoDB.',
    tags: ['YOLOv8', 'OpenCV', 'EasyOCR', 'Flask', 'React', 'MongoDB', 'Twilio'],
    link: 'https://github.com/aaditanag/AI-Traffic-Violation-Detection-with-Echallan-system',
    value: '₹ 96',
    rotate: '-2deg',
    delay: '0s',
    emoji: '🚦',
    color: '#fce4ec',
  },
  {
    title: 'Smart Helmet Airbag System',
    country: 'Edge AI + Hardware',
    desc: 'Real-time crash detection with IMU telemetry on Raspberry Pi. Three.js 3D cockpit sim + WebSocket sensor streaming. Automated Pytest safety suites.',
    tags: ['Raspberry Pi', 'PyTorch', 'Three.js', 'WebSocket', 'Pytest'],
    link: 'https://github.com/aaditanag',
    value: '₹ 42',
    rotate: '1.5deg',
    delay: '0.1s',
    emoji: '🪖',
    color: '#e8f5e9',
  },
  {
    title: 'Faraday — Blind Flange',
    country: 'Air-Gapped AI · SIH 2026',
    desc: 'Sovereign agentic AI workbench for industrial PSUs. Open-weight models on local GPU — nothing leaves the machine, and it proves that on screen. Licence gate, outbound seal & smart request router. SIH26117 · MRPL.',
    tags: ['Node.js', 'Local LLM', 'AI Governance', 'Security', 'pnpm'],
    link: 'https://github.com/aaditanag/Faraday',
    value: '₹ SIH',
    rotate: '-1deg',
    delay: '0.2s',
    emoji: '🔒',
    color: '#fff3e0',
  },
  {
    title: 'Civic Connect',
    country: 'Social Impact / Web',
    desc: 'A civic engagement platform connecting citizens with local governance. Report issues, track resolutions, and participate in community-driven initiatives.',
    tags: ['React', 'Node.js', 'MongoDB', 'REST API', 'Tailwind'],
    link: 'https://github.com/aaditanag/Civic-Connect',
    value: '₹ 28',
    rotate: '2deg',
    delay: '0.3s',
    emoji: '🏛️',
    color: '#f3e5f5',
  },
];

function StampSVG({ emoji, color }) {
  return (
    <svg viewBox="0 0 180 110" width="100%" height="110" aria-hidden="true">
      <rect width="180" height="110" fill={color} rx="4"/>
      {/* Decorative border */}
      <rect x="6" y="6" width="168" height="98" fill="none" stroke={color === '#fce4ec' ? '#e57373' : '#81c784'} strokeWidth="1.5" strokeDasharray="4 3" rx="2" opacity="0.6"/>
      {/* Center emoji label */}
      <text x="90" y="58" textAnchor="middle" fontSize="38" fontFamily="serif">{emoji}</text>
      {/* Corner flora */}
      <text x="14" y="26" fontSize="12" opacity="0.4">✿</text>
      <text x="158" y="26" fontSize="12" opacity="0.4">✿</text>
      <text x="14" y="104" fontSize="12" opacity="0.4">✿</text>
      <text x="158" y="104" fontSize="12" opacity="0.4">✿</text>
    </svg>
  );
}

export default function StampsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="stamps-section" id="projects" ref={ref}>
      <div className="stamps-header">
        <h2>postcards from my work</h2>
        <p>every project is a letter I sent to the world ✉</p>
      </div>

      <div className="stamps-grid">
        {PROJECTS.map((proj) => (
          <div
            key={proj.title}
            className="stamp"
            style={{
              '--rotate': proj.rotate,
              '--delay': visible ? proj.delay : '99s',
              opacity: visible ? 1 : 0,
            }}
          >
            <div className="stamp-inner">
              <div className="postmark">
                <span>AADITA<br/>NAG<br/>2026</span>
              </div>

              <div className="stamp-image">
                <StampSVG emoji={proj.emoji} color={proj.color} />
              </div>

              <div className="stamp-country">{proj.country}</div>
              <div className="stamp-title">{proj.title}</div>
              <div className="stamp-desc">{proj.desc}</div>

              <div className="stamp-tags">
                {proj.tags.map(t => <span className="stamp-tag" key={t}>{t}</span>)}
              </div>

              <a className="stamp-link" href={proj.link} target="_blank" rel="noreferrer">
                view project →
              </a>

              <div className="stamp-value">{proj.value}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

