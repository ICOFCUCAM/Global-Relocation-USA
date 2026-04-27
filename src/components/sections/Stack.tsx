import React from 'react';
import { Network, CreditCard, UsersRound } from 'lucide-react';

const stack = [
  {
    icon: Network,
    name: 'Marketplace Matching Engine',
    desc: 'Routes relocation requests to verified licensed providers across U.S. markets, optimizing for capacity, distance, and service tier.',
  },
  {
    icon: CreditCard,
    name: 'Payvera Payments Orchestration',
    desc: 'Booking deposits, escrow holds, and provider payouts orchestrated through the Payvera payments rail.',
  },
  {
    icon: UsersRound,
    name: 'Workverge Workforce Coordination',
    desc: 'Crew rostering, shift assembly, and labor-only crew dispatch coordination across independent relocation teams.',
  },
];

const Stack: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#0d1420] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3">Platform Stack</div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
            FlyttGo ecosystem infrastructure.
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            The marketplace runs on three coordinated infrastructure layers — matching, payments, and workforce.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {stack.map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-7 hover:border-[#0066ff]/40 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#0066ff]/15 flex items-center justify-center mb-5">
                <s.icon size={22} className="text-[#4d94ff]" />
              </div>
              <div className="font-bold text-lg mb-2">{s.name}</div>
              <div className="text-sm text-slate-400 leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stack;
