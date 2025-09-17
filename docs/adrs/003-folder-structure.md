**Status:** Accepted

**Context:**

We are building a **cross-platform personal finance app** (React Native + Supabase + Serverless). The app will evolve with multiple domains (expenses, categories, savings, NLP, etc.). A poor folder structure leads to spaghetti code, hard onboarding, and unscalable maintenance. We need a structure that supports:

- **Layered architecture** (presentation, domain, data).
- **Feature modularity** (expenses, categories, savings, NLP).
- **Monorepo setup** (mobile, web, serverless, shared packages).
- **Separation of concerns** (UI vs. state vs. API).

**Decision:**

Adopt a **feature-first folder structure** with **layered subfolders** (`ui/`, `model/`, `api/`, `types.ts`) inside each feature. At the repo root:

- `apps/` for mobile/web clients.
- `serverless/` for Supabase edge functions.
- `packages/` for shared UI, utils, and types.

Mobile app example (`apps/mobile/src`):

```
features/
  expenses/
    ui/            # Screens and components (React Native / Web)
    model/         # State management (Zustand, React Query hooks)
    api/           # Repository functions (Supabase queries)
    types.ts       # TypeScript types for expenses
  categories/
  savings/
components/        # Reusable UI widgets (Button, Card, Input)
lib/               # Utilities (currency, date, logger)
hooks/             # Cross-feature custom hooks
store/             # Global Zustand stores (auth, theme)
styles/            # NativeWind + theme configuration
providers/         # React Context providers (QueryClient, Auth, Theme)
navigation/        # Navigation setup (Expo Router / React Navigation)
config/            # Env config (API keys, endpoints)
tests/             # Unit/integration tests

```

**Alternatives Considered:**

1. **Layer-first (components/screens/services):** Simple for small apps but does not scale well. Developers struggle to find related logic across multiple top-level folders.
2. **Flat structure:** Quick setup but unmaintainable for multi-feature projects. Leads to high coupling and poor discoverability.

**Consequences:**

- ✅ **Pros:** Feature modularity, discoverability, testability, easier onboarding, monorepo-friendly.
- ⚠️ **Cons:** Slight upfront boilerplate (each feature gets `ui/`, `model/`, `api/` even if small initially).

**Status Updates:**

- To be revisited if project scope drastically reduces (single-feature) or if modularization becomes overkill.
