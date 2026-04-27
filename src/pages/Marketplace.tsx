import React, { useState } from 'react';
import PageShell from '@/components/PageShell';
import { Search, Filter, MapPin, ShieldCheck, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const listings = [
  { name: 'Lone Star Relocation Co.', city: 'Austin, TX', tier: 'Licensed Carrier', rating: 4.9, jobs: 1240, verified: true, services: ['Interstate', 'Local', 'Packing'] },
  { name: 'Peach State Movers', city: 'Atlanta, GA', tier: 'Licensed Carrier', rating: 4.8, jobs: 980, verified: true, services: ['Interstate', 'Storage'] },
  { name: 'Big D Crew Network', city: 'Dallas, TX', tier: 'Independent Crew', rating: 4.7, jobs: 540, verified: true, services: ['Labor-Only', 'Loading'] },
  { name: 'Desert Haul Partners', city: 'Phoenix, AZ', tier: 'Licensed Carrier', rating: 4.9, jobs: 870, verified: true, services: ['Interstate', 'Local'] },
  { name: 'Queen City Logistics', city: 'Charlotte, NC', tier: 'Licensed Carrier', rating: 4.6, jobs: 710, verified: true, services: ['Corporate', 'Interstate'] },
  { name: 'Capital Storage Network', city: 'Austin, TX', tier: 'Storage Provider', rating: 4.8, jobs: 320, verified: true, services: ['Storage', 'Climate-Controlled'] },
  { name: 'Southeast Pack Pros', city: 'Atlanta, GA', tier: 'Packing Service', rating: 4.7, jobs: 450, verified: true, services: ['Packing', 'Fragile'] },
  { name: 'Phoenix Truck Rentals', city: 'Phoenix, AZ', tier: 'Truck Rental Partner', rating: 4.5, jobs: 1100, verified: true, services: ['Truck Rental'] },
  { name: 'Charlotte Move Crews', city: 'Charlotte, NC', tier: 'Independent Crew', rating: 4.8, jobs: 380, verified: true, services: ['Labor-Only'] },
  { name: 'Texas Triangle Vault', city: 'Dallas, TX', tier: 'Storage Provider', rating: 4.9, jobs: 290, verified: true, services: ['Storage', 'Long-Term'] },
  { name: 'Sunbelt Carriers Inc.', city: 'Atlanta, GA', tier: 'Licensed Carrier', rating: 4.7, jobs: 1560, verified: true, services: ['Interstate', 'Corporate'] },
  { name: 'Rocky Mountain Movers', city: 'Phoenix, AZ', tier: 'Licensed Carrier', rating: 4.8, jobs: 620, verified: true, services: ['Interstate', 'Packing'] },
];

const tiers = ['All', 'Licensed Carrier', 'Independent Crew', 'Storage Provider', 'Packing Service', 'Truck Rental Partner'];

const Marketplace: React.FC = () => {
  const [search, setSearch] = useState('');
  const [tier, setTier] = useState('All');

  const filtered = listings.filter(
    (l) =>
      (tier === 'All' || l.tier === tier) &&
      (l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.city.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <PageShell title="Marketplace">
      <section className="bg-gradient-to-br from-[#0d1420] to-[#1a2332] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-3">Marketplace</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Browse the United States relocation marketplace.
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            Search verified licensed carriers, independent crews, storage providers, and packing services
            across active U.S. markets.
          </p>
        </div>
      </section>

      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by provider name or city..."
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066ff]/30 focus:border-[#0066ff]"
              />
            </div>
            <div className="relative">
              <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value)}
                className="pl-11 pr-10 py-3.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066ff]/30 min-w-[220px]"
              >
                {tiers.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-3 text-sm text-slate-600">
            Showing <strong>{filtered.length}</strong> of {listings.length} verified providers
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((l, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-[#0066ff]/30 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0066ff] to-[#0052cc] flex items-center justify-center text-white font-bold">
                    {l.name.charAt(0)}
                  </div>
                  {l.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#00c48c] bg-[#00c48c]/10 px-2 py-1 rounded">
                      <ShieldCheck size={11} /> VERIFIED
                    </span>
                  )}
                </div>
                <div className="font-bold text-[#1a2332] text-lg mb-1">{l.name}</div>
                <div className="flex items-center gap-1 text-sm text-slate-500 mb-3">
                  <MapPin size={12} /> {l.city}
                </div>
                <div className="text-xs font-semibold text-[#0066ff] mb-3">{l.tier}</div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {l.services.map((s) => (
                    <span key={s} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-1 text-sm">
                    <Star size={14} className="text-amber-400 fill-amber-400" />
                    <strong>{l.rating}</strong>
                    <span className="text-slate-500 text-xs">· {l.jobs} jobs</span>
                  </div>
                  <Link to="/contact" className="text-xs font-bold text-[#0066ff] hover:underline">
                    Request Quote →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-500">
              No providers match your search. Try adjusting your filters.
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
};

export default Marketplace;
