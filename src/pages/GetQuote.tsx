import React, { useState, useMemo } from 'react';
import PageShell from '@/components/PageShell';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowLeft, MapPin, Calendar, Home, Truck, Package,
  Warehouse, ShieldCheck, User, Mail, Phone, CheckCircle2, Star, Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

// ───── Pricing model ─────────────────────────────────────────────────────────
const HOME_SIZE_BASE: Record<string, { base: number; hours: number; label: string }> = {
  studio: { base: 380, hours: 3, label: 'Studio' },
  '1br': { base: 560, hours: 4, label: '1 Bedroom' },
  '2br': { base: 820, hours: 6, label: '2 Bedroom' },
  '3br': { base: 1240, hours: 8, label: '3 Bedroom' },
  '4br': { base: 1780, hours: 10, label: '4+ Bedroom' },
};

const TIER_MULT: Record<string, { mult: number; label: string; desc: string }> = {
  labor: { mult: 1.0, label: 'Labor-Only', desc: 'Independent crew for loading/unloading. You provide the truck.' },
  full: { mult: 1.85, label: 'Full-Service Local', desc: 'Licensed carrier handles truck, crew, transport, and basic protection.' },
  interstate: { mult: 3.2, label: 'Interstate', desc: 'Long-haul licensed carrier with FMCSA-aware verification.' },
};

const ADDON_PRICING = {
  packing: { label: 'Packing Services', price: 240, icon: Package, desc: 'Full or partial packing crew.' },
  storage: { label: 'Temporary Storage', price: 180, icon: Warehouse, desc: '30-day climate-controlled hold.' },
  insurance: { label: 'Insurance Coverage', price: 95, icon: ShieldCheck, desc: 'Disclosure-compatible valuation tier.' },
};

type AddonKey = keyof typeof ADDON_PRICING;

// ───── Provider data ─────────────────────────────────────────────────────────
interface Provider {
  name: string; tier: string; rating: number; jobs: number;
  basePrice: number; eta: string; verified: boolean; tags: string[];
}

const ALL_PROVIDERS: Provider[] = [
  { name: 'Lone Star Relocation Co.', tier: 'full', rating: 4.9, jobs: 1240, basePrice: 1.05, eta: '2–4 hrs', verified: true, tags: ['FMCSA-aware', 'Local'] },
  { name: 'Peach State Movers', tier: 'interstate', rating: 4.8, jobs: 980, basePrice: 0.98, eta: '1–3 days', verified: true, tags: ['Interstate', 'USDOT'] },
  { name: 'Big D Crew Network', tier: 'labor', rating: 4.7, jobs: 540, basePrice: 0.92, eta: 'Same day', verified: true, tags: ['Labor-Only'] },
  { name: 'Desert Haul Partners', tier: 'full', rating: 4.9, jobs: 870, basePrice: 1.10, eta: '4–6 hrs', verified: true, tags: ['Full-Service', 'Premium'] },
  { name: 'Queen City Logistics', tier: 'interstate', rating: 4.6, jobs: 710, basePrice: 1.02, eta: '2–4 days', verified: true, tags: ['Interstate', 'Corporate'] },
  { name: 'Sunbelt Carriers Inc.', tier: 'interstate', rating: 4.7, jobs: 1560, basePrice: 0.95, eta: '2–5 days', verified: true, tags: ['Interstate'] },
  { name: 'Charlotte Move Crews', tier: 'labor', rating: 4.8, jobs: 380, basePrice: 0.95, eta: 'Same day', verified: true, tags: ['Labor-Only', 'Hourly'] },
  { name: 'Capital Storage Network', tier: 'full', rating: 4.8, jobs: 320, basePrice: 1.0, eta: '4–6 hrs', verified: true, tags: ['Storage Integrated'] },
];

// ───── Estimate logic ────────────────────────────────────────────────────────
function estimateDistance(originZip: string, destZip: string): number {
  const o = parseInt(originZip.slice(0, 3) || '0', 10);
  const d = parseInt(destZip.slice(0, 3) || '0', 10);
  if (!o || !d) return 0;
  // Rough ZIP-prefix distance approximation in miles
  return Math.min(Math.abs(o - d) * 8.5, 2800);
}

interface QuoteState {
  originZip: string;
  destZip: string;
  moveDate: string;
  homeSize: string;
  tier: string;
  addons: Record<AddonKey, boolean>;
  name: string;
  email: string;
  phone: string;
}

const initialState: QuoteState = {
  originZip: '', destZip: '', moveDate: '', homeSize: '',
  tier: '', addons: { packing: false, storage: false, insurance: false },
  name: '', email: '', phone: '',
};

