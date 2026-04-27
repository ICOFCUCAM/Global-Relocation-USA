import type { Page } from './store';

/**
 * Bidirectional map between in-app Page ids and URL paths.
 *
 * We keep the existing setPage() API so the whole codebase doesn't
 * have to learn a router — the store layer pushes to history.pushState
 * whenever setPage runs and listens to popstate to sync the state
 * back when the user hits back / forward.
 *
 * Paths are chosen for SEO value rather than matching the Page id 1:1
 * (e.g. `driver-onboarding` → `/become-a-driver`, `subscriptions` →
 * `/driver-subscriptions`). Add to both maps when introducing a new
 * page — pathToPage falls back to 'home' for unknown paths.
 */

const PAGE_TO_PATH: Record<Page, string> = {
  /* Core flows */
  'home':                    '/',
  'booking':                 '/book',
  'payment':                 '/payment',
  'tracking':                '/track',
  'services':                '/services',
  'van-guide':               '/van-size-guide',
  'checklist':               '/moving-checklist',
  'subscriptions':           '/driver-subscriptions',
  'driver-onboarding':       '/become-a-driver',

  /* Authenticated dashboards */
  'customer-dashboard':      '/dashboard',
  'my-bookings':             '/my-bookings',
  'driver-portal':           '/driver',
  'admin':                   '/admin',
  'profile':                 '/profile',

  /* Corporate */
  'corporate':               '/business',
  'corporate-dashboard':     '/business/dashboard',
  'bulk-booking':            '/business/bulk-booking',
  'recurring-deliveries':    '/business/recurring-deliveries',
  'company-dashboard-info':  '/business/about-dashboard',
  'invoice-billing':         '/business/invoicing',
  'corporate-api-access':    '/business/api',

  /* Legal */
  'terms':                   '/terms',
  'privacy':                 '/privacy',
  'liability':               '/liability',
  'driver-terms':            '/driver-terms',

  /* Supabase auth callback (email confirmation, magic link, OAuth) */
  'auth-callback':           '/auth/callback',

  /* Driver onboarding status (pending/approved/rejected) */
  'driver-application-status': '/driver-application-status',

  /* Informational / marketing */
  'about':                   '/about',
  'contact':                 '/contact',
  'faq':                     '/faq',
  'help':                    '/help',
  'safety':                  '/safety',
  'careers':                 '/careers',
  'press':                   '/press',
  'sustainability':          '/sustainability',

  /* Marketplace repositioning surfaces (Phase 12). */
  'marketplace':             '/marketplace',
  'how-it-works':            '/how-it-works',
  'providers':               '/providers',
  'cities':                  '/cities',
  'enterprise-relocation':   '/enterprise-relocation',
  'compliance':              '/compliance',
  'partners':                '/partners',

  /* Fallback for unknown routes. No real path — pathToPage() returns
   * this id for anything it can't match. setPage('not-found') still
   * updates history.pushState to whatever URL triggered the fallback. */
  'not-found':               '/404',
};

/* Inverted lookup. Built once at module load. */
const PATH_TO_PAGE: Record<string, Page> = Object.entries(PAGE_TO_PATH)
  .reduce<Record<string, Page>>((acc, [page, path]) => {
    acc[path] = page as Page;
    return acc;
  }, {});

/**
 * Per-page SEO metadata — title, meta description and a dedicated
 * OG image where we have one (otherwise we fall back to /og.svg in
 * applyPageMeta below). Everything here feeds straight into the
 * <meta> tags on navigation.
 */
export interface PageMeta {
  title:       string;
  description: string;
  image?:      string;
}

