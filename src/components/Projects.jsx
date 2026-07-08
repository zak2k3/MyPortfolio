const projects = [
  {
    title: 'LeadHandler',
    description:
      "An AI system that answers customer inquiries instantly using a business's real data — pricing, hours, policies — instead of generic replies. Built with Laravel, React, and Groq's LLM API.",
    tags: ['Laravel', 'React', 'MySQL', 'Redis', 'Groq API'],
    link: 'https://leadhandler-frontend.vercel.app',
  },
  {
    title: 'TradesJournal',
    description:
      'A trading journal for traders who take their process seriously — P&L tracking, R:R calculators, equity curves, built with an editorial design system.',
    // NOTE: Zak to confirm the actual backend stack (Node/Express assumed).
    tags: ['React', 'Node/Express', 'Tailwind CSS'],
    link: 'https://tradesjournal.pro',
  },
  {
    title: 'Vouch',
    description:
      'A testimonial collection SaaS that makes it simple for businesses to gather and showcase real customer feedback.',
    tags: ['Laravel', 'React', 'MySQL', 'Paddle'],
    link: 'https://vouch-so.vercel.app',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section section-alt">
      <div className="container">
        <h2>Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.title} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <ul className="tag-list" aria-label={`Technologies used in ${project.title}`}>
                {project.tags.map((tag) => (
                  <li key={tag} className="tag">
                    {tag}
                  </li>
                ))}
              </ul>
              <a
                className="project-link"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                View live
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17L17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
