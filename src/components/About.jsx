import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              About Me
            </h2>
            <div className="w-20 h-1 bg-[#FFD60A] rounded-full mb-8"></div>
            
            <p className="text-[#2563EB] dark:text-slate-400 text-lg leading-relaxed mb-6">
              I'm <strong className="text-slate-900 dark:text-white">Zakariya Baaziz</strong>, a Web Full Stack Developer with a passion for building scalable, 
              high-performance web applications. My expertise lies in the <strong className="text-[#FFD60A]">Laravel</strong> ecosystem 
              for robust backend architecture and <strong className="text-[#FFD60A]">React</strong> for creating intuitive user interfaces.
            </p>
            
            <p className="text-[#2563EB] dark:text-slate-400 text-lg leading-relaxed mb-6">
              I approach development with a systems-thinking mindset, focusing on clean code, 
              database optimization, and scalable architecture. My goal is to deliver solutions 
              that not only work flawlessly but are also maintainable and extensible.
            </p>
            
            <p className="text-[#2563EB] dark:text-slate-400 text-lg leading-relaxed">
              Beyond coding, I have a strong interest in financial markets and technical analysis, 
              which has influenced my approach to data-driven decision making in software development.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;