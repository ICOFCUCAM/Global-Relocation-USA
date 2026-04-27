import React from 'react';
import PageShell from '@/components/PageShell';
import { Search, Network, ClipboardCheck, Truck, CheckCircle2 } from 'lucide-react';

const steps = [
  { icon: Search, title: 'Submit Relocation Request', desc: 'Customer enters origin, destination, dates, and service requirements through the marketplace surface.' },
  { icon: Network, title: 'Marketplace Matching', desc: 'The matching engine routes the request to verified licensed providers based on capacity and service tier.' },
  { icon: ClipboardCheck, title: 'Provider Selection', desc: 'Customer compares quotes, verification badges, ratings, and selects from independent licensed providers.' },
  { icon: Truck, title: 'Coordination & Execution', desc: 'FlyttGo coordinates booking, payment escrow, insurance disclosure, and timeline tracking.' },
  { icon: CheckCircle2, title: 'Completion & Payout', desc: 'Provider completes the move; Payvera releases payout; customer reviews the provider.' },
];

const HowItWorks: React.FC = () => {
  return (
    <PageShell title="How It Works">
      <section className="bg-gradient-to-br from-[#0d1420] to-[#1a2332] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-3">How It Works</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight max-w-3xl">
            From request to completion — a five-step coordination flow.
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            FlyttGo orchestrates the full relocation lifecycle through a structured marketplace workflow.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-6 items-start bg-white border border-slate-200 rounded-xl p-6 lg:p-8 hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0066ff] to-[#0052cc] flex items-center justify-center text-white">
                    <s.icon size={22} />
                  </div>
                  {i < steps.length - 1 && <div className="w-px flex-1 bg-slate-200 mt-3 min-h-[40px]"></div>}
                </div>
                <div className="flex-1 pt-1">
                  <div className="text-xs font-bold text-[#0066ff] uppercase tracking-wider mb-1">Step {i + 1}</div>
                  <div className="font-bold text-xl text-[#1a2332] mb-2">{s.title}</div>
                  <div className="text-slate-600 leading-relaxed">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default HowItWorks;