const PAGE_TITLES: Record<Page, string> = {
  'home':                    'Global Relocation USA',
  'marketplace':             'Marketplace · Global Relocation USA',
  'how-it-works':            'How the Marketplace Works · Global Relocation USA',
  'providers':               'For Providers · Global Relocation USA',
  'cities':                  'Cities & Geographic Rollout · Global Relocation USA',
  'enterprise-relocation':   'Enterprise Relocation Coordination · Global Relocation USA',
  'compliance':              'Compliance & Carrier Verification · Global Relocation USA',
  'partners':                'Partners & Ecosystem · Global Relocation USA',
  'booking':                 'Book a Move · Global Relocation USA',
  'payment':                 'Secure Payment · Global Relocation USA',
  'tracking':                'Track Your Delivery · Global Relocation USA',
  'services':                'Services · Global Relocation USA',
  'van-guide':               'Van Size Guide · Global Relocation USA',
  'checklist':               'Moving Checklist · Global Relocation USA',
  'subscriptions':           'Driver Subscription Plans · Global Relocation USA',
  'driver-onboarding':       'Become a Driver · Global Relocation USA',
  'customer-dashboard':      'Dashboard · Global Relocation USA',
  'my-bookings':             'My Bookings · Global Relocation USA',
  'driver-portal':           'Driver Portal · Global Relocation USA',
  'admin':                   'Admin · Global Relocation USA',
  'profile':                 'Profile · Global Relocation USA',
  'corporate':               'Global Relocation USA for Business',
  'corporate-dashboard':     'Corporate Dashboard · Global Relocation USA',
  'bulk-booking':            'Bulk Booking · Global Relocation USA',
  'recurring-deliveries':    'Recurring Deliveries · Global Relocation USA',
  'company-dashboard-info':  'Corporate Dashboard Tour · Global Relocation USA',
  'invoice-billing':         'Invoice & Billing · Global Relocation USA',
  'corporate-api-access':    'API Access · Global Relocation USA',
  'terms':                   'Terms of Service · Global Relocation USA',
  'privacy':                 'Privacy Policy · Global Relocation USA',
  'liability':               'Liability · Global Relocation USA',
  'driver-terms':            'Driver Terms · Global Relocation USA',
  'about':                   'About Global Relocation USA',
  'contact':                 'Contact Global Relocation USA',
  'faq':                     'FAQ · Global Relocation USA',
  'help':                    'Help Center · Global Relocation USA',
  'safety':                  'Safety & Insurance · Global Relocation USA',
  'careers':                 'Careers · Global Relocation USA',
  'press':                   'Press & Media · Global Relocation USA',
  'sustainability':          'Sustainability · Global Relocation USA',
  'auth-callback':           'Signing you in… · Global Relocation USA',
  'driver-application-status': 'Driver Application Status · Global Relocation USA',
  'not-found':               'Page Not Found · Global Relocation USA',
};

/**
 * Per-page meta description, keyed off the same Page id. These are
 * the strings Google, LinkedIn, WhatsApp and X use when someone
 * shares a Global Relocation USA link — keep them honest, specific and ~155 chars.
 */
