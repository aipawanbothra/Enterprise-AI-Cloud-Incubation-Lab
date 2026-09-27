
import { ThemeProvider } from 'next-themes';
import { PersonaProvider } from './context/PersonaContext';
import Navigation from './components/Navigation';
import HeroSection from './components/sections/HeroSection';
import GapSection from './components/sections/GapSection';
import RoadmapSection from './components/sections/RoadmapSection';
import PodSection from './components/sections/PodSection';
import HardwareSection from './components/sections/HardwareSection';
import RubricCalculator from './components/sections/RubricCalculator';
import FootprintSection from './components/sections/FootprintSection';
import { Rocket } from 'lucide-react';

const PROGRAM_NAME = 'Enterprise AI & Cloud Incubation Lab';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <PersonaProvider>
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-void dark:text-slate-200 font-sans selection:bg-cyber-cyan/30 overflow-x-hidden transition-colors duration-300">
          {/* Sticky Navigation */}
          <Navigation />

          {/* Hero: Modern Grid Background + Text */}
          <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Modern Grid Background */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-cyan-500 opacity-20 blur-[100px]"></div>
            
            {/* Text Overlay */}
            <div className="relative z-10 w-full">
              <HeroSection />
            </div>
          </section>

          {/* The Employability Paradox */}
          <section id="gap">
            <GapSection />
          </section>

          {/* 6-Month Roadmap */}
          <section id="roadmap">
            <RoadmapSection />
          </section>

          {/* Pod Architecture */}
          <section id="pods">
            <PodSection />
          </section>

          {/* Hardware & Stack */}
          <section id="hardware">
            <HardwareSection />
          </section>

          {/* Evaluation Calculator */}
          <section id="evaluation">
            <RubricCalculator />
          </section>

          {/* Footprint, Timeline, FAQ, CTAs */}
          <section id="footprint">
            <FootprintSection />
          </section>

          {/* Footer */}
          <footer className="bg-slate-50 dark:bg-void border-t border-slate-200 dark:border-white/5 py-12 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                <Rocket className="text-cyan-500 w-5 h-5" />
                <span className="font-semibold text-slate-700 dark:text-slate-400 text-sm">{PROGRAM_NAME}</span>
              </div>
              <p className="text-slate-500 text-xs">
                © {new Date().getFullYear()} <a href="https://connectedkisan.co.in/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500 transition-colors">ConnectedKisan</a>. Nagpur & Amravati Hubs. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </PersonaProvider>
    </ThemeProvider>
  );
}
