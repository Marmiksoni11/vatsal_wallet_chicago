# 🌬 WindyWallet — Next.js + TypeScript + Tailwind + Prisma

Chicago Loop–exclusive bill optimization platform.

## Stack

| Layer       | Tech                                  | Why                              |
|-------------|---------------------------------------|----------------------------------|
| Framework   | **Next.js 14** (App Router)           | Fullstack, file-based routing    |
| Language    | **TypeScript**                        | Full type safety across the app  |
| Styling     | **Tailwind CSS v3**                   | Utility-first, no CSS files      |
| Validation  | **Zod**                               | Runtime schema validation on API |
| Database    | **SQLite** (via Prisma)               | Zero-config, file-based DB       |
| ORM         | **Prisma**                            | Type-safe DB access              |

> **Zero separate backend** — Next.js API routes handle everything in one project.
> **SQLite** means no MongoDB/Postgres setup. The DB is a single `.db` file.

---

## Project Structure

```
windywallet/
├── package.json
├── next.config.js
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── prisma/
│   └── schema.prisma          ← SQLite schema
└── src/
    ├── app/
    │   ├── layout.tsx          ← root layout + fonts
    │   ├── page.tsx            ← wizard state + routing
    │   ├── globals.css         ← Tailwind directives + custom utilities
    │   └── api/
    │       ├── analyze/route.ts      ← POST /api/analyze
    │       └── submissions/route.ts  ← POST & GET /api/submissions
    ├── lib/
    │   ├── plans.ts            ← all curated plan data
    │   ├── engine.ts           ← recommendation engine (pure TypeScript)
    │   └── prisma.ts           ← Prisma client singleton
    ├── types/
    │   └── index.ts            ← shared TypeScript types
    └── components/
        ├── Header.tsx
        ├── ui.tsx              ← all shared UI primitives (Tailwind)
        ├── StepWelcome.tsx
        ├── StepCategories.tsx
        ├── StepBills.tsx
        ├── StepDiscounts.tsx
        └── StepResults.tsx
```

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up the database
```bash
npm run db:push
```
This creates `prisma/windywallet.db` (SQLite file). No MongoDB, no Postgres, no setup needed.

### 3. Start development server
```bash
npm run dev
```
→ App runs at **http://localhost:3000**
→ API routes live at **/api/analyze** and **/api/submissions**

### 4. (Optional) View the database
```bash
npm run db:studio
```
Opens Prisma Studio at http://localhost:5555 — visual DB browser.

---

## API Reference

### `POST /api/analyze`
```json
{
  "zip": "60601",
  "categories": ["mobile", "internet", "transit", "insurance"],
  "bills": {
    "mobile":    { "provider": "AT&T", "cost": 85, "data": "unlimited", "lines": 1, "hotspot": true, "intl": false },
    "internet":  { "provider": "Comcast Xfinity", "cost": 75, "speed": 300, "datacap": "no" },
    "transit":   { "mode": "rideshare", "cost": 200, "freq": 10, "commute": "loop-only" },
    "insurance": { "insType": "renters", "cost": 45, "deductible": 500, "coverage": "standard" }
  },
  "discounts": ["senior"],
  "childCount": 0
}
```

### `GET /api/submissions`  — last 20 analyses
### `POST /api/submissions` — save an analysis record

---

## Deploy to Vercel (1 command)
```bash
npx vercel
```
> For production, switch Prisma to PostgreSQL by updating `schema.prisma` datasource and setting `DATABASE_URL` in environment variables.

---

## Accepted ZIP Codes
`60601` `60602` `60603` `60604` `60605` `60606` `60607` `60611` `60616` `60661`