const PAGE_DESCRIPTIONS: Record<Page, string> = {
  'home':
    "Relocation coordination marketplace connecting customers with licensed movers, relocation crews, storage providers, and packing services across the United States. Operated by Wankong LLC, Delaware.",
  'marketplace':
    "Browse the Global Relocation USA marketplace — labor-only crews, USDOT-licensed carriers, packing services, storage, truck rental, and insurance options across Phase 1 launch cities.",
  'how-it-works':
    "How the Global Relocation USA relocation marketplace works — describe your move, compare verified providers, book under escrow, and document the full coordination trail.",
  'providers':
    "Become a verified provider on Global Relocation USA — labor crews, licensed carriers, storage partners, packers, and truck rental operators. Onboarding, compliance, and dispatch.",
  'cities':
    "Global Relocation USA geographic rollout — Phase 1 cities (Austin, Atlanta, Dallas, Phoenix, Charlotte) and the published expansion timeline through 2030.",
  'enterprise-relocation':
    "Enterprise relocation coordination workflows for HR, mobility, and university housing teams. Centralized procurement, audit-ready records, and consolidated invoicing.",
  'compliance':
    "How Global Relocation USA handles compliance — FMCSA-aware carrier verification, USDOT transparency, insurance disclosure. Global Relocation USA is not a motor carrier.",
  'partners':
    "Partners and ecosystem integrations — Payvera payments, Workverge workforce coordination, insurance providers, storage networks, and accounting connectors.",
  'booking':
    'Book your next move in under 3 minutes. Get an instant quote, pick a verified driver, and track your delivery live — all with escrow payment built in.',
  'payment':
    'Secure escrow checkout for your Global Relocation USA booking. Pay with card, Apple Pay, Google Pay or corporate invoice — money is held until the delivery is confirmed.',
  'tracking':
    'Track your Global Relocation USA delivery in real time. Live driver location, ETA, progress timeline and in-app chat with your driver.',
  'services':
    'From single-item deliveries to full office relocations — every Global Relocation USA service is run by registered US carriers with goods-in-transit insurance.',
  'van-guide':
    'Not sure what size van you need? Compare Small, Medium, Large and Luton options side-by-side and get an instant recommendation for your move.',
  'checklist':
    'The complete moving checklist for the USA. Timeline, packing order, utilities, address change — everything you need for a stress-free move.',
  'subscriptions':
    'Drive for Global Relocation USA and keep more of what you earn. Pick a subscription that matches your volume — lower commission, higher dispatch priority.',
  'driver-onboarding':
    'Apply to become a Global Relocation USA driver. Flexible hours, weekly payouts, verified jobs across the USA. Requirements, fees and application walkthrough inside.',
  'customer-dashboard':
    'Your Global Relocation USA dashboard — active bookings, past moves, receipts and driver tracking all in one place.',
  'my-bookings':
    'View, track and manage every Global Relocation USA booking from one place — with live driver location, receipts and dispute tools.',
  'driver-portal':
    'The Global Relocation USA driver portal — active jobs, earnings, payouts and subscription settings.',
  'admin':
    'Internal Global Relocation USA admin dashboard.',
  'profile':
    'Manage your Global Relocation USA profile, notification settings and language preferences.',
  'corporate':
    'Global Relocation USA for businesses — bulk booking, recurring deliveries, consolidated invoicing and API access for US companies at every scale.',
  'corporate-dashboard':
    'The Global Relocation USA corporate dashboard — track delivery volume, spending and performance across your whole organisation.',
  'bulk-booking':
    'Upload multiple delivery jobs at once. Perfect for retailers, warehouses and event logistics managing dozens of drops in a single run.',
  'recurring-deliveries':
    'Set up daily, weekly or monthly delivery runs with automatic driver assignment. Ideal for scheduled freight, laundry, catering and more.',
  'company-dashboard-info':
    'Take the tour of the Global Relocation USA corporate dashboard — reporting, user management, invoicing and analytics.',
  'invoice-billing':
    'Consolidated monthly invoicing, tax-compliant receipts and flexible payment terms for Global Relocation USA business customers.',
  'corporate-api-access':
    'The Global Relocation USA REST API — create bookings, track deliveries and reconcile invoices straight from your ERP, WMS or e-commerce platform.',
  'terms':
    'Global Relocation USA\u2019s Terms of Service — the rules that govern using the Global Relocation USA marketplace as a customer or business.',
  'privacy':
    "Global Relocation USA\u2019s Privacy Policy. How we collect, use and protect your data under US and EU privacy law (GDPR).",
  'liability':
    'Global Relocation USA\u2019s liability terms — goods in transit cover, claim process, driver responsibilities and dispute resolution.',
  'driver-terms':
    'The Global Relocation USA Driver Agreement — commission, commitments, conduct and the rules for accepting jobs on the Global Relocation USA platform.',
  'about':
    'Global Relocation USA is the USA\u2019s #1 moving marketplace. Verified drivers, escrow payment, real-time tracking — built in New York, run by Americans.',
  'contact':
    'Get in touch with Global Relocation USA — phone, email, WhatsApp, office address and a contact form. Support available 7 days a week, 08:00\u201322:00.',
  'faq':
    'Answers to the most common questions about booking, payment, drivers, insurance and cancellations on Global Relocation USA.',
  'help':
    'Browse help articles and guides for booking, payment, safety, account management and using Global Relocation USA for business.',
  'safety':
    'How Global Relocation USA keeps you safe — 6-step driver vetting, mandatory goods-in-transit insurance, escrow payments and our damage claims process.',
  'careers':
    'Join the Global Relocation USA team. Open roles in engineering, design, operations, support and marketing — plus how to apply as a driver.',
  'press':
    'Press & media kit for Global Relocation USA — quick facts, executive bios, brand assets and press contact.',
  'sustainability':
    'How Global Relocation USA makes moving greener — shared routes, EV fleet incentives, reusable moving kits and carbon offset on every booking.',
  'auth-callback':
    'Confirming your Global Relocation USA account and signing you in. You\u2019ll be redirected to your dashboard automatically.',
  'driver-application-status':
    'Track the status of your Global Relocation USA driver application — pending review, approved, or rejected with next steps.',
  'not-found':
    "The page you were looking for doesn't exist. Find what you need from the Global Relocation USA homepage, or book a move from any of our services.",
};

