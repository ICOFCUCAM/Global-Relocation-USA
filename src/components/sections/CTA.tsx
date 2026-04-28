import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const CTA: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    try {
      await fetch('/api/crm/69efd2dd743ce20ad19320ec/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch (err) {
      // continue silently
    }
    setSubmitted(true);
    toast.success('Subscribed to Global Relocation USA marketplace updates.');
    setEmail('');
  };

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0066ff] to-[#0052cc] rounded-3xl p-8 lg:p-14 text-white relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                Get marketplace activation updates.
              </h2>
              <p className="text-blue-100 leading-relaxed mb-2">
                Stay informed as Global Relocation USA activates new United States markets and provider categories.
              </p>
              <p className="text-xs text-blue-200">
                Operated by Wankong LLC, Delaware. We respect your inbox.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="flex-1 bg-white/10 backdrop-blur border border-white/20 placeholder-blue-200 text-white px-4 py-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40"
                  required
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#0066ff] hover:bg-blue-50 px-6 py-3.5 rounded-lg font-bold transition-colors"
                >
                  Subscribe <ArrowRight size={18} />
                </button>
              </div>
              {submitted && (
                <div className="flex items-center gap-2 text-sm text-blue-100">
                  <CheckCircle2 size={16} /> You're on the list.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
