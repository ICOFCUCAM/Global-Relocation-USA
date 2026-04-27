import React from 'react';
import PageShell from '@/components/PageShell';
import { Network, CreditCard, UsersRound, Truck, Warehouse, ShieldCheck } from 'lucide-react';

const partners = [
  { icon: Network, name: 'Marketplace Engine', cat: 'Internal Stack', desc: 'Core matching infrastructure routing relocation requests across U.S. markets.' },
  { icon: CreditCard, name: 'Payvera', cat: 'Internal Stack', desc: 'Payments orchestration: deposits, escrow, and provider payouts.' },
  { icon: UsersRound, name: 'Workverge', cat: 'Internal Stack', desc: 'Workforce coordination for independent relocation crews.' },
  { icon: Truck, name: 'Truck Rental Partners', cat: 'Service Layer', desc: 'Multi-partner rental routing for DIY and hybrid relocations.' },
  { icon: Warehouse, name: 'Storage Network', cat: 'Service Layer', desc: 'Self-storage and warehouse partner inventory integrations.' },
  { icon: ShieldCheck, name: 'Insurance Partners', cat: 'Disclosure Layer', desc: 'Insurance selection layers compatible with disclosure requirements.' },
];

const Partners: React.FC = () => {
  return (
    <PageShell title="Partners">
      <section className="bg-gradient-to-br from-[#0d1420] to-[#1a2332] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-3">Partners</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Ecosystem partners powering the relocation marketplace.
          </h1>
          <p className="text-lg text-slate-300">
            FlyttGo coordinates a layered ecosystem — from internal infrastructure to service-layer
            providers and disclosure partners.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {partners.map((p, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-lg bg-blue-50 flex items-center justify-center">
                  <p.icon size={20} className="text-[#0066ff]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-1 rounded">
                  {p.cat}
                </span>
              </div>
              <div className="font-bold text-lg text-[#1a2332] mb-2">{p.name}</div>
              <div className="text-sm text-slate-600 leading-relaxed">{p.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
};

export default Partners;
