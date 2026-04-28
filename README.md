# Global Relocation USA

A nationwide relocation coordination marketplace connecting customers with
licensed movers, relocation crews, storage providers, and packing services
across the United States.

This website is a **second public brand** that shares the same Supabase
backend, edge functions, and internal booking logic as
[Flyttgo Relocation Marketplace USA](https://github.com/icofcucam/flyttgo-relocation-marketplace-usa).
Both sites read and write to the same database, the same `bookings` table,
the same Stripe checkout edge function, and the same realtime tunnels —
they are simply two different fronts on a shared backend.

## What's inside

- **Vite + React + TypeScript** SPA (mirrors the Flyttgo build pipeline)
- **TailwindCSS + shadcn/ui** components
- **Supabase** auth, Postgres, and edge functions for booking flow
- **Stripe** checkout integration via shared edge functions
- **Leaflet** for real-time delivery tracking
- **i18next** for internationalization
- **react-router-dom** for client-side routing
- **TanStack Query** for server-state caching

## Local development

```bash
npm install
cp .env.example .env.local       # fill in real values (see below)
npm run dev                       # http://localhost:8080
```

## Environment variables

Set these locally in `.env.local` and on Vercel under
**Project → Settings → Environment Variables**. Use the **same Supabase
project** as Flyttgo so both sites share data.

| Variable | Purpose |
| --- | --- |
| `VITE_SUPABASE_URL` | Shared Supabase project URL (same as Flyttgo) |
| `VITE_SUPABASE_ANON_KEY` | Shared Supabase anon key (same as Flyttgo) |
| `VITE_GOOGLE_MAPS_API_KEY` | Address autocomplete on the booking flow |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe checkout (optional) |

Because the Vercel ↔ Supabase integration is enabled on the Flyttgo
project, the recommended setup is to source these from that linked
Supabase project so the deployed site always talks to the same database
as Flyttgo and CI.

## Deploy to Vercel

```bash
# One-time setup
npm i -g vercel
vercel link                       # link to a new Vercel project
vercel env add VITE_SUPABASE_URL  # repeat for each variable above

# Deploy
vercel --prod
```

The included `vercel.json` rewrites all paths back to `/` so client-side
routing works for `/marketplace`, `/cities`, `/auth/callback`, etc.

## Backend / shared infrastructure

The Supabase edge functions in `supabase/functions/` are kept in this
repo as **documentation only**. They are not redeployed from this site —
they live in the shared Supabase project (the one Flyttgo also points
at). Schema migrations, RLS policies, function deployments, and the
Stripe webhook all happen out of the Flyttgo repo.

## Branding vs. logic

- All visible brand text (titles, headers, footer, social previews,
  legal pages) is **Global Relocation USA**.
- All internal table names, RPC names, edge function names, storage
  bucket names, and event payloads are **identical** to Flyttgo so the
  shared backend works without any changes.

## Repo layout

```
src/
  components/    UI components (Header, Footer, BookingFlow, dashboards…)
  pages/         Route-level pages
  hooks/         React hooks (notifications, driver beacon, mobile)
  lib/           supabase client, auth, store, constants, i18n
  utils/         helpers
supabase/
  functions/     edge function source (deployed from Flyttgo project)
public/          static assets, manifest, OG image
```
