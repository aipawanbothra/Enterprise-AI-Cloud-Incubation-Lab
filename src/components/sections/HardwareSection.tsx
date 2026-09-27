import { useState } from 'react';
import { Cpu, Server, Cloud, Wrench, Wifi, Camera, Gauge } from 'lucide-react';
import { usePersona } from '../../context/PersonaContext';
import { HARDWARE_KIT, ENTERPRISE_STACK } from '../../data/programData';

const ICON_MAP = [Cpu, Server, Camera, Gauge, Wrench, Wifi];

const HardwareSection: React.FC = () => {
  const { persona } = usePersona();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="bg-[#0F172A] py-24 text-slate-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Hardware Lab Kit & Enterprise Stack</h2>
          <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience enterprise-grade infrastructure. Our program bridges the gap between software logic and physical execution.
          </p>
        </div>

        {persona === 'professor' && (
          <div className="mb-12 bg-indigo-900/40 border border-indigo-500/50 p-4 rounded-xl flex items-center justify-center">
            <Cloud className="w-5 h-5 text-indigo-400 mr-3 shrink-0" />
            <span className="text-indigo-200">
              Each enrolled pod receives dedicated GCP/AWS cloud credits and enterprise edge computing hardware.
            </span>
          </div>
        )}

        {persona === 'student' && (
          <div className="mb-12 bg-cyan-900/40 border border-cyan-500/50 p-4 rounded-xl flex items-center justify-center">
            <Cpu className="w-5 h-5 text-cyan-400 mr-3 shrink-0" />
            <span className="text-cyan-200">
              Your pod will receive a dedicated physical kit shipped directly to your campus lab space.
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {HARDWARE_KIT.map((item, idx) => {
            const Icon = ICON_MAP[idx % ICON_MAP.length];
            const isHovered = hoveredIdx === idx;
            
            return (
              <div 
                key={idx}
                className="relative bg-[#1E293B] border border-slate-200 dark:border-gray-800 rounded-2xl p-6 transition-all duration-300"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  boxShadow: isHovered ? '0 0 20px rgba(56,189,248,0.1)' : 'none',
                  borderColor: isHovered ? 'rgba(56,189,248,0.5)' : '#1F2937'
                }}
              >
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-4 text-cyan-400">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <p className="text-slate-600 dark:text-gray-400 text-sm mb-4">{item.description}</p>
                
                <div className={`overflow-hidden transition-all duration-300 ${isHovered ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="pt-4 border-t border-gray-700 mt-4">
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
                      Industrial Application
                    </span>
                    <span className="text-sm text-gray-300">
                      {item.application}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold">Enterprise Cloud & DevOps Stack</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ENTERPRISE_STACK.map((tool, idx) => (
            <div key={idx} className="bg-[#1E293B] border border-slate-200 dark:border-gray-800 rounded-xl p-4 flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer">
              <span className="font-medium text-gray-300">{tool}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HardwareSection;
