import React from 'react';
import PageShell from '@/components/PageShell';

const Terms: React.FC = () => {
  return (
    <PageShell title="Terms">
      <section className="bg-gradient-to-br from-[#0d1420] to-[#1a2332] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-3">Legal</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">Terms of Service</h1>
          <p className="text-slate-400 text-sm">Last updated: April 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-slate-700 leading-relaxed">
          <div className="bg-blue-50 border-l-4 border-[#0066ff] rounded-r-xl p-6">
            <div className="font-bold text-[#1a2332] mb-2">Marketplace Classification</div>
            <p>
              FlyttGo Relocation Marketplace USA is a digital coordination platform that connects customers
              with independent licensed relocation service providers. <strong>FlyttGo does not operate as a
              moving carrier.</strong>
            </p>
          </div>

          <h2 className="text-2xl font-bold text-[#1a2332] mt-8">1. Operator</h2>
          <p>
            FlyttGo Relocation Marketplace USA is operated by Wankong LLC, a Delaware limited liability
            company ("FlyttGo," "we," "us"). These Terms govern your use of the FlyttGo marketplace and
            related services.
          </p>

          <h2 className="text-2xl font-bold text-[#1a2332] mt-8">2. Platform Role</h2>
          <p>
            FlyttGo provides a digital coordination marketplace. The platform routes customer relocation
            requests to independent licensed providers. FlyttGo is not a party to the underlying
            relocation services contract between customer and provider, and FlyttGo does not perform
            transportation services.
          </p>

          <h2 className="text-2xl font-bold text-[#1a2332] mt-8">3. Independent Providers</h2>
          <p>
            All carriers, crews, storage providers, packing services, and truck rental partners listed on
            the marketplace are independent businesses. Each provider is responsible for its own operating
            authority, insurance, licensing, and service performance.
          </p>

          <h2 className="text-2xl font-bold text-[#1a2332] mt-8">4. Compliance Surfaces</h2>
          <p>
            FlyttGo supports FMCSA-aware carrier verification workflows, USDOT transparency compatibility,
            and insurance disclosure compatibility. These are designed as compatibility layers — providers
            remain responsible for the accuracy and currency of their regulatory information.
          </p>

          <h2 className="text-2xl font-bold text-[#1a2332] mt-8">5. Use of the Marketplace</h2>
          <p>
            By using FlyttGo, you agree to provide accurate information, comply with applicable U.S. laws,
            and use the marketplace only for legitimate relocation coordination purposes.
          </p>

          <h2 className="text-2xl font-bold text-[#1a2332] mt-8">6. Limitation of Liability</h2>
          <p>
            Because FlyttGo is a coordination platform and not a motor carrier, FlyttGo's liability is
            limited to its role as a marketplace operator. Liability for relocation services performed by
            independent providers rests with those providers.
          </p>

          <h2 className="text-2xl font-bold text-[#1a2332] mt-8">7. Contact</h2>
          <p>
            Questions about these Terms may be directed to Wankong LLC via the Contact page.
          </p>
        </div>
      </section>
    </PageShell>
  );
};

export default Terms;
