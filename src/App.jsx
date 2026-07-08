import LeadJourney from './components/LeadJourney.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Stack from './components/Stack.jsx'
import Experience from './components/Experience.jsx'
import Education from './components/Education.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  return (
    <>
      <LeadJourney />
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Stack />
        <Experience />
        <Education />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container">
          <p>© 2026 Zakariya Baaziz — Tangier, Morocco</p>
        </div>
      </footer>
    </>
  )
}
