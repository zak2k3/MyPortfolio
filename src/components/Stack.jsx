const groups = [
  { title: 'Backend', items: ['Laravel', 'PHP', 'MySQL', 'Redis', 'Sanctum'] },
  { title: 'Frontend', items: ['React', 'Tailwind CSS', 'Vite', 'shadcn/ui'] },
  { title: 'Infra', items: ['Docker', 'Heroku', 'Vercel', 'Render'] },
  {
    title: 'AI',
    items: ['Groq API', 'LLM Integration', 'Generative AI for Web Development'],
  },
]

export default function Stack() {
  return (
    <section id="stack" className="section">
      <div className="container">
        <h2>Stack</h2>
        <div className="stack-grid">
          {groups.map((group) => (
            <div key={group.title} className="stack-group">
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
