import './Contact.css';

export default function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-card">
        <h2>say hello ✉</h2>
        <p>
          I'm always up for a good conversation, a collab, or just sharing
          coffee recommendations. Find me here:
        </p>

        <div className="contact-links">
          <a className="contact-link email" href="mailto:aaditanag@gmail.com">
            ✉ aaditanag@gmail.com
          </a>
          <a className="contact-link" href="https://github.com/aaditanag" target="_blank" rel="noreferrer">
            ⌥ GitHub
          </a>
          <a className="contact-link" href="https://www.linkedin.com/in/aadita-nag-a49bb1278/" target="_blank" rel="noreferrer">
            ✦ LinkedIn
          </a>
          <a className="contact-link" href="tel:+916901578022">
            ☎ +91 69015 78022
          </a>
        </div>
      </div>

      <footer className="footer">
        <svg className="footer-icon" width="40" height="16" viewBox="0 0 40 16" aria-hidden="true">
          <rect x="0" y="2" width="40" height="12" rx="2" fill="#e8c99a"/>
          <rect x="0" y="2" width="40" height="12" rx="2" fill="none" stroke="#8b6914" strokeWidth="1"/>
        </svg>
        <p>made with love & too much coffee · 2026</p>
        <p>designer · developer · dreamer</p>
      </footer>
    </section>
  );
}
