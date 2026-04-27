import React from 'react';
import PageShell from '@/components/PageShell';

const About: React.FC = () => {
  return (
    <PageShell title="About">
      <section className="bg-gradient-to-br from-[#0d1420] to-[#1a2332] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-3">About</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Building U.S. relocation coordination infrastructure.
          </h1>
          <p className="text-lg text-slate-300">
            FlyttGo Relocation Marketplace USA is a digital coordination platform connecting customers with
            licensed movers, relocation crews, storage providers, and packing services across the United
            States.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-[#1a2332]">Our positioning</h2>
          <p className="text-slate-600 leading-relaxed">
            FlyttGo is not a moving company, trucking company, or logistics carrier. We are a digital
            marketplace that coordinates relocation services across an ecosystem of independent licensed
            providers. Our role is to make the U.S. relocation experience structured, transparent, and
            verifiable — for customers, providers, and institutional programs alike.
          </p>

          <h2 className="text-2xl font-bold text-[#1a2332] mt-10">Operator</h2>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 not-prose">
            <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">Legal entity</div>
            <div className="text-2xl font-bold text-[#1a2332]">Wankong LLC</div>
            <div className="text-slate-600">Delaware, United States</div>
            <div className="mt-4 text-sm text-slate-600 leading-relaxed">
              FlyttGo Relocation Marketplace USA is operated by Wankong LLC, a Delaware limited liability
              company. The platform's infrastructure and customer-facing surfaces are designed for
              long-horizon institutional operation through 2030 and beyond.
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#1a2332] mt-10">Platform stack</h2>
          <p className="text-slate-600 leading-relaxed">
            FlyttGo's marketplace runs on three coordinated infrastructure layers — the Marketplace
            matching engine, Payvera payments orchestration, and Workverge workforce coordination — each
            designed to serve relocation-specific coordination requirements.
          </p>
        </div>
      </section>
    </PageShell>
  );
};

export default About;
