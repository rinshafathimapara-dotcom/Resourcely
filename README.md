# Green School AI

Stage 1 of a sustainability and resource management application for schools. Built with React, Vite, TypeScript, Tailwind CSS, React Router, Lucide, and Recharts. **All records are demo data.** No Supabase credentials are required to run it.

## Run

Requires Node.js 22.12+ (Node 24 is verified) and npm.

```sh
npm ci
npm run dev
```

Open the local address printed by Vite in your own development environment. Start at `/` or `/app/dashboard`.

```sh
npm run build       # strict TypeScript check and production build
npm run preview     # serve the production build
npm run test:smoke  # browser checks against a running dev server on port 5173
```

The smoke script uses system Chromium at `/usr/bin/chromium`. Override `CHROMIUM_PATH` for another installation, or `SMOKE_BASE_URL` to test a different server. It checks demo totals, reserved-stock arithmetic, chart rendering, every workspace route, the auth boundary, mobile navigation, and responsive overflow. It writes screenshots to `/tmp`.

## What's implemented

- Responsive landing page and dashboard, desktop sidebar, mobile navigation, active routes, and 404 page.
- Sample procurement and inventory values, recorded waste, electricity and water consumption, spending and energy charts, low-stock alerts, pending order count, and activity.
- Available stock is usable stock minus reserved stock. Dashboard totals are school-wide demo summaries; the inventory table is a small sample subset.
- Reusable panels, metrics, headings, loading, empty, and error components. Dashboard service errors have a retry action.
- Login and registration presentation with browser form validation. **These forms do not authenticate, send, or store credentials.** Demo access is separate and unrestricted.
- Dedicated, clearly labelled placeholders for later workflows. Navigation does not imply those workflows are implemented.
- Dashboard chart code is loaded on demand to keep the landing bundle smaller.

## Project structure

```text
src/
  components/  # navigation shell and shared UI
  pages/       # landing, dashboard, auth, later-stage route states
  services/    # typed demo adapter and sample records
  types/       # domain and service contracts
  lib/         # optional Supabase client, without database queries
  styles.css   # responsive design system and Tailwind import
scripts/       # reproducible browser smoke check
public/        # local icon; no external fonts or asset services required
```

## Backend handoff — Stage 2

Your teammate owns the final database schema, relationships, RLS policies, and authentication setup. No SQL or database queries have been invented here. Copy `.env.example` to `.env` and provide `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` only when ready. These are browser-visible settings; **never add service-role or secret keys**.

`src/lib/supabase.ts` exports a client when configured. This does **not** switch off demo mode: `src/services/schoolService.ts` deliberately stays a demo adapter until the actual schema is integrated. Add real auth, membership checks, RLS-aware queries, and backend loading/error handling in Stage 2. The category metadata distinguishes consumables, utilities, reusable assets, and transport; transaction models will be agreed with the backend.

## Later stages

Stage 3: resource transactions, utility readings, assets, suppliers, and purchases.
Stage 4: deterministic forecasting, reservations and incoming orders, editable purchase orders, approval history, exports, and sustainability calculations. Reduced purchasing must not be presented as reduced waste. No emissions estimate is shown without a documented factor.
Stage 5: integration tests, deployment verification, and installable PWA support. Offline caching and PWA installation are not implemented yet.

## Deployment

Vercel: use the Vite preset, `npm run build`, and output directory `dist`. `vercel.json` supplies SPA route fallbacks. Deployment and Supabase production behavior have not been verified in Stage 1.

## Cloud development

Use the existing `/workspace/Resourcely` checkout. Cloud tasks are already isolated; do not create a Git worktree unless explicitly requested. Dependencies and files can survive a snapshot, but the Vite process must be restarted. Saved environment installation/startup instructions reproduce these commands. No additional service or credential is needed for the demo.
