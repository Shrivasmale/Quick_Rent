# QuickRent Production Architecture (React + Tailwind CSS + Supabase)

QuickRent is a high-performance rental marketplace built on a serverless microservices architecture powered by **React.js + Tailwind CSS** on the frontend and **Supabase (PostgreSQL 16 + Row-Level Security, Deno Edge Function Microservices, Supabase Auth, and Storage)** on the backend.

---

## 1. System Architecture

- **Frontend Client:** React SPA with Tailwind CSS, Vite, and PKCE-secured Supabase Auth client.
- **API Gateway & Edge Middleware:** Deno TypeScript microservices with sliding-window rate limiting, Idempotency-Key locks, CORS origin allowlists, and HMAC webhook verification.
- **Database & Storage:** PostgreSQL 16 with schemas (`public`, `rentals`, `payments`, `audit`), 100% RLS enforcement, and `btree_gist` exclusion constraints preventing double-bookings.
- **Storage:** Public `item-images` bucket for catalog photos and private `rental-receipts` bucket with short-lived Signed URLs.

---

## 2. Directory Structure

```
Quickrent/
├── .github/workflows/          # CI/CD workflows for linting, tests, and deployment
├── supabase/                   # Supabase backend (DB migrations, RLS, Edge Functions)
│   ├── config.toml             # Local Supabase CLI configuration
│   ├── seed.sql                # Deterministic seed data
│   ├── migrations/             # Versioned SQL migrations & RLS policies
│   ├── tests/database/         # pgTAP automated RLS test suites
│   └── functions/              # Deno Edge Function microservices
└── frontend/                   # React + Tailwind CSS client application
    ├── src/
    │   ├── components/         # Shared UI components (Navbar, Footer, AuthModal)
    │   ├── context/            # AuthContext subscribing to Supabase auth events
    │   ├── hooks/              # Query and mutation hooks (useItems, useRentals)
    │   ├── lib/                # Hardened Supabase PKCE client singleton
    │   ├── middleware/         # Edge API client wrapper & ProtectedRoute
    │   ├── pages/              # Application pages (Hero, Rent, List, Profile)
    │   └── utils/              # Secure receipt signed URL generator
    ├── tailwind.config.js      # QuickRent brand color palette & design tokens
    └── vercel.json             # SPA rewrites & Content-Security-Policy headers
```

---

## 3. Getting Started Locally

### Prerequisites
- Node.js >= 20.0.0
- Docker Desktop (for local Supabase CLI)
- Supabase CLI (`npm install -g supabase`)

### 1. Start Local Supabase
```bash
npm run supabase:start
```

### 2. Run Local Frontend
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173).
