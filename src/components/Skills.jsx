import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Tailwind CSS', level: 50 },
      { name: 'BootStrap Css', level: 70 },
      { name: 'HTML5/CSS3', level: 95 },
      { name: 'JavaScript (ES6+)', level: 90 },
    ]
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Laravel', level: 60 },
      { name: 'PHP', level: 85 },
      { name: 'REST APIs', level: 30 },
      { name: 'MySQL', level: 85 },
    ]
  },
  {
    title: 'DevOps & Tools',
    skills: [
      { name: 'Docker', level: 60 },
      { name: 'Git', level: 90 },
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-slate-50 dark:bg-primary transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-dark mb-4">
            Technical Skills
          </h2>
          <p className="text-[#2563EB] dark:text-slate-400 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable web applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {category.title}
                </h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-[#2563EB] dark:text-slate-300">
                        {skill.name}
                      </span>
                      <span className="text-sm text-[#2563EB] dark:text-[#2563EB]">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 + (catIndex * 0.1) + (skillIndex * 0.05) }}
                        className="h-full bg-gradient-to-r from-accent to-blue-500 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;