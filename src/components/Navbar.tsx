import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Marketplace', path: '/marketplace' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'Providers', path: '/providers' },
  { label: 'Cities', path: '/cities' },
  { label: 'Enterprise Relocation', path: '/enterprise-relocation' },
  { label: 'Compliance', path: '/compliance' },
  { label: 'Partners', path: '/partners' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0066ff] to-[#1a2332] flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <div className="leading-tight">
              <div className="font-bold text-[#1a2332] text-sm">FlyttGo</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">Marketplace USA</div>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'text-[#0066ff] bg-blue-50'
                    : 'text-slate-700 hover:text-[#0066ff] hover:bg-slate-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden xl:flex items-center gap-3">
            <Link to="/providers" className="text-sm font-medium text-slate-700 hover:text-[#0066ff]">
              Provider Portal
            </Link>
            <Link
              to="/get-quote"
              className="bg-[#0066ff] hover:bg-[#0052cc] text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors"
            >
              Get a Quote
            </Link>
          </div>

          <button
            className="xl:hidden p-2 text-slate-700"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div className="xl:hidden pb-4 border-t border-slate-200 pt-3">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    location.pathname === item.path
                      ? 'text-[#0066ff] bg-blue-50'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/get-quote"
                onClick={() => setOpen(false)}
                className="mt-2 bg-[#0066ff] text-white px-4 py-2 rounded-md text-sm font-semibold text-center"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
