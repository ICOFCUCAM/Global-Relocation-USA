import React, { useState } from 'react';
import PageShell from '@/components/PageShell';
import { Building2, Users, FileCheck, BarChart3, ArrowRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const Enterprise: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return toast.error('Please enter a valid email.');
    try {
      await fetch('/api/crm/69efd2dd743ce20ad19320ec/subscribe', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'enterprise-relocation' }),
      });
    } catch {}
    setSubmitted(true);
    toast.success('Enterprise team will be in touch within one business day.');
  };

  return (
    <PageShell title="Enterprise Relocation">
      <section className="bg-gradient-to-br from-[#0d1420] to-[#1a2332] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-3">Enterprise Relocation</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Coordinated relocation programs for companies and universities.
          </h1>
          <p className="text-lg text-slate-300">
            FlyttGo's enterprise surface coordinates structured employee and student relocation across U.S.
            markets — with policy-tier routing, audit-ready reporting, and centralized billing.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {[
            { icon: Building2, title: 'Corporate Programs', desc: 'Centralized policy tiers, multi-employee orchestration, vendor consolidation.' },
            { icon: Users, title: 'University Cycles', desc: 'Student move-in/move-out coordination across academic calendars.' },
            { icon: FileCheck, title: 'Audit-Ready Reporting', desc: 'Move logs, USDOT disclosure trails, insurance documentation.' },
            { icon: BarChart3, title: 'Spend Visibility', desc: 'Per-cost-center, per-employee, per-route relocation analytics.' },
          ].map((b, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-6">
              <b.icon size={22} className="text-[#0066ff] mb-3" />
              <div className="font-bold mb-1">{b.title}</div>
              <div className="text-sm text-slate-600">{b.desc}</div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0066ff] to-[#0052cc] rounded-2xl p-8 lg:p-10 text-white">
            <h2 className="text-2xl font-bold mb-2">Request enterprise demo</h2>
            <p className="text-blue-100 mb-6">Connect with the FlyttGo enterprise team to discuss program design.</p>
            {!submitted ? (
              <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="work@company.com"
                  className="flex-1 bg-white/10 border border-white/20 placeholder-blue-200 text-white px-4 py-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40"
                />
                <button className="bg-white text-[#0066ff] px-6 py-3.5 rounded-lg font-bold inline-flex items-center justify-center gap-2 hover:bg-blue-50">
                  Request Demo <ArrowRight size={18} />
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2 text-blue-100"><CheckCircle2 size={18} /> Request received.</div>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Enterprise;