/** Page id → canonical URL path. */
export function pageToPath(page: Page): string {
  return PAGE_TO_PATH[page] ?? '/';
}

/** Page id → meta description. */
export function pageDescription(page: Page): string {
  return PAGE_DESCRIPTIONS[page] ?? PAGE_DESCRIPTIONS.home;
}

/** Page id → structured SEO meta bundle (title + description). */
export function pageMeta(page: Page): PageMeta {
  return {
    title:       pageTitle(page),
    description: pageDescription(page),
  };
}

/**
 * Apply page meta to the document head. Updates <title>, meta
 * description, canonical link, OpenGraph and Twitter tags in place.
 * Creates missing tags if they're not already in index.html so
 * deep-linked pages still get the right head from a cold load.
 */
export function applyPageMeta(page: Page): void {
  if (typeof document === 'undefined') return;
  const meta  = pageMeta(page);
  const path  = pageToPath(page);
  const url   = `https://globalrelocationusa.com${path === '/' ? '' : path}`;
  const image = 'https://globalrelocationusa.com/og.svg';

  document.title = meta.title;
  upsertMeta('name',     'description',      meta.description);
  upsertLink('canonical', url);

  upsertMeta('property', 'og:title',        meta.title);
  upsertMeta('property', 'og:description',  meta.description);
  upsertMeta('property', 'og:url',          url);
  upsertMeta('property', 'og:image',        image);
  upsertMeta('property', 'og:type',         'website');
  upsertMeta('property', 'og:site_name',    'Global Relocation USA');

  upsertMeta('name',     'twitter:card',        'summary_large_image');
  upsertMeta('name',     'twitter:title',        meta.title);
  upsertMeta('name',     'twitter:description',  meta.description);
  upsertMeta('name',     'twitter:image',        image);
}

function upsertMeta(keyAttr: 'name' | 'property', keyValue: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${keyAttr}="${keyValue}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(keyAttr, keyValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * URL path → page id. Trailing slashes are ignored (so `/about/` and
 * `/about` both resolve). Unknown paths return 'home' so the router
 * defaults to the landing page.
 */
export function pathToPage(path: string): Page {
  if (!path) return 'home';
  const normalised = path === '/' ? '/' : path.replace(/\/+$/, '');
  /* Unknown paths resolve to 'not-found' rather than silently
   * serving the homepage. NotFoundPage sets robots=noindex so
   * Google doesn't index the garbage URL, and the user sees a
   * proper 404 instead of a confusing home view. */
  return PATH_TO_PAGE[normalised] ?? 'not-found';
}

/** Page id → browser tab title. */
export function pageTitle(page: Page): string {
  return PAGE_TITLES[page] ?? 'Global Relocation USA';
}
