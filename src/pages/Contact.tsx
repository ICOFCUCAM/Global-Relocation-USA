import React, { useState } from 'react';
import PageShell from '@/components/PageShell';
import { Mail, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', topic: 'General Inquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.includes('@')) return toast.error('Please enter a valid email.');
    try {
      await fetch('/api/crm/69efd2dd743ce20ad19320ec/subscribe', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, name: form.name, source: 'contact', topic: form.topic, message: form.message }),
      });
    } catch {}
    setSubmitted(true);
    toast.success('Message sent. We will respond shortly.');
  };

  return (
    <PageShell title="Contact">
      <section className="bg-gradient-to-br from-[#0d1420] to-[#1a2332] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-3">Contact</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Get in touch with FlyttGo.</h1>
          <p className="text-lg text-slate-300">
            Customer support, provider applications, enterprise inquiries, and press contact.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <Mail size={20} className="text-[#0066ff] mb-3" />
              <div className="font-bold mb-1">Email</div>
              <div className="text-slate-600 text-sm">support@flyttgo-marketplace.com</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <MapPin size={20} className="text-[#0066ff] mb-3" />
              <div className="font-bold mb-1">Operator</div>
              <div className="text-slate-600 text-sm">Wankong LLC<br/>Delaware, United States</div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-7">
            {!submitted ? (
              <form onSubmit={submit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Name</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full mt-1 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066ff]/30" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full mt-1 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066ff]/30" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Topic</label>
                  <select value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="w-full mt-1 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066ff]/30">
                    <option>General Inquiry</option>
                    <option>Customer Support</option>
                    <option>Provider Application</option>
                    <option>Enterprise Relocation</option>
                    <option>Press</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Message</label>
                  <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full mt-1 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066ff]/30 resize-none" />
                </div>
                <button className="inline-flex items-center justify-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white px-6 py-3.5 rounded-lg font-bold w-full sm:w-auto">
                  Send Message <ArrowRight size={18} />
                </button>
              </form>
            ) : (
              <div className="text-center py-12">
                <CheckCircle2 size={48} className="text-[#00c48c] mx-auto mb-4" />
                <div className="font-bold text-2xl mb-2">Message Sent</div>
                <div className="text-slate-600">Our team typically responds within one business day.</div>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Contact;
