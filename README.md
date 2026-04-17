# Chiben Properties

Premium UK real estate marketing site with admin CMS, built by [Cyco Media](https://cycomedia.com).

## Overview

A full-stack Next.js application with two distinct surfaces:

- **Public site** — 5 pages (Homepage, Properties, Property Detail, About, Contact) for prospective buyers and vendors
- **Admin CMS** — password-protected dashboard for managing property listings and enquiries

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript strict) |
| Styling | Tailwind CSS + CSS custom properties |
| Database | Supabase (Postgres + Row Level Security) |
| Auth | Supabase Auth (email/password) |
| Image Storage | Supabase Storage |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project (schema already applied — see below)
- A Vercel account (for deployment)

### Local Development

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd chiben-properties
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the project root:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   NEXT_PUBLIC_SITE_URL=https://chibenproperties.co.uk
   ```

   Find these values in your Supabase dashboard under **Project Settings → API**.

4. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

---

## Supabase Setup

### Database Schema

The following tables are required. Run this SQL in your Supabase **SQL Editor**:

```sql
create table properties (
  id               uuid        primary key default gen_random_uuid(),
  slug             text        unique not null,
  title            text        not null,
  description      text,
  price            numeric,
  price_qualifier  text        default 'Guide Price',
  status           text        default 'available',
  type             text,
  tenure           text,
  bedrooms         int,
  bathrooms        int,
  reception_rooms  int,
  square_footage   int,
  address_line1    text,
  address_line2    text,
  town             text,
  county           text,
  postcode         text,
  latitude         numeric,
  longitude        numeric,
  key_features     text[],
  epc_rating       text,
  council_tax_band text,
  local_authority  text,
  images           text[],
  cover_image      text,
  is_featured      boolean     default false,
  listed_at        timestamptz default now(),
  updated_at       timestamptz default now()
);

create table enquiries (
  id            uuid        primary key default gen_random_uuid(),
  name          text        not null,
  email         text        not null,
  phone         text,
  message       text,
  inquiry_type  text        default 'general',
  property_id   uuid        references properties(id),
  property_slug text,
  is_read       boolean     default false,
  created_at    timestamptz default now()
);

alter table properties enable row level security;
alter table enquiries   enable row level security;

create policy "Public read properties" on properties for select using (true);
create policy "Admin full access"      on properties for all    using (auth.role() = 'authenticated');
create policy "Public insert enquiry"  on enquiries  for insert with check (true);
create policy "Admin manage enquiries" on enquiries  for all    using (auth.role() = 'authenticated');

create or replace function update_updated_at_column()
returns trigger as $$ begin new.updated_at = now(); return new; end; $$ language plpgsql;

create trigger set_updated_at before update on properties
for each row execute function update_updated_at_column();
```

### Storage Bucket

Create a **public** bucket named `property-images` in **Storage → New bucket**.

### Admin User

Create the admin login in **Authentication → Users → Add user**. This email and password are used to sign in at `/admin/login`.

---

## Project Structure

```
chiben-properties/
├── app/
│   ├── (public)/           # Public-facing pages
│   │   ├── page.tsx        # Homepage
│   │   ├── about/
│   │   ├── properties/
│   │   └── contact/
│   ├── (admin)/            # Admin CMS
│   │   └── admin/
│   │       ├── login/
│   │       └── (cms)/      # Protected: dashboard, properties, enquiries
│   └── api/
│       └── contact/        # Contact form endpoint
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── ui/                 # Button, Badge, Input, etc.
│   ├── properties/         # PropertyCard, PropertyGrid, etc.
│   └── admin/              # AdminSidebar, PropertyForm, EnquiriesTable, etc.
├── lib/
│   └── supabase/           # Browser + server clients, types
└── middleware.ts            # Auth protection for /admin/*
```

---

## Admin CMS

Access the admin panel at `/admin/login`.

### Features

- **Dashboard** — live counts of properties and unread enquiries
- **Properties** — create, edit, and delete listings with full details, images, and key features
- **Enquiries** — view all contact form submissions with a slide-over detail panel; auto-marks as read on open

### Image Uploads

Images are uploaded directly to Supabase Storage (`property-images` bucket). The first image in the list becomes the cover image. Images can be reordered by dragging.

---

## Deployment (Vercel)

1. Push this repository to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add the four environment variables in **Project Settings → Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL`
4. Deploy — Vercel auto-deploys on every push to `main`

> Update `NEXT_PUBLIC_SITE_URL` to your live domain once deployed.

---

## Available Scripts

```bash
npm run dev        # Start development server at http://localhost:3000
npm run build      # Production build — must pass before deploying
npm run start      # Serve production build locally
npm run lint       # Run ESLint
```

### Regenerate TypeScript Types

Run after any Supabase schema change:

```bash
SUPABASE_ACCESS_TOKEN=your-pat npx supabase gen types typescript \
  --project-id your-project-ref > lib/supabase/types.generated.ts
```

---

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key — server-side only, never expose to browser | ✅ |
| `NEXT_PUBLIC_SITE_URL` | Live site URL used for metadata and OG tags | ✅ |

> `.env.local` is gitignored and must never be committed.

---

## Design System

The site uses a dual light/dark theme toggled from the navbar. Preference persists in `localStorage` under the key `chiben-theme`.

All colours are CSS custom properties in `app/globals.css`. The accent colour is gold (`#B8923A` light / `#C9A96E` dark). No hex values are hardcoded in components — always use the CSS variable.

---

Built by [Cyco Media](https://cycomedia.com) · © 2026 Chiben Properties
