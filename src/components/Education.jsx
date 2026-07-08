export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <h2>Education</h2>
        <article className="entry-card">
          <header className="entry-header">
            <h3>
              Cité des Métiers et des Compétences Tangier — Web Full Stack
              Development (Bac+2)
            </h3>
            <p className="entry-org">Completed June 2026</p>
          </header>
          <p className="entry-subhead">Key modules:</p>
          <ul className="tag-list" aria-label="Key modules">
            {[
              'Object-Oriented Programming',
              'Dynamic Websites Development',
              'Database Management',
              'Frontend Development',
              'Backend Development',
              'Agile Approach',
              'Cloud-Native Application Development',
              'Capstone Project',
            ].map((module) => (
              <li key={module} className="tag">
                {module}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}
