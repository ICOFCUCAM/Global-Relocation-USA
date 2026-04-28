import React from 'react';
import { Users, Truck, PackageOpen, Warehouse, ShieldCheck, Building2, GraduationCap, Container } from 'lucide-react';

const services = [
  { icon: Users, title: 'Labor-Only Move Support', desc: 'Coordinate independent crews for loading, unloading, and in-home labor.' },
  { icon: Truck, title: 'Licensed Carrier Matching', desc: 'Match shipments with FMCSA-aware, USDOT-transparent licensed carriers.' },
  { icon: Container, title: 'Truck Rental Coordination', desc: 'Multi-partner rental routing for DIY and hybrid relocations.' },
  { icon: PackageOpen, title: 'Packing Services', desc: 'Coordinate full-pack, partial-pack, and fragile-item specialty crews.' },
  { icon: Warehouse, title: 'Temporary Storage Integration', desc: 'Connect to vetted self-storage and warehouse partner inventory.' },
  { icon: ShieldCheck, title: 'Insurance Options Selection', desc: 'Disclosure-compatible insurance selection layers at booking.' },
  { icon: Building2, title: 'Corporate Relocation Workflows', desc: 'Structured employee move programs with policy-tier routing.' },
  { icon: GraduationCap, title: 'University Relocation Support', desc: 'Move-in/move-out coordination for student housing cycles.' },
];

const Services: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold text-[#0066ff] uppercase tracking-wider mb-3">Service Architecture</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a2332] mb-4 tracking-tight">
            Eight coordination layers, one marketplace surface.
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Global Relocation USA orchestrates the full relocation stack — from labor and carrier matching
            to storage, insurance, and enterprise programs — across United States markets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <div
              key={i}
              className="group bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#0066ff]/30 hover:shadow-lg rounded-xl p-6 transition-all"
            >
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#0066ff] to-[#0052cc] flex items-center justify-center mb-4">
                <s.icon size={20} className="text-white" />
              </div>
              <div className="font-bold text-[#1a2332] mb-2">{s.title}</div>
              <div className="text-sm text-slate-600 leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
