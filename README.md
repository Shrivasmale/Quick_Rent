# QuickRent (React + Tailwind CSS)

QuickRent is a high-performance rental marketplace built as a pure client-side application powered by **React 19, Tailwind CSS, and Vite** using local state and persistent storage (`localStorage`).

---

## 1. System Architecture

- **Frontend Client:** React 19 Single Page Application with Tailwind CSS and Vite.
- **State Management:** Fully responsive local client state and `localStorage` caching for items, rentals, and user profiles.
- **Security & Privacy:** Zero external backend calls; runs completely offline and locally.

---

## 2. Directory Structure

```
Quickrent/
└── frontend/                   # React + Tailwind CSS client application
    ├── src/
    │   ├── components/         # Shared UI components (Navbar, Footer, AuthModal, ListingCard)
    │   ├── context/            # Local AuthContext for session & profile management
    │   ├── hooks/              # Query hooks (useItems, useRentals, useLocalStorage)
    │   ├── middleware/         # ErrorBoundary & ProtectedRoute
    │   ├── pages/              # Application pages (Hero, Rent, List, Profile, Legal)
    │   └── utils/              # Printable receipt generator
    ├── tailwind.config.js      # QuickRent brand color palette & design tokens
    └── vercel.json             # SPA rewrites & security headers
```

---

## 3. Getting Started Locally

### Prerequisites
- Node.js >= 20.0.0
- npm >= 10.0.0

### Run Local Frontend
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.
