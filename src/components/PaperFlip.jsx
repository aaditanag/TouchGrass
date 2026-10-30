import { useRef, useState, useEffect } from 'react';
import './PaperFlip.css';

const SKILLS = {
  Languages: ['C', 'C++', 'Java', 'Python', 'JavaScript (ES6+)', 'Kotlin'],
  Web: ['HTML5', 'CSS3', 'React.js', 'Vue.js', 'Tailwind CSS'],
  'Backend & DB': ['Node.js', 'Express.js', 'Flask', 'REST APIs', 'MongoDB', 'PostgreSQL', 'SQLite'],
  'AI / ML': ['YOLOv8', 'OpenCV', 'EasyOCR', 'PyTorch', 'TensorFlow'],
  Tools: ['Git', 'GitHub', 'Postman', 'VS Code', 'Vercel', 'Render', 'n8n'],
};

/* ── Letter (front) content ── */
function LetterFront({ onFlip }) {
  return (
    <div className="paper-front">
      <div className="letter-postmark">
        <span className="postmark-city">BLR · 2026</span>
        <span className="postmark-icon">✿</span>
      </div>
      <div className="paper-front-content">
        <div className="letter-header">
          <h2>✦ a letter from me</h2>
          <span className="letter-date">Sunday in the park</span>
        </div>
        <div className="letter-body">
          <p>Hello! I'm <strong>Aadita</strong> — a computer science student, designer, and developer who truly believes that the best ideas happen on lazy Sunday picnics.</p>
          <p>Currently pursuing my <strong>B.E. in CSE at SVIT Bengaluru</strong> (9.4 CGPA) and <strong>B.S. in Data Science at IIT Madras</strong> (8.0 CGPA).</p>
          <p>I love blending engineering with visual art — whether it's training YOLOv8 models for computer vision, designing brand identities and logos at <strong>Sadhvik AIR</strong>, or crafting interactive web experiences.</p>
          <p>When I'm not shipping products, you'll find me sketching, stamping letters to friends abroad, or napping with a book on a picnic carpet — exactly like this.</p>
        </div>
        <div className="flip-hint">
          <span className="flip-hint-badge" onClick={onFlip}>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M2 8 Q8 2 14 8 Q8 14 2 8Z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
              <path d="M10 5 L14 8 L10 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            click to flip & view resume →
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Resume (back) content ── */
function ResumeBack({ onFlip }) {
  return (
    <div className="paper-back">
      <div className="resume-header">
        <h1>Aadita Nag</h1>
        <p>Full-Stack Developer · UI/UX Designer · AI/ML Enthusiast</p>
        <div className="links">
          <a href="mailto:aaditanag@gmail.com">aaditanag@gmail.com</a>
          <a href="tel:+916901578022">+91 6901578022</a>
          <a href="https://github.com/aaditanag" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/aadita-nag-a49bb1278/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>

      <div className="resume-section">
        <h3>Education</h3>
        <div className="edu-tags">
          <span className="edu-tag">B.E. CSE · SVIT Bengaluru · CGPA 9.4 · '27</span>
          <span className="edu-tag">B.S. Data Science · IIT Madras · CGPA 8.0 · '27</span>
          <span className="edu-tag">XII CBSE · Don Bosco · 92% · '21</span>
          <span className="edu-tag">X CBSE · St. Mary's · 96% · '19</span>
        </div>
      </div>

      <div className="resume-section">
        <h3>Technical Skills</h3>
        {Object.entries(SKILLS).map(([cat, list]) => (
          <div key={cat} style={{ marginBottom: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--font-hand)', fontSize: '0.85rem', color: 'var(--ink-mid)', fontStyle: 'italic' }}>{cat}: </span>
            <div className="skills-list" style={{ display: 'inline-flex' }}>
              {list.map(s => <span className="skill-pill" key={s}>{s}</span>)}
            </div>
          </div>
        ))}
      </div>

      <div className="resume-section">
        <h3>Experience</h3>
        <div className="resume-entry">
          <div className="title-row">
            <span className="role">Frontend & UI/UX Developer</span>
            <span className="date">Oct '26 – Present</span>
          </div>
          <div className="org">Sadhvik AIR · Remote</div>
          <ul><li>Design and develop UI/UX for products; build brand identities including logos and visual systems.</li></ul>
        </div>
        <div className="resume-entry">
          <div className="title-row">
            <span className="role">Software Engineer Intern</span>
            <span className="date">Jan '26 – Aug '26</span>
          </div>
          <div className="org">Sthavishtah (VTU-registered startup)</div>
          <ul>
            <li>End-to-end development of company website across 2 projects: Intelligent Health Record & Cybersecurity Platform + Raspberry Pi hardware system.</li>
            <li>Developed AI Yoga Pose Analyser — 96% accuracy.</li>
            <li>Supported programs reaching ~200 participants per event.</li>
          </ul>
        </div>
      </div>

      <div className="resume-section">
        <h3>Leadership</h3>
        <div className="resume-entry">
          <div className="title-row">
            <span className="role">Super-Coordinator, Central Events (Paradox)</span>
            <span className="date">Jan '26 – Jul '26</span>
          </div>
          <div className="org">IIT Madras</div>
          <ul><li>Led campus-wide ambience planning for Paradox Fest 2026, directing a 25-person team.</li></ul>
        </div>
        <div className="resume-entry">
          <div className="title-row">
            <span className="role">Web Admin, Pichavaram House</span>
            <span className="date">Aug '25 – Aug '26</span>
          </div>
          <div className="org">IIT Madras</div>
          <ul><li>Head WebOps Group; oversee 5 subdivisions and all live websites.</li></ul>
        </div>
        <div className="resume-entry">
          <div className="title-row">
            <span className="role">Treasurer, Coding Club</span>
            <span className="date">Feb '26 – Present</span>
          </div>
          <div className="org">SVIT, Bangalore</div>
          <ul><li>Hosted HackerRank coding contests with 200+ participants.</li></ul>
        </div>
      </div>

      <div className="resume-section">
        <h3>Achievements</h3>
        <ul style={{ paddingLeft: '1rem' }}>
          <li style={{ fontSize: '0.82rem', lineHeight: '1.7', color: 'var(--ink-mid)' }}>GO-BRICS International Hackathon Semi-finalist — Top 69 of 12,000+ teams</li>
          <li style={{ fontSize: '0.82rem', lineHeight: '1.7', color: 'var(--ink-mid)' }}>3× Hackathon Winner · 1st Place Mini Project Exhibition · 2nd Place Web Craft Design</li>
          <li style={{ fontSize: '0.82rem', lineHeight: '1.7', color: 'var(--ink-mid)' }}>IIT Madras: 2nd Place Settlement Design Challenge 3.0 · 3rd Place 2.0 · 2nd Place Twist and Turn</li>
        </ul>
      </div>

      <div className="resume-bottom-actions">
        <button className="flip-back-btn" onClick={onFlip}>← flip back to letter</button>
      </div>
    </div>
  );
}

/* ── Main component ── */
export default function PaperFlip({ forwardRef }) {
  const [flipped, setFlipped] = useState(false);
  const [scale, setScale]     = useState(0.7);
  const [isMobile, setIsMobile] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const mobile = window.innerWidth <= 600;
    setIsMobile(mobile);
    if (mobile) { setScale(1); return; }

    const onScroll = () => {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const vh   = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.6)));
      setScale(0.7 + progress * 0.3);
      if (progress > 0.95 && !flipped) setFlipped(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [flipped]);

  const toggle = () => setFlipped(f => !f);

  /* ── MOBILE: flat tab layout, no 3D, natural height ── */
  if (isMobile) {
    return (
      <section className="paper-section" id="about" ref={forwardRef}>
        {/* Tab switcher */}
        <div className="mobile-paper-wrap">
          <div className="mobile-tab-bar">
            <button
              className={`mobile-tab ${!flipped ? 'active' : ''}`}
              onClick={() => setFlipped(false)}
            >✦ letter</button>
            <button
              className={`mobile-tab ${flipped ? 'active' : ''}`}
              onClick={() => setFlipped(true)}
            >📄 resume</button>
          </div>

          <div className="mobile-paper-content">
            {!flipped ? <LetterFront onFlip={toggle} /> : <ResumeBack onFlip={toggle} />}
          </div>

          {flipped && (
            <div className="download-outside-wrap">
              <a
                className="download-resume-btn"
                href="/Aadita_Nag_Resume.docx (5).pdf"
                download="Aadita_Nag_Resume.pdf"
              >⬇ download official resume</a>
            </div>
          )}
        </div>
      </section>
    );
  }

  /* ── DESKTOP: original 3D flip card ── */
  return (
    <section className="paper-section" id="about" ref={forwardRef}>
      <div className="paper-zoom-wrapper" ref={wrapRef} style={{ '--paper-scale': scale }}>
        <div className="paper-scene">
          <div
            className={`paper-card ${flipped ? 'flipped' : ''}`}
            onClick={toggle}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && toggle()}
            aria-label={flipped ? 'Click to see intro letter' : 'Click to read resume'}
          >
            <LetterFront onFlip={toggle} />
            <ResumeBack  onFlip={toggle} />
          </div>
        </div>

        {flipped && (
          <div className="download-outside-wrap">
            <a
              className="download-resume-btn"
              href="/Aadita_Nag_Resume.docx (5).pdf"
              download="Aadita_Nag_Resume.pdf"
            >⬇ download official resume</a>
          </div>
        )}
      </div>
    </section>
  );
}

