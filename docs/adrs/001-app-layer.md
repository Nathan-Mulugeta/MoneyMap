## Status

Accepted

## Context

We are building a personal finance application using React Native (single codebase for Android, iOS, Web), Supabase (Postgres + RLS + edge functions), and serverless functions (for NLP).

To ensure scalability, maintainability, and testability, we need a clear separation of concerns. Without a layered structure, UI code could directly interact with the database or external APIs, leading to technical debt and difficulty in testing or evolving the system.

## Decision

We adopt a **3-layer architecture**:

### Presentation Layer

- **Responsibility**: User interface, navigation, theming, widgets, and interaction handling.
- **Technologies**: React Native, React Navigation, Expo Router, NativeWind.
- **Rules**:
  - No direct database or API calls.
  - Only interacts with the **Domain layer** through use cases and React Query hooks.

### Domain Layer

- **Responsibility**: Core business logic. Defines entities, value objects, and use cases.
- **Technologies**: Pure TypeScript (no React, no Supabase SDK).
- **Rules**:
  - Must be framework-agnostic and testable in isolation.
  - Enforces invariants (e.g., expense amount > 0).
  - Handles business logic like multi-currency aggregation, summaries, categorization, and savings calculations.

### Data Layer

- **Responsibility**: Data persistence and external integrations.
- **Technologies**: Supabase client, serverless functions, React Query, AsyncStorage/SQLite for offline persistence, currency conversion API, voice-to-text services.
- **Rules**:
  - Implements repositories that map DB records ↔ Domain entities.
  - Responsible for persistence, caching, and syncing.
  - Must not leak infrastructure details into the Domain layer.

### Dependency Direction

- Presentation → Domain → Data (one-way only).
- No circular dependencies.
- Example:
  - ✅ `AddExpenseScreen` → calls `addExpense()` use case.
  - ✅ `addExpense()` → uses `ExpenseRepository`.
  - ❌ UI must not import `supabase.from(...)` directly.

### Cross-Cutting Concerns

- **Authentication & Security**: handled in Data layer (Supabase RLS, edge functions), surfaced to Domain as authorized operations.
- **Error Handling**: Domain defines business errors; Presentation decides how to display them.
- **Logging & Observability**: injected where needed but separated from business logic.

## Consequences

- ✅ Clear separation of concerns.
- ✅ Easier unit testing of domain logic without UI or DB dependencies.
- ✅ Ability to replace data sources (e.g., switch from Supabase to local DB) with minimal changes.
- ✅ Consistent rules across platforms (mobile, web, widget).
- ❌ Adds initial complexity with multiple layers.
- ❌ Requires discipline to respect boundaries (e.g., UI developers must not bypass Domain to call Supabase).
