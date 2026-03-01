import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code, TrendingUp } from 'lucide-react';

const experiences = [
  {
    icon: <Code size={24} />,
    title: 'Self-Driven Development',
    description: 'Building real-world applications using modern frameworks and best practices. Focus on clean architecture, test-driven development, and continuous integration.',
    points: [
      'Full-stack project development from concept to deployment',
      'Database design and optimization with MySQL and MongoDb',
      'Docker containerization for consistent environments'
    ]
  },
  {
    icon: <TrendingUp size={24} />,
    title: 'Finance & Technical Analysis',
    description: 'Applying analytical skills from financial markets to software development. Understanding data patterns, risk management, and systematic approaches.',
    points: [
      'Data-driven decision making',
      'Performance metrics and analysis',
      'Systematic approach to problem solving',
      'Understanding market dynamics and trends'
    ]
  },
  {
    icon: <BookOpen size={24} />,
    title: 'Continuous Learning',
    description: 'Staying current with modern web technologies and best practices through documentation, courses, and hands-on experimentation.',
    points: [
      'Backend architecture and system design',
      'Modern frontend frameworks and patterns',
      'Performance optimization techniques',
      'Security best practices'
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-slate-50 dark:bg-primary transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-dark mb-4">
            Experience & Learning
          </h2>
          <p className="text-[#2563EB] dark:text-slate-400 max-w-2xl mx-auto">
            My journey in software development and continuous growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-700"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FFD60A]/20 flex items-center justify-center text-[#FFD60A] mb-6">
                {exp.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                {exp.title}
              </h3>
              
              <p className="text-[#2563EB] dark:text-slate-400 mb-6 leading-relaxed">
                {exp.description}
              </p>
              
              <ul className="space-y-3">
                {exp.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#2563EB] dark:text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFD60A] mt-2 flex-shrink-0"></span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;