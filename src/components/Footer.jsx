import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-primary border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#FFD60A]">Zakariya B.</span>
            <span className="text-[#2563EB] dark:text-slate-400">
              © {currentYear} Zakariya Baaziz. All rights reserved.
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/zak2k3"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-[#2563EB] dark:text-slate-400 hover:bg-[#FFD60A] hover:text-white transition-all shadow-sm"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/zakariya-baaziz-769b77390/"
              target='_blank'
              className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-[#2563EB] dark:text-slate-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="mailto:zakariya@example.com"
              className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-[#2563EB] dark:text-slate-400 hover:bg-[#FFD60A] hover:text-white transition-all shadow-sm"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;