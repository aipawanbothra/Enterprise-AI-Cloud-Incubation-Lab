import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePersona } from '../../context/PersonaContext';
import { GAP_LEFT, GAP_RIGHT } from '../../data/programData';
import { AlertTriangle, CheckCircle2, ArrowRight, XCircle } from 'lucide-react';

const GapSection: React.FC = () => {
  const { persona } = usePersona();
  const [sliderValue, setSliderValue] = useState(50);

  const isStudent = persona === 'student';

  const leftOpacity = Math.max(0, 1 - sliderValue / 100);
  const rightOpacity = Math.max(0, sliderValue / 100);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  const rightItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="w-full bg-slate-50 dark:bg-[#070B19] py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-4 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold">
            <AlertTriangle className="w-4 h-4" />
            <span>Industry Alignment Gap</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            The Employability Paradox
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            {isStudent
              ? 'Why scoring 9.0+ CGPA isn’t translating to Day-1 enterprise readiness.'
              : 'Bridging the divide between academic curricula and rapidly evolving industry demands.'}
          </p>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-12 w-full relative items-stretch">
          
          {/* Left Card: The Academic Illusion */}
          <motion.div
            style={{ opacity: 0.3 + leftOpacity * 0.7 }}
            className="flex flex-col bg-red-950/20 border border-red-500/20 rounded-2xl p-6 md:p-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-red-400 mb-6 flex items-center gap-3">
              <XCircle className="w-6 h-6" />
              The Academic Illusion
            </h3>
            <ul className="space-y-4 flex-grow">
              {GAP_LEFT.map((item: any, idx: number) => (
                <motion.li key={idx} variants={itemVariants} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500/70 shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">{item.text || item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Divider */}
          <div className="hidden lg:flex flex-col items-center justify-center">
            <div className="w-px h-full bg-gradient-to-b from-transparent via-slate-700 to-transparent relative">
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-slate-50 dark:bg-[#070B19] border border-slate-700 rounded-full flex items-center justify-center z-10 text-slate-600 dark:text-slate-400 text-sm font-bold shadow-xl">
                VS
              </div>
            </div>
          </div>
          
          <div className="flex lg:hidden justify-center items-center py-2">
            <ArrowRight className="w-8 h-8 text-slate-600 rotate-90" />
          </div>

          {/* Right Card: The 6-Month Enterprise Capability */}
          <motion.div
            style={{ opacity: 0.3 + rightOpacity * 0.7 }}
            className="flex flex-col bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6 md:p-8 shadow-[0_0_30px_rgba(16,185,129,0.05)]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6" />
              The 6-Month Enterprise Capability
            </h3>
            <ul className="space-y-4 flex-grow">
              {GAP_RIGHT.map((item: any, idx: number) => (
                <motion.li key={idx} variants={rightItemVariants} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-200 font-medium">{item.text || item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* Interactive Slider */}
        <div className="w-full max-w-md mx-auto mt-16 p-6 bg-slate-100 dark:bg-slate-200/50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-300 dark:border-slate-800">
          <label className="block text-center text-sm text-slate-600 dark:text-slate-400 mb-4 font-medium uppercase tracking-wider">
            Shift Your Perspective
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-2">
            <span>Academic Focus</span>
            <span>Enterprise Focus</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default GapSection;
