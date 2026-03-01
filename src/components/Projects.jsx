import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Trades Journal',
    description: 'A full-stack trading journal for traders to track and analyze trade performance with structured logging and statistics. Features include trade logging, performance analytics.',
    tech: ['React', 'Laravel', 'MySQL', 'Docker', 'Tailwind CSS'],
    github: 'https://github.com/zak2k3/trade-journal-app',
    live: '#',
    status: 'Available on GitHub',
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    title: 'AI Text Summarizer',
    description: 'A lightweight web tool leveraging the Hugging Face API to provide instant AI-powered text summarization. Simple interface for quick content summarization.',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Hugging Face API'],
    github: '#',
    live: '#',
    status: 'Maintenance',
    gradient: 'from-blue-500 to-indigo-500'
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-[#2563EB] dark:text-slate-400 max-w-2xl mx-auto">
            Real-world applications demonstrating full-stack development capabilities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-[#FFD60A]/50 transition-all duration-300"
            >
              {/* Project Header */}
              <div className={`h-48 bg-gradient-to-br ${project.gradient} p-8 flex items-end`}>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-sm font-medium">
                  {project.status}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-[#2563EB] dark:text-slate-400 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-slate-200 dark:bg-slate-700 text-[#2563EB] dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex items-center gap-4">
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#2563EB] dark:text-slate-300 hover:text-[#FFD60A] transition-colors"
                  >
                    <Github size={20} />
                    <span className="text-sm font-medium">Code</span>
                  </a>
                  <a 
                    href={project.live}
                    className="flex items-center gap-2 text-[#2563EB] dark:text-slate-300 hover:text-[#FFD60A] transition-colors"
                  >
                    <ExternalLink size={20} />
                    <span className="text-sm font-medium">Live Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;