// ───── Step 1: Move Details ──────────────────────────────────────────────────
const StepDetails: React.FC<{ q: QuoteState; set: (s: QuoteState) => void }> = ({ q, set }) => (
  <div className="space-y-6">
    <div className="grid sm:grid-cols-2 gap-4">
      <div>
        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
          <MapPin size={12} /> Origin ZIP
        </label>
        <input
          type="text" inputMode="numeric" maxLength={5}
          value={q.originZip}
          onChange={(e) => set({ ...q, originZip: e.target.value.replace(/\D/g, '') })}
          placeholder="78701"
          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066ff]/30 focus:border-[#0066ff] text-lg font-medium"
        />
      </div>
      <div>
        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
          <MapPin size={12} /> Destination ZIP
        </label>
        <input
          type="text" inputMode="numeric" maxLength={5}
          value={q.destZip}
          onChange={(e) => set({ ...q, destZip: e.target.value.replace(/\D/g, '') })}
          placeholder="30303"
          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066ff]/30 focus:border-[#0066ff] text-lg font-medium"
        />
      </div>
    </div>

    <div>
      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
        <Calendar size={12} /> Move Date
      </label>
      <input
        type="date"
        value={q.moveDate}
        min={new Date().toISOString().split('T')[0]}
        onChange={(e) => set({ ...q, moveDate: e.target.value })}
        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066ff]/30 focus:border-[#0066ff] text-lg font-medium"
      />
    </div>

    <div>
      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5 mb-2">
        <Home size={12} /> Home Size
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {Object.entries(HOME_SIZE_BASE).map(([k, v]) => (
          <button
            key={k}
            type="button"
            onClick={() => set({ ...q, homeSize: k })}
            className={`px-3 py-3 rounded-lg border-2 text-sm font-semibold transition-all ${
              q.homeSize === k
                ? 'bg-[#0066ff] text-white border-[#0066ff] shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:border-[#0066ff]/40'
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  </div>
);

// ───── Step 2: Tier + Add-ons ────────────────────────────────────────────────
const StepService: React.FC<{ q: QuoteState; set: (s: QuoteState) => void }> = ({ q, set }) => (
  <div className="space-y-7">
    <div>
      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5 mb-3">
        <Truck size={12} /> Service Tier
      </label>
      <div className="space-y-2.5">
        {Object.entries(TIER_MULT).map(([k, v]) => (
          <button
            key={k}
            type="button"
            onClick={() => set({ ...q, tier: k })}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              q.tier === k
                ? 'bg-blue-50 border-[#0066ff]'
                : 'bg-white border-slate-200 hover:border-[#0066ff]/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-[#1a2332]">{v.label}</div>
                <div className="text-sm text-slate-600 mt-0.5">{v.desc}</div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-4 ${
                q.tier === k ? 'bg-[#0066ff] border-[#0066ff]' : 'border-slate-300'
              }`}>
                {q.tier === k && <CheckCircle2 size={12} className="text-white" />}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>

    <div>
      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5 mb-3">
        <Sparkles size={12} /> Add-Ons
      </label>
      <div className="grid sm:grid-cols-3 gap-3">
        {(Object.entries(ADDON_PRICING) as [AddonKey, typeof ADDON_PRICING[AddonKey]][]).map(([k, v]) => {
          const Icon = v.icon;
          const active = q.addons[k];
          return (
            <button
              key={k}
              type="button"
              onClick={() => set({ ...q, addons: { ...q.addons, [k]: !active } })}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                active ? 'bg-blue-50 border-[#0066ff]' : 'bg-white border-slate-200 hover:border-[#0066ff]/40'
              }`}
            >
              <Icon size={20} className={active ? 'text-[#0066ff]' : 'text-slate-500'} />
              <div className="font-bold text-sm text-[#1a2332] mt-3">{v.label}</div>
              <div className="text-xs text-slate-600 mt-1">{v.desc}</div>
              <div className="text-xs font-bold text-[#0066ff] mt-2">+${v.price}</div>
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

// ───── Step 3: Contact ───────────────────────────────────────────────────────
const StepContact: React.FC<{ q: QuoteState; set: (s: QuoteState) => void }> = ({ q, set }) => (
  <div className="space-y-5">
    <div>
      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
        <User size={12} /> Full Name
      </label>
      <input
        value={q.name}
        onChange={(e) => set({ ...q, name: e.target.value })}
        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066ff]/30 focus:border-[#0066ff]"
        placeholder="Jane Doe"
      />
    </div>
    <div>
      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
        <Mail size={12} /> Email
      </label>
      <input
        type="email"
        value={q.email}
        onChange={(e) => set({ ...q, email: e.target.value })}
        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066ff]/30 focus:border-[#0066ff]"
        placeholder="jane@example.com"
      />
    </div>
    <div>
      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
        <Phone size={12} /> Phone (optional)
      </label>
      <input
        type="tel"
        value={q.phone}
        onChange={(e) => set({ ...q, phone: e.target.value })}
        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066ff]/30 focus:border-[#0066ff]"
        placeholder="(555) 123-4567"
      />
    </div>
    <div className="text-xs text-slate-500 leading-relaxed bg-slate-50 border border-slate-200 rounded-lg p-3">
      By submitting, you agree to receive a quote response from FlyttGo Relocation Marketplace USA,
      operated by Wankong LLC, Delaware. You may unsubscribe at any time.
    </div>
  </div>
);

// ───── Live Estimate Sidebar ─────────────────────────────────────────────────
const LiveEstimate: React.FC<{ q: QuoteState; estimate: { low: number; high: number; ready: boolean } }> = ({ q, estimate }) => {
  const distance = estimateDistance(q.originZip, q.destZip);
  return (
    <div className="bg-gradient-to-br from-[#0d1420] to-[#1a2332] text-white rounded-2xl p-6 lg:p-7 lg:sticky lg:top-24">
      <div className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-2">Live Estimate</div>
      {estimate.ready ? (
        <>
          <div className="text-3xl lg:text-4xl font-extrabold tracking-tight">
            ${estimate.low.toLocaleString()} – ${estimate.high.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 mt-1">Estimated price range</div>
        </>
      ) : (
        <>
          <div className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-500">$ — — —</div>
          <div className="text-xs text-slate-400 mt-1">Fill move details to see estimate</div>
        </>
      )}

      <div className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-slate-400">Route</span>
          <span className="font-semibold">
            {q.originZip || '—'} → {q.destZip || '—'}
          </span>
        </div>
        <div className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-slate-400">Distance</span>
          <span className="font-semibold">{distance ? `~${Math.round(distance)} mi` : '—'}</span>
        </div>
        <div className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-slate-400">Home Size</span>
          <span className="font-semibold">{q.homeSize ? HOME_SIZE_BASE[q.homeSize].label : '—'}</span>
        </div>
        <div className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-slate-400">Service</span>
          <span className="font-semibold">{q.tier ? TIER_MULT[q.tier].label : '—'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Add-ons</span>
          <span className="font-semibold">
            {Object.entries(q.addons).filter(([, v]) => v).length || 0}
          </span>
        </div>
      </div>

      <div className="mt-6 bg-white/5 border border-white/10 rounded-lg p-3 text-xs text-slate-300 leading-relaxed">
        Estimate ranges adjust live as you complete the form. Final pricing is provided by the matched
        independent licensed provider.
      </div>
    </div>
  );
};

// ───── Results: Matched Providers ────────────────────────────────────────────
const Results: React.FC<{ q: QuoteState; estimate: { low: number; high: number } }> = ({ q, estimate }) => {
  const matched = useMemo(() => {
    return ALL_PROVIDERS
      .filter((p) => p.tier === q.tier)
      .map((p) => ({
        ...p,
        priceLow: Math.round(estimate.low * p.basePrice),
        priceHigh: Math.round(estimate.high * p.basePrice),
      }))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
  }, [q.tier, estimate.low, estimate.high]);

  return (
    <div>
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#00c48c]/10 text-[#00c48c] text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
          <CheckCircle2 size={14} /> Quote Request Submitted
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a2332] mb-3 tracking-tight">
          {matched.length} verified providers matched your request.
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Confirmation sent to <strong>{q.email}</strong>. Providers will respond with finalized quotes
          within 24 hours. You can also book directly below.
        </p>
      </div>

      <div className="space-y-4">
        {matched.map((p) => (
          <div key={p.name} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-[#0066ff]/30 transition-all">
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0066ff] to-[#0052cc] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {p.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <div className="font-bold text-lg text-[#1a2332]">{p.name}</div>
                  {p.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#00c48c] bg-[#00c48c]/10 px-2 py-0.5 rounded">
                      <ShieldCheck size={10} /> VERIFIED
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 mb-2">
                  <span className="inline-flex items-center gap-1">
                    <Star size={13} className="text-amber-400 fill-amber-400" /> <strong>{p.rating}</strong>
                  </span>
                  <span className="text-slate-300">·</span>
                  <span>{p.jobs.toLocaleString()} jobs completed</span>
                  <span className="text-slate-300">·</span>
                  <span>ETA {p.eta}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="md:text-right">
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Quoted Range</div>
                <div className="text-2xl font-extrabold text-[#1a2332]">
                  ${p.priceLow.toLocaleString()}–${p.priceHigh.toLocaleString()}
                </div>
                <button
                  onClick={() => toast.success(`Booking request sent to ${p.name}.`)}
                  className="mt-2 inline-flex items-center justify-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white px-5 py-2.5 rounded-lg font-bold text-sm w-full md:w-auto"
                >
                  Book Provider <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {matched.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-xl">
            <div className="text-slate-600 mb-2">No providers immediately available for this tier.</div>
            <Link to="/marketplace" className="text-[#0066ff] font-semibold hover:underline">
              Browse the full marketplace →
            </Link>
          </div>
        )}
      </div>

      <div className="mt-10 text-center">
        <Link to="/marketplace" className="text-[#0066ff] font-semibold hover:underline">
          ← Browse all providers in the marketplace
        </Link>
      </div>
    </div>
  );
};

// ───── Main page ─────────────────────────────────────────────────────────────
const STEPS = ['Move Details', 'Service & Add-Ons', 'Contact Info'];

const GetQuote: React.FC = () => {
  const [step, setStep] = useState(0);
  const [q, setQ] = useState<QuoteState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  const estimate = useMemo(() => {
    if (!q.homeSize || !q.tier) {
      return { low: 0, high: 0, ready: false };
    }
    const base = HOME_SIZE_BASE[q.homeSize].base;
    const tier = TIER_MULT[q.tier].mult;
    const distance = estimateDistance(q.originZip, q.destZip);
    const distanceFee = q.tier === 'interstate' ? distance * 1.4 : distance * 0.35;
    let core = base * tier + distanceFee;
    (Object.keys(q.addons) as AddonKey[]).forEach((k) => {
      if (q.addons[k]) core += ADDON_PRICING[k].price;
    });
    const low = Math.round(core * 0.92);
    const high = Math.round(core * 1.18);
    return { low, high, ready: true };
  }, [q]);

  const canAdvance = (s: number): boolean => {
    if (s === 0) return q.originZip.length === 5 && q.destZip.length === 5 && !!q.moveDate && !!q.homeSize;
    if (s === 1) return !!q.tier;
    if (s === 2) return !!q.name && q.email.includes('@');
    return false;
  };

  const next = () => {
    if (!canAdvance(step)) {
      toast.error('Please complete all required fields.');
      return;
    }
    if (step < STEPS.length - 1) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = async () => {
    try {
      await fetch('https://famous.ai/api/crm/69efd2dd743ce20ad19320ec/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: q.email,
          name: q.name,
          source: 'get-quote',
          tags: ['quote-request', q.tier, q.homeSize],
        }),
      });
    } catch {}
    setSubmitted(true);
    toast.success('Quote request submitted. Matched providers below.');
  };

  return (
    <PageShell title="Get a Quote">
      <section className="bg-gradient-to-br from-[#0d1420] to-[#1a2332] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-3">Get a Quote</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight max-w-3xl">
            Request a relocation quote in three steps.
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            FlyttGo routes your request to verified independent licensed providers across the U.S. Live
            estimate updates as you fill the form.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-slate-50 min-h-[600px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!submitted ? (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 lg:p-10">
                {/* Stepper */}
                <div className="flex items-center justify-between mb-8">
                  {STEPS.map((label, i) => (
                    <React.Fragment key={label}>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          i < step ? 'bg-[#00c48c] text-white' :
                          i === step ? 'bg-[#0066ff] text-white' : 'bg-slate-200 text-slate-500'
                        }`}>
                          {i < step ? <CheckCircle2 size={14} /> : i + 1}
                        </div>
                        <span className={`text-xs font-semibold hidden sm:inline ${
                          i === step ? 'text-[#1a2332]' : 'text-slate-500'
                        }`}>{label}</span>
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className={`flex-1 h-0.5 mx-2 ${i < step ? 'bg-[#00c48c]' : 'bg-slate-200'}`}></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Step content */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-[#1a2332] mb-1">{STEPS[step]}</h2>
                  <div className="text-sm text-slate-500 mb-6">Step {step + 1} of {STEPS.length}</div>
                  {step === 0 && <StepDetails q={q} set={setQ} />}
                  {step === 1 && <StepService q={q} set={setQ} />}
                  {step === 2 && <StepContact q={q} set={setQ} />}
                </div>

                {/* Nav */}
                <div className="flex justify-between gap-3 pt-6 border-t border-slate-100">
                  <button
                    onClick={() => setStep(Math.max(0, step - 1))}
                    disabled={step === 0}
                    className="inline-flex items-center gap-2 px-5 py-3 text-slate-600 font-semibold hover:bg-slate-50 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button
                    onClick={next}
                    className="inline-flex items-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white px-6 py-3 rounded-lg font-bold transition-colors"
                  >
                    {step === STEPS.length - 1 ? 'Submit & Match Providers' : 'Continue'}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-1">
                <LiveEstimate q={q} estimate={estimate} />
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-10">
              <Results q={q} estimate={estimate} />
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
};

export default GetQuote;
