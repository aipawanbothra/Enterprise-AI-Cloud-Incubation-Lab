import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, ChevronDown, Building2, GraduationCap, Rocket, Mail, Send } from 'lucide-react';
import { usePersona } from '../../context/PersonaContext';
import { REGIONAL_HUBS, ROLLOUT_TIMELINE, FAQ_DATA } from '../../data/programData';

const FootprintSection: React.FC = () => {
  const { persona } = usePersona();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredFaqs = FAQ_DATA.filter(
    faq => faq.audience === 'both' || faq.audience === persona
  );

  const hubs = Object.values(REGIONAL_HUBS);

  return (
    <section className="bg-slate-50 dark:bg-[#070B19] py-24 text-slate-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Hubs */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Regional Footprint</h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our inaugural cohorts are launching in key technological hubs across Maharashtra.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {hubs.map((hub) => (
              <div key={hub.name} className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-300 dark:border-gray-800 p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-cyan-500">
                  <MapPin className="w-24 h-24" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                  <Building2 className="w-6 h-6 mr-3 text-cyan-400" />
                  {hub.name}
                </h3>
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Partner Institutions</h4>
                  {hub.colleges.map((college, idx) => (
                    <div key={idx} className="flex items-center text-gray-300 bg-slate-100 dark:bg-[#1E293B] px-4 py-2 rounded-lg">
                      <GraduationCap className="w-4 h-4 mr-3 text-emerald-400 shrink-0" />
                      {college}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center">
              <Calendar className="w-8 h-8 mr-4 text-violet-400" />
              Rollout Timeline
            </h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-6 left-0 w-full h-0.5 bg-gray-800"></div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {ROLLOUT_TIMELINE.map((phase, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 text-slate-900 dark:text-white font-bold
                    ${idx === 0 ? 'bg-emerald-500' : idx === 1 ? 'bg-cyan-500 shadow-[0_0_15px_rgba(56,189,248,0.5)]' : 'bg-gray-800 border-2 border-gray-600'}`}>
                    {idx + 1}
                  </div>
                  <h4 className="font-semibold mb-1 text-sm">{phase.phase}</h4>
                  <p className="text-xs text-slate-600 dark:text-gray-400">{phase.activity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {filteredFaqs.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-300 dark:border-gray-800 rounded-xl overflow-hidden">
                <button
                  className="w-full px-6 py-4 flex items-center justify-between focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span className="font-medium text-left">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaq === idx ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-slate-600 dark:text-gray-400 shrink-0 ml-4" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-4 text-slate-600 dark:text-gray-400"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Dual CTA */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] border border-emerald-500/30 p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">For College Leadership</h3>
              <p className="text-slate-600 dark:text-gray-400 mb-8">
                Initiate Academic MoU & Capstone Credit Alignment. Partner with us to bring enterprise-grade infrastructure to your campus.
              </p>
            </div>
            <button className="w-full py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-slate-900 dark:text-white font-semibold rounded-xl transition-colors flex items-center justify-center">
              <Mail className="w-5 h-5 mr-2" />
              Contact Partnerships
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] border border-cyan-500/30 p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-6">
                <Rocket className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">For Students</h3>
              <p className="text-slate-600 dark:text-gray-400 mb-8">
                Apply for Diagnostic Screening Assessment. Join the next cohort and start your journey towards enterprise engineering.
              </p>
            </div>
            <button className="w-full py-3 px-6 bg-cyan-600 hover:bg-cyan-700 text-slate-900 dark:text-white font-semibold rounded-xl transition-colors flex items-center justify-center">
              <Send className="w-5 h-5 mr-2" />
              Start Assessment
            </button>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default FootprintSection;
