## Status

Accepted

## Context

The app must run on Android, iOS, and Web from a single RN codebase, talk to Supabase (Postgres + RLS + Edge Functions), support quick/low-friction expense entry, work reliably offline, and keep data consistent when connectivity returns. We need a clear split between:

- **Server state** (remote, cacheable, shared)
- **Local/UI state** (ephemeral, per-session or per-device)
- **Data access** (repositories, offline queue, sync)

## Decision

We will use:

- **TanStack React Query v5** for **server state** (queries + mutations), with **persisted cache**:
  - Native: AsyncStorage
  - Web: localStorage
- **Zustand** for **local/UI/application state** (filters, UI flags, in-progress input, widget config) with `immer` and optional `persist` per-slice.
- **react-hook-form** for forms (RN + Web).
- **Repository pattern** in the Data layer:
  - Domain defines interfaces (e.g., `ExpenseRepository`).
  - Data layer provides implementations (Supabase-backed, optional offline-enhanced).
- **Offline-first** behavior:
  - **Reads**: hydrate from persisted React Query cache, then background revalidate.
  - **Writes**: optimistic updates via React Query mutations. If offline, **enqueue to an Outbox** (Zustand + AsyncStorage or expo-sqlite). On reconnect, flush the queue and reconcile.
- **Supabase** for remote CRUD/RPC/Realtime. Realtime events may trigger React Query invalidations for multi-device consistency.
- **Edge Functions** for NLP parsing and heavy/expensive aggregations when needed.

### Dependency Direction

Presentation → Domain → Data.

UI does not import Supabase directly; it calls domain use cases/hooks that rely on repositories.

## Consequences

**Positive**

- Fast UX with cached reads and optimistic writes.
- Clear separation of concerns: React Query handles server state; Zustand handles UI/application state.
- Testable domain logic; data layer can swap implementations (pure-remote vs offline-first).
- Works across RN + Web with the same patterns and libraries.

**Negative / Trade-offs**

- Slight complexity to maintain an offline **outbox** and its reconciliation.
- Two state tools (React Query + Zustand) instead of a single “do-it-all” store.
- Need discipline to keep server state out of Zustand and infra out of Domain.

## Alternatives Considered

- **Redux Toolkit + RTK Query**: solid, but adds Redux ceremony; React Query already meets caching/offline needs without a global store.
- **SWR**: great for queries, weaker around mutations/offline/outbox compared to React Query.
- **MobX / Recoil**: good for local state; still need a server-state tool; doesn’t beat React Query’s caching/offline ergonomics.
- **Apollo Client**: optimized for GraphQL; our backend is Supabase/PostgREST + RPC.
- **WatermelonDB-only offline**: powerful but heavier than needed for our tables; we only need a small outbox plus React Query persistence.

## Notes / Implementation Sketch

**Packages**

- `@tanstack/react-query`
- `@tanstack/query-persist-client-core`, `@tanstack/query-async-storage-persister` (native), `@tanstack/query-sync-storage-persister` (web)
- `zustand`, `zustand/middleware`, `immer`
- `react-hook-form`
- `@supabase/supabase-js`
- `@react-native-async-storage/async-storage` (native), `expo-secure-store` for secrets
- Optional: `expo-sqlite` if the outbox should be durable beyond AsyncStorage

**App providers**

```tsx
// app/providers/QueryProvider.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/query-persist-client-core";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMemo } from "react";

export function AppQueryProvider({ children }: { children: React.ReactNode }) {
  const client = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60, // 1 min
            refetchOnReconnect: true,
            refetchOnWindowFocus: false,
          },
        },
      }),
    []
  );

  useMemo(() => {
    const persister = createAsyncStoragePersister({ storage: AsyncStorage });
    persistQueryClient({
      queryClient: client,
      persister,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });
  }, [client]);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
```
