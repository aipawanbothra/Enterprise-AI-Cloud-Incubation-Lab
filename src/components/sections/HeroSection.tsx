import React from 'react';
import { motion } from 'framer-motion';
import { usePersona } from '../../context/PersonaContext';
import { HERO_METRICS } from '../../data/programData';
import { Rocket, GraduationCap, Zap, Users, Award, Target, Clock } from 'lucide-react';

const HeroSection: React.FC = () => {
  const { persona } = usePersona();

  const isStudent = persona === 'student';

  const badgeColor = isStudent
    ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-300'
    : 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300';

  const subHeadline = isStudent
    ? 'Master Docker, FastAPI, RAG Agents, ROS2 Robotics & deliver real paid SMB projects.'
    : 'A rigorous 6-month capstone-aligned incubation led by 15-25+ year industry architects.';

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const icons: Record<string, React.ReactNode> = {
    clock: <Clock className="w-5 h-5" />,
    target: <Target className="w-5 h-5" />,
    users: <Users className="w-5 h-5" />,
    zap: <Zap className="w-5 h-5" />,
    award: <Award className="w-5 h-5" />,
    rocket: <Rocket className="w-5 h-5" />,
    grad: <GraduationCap className="w-5 h-5" />,
  };

  return (
    <section className="relative h-full w-full flex flex-col items-center justify-center pointer-events-none px-4 sm:px-6 lg:px-8 z-10 pt-20 pb-12">
      <motion.div
        className="max-w-5xl w-full flex flex-col items-center text-center space-y-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className={`pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium backdrop-blur-sm ${badgeColor}`}
        >
          <Award className="w-4 h-4" />
          <span>Flagship 6-Month Incubation Model | Nagpur & Amravati Hubs</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight"
        >
          Transforming Academic Syntax into <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-600 dark:from-cyan-400 dark:to-emerald-400">
            Enterprise Engineering Capability
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-lg sm:text-xl text-slate-700 dark:text-slate-300 font-medium"
        >
          {subHeadline}
        </motion.p>

        {/* Metrics Bar */}
        <motion.div
          variants={containerVariants}
          className="pointer-events-auto grid grid-cols-2 md:grid-cols-5 gap-4 w-full mt-12"
        >
          {HERO_METRICS.slice(0, 5).map((metric: any, idx: number) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md hover:bg-slate-100 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-none"
            >
              <div className="text-cyan-600 dark:text-cyan-400 mb-2">
                {icons[metric.icon] || <Zap className="w-5 h-5" />}
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{metric.value}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 text-center uppercase tracking-wider font-semibold">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="pointer-events-auto flex flex-col sm:flex-row gap-4 mt-8"
        >
          {isStudent ? (
            <>
              <button className="px-8 py-4 rounded-lg font-bold text-white dark:text-slate-900 bg-cyan-600 dark:bg-cyan-400 hover:bg-cyan-700 dark:hover:bg-cyan-300 transition-colors shadow-lg dark:shadow-[0_0_20px_rgba(56,189,248,0.4)]">
                Apply for Diagnostic Screening
              </button>
              <button className="px-8 py-4 rounded-lg font-bold text-slate-700 dark:text-white border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                Explore Roadmap
              </button>
            </>
          ) : (
            <>
              <button className="px-8 py-4 rounded-lg font-bold text-white dark:text-slate-900 bg-emerald-600 dark:bg-emerald-400 hover:bg-emerald-700 dark:hover:bg-emerald-300 transition-colors shadow-lg dark:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                Request Academic MoU Briefing
              </button>
              <button className="px-8 py-4 rounded-lg font-bold text-slate-700 dark:text-white border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                View Evaluation Rubric
              </button>
            </>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
