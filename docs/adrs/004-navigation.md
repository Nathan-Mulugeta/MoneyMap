**Status:** Accepted

## Context

Our app must run on **Android, iOS, and Web** from a single React Native codebase. Navigation needs to:

- Work seamlessly across platforms.
- Support deep linking (open app directly to a screen via a link).
- Provide **mobile-first navigation patterns** (stacks, tabs, drawers).
- Provide **web-friendly routing** with clean URLs (e.g. `/expenses/new`).
- Fit within our **feature-first folder structure** and not conflict with state/data layers.

Two major ecosystems exist: **React Navigation** (mobile-first, partial web support) and **React Router/Expo Router** (web-first, newer file-based convention).

---

## Decision

We will use **Expo Router** as our navigation system.

- Expo Router builds on **React Navigation**, so mobile support remains first-class.
- It enables **file-based routing**: folder structure in `app/` defines routes automatically.
- Web automatically gets **clean URLs** without custom setup.
- Deep linking works consistently across platforms.
- Navigation code remains declarative and colocated with features.

This provides the best balance between simplicity, convention, and cross-platform parity.

---

## Alternatives Considered

1. **React Navigation only**
   - ✅ Battle-tested on mobile
   - ❌ Weak URL handling on web
   - ❌ More boilerplate for route definitions
2. **React Router only**
   - ✅ Excellent for web
   - ❌ Lacks mobile-native navigation patterns out of the box
   - ❌ Limited ecosystem in React Native world
3. **Hybrid (React Navigation mobile, React Router web)**
   - ✅ Best-in-class for each platform
   - ❌ Requires abstraction layer
   - ❌ Splits mental model for developers
   - ❌ Higher maintenance burden

---

## Consequences

- ✅ Unified navigation across all platforms (one system to learn).
- ✅ File-based routing reduces boilerplate and enforces convention.
- ✅ Web gets proper URLs and SEO-friendly routes.
- ✅ Mobile keeps stack/tab/drawer paradigms from React Navigation.
- ⚠️ Developers must follow Expo Router’s file conventions (`app/` folder).
- ⚠️ Some advanced React Navigation features may require Expo Router-specific workarounds.

---

## Example

```
app/
  _layout.tsx           # Root layout (providers, QueryClient, theme)
  index.tsx             # Dashboard
  expenses/
    index.tsx           # List
    new.tsx             # Create new expense
    [id].tsx            # Expense details (dynamic route)
  settings.tsx

```

On **web**, visiting `/expenses/new` opens the expense creation form.

On **mobile**, navigation uses the stack pattern automatically.
