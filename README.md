#  Mini Fintech Dashboard

A modern, brutalist-inspired personal finance dashboard built with React, TypeScript, and Vite.  
Track income, expenses, and savings in real time with zero backend setup.

[Live Demo](https://finance-tracker-kohl-beta.vercel.app/) •
[Source Code](https://github.com/muhammeddishanv/finance_tracker)

---

##  Overview

Mini Fintech Dashboard is a fully client-side application for managing personal finances. Users can log income and expenses, categorize transactions, filter their history, and visualize spending through an interactive donut chart – all persisted in the browser via `localStorage`.

The project is structured like a production-ready front-end: presentation components, domain logic, and persistence concerns are clearly separated, making the codebase easy to extend (e.g., moving from `localStorage` to an API later).

---

## Features

### 1. Dynamic Financial Dashboard

- Real-time cards for **Total Income**, **Total Expense**, and **Net Balance**.
- Automatic detection of the **top spending category**.
- Contextual financial insight banner (e.g., “You are saving money this month. Great job!”) based on your current balance and spending.

### 2. Transaction Management

- Add **Income** or **Expense** with:
  - Amount
  - Type (Income / Expense)
  - Category (Salary, Business, Food, Shopping, Health, Entertainment, etc.)
  - Date
  - Optional note
- Edit and delete existing transactions.
- Recent transactions list/table with:
  - Color-coded categories
  - Clear negative (expense) and positive (income) styling.

### 3. Filtering & Search

- Filter transactions by:
  - Type: All / Income / Expense
  - Category
  - Date range (From / To)
- Filter panel is always visible on desktop; on mobile it’s presented in a focused screen.

### 4. Analytics & Visualization

- Interactive **donut chart** using Recharts to show expenses by category.
- Percentage labels for each category to quickly understand spending distribution.
- Dedicated **Analytics** tab for a focused visualization view on mobile.

### 5. Local-First Data Persistence

- All data is stored in browser `localStorage`.
- No backend, no external APIs, and no authentication required.
- Perfect for instant usage, demos, and static hosting.

---

## UI & UX

- Brutalist-inspired design:
  - Thick borders
  - High contrast
  - Vivid accent colors (`neo-lime`, warning tones)
  - Strong drop shadows and card outlines
- Fully responsive:
  - **Mobile**: bottom tab navigation (Dashboard / Transactions / Analytics), large tap targets, slide-up transaction form.
  - **Desktop**: multi-column layout with dashboard cards, filters, table, and chart visible at once.
- Iconography via Lucide React for a clean, consistent icon set.

---

## Tech Stack

**Frontend**

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Recharts
- Lucide React

**State Management**

- React hooks: `useState`, `useEffect`, `useCallback`, `useMemo`
- Custom hooks:
  - `useTransactions` – CRUD operations, aggregations, and derived metrics
  - `useTransactionFilters` – filter logic and derived filtered lists

**Storage Layer**

- Browser `localStorage` via a small service layer (get/set/clear helpers)

**Tooling**

- npm (package manager)
- Vite dev server and build system

---

##  Folder Structure

```text
mini-fintech-dashboard/
├── src/
│   ├── components/         # Reusable UI & layout components
│   ├── constants/          # Categories, labels, color tokens, etc.
│   ├── hooks/              # Custom hooks (transactions, filters)
│   ├── services/           # localStorage service and helpers
│   ├── types/              # Shared TypeScript types & interfaces
│   ├── utils/              # Pure helper/formatter functions
│   ├── App.tsx             # Application shell and view switching
│   ├── index.css           # Global styles, Tailwind, brutalist tokens
│   └── main.tsx            # React entry point (Vite bootstrap)
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

This structure ensures UI components remain presentation-focused while business logic sits in hooks and services.

---

##  Getting Started

### Prerequisites

- Node.js **v18+**
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/muhammeddishanv/finance_tracker.git
cd finance_tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

Open the URL printed in the terminal, typically:

```text
http://localhost:5173
```

Vite provides fast hot module replacement (HMR) for a smooth dev experience.

---

##  Building for Production

### Build

```bash
npm run build
```

This outputs an optimized production bundle to the `dist` directory.

### Preview (Optional)

```bash
npm run preview
```

### Deploy

Because this is a static, client-side app, you can deploy the `dist` folder to any static hosting provider:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Nginx / Apache static hosting

No server code is required.

---

##  Implementation Notes

- **LocalStorage Service**  
  All persistence logic is wrapped in a dedicated service module. Components and hooks never interact with `localStorage` directly; they consume higher-level functions like `getTransactions()` and `saveTransactions()`.

- **Derived Metrics via `useMemo`**  
  Totals, net balance, top spending category, and chart data are derived from the raw transaction list using memoized selectors to avoid unnecessary recalculation on each render.

- **Filter Pipeline**  
  Filtering by type, category, and date range is handled in `useTransactionFilters`. Components receive pre-filtered lists and do not re-implement filter logic, which keeps the UI lean and easy to maintain.

- **Responsive Layout with Tailwind**  
  Tailwind utility classes are used to define breakpoints and grid behavior. Mobile and desktop layouts share components but adjust structure using responsive utility variants.

---

##  Roadmap / Possible Extensions

These are natural next steps if you want to evolve this project:

- User authentication (JWT / OAuth) and cloud sync (Firebase / Supabase).
- Multi-currency support and basic FX conversion.
- Budgeting features (monthly limits per category, alerts).
- CSV / PDF export of transactions.
- Dark mode with a brutalist-friendly color palette.
- Recurring transactions and reminders.

---

##  Assumptions & Limitations

- Data is **local-only**. Clearing browser storage or switching devices will reset all data.
- Default currency formatting targets INR (`₹`), but amounts are stored as numeric values and can be re-formatted per locale.
- Dates are interpreted in the user’s local timezone.

---

##  Author

**Muhammed Dishan V – Software Engineer**

- GitHub: [@muhammeddishanv](https://github.com/muhammeddishanv)

---

## License

This project is licensed under the **MIT License**.  
