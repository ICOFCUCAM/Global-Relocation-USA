import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Network, Truck } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0d1420] via-[#1a2332] to-[#0d1420] text-white">
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00c48c] animate-pulse"></span>
              United States · Phase 1 Live Rollout
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] mb-6 tracking-tight">
              Relocation Marketplace Infrastructure Platform for the United States
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
              FlyttGo is a digital coordination marketplace connecting customers with licensed movers,
              relocation crews, storage providers, packing services, truck rental partners, and insurance
              selection layers — across the United States.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                to="/get-quote"
                className="inline-flex items-center justify-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white px-6 py-3.5 rounded-lg font-semibold transition-colors"
              >
                Get a Quote <ArrowRight size={18} />
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-6 py-3.5 rounded-lg font-semibold transition-colors"
              >
                How Coordination Works
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-lg">
              <div className="border-l-2 border-[#0066ff] pl-3">
                <div className="text-2xl font-bold">5</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Phase 1 Cities</div>
              </div>
              <div className="border-l-2 border-[#0066ff] pl-3">
                <div className="text-2xl font-bold">8</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Service Layers</div>
              </div>
              <div className="border-l-2 border-[#0066ff] pl-3">
                <div className="text-2xl font-bold">USA</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Marketplace Scope</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 lg:p-8 shadow-2xl">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00c48c]"></div>
                <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Marketplace Coordination Engine
                </div>
              </div>
              {[
                { icon: Network, title: 'Licensed Carrier Matching', meta: 'FMCSA-aware' },
                { icon: Truck, title: 'Truck Rental Coordination', meta: 'Multi-partner' },
                { icon: ShieldCheck, title: 'Insurance Selection Layers', meta: 'Disclosure-ready' },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#0066ff]/15 flex items-center justify-center">
                      <row.icon size={18} className="text-[#4d94ff]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{row.title}</div>
                      <div className="text-xs text-slate-400">{row.meta}</div>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-[#00c48c]">ACTIVE</div>
                </div>
              ))}
              <div className="mt-5 bg-[#0066ff]/10 border border-[#0066ff]/20 rounded-lg p-3 text-xs text-blue-200 leading-relaxed">
                Operated by <strong className="text-white">Wankong LLC</strong>, Delaware, United States.
                FlyttGo is not a motor carrier.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
