import React, { useState } from 'react';
import PageShell from '@/components/PageShell';
import { ShieldCheck, TrendingUp, FileCheck, Wallet, ArrowRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const Providers: React.FC = () => {
  const [form, setForm] = useState({ company: '', email: '', usdot: '', tier: 'Licensed Carrier' });
  const [submitted, setSubmitted] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.includes('@')) {
      toast.error('Please enter a valid email.');
      return;
    }
    try {
      await fetch('/api/crm/69efd2dd743ce20ad19320ec/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, name: form.company, source: 'provider-application', tier: form.tier, usdot: form.usdot }),
      });
    } catch {}
    setSubmitted(true);
    toast.success('Provider application received. The verification team will be in touch.');
  };

  return (
    <PageShell title="Providers">
      <section className="bg-gradient-to-br from-[#0d1420] to-[#1a2332] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-3">Providers</div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Join the U.S. relocation marketplace as a verified provider.
            </h1>
            <p className="text-lg text-slate-300 max-w-xl mb-6">
              Licensed carriers, independent crews, storage providers, and packing services apply through
              the FMCSA-aware verification workflow.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="bg-white/10 border border-white/15 px-3 py-1.5 rounded">FMCSA-aware</span>
              <span className="bg-white/10 border border-white/15 px-3 py-1.5 rounded">USDOT transparency</span>
              <span className="bg-white/10 border border-white/15 px-3 py-1.5 rounded">Insurance disclosure</span>
            </div>
          </div>

          <div className="bg-white text-[#1a2332] rounded-2xl p-7 shadow-2xl">
            {!submitted ? (
              <form onSubmit={submit} className="space-y-4">
                <div className="font-bold text-xl mb-2">Provider Application</div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Company Name</label>
                  <input
                    required
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full mt-1 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066ff]/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full mt-1 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066ff]/30"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">USDOT #</label>
                    <input
                      value={form.usdot}
                      onChange={(e) => setForm({ ...form, usdot: e.target.value })}
                      placeholder="Optional"
                      className="w-full mt-1 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066ff]/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Provider Tier</label>
                    <select
                      value={form.tier}
                      onChange={(e) => setForm({ ...form, tier: e.target.value })}
                      className="w-full mt-1 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066ff]/30"
                    >
                      <option>Licensed Carrier</option>
                      <option>Independent Crew</option>
                      <option>Storage Provider</option>
                      <option>Packing Service</option>
                      <option>Truck Rental Partner</option>
                    </select>
                  </div>
                </div>
                <button className="w-full inline-flex items-center justify-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white py-3.5 rounded-lg font-bold transition-colors">
                  Submit Application <ArrowRight size={18} />
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <CheckCircle2 size={48} className="text-[#00c48c] mx-auto mb-4" />
                <div className="font-bold text-2xl mb-2">Application Received</div>
                <div className="text-slate-600">Verification team will contact you within 2 business days.</div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold mb-10 tracking-tight">Why providers join FlyttGo</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: TrendingUp, title: 'Demand Routing', desc: 'Receive matched requests in your service radius.' },
              { icon: ShieldCheck, title: 'Verification Badges', desc: 'Display FMCSA-aware verification on your listing.' },
              { icon: Wallet, title: 'Payvera Payouts', desc: 'Reliable payment orchestration via the Payvera rail.' },
              { icon: FileCheck, title: 'Disclosure Tools', desc: 'Insurance and USDOT transparency surfaces built in.' },
            ].map((b, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-6">
                <b.icon size={22} className="text-[#0066ff] mb-3" />
                <div className="font-bold mb-1">{b.title}</div>
                <div className="text-sm text-slate-600">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Providers;
