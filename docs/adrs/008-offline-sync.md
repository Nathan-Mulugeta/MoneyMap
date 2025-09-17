Status: accepted

### Context

The app is expected to work **reliably offline**. Users must be able to log expenses and transfers even when no internet is available. Later, when connectivity resumes, all local changes should sync with the backend. Since this involves money, we need to ensure **no data loss, consistent balances, and transparent conflict resolution**.

---

### Decision

- **Local Storage:**
  Use SQLite (via WatermelonDB, Drizzle, or Expo SQLite) for offline persistence.
- **Outbox Pattern:**
  All writes (create/update/delete) are first applied locally and also written to a pending “outbox” queue.
- **Sync Worker:**
  When network is available, the sync worker processes the outbox and sends the mutations to Supabase.
- **Realtime Updates:**
  Supabase subscriptions keep the local cache up-to-date when online.
- **Conflict Resolution:**
  - Server is the **source of truth**.
  - If client & server conflict → server wins.
  - Client logs a “conflict” entry so the user can manually review if needed.
- **IDs:**
  Client generates UUIDs offline. On sync, server accepts those UUIDs to avoid ID collisions.

---

### Consequences

- **Pros:**
  - Fast UX (instant offline logging).
  - Reliable sync with replay semantics.
  - Works across multiple accounts/devices.
- **Cons:**
  - More complex local DB layer.
  - Requires careful testing of conflict scenarios.

---

✅ With this, we now have:

- **Migrations (initial schema in Supabase).**
- **ADR (Offline & Sync Strategy).**
