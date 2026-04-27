import React from 'react';
import PageShell from '@/components/PageShell';
import USMap from '@/components/USMap';
import { MapPin, TrendingUp } from 'lucide-react';

const cities = [
  { name: 'Austin', state: 'Texas', phase: 1, eta: 'Q1 2026', providers: 124, focus: 'Tech relocation corridor and intra-state moves.' },
  { name: 'Dallas', state: 'Texas', phase: 1, eta: 'Q1 2026', providers: 168, focus: 'Interstate carrier hub and corporate relocation density.' },
  { name: 'Atlanta', state: 'Georgia', phase: 1, eta: 'Q2 2026', providers: 142, focus: 'Southeast distribution and university relocation flows.' },
  { name: 'Phoenix', state: 'Arizona', phase: 1, eta: 'Q2 2026', providers: 98, focus: 'Sunbelt inbound migration and storage integration.' },
  { name: 'Charlotte', state: 'North Carolina', phase: 1, eta: 'Q3 2026', providers: 87, focus: 'Financial sector relocation and Carolinas corridor.' },
  { name: 'Denver', state: 'Colorado', phase: 2, eta: 'Q4 2026', providers: 0, focus: 'Phase 2 — Mountain region activation.' },
  { name: 'Nashville', state: 'Tennessee', phase: 2, eta: 'Q4 2026', providers: 0, focus: 'Phase 2 — Tennessee corridor activation.' },
  { name: 'Miami', state: 'Florida', phase: 2, eta: 'Q1 2027', providers: 0, focus: 'Phase 2 — Florida coastal density.' },
];

const Cities: React.FC = () => {
  return (
    <PageShell title="Cities">
      <section className="bg-gradient-to-br from-[#0d1420] to-[#1a2332] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-3">Cities</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight max-w-3xl">
            United States market activation map.
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            Phase 1 markets are live; Phase 2 expansion is sequenced through 2027.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <USMap />
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Market Directory</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {cities.map((c, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <MapPin size={20} className="text-[#0066ff]" />
                  <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${
                    c.phase === 1 ? 'bg-[#00c48c]/10 text-[#00c48c]' : 'bg-slate-100 text-slate-500'
                  }`}>
                    Phase {c.phase}
                  </span>
                </div>
                <div className="text-xl font-bold text-[#1a2332]">{c.name}</div>
                <div className="text-sm text-slate-500 mb-3">{c.state}</div>
                <div className="text-sm text-slate-600 leading-relaxed mb-4">{c.focus}</div>
                <div className="border-t border-slate-100 pt-3 flex justify-between text-xs">
                  <span className="text-slate-500">ETA</span>
                  <span className="font-semibold">{c.eta}</span>
                </div>
                {c.providers > 0 && (
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-slate-500">Verified Providers</span>
                    <span className="font-semibold inline-flex items-center gap-1"><TrendingUp size={11} />{c.providers}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Cities;
