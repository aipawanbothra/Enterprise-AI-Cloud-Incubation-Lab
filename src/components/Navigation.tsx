
import { Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePersona } from '../context/PersonaContext';
import type { Persona } from '../data/programData';
import { useTheme } from 'next-themes';

interface PersonaOption {
  id: Persona;
  label: string;
  icon: string;
  activeBg: string;
  glow: string;
}

const PERSONA_OPTIONS: PersonaOption[] = [
  {
    id: 'student',
    label: 'For Students',
    icon: '⚡',
    activeBg: 'bg-[#38BDF8]',
    glow: 'shadow-[0_0_15px_rgba(56,189,248,0.35)]',
  },
  {
    id: 'professor',
    label: 'For Institutions',
    icon: '🎓',
    activeBg: 'bg-[#10B981]',
    glow: 'shadow-[0_0_15px_rgba(16,185,129,0.35)]',
  },
];

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className = '' }: NavigationProps) {
  const { persona, setPersona } = usePersona();
  const { theme, setTheme } = useTheme();

  const handleBrandClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-md bg-[#070B19]/80 border-b border-slate-800/80 transition-colors ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left side: Brand Icon + Title */}
        <div
          onClick={handleBrandClick}
          className="flex items-center gap-2.5 lg:flex-1 cursor-pointer select-none group"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleBrandClick();
            }
          }}
          aria-label="Enterprise AI & Cloud Incubation Lab - scroll to top"
        >
          <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/20 shadow-[0_0_12px_rgba(56,189,248,0.2)] group-hover:border-[#38BDF8]/40 transition-colors">
            <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-[#38BDF8] transition-transform group-hover:scale-110" />
          </div>
          <span className="font-bold text-white text-sm sm:text-base tracking-tight hidden sm:inline whitespace-nowrap">
            Enterprise AI &amp; Cloud Incubation Lab
          </span>
        </div>

        {/* Center: Persona toggle switcher with two pill buttons */}
        <div className="flex items-center justify-center flex-shrink-0">
          <div
            className="flex items-center p-1 rounded-full bg-[#0F172A] border border-slate-800 shadow-inner"
            role="tablist"
            aria-label="Target persona selector"
          >
            {PERSONA_OPTIONS.map((option) => {
              const isActive = persona === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setPersona(option.id)}
                  className={`relative px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 z-10 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 ${
                    isActive
                      ? 'text-[#070B19]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePersonaPill"
                      className={`absolute inset-0 rounded-full ${option.activeBg} ${option.glow}`}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}
                  <span className="relative z-10 select-none text-xs sm:text-sm" aria-hidden="true">
                    {option.icon}
                  </span>
                  <span className="relative z-10 select-none whitespace-nowrap">
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right side: Cohort status badge to balance layout on large screens */}
        <div className="hidden lg:flex lg:flex-1 items-center justify-end gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F172A]/80 border border-slate-800 text-xs text-slate-300 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
            </span>
            <span className="font-medium text-slate-300">Cohort 2026 Admissions Open</span>
          </div>
          
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
}
