import React from 'react';
import USMap from '../USMap';

const timeline = [
  { phase: 'Phase 1', period: 'Q1–Q3 2026', label: 'Sunbelt Activation', cities: 'Austin · Dallas · Atlanta · Phoenix · Charlotte', state: 'live' },
  { phase: 'Phase 2', period: 'Q4 2026 – Q1 2027', label: 'Mountain & Southeast', cities: 'Denver · Nashville · Miami · Tampa · Raleigh', state: 'next' },
  { phase: 'Phase 3', period: 'Q2–Q3 2027', label: 'Midwest Corridor', cities: 'Chicago · Indianapolis · Columbus · Minneapolis', state: 'planned' },
  { phase: 'Phase 4', period: 'Q4 2027+', label: 'Coastal Density', cities: 'NYC · LA · Seattle · Boston · DC Metro', state: 'planned' },
];

const stateStyles: Record<string, string> = {
  live: 'bg-[#00c48c]/10 text-[#00c48c] border-[#00c48c]/30',
  next: 'bg-[#0066ff]/10 text-[#0066ff] border-[#0066ff]/30',
  planned: 'bg-slate-100 text-slate-500 border-slate-200',
};

const Rollout: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-[#0066ff] uppercase tracking-wider mb-3">Geographic Rollout</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a2332] mb-4 tracking-tight">
            United States deployment plan.
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Phased market activation across U.S. relocation corridors — from Sunbelt density to coastal
            metro coverage by 2028.
          </p>
        </div>

        <USMap />

        <div className="mt-12">
          <h3 className="text-xl font-bold text-[#1a2332] mb-6">Expansion Timeline</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {timeline.map((t, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 relative">
                <div className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border mb-3 ${stateStyles[t.state]}`}>
                  {t.state === 'live' ? 'Live' : t.state === 'next' ? 'Next Up' : 'Planned'}
                </div>
                <div className="font-bold text-[#1a2332] text-lg">{t.phase}</div>
                <div className="text-xs text-slate-500 mb-2">{t.period}</div>
                <div className="text-sm font-semibold text-[#0066ff] mb-2">{t.label}</div>
                <div className="text-xs text-slate-600 leading-relaxed">{t.cities}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rollout;
