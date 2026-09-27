import { useState, Suspense, lazy } from 'react';
import { usePersona } from '../../context/PersonaContext';
import { ROADMAP } from '../../data/programData';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { CheckCircle2, Layers } from 'lucide-react';

const HelixRoadmap3D = lazy(() => import('../canvas/HelixRoadmap3D'));

export default function RoadmapSection() {
  usePersona();
  const [activeMonth, setActiveMonth] = useState(0);

  const currentMonthData = ROADMAP[activeMonth];

  return (
    <section className="py-20 bg-white dark:bg-[#0F172A] relative overflow-hidden" id="roadmap">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">6-Month Engineering Incubation Roadmap</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl">
            A structured journey from foundational engineering to enterprise-grade AI applications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Canvas Container */}
          <div className="h-[500px] w-full bg-slate-100 dark:bg-slate-200/30 dark:bg-slate-800/30 rounded-2xl border border-slate-300 dark:border-slate-300 dark:border-slate-700/50 relative">
            <Suspense fallback={<div className="flex items-center justify-center h-full text-slate-600 dark:text-slate-400">Loading 3D Visualizer...</div>}>
              <Canvas camera={{ position: [0, 3, 8], fov: 50 }} style={{ background: 'transparent' }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} intensity={1} />
                <HelixRoadmap3D activeMonth={activeMonth} onSelectMonth={setActiveMonth} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
              </Canvas>
            </Suspense>
          </div>

          {/* Details Panel */}
          <div className="flex flex-col h-[500px] justify-between">
            <div className="bg-slate-100 dark:bg-slate-200/50 dark:bg-slate-800/50 rounded-2xl border border-slate-300 dark:border-slate-300 dark:border-slate-700/50 p-6 md:p-8 flex-grow">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMonth}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 text-cyan-400 font-bold text-xl">
                      {activeMonth + 1}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{currentMonthData?.title || `Month ${activeMonth + 1}`}</h3>
                    </div>
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 mb-6 text-base leading-relaxed">
                    {currentMonthData?.deliverable || "Curriculum details for this month."}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Layers size={16} /> Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentMonthData?.tech?.map((tech: string, i: number) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-300/50 dark:bg-slate-700/50 text-slate-200 text-sm border border-slate-600/50">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto">
                    <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <CheckCircle2 size={16} /> Deliverable
                    </h4>
                    <div className="bg-slate-100 dark:bg-slate-200/50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-300 dark:border-slate-300 dark:border-slate-700/50">
                      <p className="text-emerald-400 font-medium">{currentMonthData?.deliverable || "Monthly Project"}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Selectors */}
            <div className="grid grid-cols-6 gap-2 mt-4">
              {[0, 1, 2, 3, 4, 5].map((month) => (
                <button
                  key={month}
                  onClick={() => setActiveMonth(month)}
                  className={`py-3 rounded-xl transition-all duration-200 border text-center font-medium
                    ${activeMonth === month 
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400' 
                      : 'bg-slate-100 dark:bg-slate-200/30 dark:bg-slate-800/30 border-slate-700/30 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:bg-slate-300/50 dark:bg-slate-700/50 hover:border-slate-600/50'}`}
                >
                  M{month + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
