import React from 'react';
import { ShieldCheck, FileCheck, Scale, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ComplianceSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-slate-50 to-blue-50/40 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-2">
            <div className="text-xs font-bold text-[#0066ff] uppercase tracking-wider mb-3">Compliance Positioning</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a2332] mb-4 tracking-tight">
              A coordination platform — not a motor carrier.
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              FlyttGo Relocation Marketplace USA operates as a digital relocation coordination platform
              connecting customers with licensed moving providers. The platform supports regulator-aware
              workflows and transparent disclosure surfaces.
            </p>

            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4 flex gap-3">
              <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-amber-900 text-sm mb-1">Marketplace Classification</div>
                <div className="text-sm text-amber-800 leading-relaxed">
                  FlyttGo is not a motor carrier. The platform connects customers with independent licensed
                  relocation service providers.
                </div>
              </div>
            </div>

            <Link
              to="/compliance"
              className="inline-flex items-center gap-2 mt-6 text-[#0066ff] font-semibold text-sm hover:underline"
            >
              Read full compliance positioning →
            </Link>
          </div>

          <div className="lg:col-span-3 grid sm:grid-cols-3 gap-4">
            {[
              { icon: ShieldCheck, title: 'FMCSA-Aware', desc: 'Carrier verification workflows aligned with FMCSA registration data.' },
              { icon: FileCheck, title: 'USDOT Transparency', desc: 'Compatibility with USDOT registration disclosure.' },
              { icon: Scale, title: 'Insurance Disclosure', desc: 'Insurance disclosure compatibility across booking surfaces.' },
            ].map((c, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-11 h-11 rounded-lg bg-[#00c48c]/10 flex items-center justify-center mb-4">
                  <c.icon size={20} className="text-[#00c48c]" />
                </div>
                <div className="font-bold text-[#1a2332] mb-2">{c.title}</div>
                <div className="text-sm text-slate-600 leading-relaxed">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceSection;
