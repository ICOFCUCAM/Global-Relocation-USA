import React from 'react';
import PageShell from '@/components/PageShell';
import { ShieldCheck, FileCheck, Scale, AlertCircle, Network } from 'lucide-react';

const Compliance: React.FC = () => {
  return (
    <PageShell title="Compliance">
      <section className="bg-gradient-to-br from-[#0d1420] to-[#1a2332] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-3">Compliance</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Marketplace classification and regulatory positioning.
          </h1>
          <p className="text-lg text-slate-300">
            FlyttGo Relocation Marketplace USA operates as a digital relocation coordination platform
            connecting customers with licensed moving providers.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-6 flex gap-4">
            <AlertCircle size={24} className="text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <div className="font-bold text-amber-900 text-lg mb-2">FlyttGo is not a motor carrier.</div>
              <div className="text-amber-800 leading-relaxed">
                FlyttGo does not operate as a moving carrier, trucking company, or logistics carrier. The
                platform connects customers with independent licensed relocation service providers who
                carry their own operating authority and insurance.
              </div>
            </div>
          </div>

          {[
            { icon: ShieldCheck, title: 'FMCSA-Aware Carrier Verification', body: 'Provider applications are screened against FMCSA carrier registration data. Active operating authority and current insurance status are surfaced to customers at the booking layer.' },
            { icon: FileCheck, title: 'USDOT Transparency Compatibility', body: 'Provider listings are designed to be compatible with USDOT registration disclosure. Customers can review carrier identification details before booking.' },
            { icon: Scale, title: 'Insurance Disclosure Compatibility', body: 'The booking surface includes insurance selection layers and disclosure-ready prompts, supporting transparent communication about coverage tiers, valuation, and limitations.' },
            { icon: Network, title: 'Independent Provider Relationships', body: 'Service providers on FlyttGo are independent businesses. The provider — not FlyttGo — is the contracting party for the relocation services performed.' },
          ].map((s, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 lg:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#00c48c]/10 flex items-center justify-center flex-shrink-0">
                  <s.icon size={22} className="text-[#00c48c]" />
                </div>
                <div>
                  <div className="font-bold text-xl text-[#1a2332] mb-2">{s.title}</div>
                  <div className="text-slate-600 leading-relaxed">{s.body}</div>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-sm text-slate-600 leading-relaxed">
            <strong className="text-[#1a2332]">Operator disclosure:</strong> FlyttGo Relocation Marketplace
            USA is operated by Wankong LLC, Delaware, United States. This page describes the platform's
            classification and is provided for transparency. It does not constitute legal advice.
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Compliance;
