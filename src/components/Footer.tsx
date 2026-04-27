import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0d1420] text-slate-300 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0066ff] to-[#0052cc] flex items-center justify-center">
                <span className="text-white font-bold">F</span>
              </div>
              <div>
                <div className="font-bold text-white">FlyttGo Relocation Marketplace USA</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">Coordination Infrastructure</div>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed mb-4">
              A digital relocation coordination marketplace connecting customers with licensed movers,
              relocation crews, storage providers, and packing services across the United States.
            </p>
            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-4 text-xs">
              <div className="text-slate-500 uppercase tracking-wider mb-1">Operator</div>
              <div className="text-white font-semibold">Wankong LLC</div>
              <div className="text-slate-400">Delaware, United States</div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Marketplace</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/marketplace" className="hover:text-white">Marketplace</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white">How It Works</Link></li>
              <li><Link to="/providers" className="hover:text-white">Providers</Link></li>
              <li><Link to="/cities" className="hover:text-white">Cities</Link></li>
              <li><Link to="/enterprise-relocation" className="hover:text-white">Enterprise</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/compliance" className="hover:text-white">Compliance</Link></li>
              <li><Link to="/partners" className="hover:text-white">Partners</Link></li>
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Ecosystem</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-slate-400">Marketplace Engine</li>
              <li className="text-slate-400">Payvera Payments</li>
              <li className="text-slate-400">Workverge Workforce</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="text-xs text-slate-500 max-w-3xl leading-relaxed">
            <p className="mb-2">
              <strong className="text-slate-300">FlyttGo Relocation Marketplace USA is operated by Wankong LLC, Delaware, United States.</strong>
            </p>
            <p>
              FlyttGo is a digital coordination platform and is not a motor carrier. The platform connects
              customers with independent licensed relocation service providers. FMCSA-aware verification
              workflows · USDOT transparency compatibility · Insurance disclosure compatibility.
            </p>
          </div>
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} Wankong LLC. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
