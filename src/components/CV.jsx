import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Download, Calendar, Globe, ExternalLink } from 'lucide-react';
import { translations } from '../data/cvTranslations';

const CV = () => {
  const [language, setLanguage] = useState('en');
  
  const t = translations[language];
  
  // Handle RTL for Arabic
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const handlePrint = () => {
    window.print();
  };

  const languages = [
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'fr', label: 'FR', name: 'Français' },
    { code: 'ar', label: 'AR', name: 'العربية' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Print Button & Language Switcher - Hidden when printing */}
      <div className="fixed top-7 right-6 z-50 flex flex-col gap-2 print:hidden">
        {/* Language Switcher */}
        <div className="bg-slate-800 rounded-lg p-1 flex gap-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                language === lang.code
                  ? 'bg-accent text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
        
        {/* Download Button */}
        <button
          onClick={handlePrint}
          className="bg-accent text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-accentHover transition-colors shadow-lg"
        >
          <Download size={18} />
          {t.downloadPdf}
        </button>
      </div>

      <div 
        className="max-w-4xl mx-auto p-8 print:p-0" 
        id="cv-content"
        style={{ fontFamily: language === 'ar' ? 'Tahoma, Arial, sans-serif' : 'inherit' }}
      >
        {/* Header */}
        <header className="border-b-2 border-accent pb-6 mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Zakariya Baaziz</h1>
          <p className="text-xl text-accent font-medium mb-4">{t.jobTitle}</p>
          
          <div className="flex flex-col flex-wrap gap-3 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <Mail size={16} />
              zakarriyabaaziz2k3@gmail.com
            </span>
            <span className="flex items-center gap-2">
              <Phone size={16} />
              +212 625913711
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={16} />
              {language === 'ar' ? 'طنجة، المغرب' : language === 'fr' ? 'Tanger, Maroc' : 'Tangier, Morocco'}
            </span>
            <span className="flex items-center gap-2">
              <Github size={16} />
              github.com/zak2k3
            </span>
            <span className='flex items-center gap-2'>
              <Linkedin size={16} />
              linkedin.com/in/zakariya-baaziz-769b77390/
            </span>
          </div>
        </header>

        {/* Professional Summary */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
            {t.summary}
          </h2>
          <p className="text-slate-700 leading-relaxed text-justify">
            {t.summaryText}
          </p>
        </section>

        {/* Education */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
            {t.education}
          </h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-slate-900">{t.degree}</h3>
                  <p className="text-slate-600 text-sm">{t.school}</p>
                </div>
                <span className="text-sm text-slate-500 flex items-center gap-1">
                  <Calendar size={14} />
                  {t.period}
                </span>
              </div>
              <ul className="text-slate-700 text-sm space-y-2 ml-4">
                <li>• {t.learnDev}</li>
                <li>• {t.database}</li>
                <li>• {t.ui}</li>
                <li>• {t.docker}</li>
                <li>• {t.bestPractices}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
            {t.projects}
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900">Trades Journal</h3>
              <p className="text-slate-700 text-sm mb-2">
                {t.projectDesc1}
              </p>
              <p className="text-slate-500 text-xs">
                <span className="font-medium">{t.projectTech1}</span>
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">AI Text Summarizer</h3>
              <p className="text-slate-700 text-sm mb-2">
                {t.projectDesc2}
              </p>
              <p className="text-slate-500 text-xs">
                <span className="font-medium">{t.projectTech2}</span>
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">Portfolio Website</h3>
              <p className="text-slate-700 text-sm mb-2">
                {t.projectDesc3}
              </p>
              <p className="text-slate-500 text-xs">
                <span className="font-medium">{t.projectTech3}</span>
              </p>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
            {t.skills}
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">{t.frontend}</h3>
              <ul className="text-slate-700 text-sm space-y-1">
                <li>• React</li>
                <li>• Tailwind CSS</li>
                <li>• HTML5 / CSS3</li>
                <li>• JavaScript (ES6+)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">{t.backend}</h3>
              <ul className="text-slate-700 text-sm space-y-1">
                <li>• Laravel</li>
                <li>• PHP</li>
                <li>• MySQL</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">{t.devops}</h3>
              <ul className="text-slate-700 text-sm space-y-1">
                <li>• Docker</li>
                <li>• Git</li>
                <li>• Vercel</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Languages */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
            {t.languages}
          </h2>
          <div className="flex gap-6 text-sm">
            <span className="text-slate-700">
              {language === 'ar' ? 'العربية' : language === 'fr' ? 'Arabe' : 'Arabic'}: <span className="font-semibold">{t.native}</span>
            </span>
            <span className="text-slate-700">
              English: <span className="font-semibold">C1</span>
            </span>
            <span className="text-slate-700">
              Français: <span className="font-semibold">A2</span>
            </span>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-xs text-slate-500 pt-4 border-t border-slate-200">
          <p>{t.lastUpdated}: {new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : language === 'fr' ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long' })}</p>
          <p className="flex items-center justify-center gap-1 mt-1">
            <Globe size={12} />
            zakariya-baaziz.vercel.app
          </p>
        </footer>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body { 
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact;
          }
          .print\\:hidden { 
            display: none !important; 
          }
          .print\\:p-0 { 
            padding: 0 !important; 
          }
        }
        [dir="rtl"] .ml-4 {
          margin-left: 0;
          margin-right: 1rem;
        }
      `}</style>
    </div>
  );
};

export default CV;