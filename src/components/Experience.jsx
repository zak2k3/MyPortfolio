export default function Experience() {
  return (
    <section id="experience" className="section section-alt">
      <div className="container">
        <h2>Experience</h2>
        <article className="entry-card">
          <header className="entry-header">
            <h3>Full Stack Developer Intern</h3>
            <p className="entry-org">Action Succes SARL</p>
          </header>
          <p>
            Built a full e-learning platform from scratch as part of my
            internship, covering the complete stack: Laravel 13 backend, React
            18 frontend, Docker for local development, MySQL for data, and
            Redis for caching and queued jobs.
          </p>
          <p className="entry-subhead">Key contributions:</p>
          <ul className="entry-list">
            <li>
              Designed and implemented authentication, course/lesson data
              models, and video streaming using Bunny.net CDN and Cloudflare R2
              for storage
            </li>
            <li>
              Integrated Brevo for transactional email and Payzone for payment
              processing
            </li>
            <li>Built certificate generation for course completion</li>
            <li>
              Worked through real production-level concerns across the full
              stack: environment configuration, data modeling, and debugging
            </li>
          </ul>
          <p className="entry-note">Supervised by Mariam Sebbr.</p>
        </article>
      </div>
    </section>
  )
}
