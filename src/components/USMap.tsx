import React, { useState } from 'react';

interface City {
  name: string;
  state: string;
  cx: number;
  cy: number;
  phase: number;
  eta: string;
  description: string;
}

const cities: City[] = [
  { name: 'Austin', state: 'TX', cx: 480, cy: 360, phase: 1, eta: 'Q1 2026', description: 'Tech relocation corridor and intra-state moves.' },
  { name: 'Dallas', state: 'TX', cx: 510, cy: 320, phase: 1, eta: 'Q1 2026', description: 'Interstate carrier hub and corporate relocation density.' },
  { name: 'Atlanta', state: 'GA', cx: 700, cy: 320, phase: 1, eta: 'Q2 2026', description: 'Southeast distribution and university relocation flows.' },
  { name: 'Phoenix', state: 'AZ', cx: 240, cy: 320, phase: 1, eta: 'Q2 2026', description: 'Sunbelt inbound migration and storage integration.' },
  { name: 'Charlotte', state: 'NC', cx: 730, cy: 290, phase: 1, eta: 'Q3 2026', description: 'Financial sector relocation and Carolinas corridor.' },
  { name: 'Denver', state: 'CO', cx: 360, cy: 270, phase: 2, eta: 'Q4 2026', description: 'Phase 2 expansion — Mountain region.' },
  { name: 'Nashville', state: 'TN', cx: 650, cy: 290, phase: 2, eta: 'Q4 2026', description: 'Phase 2 expansion — Tennessee corridor.' },
  { name: 'Miami', state: 'FL', cx: 770, cy: 410, phase: 2, eta: 'Q1 2027', description: 'Phase 2 expansion — Florida coastal density.' },
];

const USMap: React.FC = () => {
  const [active, setActive] = useState<City | null>(cities[0]);

  return (
    <div className="relative bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200 p-6 lg:p-8">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 relative">
          <svg viewBox="0 0 900 500" className="w-full h-auto">
            {/* Stylized US silhouette */}
            <path
              d="M 80 200 L 130 150 L 200 130 L 280 120 L 360 110 L 440 105 L 520 110 L 600 115 L 680 125 L 740 145 L 790 175 L 820 220 L 815 270 L 800 320 L 770 360 L 740 395 L 710 425 L 670 445 L 620 450 L 560 445 L 500 440 L 440 435 L 380 430 L 320 420 L 270 405 L 220 380 L 175 350 L 140 315 L 110 275 L 90 235 Z"
              fill="#e0e7ff"
              stroke="#1a2332"
              strokeWidth="2"
              opacity="0.4"
            />
            {/* Inner state lines (decorative) */}
            <g stroke="#94a3b8" strokeWidth="1" fill="none" opacity="0.5">
              <line x1="200" y1="130" x2="220" y2="380" />
              <line x1="360" y1="110" x2="380" y2="430" />
              <line x1="520" y1="110" x2="500" y2="440" />
              <line x1="680" y1="125" x2="670" y2="445" />
              <line x1="80" y1="250" x2="820" y2="270" />
              <line x1="110" y1="320" x2="800" y2="340" />
            </g>

            {/* City markers */}
            {cities.map((c) => (
              <g
                key={c.name}
                onClick={() => setActive(c)}
                className="cursor-pointer"
              >
                {c.phase === 1 && (
                  <circle cx={c.cx} cy={c.cy} r="18" fill="#0066ff" opacity="0.15">
                    <animate attributeName="r" values="14;22;14" dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.05;0.3" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle
                  cx={c.cx}
                  cy={c.cy}
                  r={active?.name === c.name ? 9 : 7}
                  fill={c.phase === 1 ? '#0066ff' : '#94a3b8'}
                  stroke="white"
                  strokeWidth="2"
                />
                <text
                  x={c.cx}
                  y={c.cy - 14}
                  textAnchor="middle"
                  className="text-[11px] font-semibold fill-[#1a2332]"
                >
                  {c.name}
                </text>
              </g>
            ))}
          </svg>

          <div className="flex items-center gap-4 text-xs text-slate-600 mt-2 px-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#0066ff]"></span>
              Phase 1 — Live Rollout
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-400"></span>
              Phase 2 — Expansion
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Selected Market</div>
          {active && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-2xl font-bold text-[#1a2332]">{active.name}</div>
                  <div className="text-sm text-slate-500">{active.state}, United States</div>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  active.phase === 1 ? 'bg-blue-100 text-[#0066ff]' : 'bg-slate-100 text-slate-600'
                }`}>
                  Phase {active.phase}
                </span>
              </div>
              <div className="text-sm text-slate-600 leading-relaxed mb-4">{active.description}</div>
              <div className="flex justify-between text-xs border-t border-slate-100 pt-3">
                <span className="text-slate-500">Activation ETA</span>
                <span className="font-semibold text-[#1a2332]">{active.eta}</span>
              </div>
            </div>
          )}
          <div className="bg-[#1a2332] text-white rounded-xl p-5">
            <div className="text-xs uppercase tracking-wider text-blue-300 font-semibold mb-2">Phase 1 Markets</div>
            <div className="text-3xl font-bold mb-1">5 Cities</div>
            <div className="text-sm text-slate-300">Austin · Atlanta · Dallas · Phoenix · Charlotte</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default USMap;
