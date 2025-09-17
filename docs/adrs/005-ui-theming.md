**Status:** Accepted

## Context

We need a consistent UI/UX system across Android, iOS, and Web. The app requires:

- Light & dark theme support.
- A shared design language for typography, spacing, and colors.
- Reusable components (atoms → molecules → organisms) to reduce duplication.
- Fast developer workflow that fits with Expo/React Native.

Options considered included:

- **NativeWind (Tailwind for RN)** → utility-first, works with Expo, supports theming.
- **Styled Components / Emotion** → flexible but verbose, less performant.
- **React Native Paper / UI Kits** → prebuilt but restrictive for custom UI.

## Decision

We will use **NativeWind** as our UI/theming system.

- Theming will be configured in `tailwind.config.js`.
- Light/dark mode will follow the system preference by default (with manual override in Settings).
- We will establish a **component hierarchy**:
  - **Atoms** (Button, Text, Input, Card, Divider)
  - **Molecules** (ExpenseRow, CategorySelector, ExpenseForm)
  - **Organisms** (ExpenseList, SavingsSummary, SettingsForm)
- A `ThemeProvider` will wrap the app in `_layout.tsx` to provide theme context.

## Consequences

- ✅ Consistent design language across web & mobile.
- ✅ Rapid prototyping with Tailwind utilities.
- ✅ Dark mode support out-of-the-box.
- ❌ Some learning curve for developers new to utility-first styling.
- ❌ Need discipline in organizing components to avoid “class soup.”
