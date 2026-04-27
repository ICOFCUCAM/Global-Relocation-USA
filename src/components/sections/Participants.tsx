import React from 'react';
import { Home, MapPin, Truck, Users, Warehouse, GraduationCap, Building2 } from 'lucide-react';

const participants = [
  { icon: Home, title: 'Households Relocating Locally', tag: 'Demand-side' },
  { icon: MapPin, title: 'Interstate Movers', tag: 'Demand-side' },
  { icon: Truck, title: 'Licensed Moving Carriers', tag: 'Supply-side' },
  { icon: Users, title: 'Independent Relocation Crews', tag: 'Supply-side' },
  { icon: Warehouse, title: 'Self-Storage Providers', tag: 'Supply-side' },
  { icon: GraduationCap, title: 'Universities', tag: 'Institutional' },
  { icon: Building2, title: 'Corporate Relocation Programs', tag: 'Institutional' },
];

const Participants: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold text-[#0066ff] uppercase tracking-wider mb-3">Platform Participants</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a2332] mb-4 tracking-tight">
            A multi-sided marketplace for U.S. relocation.
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Demand-side households and institutions, supply-side licensed providers — coordinated through
            a single marketplace surface.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {participants.map((p, i) => (
            <div
              key={i}
              className={`p-6 rounded-xl border transition-all hover:-translate-y-1 hover:shadow-lg ${
                i === 0 ? 'bg-[#1a2332] text-white border-[#1a2332] sm:col-span-2 lg:col-span-2' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${
                  i === 0 ? 'bg-white/10' : 'bg-blue-50'
                }`}>
                  <p.icon size={20} className={i === 0 ? 'text-white' : 'text-[#0066ff]'} />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${
                  i === 0 ? 'bg-white/10 text-blue-200' : 'bg-slate-100 text-slate-600'
                }`}>
                  {p.tag}
                </span>
              </div>
              <div className={`font-bold text-lg leading-tight ${i === 0 ? 'text-white' : 'text-[#1a2332]'}`}>
                {p.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Participants;
