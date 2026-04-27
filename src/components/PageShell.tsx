import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface PageShellProps {
  children: React.ReactNode;
  title?: string;
}

const PageShell: React.FC<PageShellProps> = ({ children, title }) => {
  useEffect(() => {
    if (title) document.title = `${title} · FlyttGo Relocation Marketplace USA`;
    else document.title = 'FlyttGo Relocation Marketplace USA';
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className="min-h-screen bg-white text-[#1a2332] font-sans">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default PageShell;
