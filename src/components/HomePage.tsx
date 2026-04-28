import React from 'react';
import Hero          from './sections/Hero';
import Services      from './sections/Services';
import Participants  from './sections/Participants';
import Compliance    from './sections/Compliance';
import Rollout       from './sections/Rollout';
import Stack         from './sections/Stack';
import CTA           from './sections/CTA';

/**
 * Global Relocation USA homepage.
 *
 * Restores the editorial front-page composition that ships with this
 * brand — Hero → Services → Participants → Compliance → Rollout
 * (with USMap) → Stack → CTA. CTAs are wired through useApp().setPage
 * inside each section so the existing Flyttgo in-app router (page ids
 * like 'booking', 'how-it-works', 'compliance') drives navigation
 * without pulling react-router-dom back in.
 *
 * The booking flow, dashboards, country pages, and provider portal
 * continue to live behind their own Page ids — this homepage is only
 * the marketing surface.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Participants />
      <Compliance />
      <Rollout />
      <Stack />
      <CTA />
    </>
  );
}
