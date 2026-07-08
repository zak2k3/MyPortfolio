export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero-inner">
        <div className="hero-text">
          <p className="hero-badge">
            <span className="hero-badge-dot" aria-hidden="true" />
            Available for freelance work
          </p>
          <h1>I build AI-powered systems for service businesses</h1>
          <p className="hero-sub">
            Full-stack developer specializing in Laravel, React, and AI
            integrations — based in Tangier, Morocco.
          </p>
          <a className="btn btn-primary" href="#contact">
            Get in touch
          </a>
        </div>
        <div className="hero-photo">
          {/* PLACEHOLDER IMAGE: drop your real photo at public/profile.jpg
              (same filename) and it will appear here automatically. */}
          <img
            src="/profile.jpg"
            alt="Portrait of Zakariya Baaziz"
            width="280"
            height="280"
          />
        </div>
      </div>
    </section>
  )
}
