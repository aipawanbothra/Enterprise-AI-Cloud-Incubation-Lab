import { useState, Suspense, lazy } from 'react';
import { POD_ROLES, WEEKLY_RHYTHM } from '../../data/programData';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Users, Wrench, Calendar as CalendarIcon } from 'lucide-react';

const PodVisualizer3D = lazy(() => import('../canvas/PodVisualizer3D'));

export default function PodSection() {
  const [activeRole, setActiveRole] = useState(0);
  const currentRole = POD_ROLES[activeRole];

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#070B19] relative overflow-hidden" id="pod-architecture">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Autonomous Agile Pod Architecture</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Cross-functional pods of 6-8 engineers simulating enterprise delivery teams
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* 3D Canvas */}
          <div className="lg:col-span-3 h-[500px] w-full bg-slate-100 dark:bg-slate-200/50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-300 dark:border-slate-800 relative">
            <Suspense fallback={<div className="flex items-center justify-center h-full text-slate-500">Loading Pod Environment...</div>}>
              <Canvas camera={{ position: [0, 4, 10], fov: 45 }} style={{ background: 'transparent' }}>
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <PodVisualizer3D activeRole={activeRole} onSelectRole={setActiveRole} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
              </Canvas>
            </Suspense>
            
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
               {POD_ROLES.map((_role, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveRole(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${activeRole === idx ? 'bg-cyan-400 w-8' : 'bg-slate-600 hover:bg-slate-400'}`}
                    aria-label={`Select role ${idx + 1}`}
                  />
               ))}
            </div>
          </div>

          {/* Details Panels */}
          <div className="lg:col-span-2 flex flex-col gap-6 h-full">
            {/* Role Card */}
            <div className="bg-slate-100 dark:bg-slate-200/50 dark:bg-slate-800/40 rounded-2xl border border-slate-300 dark:border-slate-300 dark:border-slate-700/50 p-6 flex-grow">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRole}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Users className="text-violet-400 w-5 h-5 shrink-0" />
                      {currentRole.role}
                    </h3>
                    <span className="bg-slate-200 dark:bg-slate-300/50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-lg text-sm font-medium border border-slate-600/50 shrink-0">
                      ×{currentRole.count}
                    </span>
                  </div>
                  
                  <p className="text-slate-700 dark:text-slate-300 mb-6 text-sm leading-relaxed">
                    {currentRole.description}
                  </p>

                  <div>
                    <h4 className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Wrench size={14} /> Tools & Focus
                    </h4>
                    <p className="text-sm text-violet-300 bg-violet-500/10 border border-violet-500/20 rounded-lg px-3 py-2">
                      {currentRole.tools}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Weekly Rhythm */}
            <div className="bg-slate-100 dark:bg-slate-200/50 dark:bg-slate-800/40 rounded-2xl border border-slate-300 dark:border-slate-300 dark:border-slate-700/50 p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <CalendarIcon className="text-emerald-400 w-5 h-5" />
                Weekly Rhythm
              </h3>
              <div className="space-y-2">
                {WEEKLY_RHYTHM.map((day, i) => (
                  <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-200/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-300 dark:border-slate-800 hover:border-slate-600 transition-colors">
                    <div className="w-16 shrink-0 text-xs font-bold text-slate-600 dark:text-slate-400 mt-0.5">
                      {day.day}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-medium text-slate-200">{day.activity}</h4>
                    </div>
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        day.type === 'planning' ? 'bg-cyan-400' : 
                        day.type === 'dev' ? 'bg-violet-400' : 
                        day.type === 'learning' ? 'bg-amber-400' :
                        day.type === 'review' ? 'bg-emerald-400' : 'bg-pink-400'
                    }`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
