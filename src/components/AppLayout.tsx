import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Hero from './sections/Hero';
import Services from './sections/Services';
import ComplianceSection from './sections/Compliance';
import Participants from './sections/Participants';
import Rollout from './sections/Rollout';
import Stack from './sections/Stack';
import CTA from './sections/CTA';

const AppLayout: React.FC = () => {
  useEffect(() => {
    document.title = 'FlyttGo Relocation Marketplace USA';
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1a2332] font-sans">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Participants />
        <ComplianceSection />
        <Rollout />
        <Stack />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
