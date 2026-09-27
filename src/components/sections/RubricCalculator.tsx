import React, { useState, useMemo } from 'react';

import { Award, Sparkles, BookOpen, Rocket, Shield } from 'lucide-react';
import { usePersona } from '../../context/PersonaContext';
import { RUBRIC_PILLARS, CREDENTIAL_TIERS } from '../../data/programData';

const ICONS: Record<string, any> = {
  code: BookOpen,
  architecture: Shield,
  cloud: Rocket,
  delivery: Sparkles,
  defense: Award
};

const COLORS: Record<string, string> = {
  code: '#38BDF8',
  architecture: '#818CF8',
  cloud: '#10B981',
  delivery: '#F59E0B',
  defense: '#EC4899'
};

const RubricCalculator: React.FC = () => {
  const { persona } = usePersona();
  
  const [scores, setScores] = useState<Record<string, number>>(
    RUBRIC_PILLARS.reduce((acc, p) => ({ ...acc, [p.id]: 75 }), {})
  );

  const totalScore = useMemo(() => {
    const sum = Object.values(scores).reduce((a, b) => a + b, 0);
    return Math.round(sum / Object.keys(scores).length) || 0;
  }, [scores]);

  const currentTier = useMemo(() => {
    return CREDENTIAL_TIERS.reduce((prev, curr) => 
      totalScore >= curr.minScore ? curr : prev
    , CREDENTIAL_TIERS[CREDENTIAL_TIERS.length - 1]);
  }, [totalScore]);

  const handleScoreChange = (id: string, value: number) => {
    setScores(prev => ({ ...prev, [id]: value }));
  };

  return (
    <section className="bg-[#0F172A] py-24 text-slate-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Interactive Evaluation & Credentialing Calculator
          </h2>
          <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            Adjust the scores across the 5 pillars to see how our continuous evaluation rubric maps to industry credentials.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6">
            {RUBRIC_PILLARS.map((pillar) => {
              const Icon = ICONS[pillar.id] || Sparkles;
              const color = COLORS[pillar.id] || '#38BDF8';
              const value = scores[pillar.id];

              return (
                <div key={pillar.id} className="bg-[#1E293B] rounded-xl p-6 border border-slate-200 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}20`, color }}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{pillar.name}</h3>
                        <p className="text-sm text-slate-600 dark:text-gray-400">{pillar.description}</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold" style={{ color }}>
                      {value}%
                    </div>
                  </div>
                  
                  <div className="relative mt-6">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={value}
                      onChange={(e) => handleScoreChange(pillar.id, parseInt(e.target.value))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
                      style={{
                        background: `linear-gradient(to right, ${color} 0%, ${color} ${value}%, #374151 ${value}%, #374151 100%)`
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-24 bg-[#1E293B] rounded-2xl p-8 border border-slate-200 dark:border-gray-800 flex flex-col items-center text-center">
              <h3 className="text-xl font-medium text-gray-300 mb-2">Overall Score</h3>
              <div className="text-6xl font-bold mb-8">
                {totalScore}%
              </div>
              
              <div className="w-full h-px bg-gray-800 mb-8"></div>
              
              <div className="mb-8">
                <div 
                  className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 shadow-lg"
                  style={{ backgroundColor: `${currentTier.color}20` }}
                >
                  <Award className="w-10 h-10" style={{ color: currentTier.color }} />
                </div>
                <h4 className="text-2xl font-bold mb-2" style={{ color: currentTier.color }}>
                  {currentTier.tier}
                </h4>
                <p className="text-slate-600 dark:text-gray-400">
                  {currentTier.label}
                </p>
              </div>

              <button 
                className="w-full py-4 px-6 rounded-xl font-semibold transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: currentTier.color, color: '#0F172A' }}
              >
                {persona === 'student' ? 'Apply for Screening' : 'Request Academic Briefing'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RubricCalculator;
