# Code Quality Standards Guide

This guide defines the code quality standards, linting rules, and formatting conventions for the MoneyMap project.

## Overview

Our code quality strategy focuses on:

- **Consistency** across the entire codebase
- **Automation** to reduce manual overhead
- **Clarity** for better maintainability
- **Type Safety** with TypeScript

## ESLint Configuration

### Current Rules

#### JavaScript/TypeScript Rules

```javascript
// eslint.config.js
{
  rules: {
    'no-unused-vars': 'warn',        // Warn about unused variables
    'no-console': 'warn',            // Warn about console statements
    'prefer-const': 'error',         // Require const for never-reassigned variables
  }
}
```

#### File Patterns

- **Target files**: `*.{ts,tsx,js,jsx}`
- **Excluded**: `node_modules/`, `dist/`, `build/`
- **Configuration**: `eslint.config.js` (ESLint v9 flat config)

### Rule Explanations

#### `no-unused-vars: 'warn'`

- **Purpose**: Identify unused variables that may indicate dead code
- **Impact**: Helps maintain clean, efficient code
- **Auto-fix**: No (requires manual removal)

#### `no-console: 'warn'`

- **Purpose**: Flag console statements that shouldn't be in production
- **Impact**: Prevents accidental console logs in production
- **Auto-fix**: No (requires manual removal or proper logging)

#### `prefer-const: 'error'`

- **Purpose**: Enforce const for variables that are never reassigned
- **Impact**: Prevents accidental reassignment and improves code clarity
- **Auto-fix**: Yes (ESLint can fix automatically)

## Prettier Configuration

### Current Settings

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### Formatting Rules

#### Semicolons

- **Required**: Yes (`"semi": true`)
- **Rationale**: Prevents ASI (Automatic Semicolon Insertion) issues
- **Example**: `const name = 'John';`

#### Quotes

- **Style**: Single quotes (`"singleQuote": true`)
- **Rationale**: Consistent with React/JSX conventions
- **Example**: `const message = 'Hello world';`

#### Trailing Commas

- **Style**: ES5 compatible (`"trailingComma": "es5"`)
- **Rationale**: Better git diffs and easier array/object modifications
- **Example**:
  ```javascript
  const colors = [
    'red',
    'green',
    'blue', // trailing comma
  ];
  ```

#### Line Length

- **Width**: 80 characters (`"printWidth": 80`)
- **Rationale**: Better readability and code review experience
- **Auto-wrap**: Prettier handles line breaking automatically

## Pre-commit Workflow

### Automatic Checks

When you commit, the following happens automatically:

1. **lint-staged** identifies staged TypeScript/JavaScript files
2. **ESLint** runs with `--fix` flag to auto-fix issues
3. **Prettier** formats the code consistently
4. **Git** stages the fixed files
5. **Commit** proceeds if all checks pass

### Manual Quality Checks

#### Lint All Files

```bash
pnpm lint
```

#### Format All Files

```bash
pnpm format
```

#### Fix Linting Issues

```bash
pnpm lint --fix
```

## TypeScript Standards

### Type Safety

- **Strict mode**: Enabled in `tsconfig.json`
- **No implicit any**: All variables must have explicit types
- **Null checks**: Required for potentially null values

### Type Definitions

```typescript
// Good: Explicit types
interface User {
  id: string;
  name: string;
  email: string;
}

// Good: Type inference where clear
const users: User[] = [];

// Avoid: Implicit any
const data = someFunction(); // Bad
const data: UserData = someFunction(); // Good
```

### Import/Export Standards

```typescript
// Prefer named exports
export const calculateTotal = (items: Item[]) => {
  /* ... */
};

// Use default exports sparingly
export default class UserService {
  /* ... */
}

// Group imports logically
import React from 'react';
import { useState, useEffect } from 'react';
import { User, UserService } from '../types';
import { formatCurrency } from '../utils';
```

## File Organization Standards

### Naming Conventions

- **Files**: kebab-case (`user-service.ts`, `expense-form.tsx`)
- **Components**: PascalCase (`UserProfile`, `ExpenseForm`)
- **Functions/Variables**: camelCase (`getUserData`, `isLoading`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`, `MAX_RETRY_ATTEMPTS`)

### Directory Structure

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

## Code Review Standards

### What to Look For

- **Type safety**: Proper TypeScript usage
- **Performance**: Efficient algorithms and React patterns
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Security**: Input validation and secure data handling
- **Testing**: Appropriate test coverage

### Review Checklist

- [ ] Code follows established patterns
- [ ] TypeScript types are properly defined
- [ ] No console.log statements in production code
- [ ] Error handling is appropriate
- [ ] Performance implications considered
- [ ] Accessibility requirements met
- [ ] Tests cover new functionality

## Common Issues and Solutions

### ESLint Errors

#### Unused Variables

```typescript
// Problem
const unusedVar = 'not used';

// Solution: Remove or use the variable
const usedVar = 'actually used';
console.log(usedVar);
```

#### Console Statements

```typescript
// Problem
console.log('Debug info');

// Solution: Use proper logging or remove
// For development debugging, use:
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info');
}
```

#### Prefer Const

```typescript
// Problem
let name = 'John';
// name is never reassigned

// Solution
const name = 'John';
```

### Prettier Issues

#### Line Length

```typescript
// Problem: Long line
const veryLongVariableName = someFunctionWithManyParameters(
  param1,
  param2,
  param3,
  param4,
  param5
);

// Solution: Let Prettier handle it
const veryLongVariableName = someFunctionWithManyParameters(
  param1,
  param2,
  param3,
  param4,
  param5
);
```

## Enforcement

### Automatic Enforcement

- **Pre-commit hooks** prevent bad code from being committed
- **CI/CD pipeline** catches issues in pull requests
- **IDE integration** provides real-time feedback

### Manual Enforcement

- **Code reviews** ensure quality standards
- **Regular audits** of codebase quality
- **Team training** on standards and tools

## Tools and IDE Setup

### VS Code Extensions

- **ESLint**: Real-time linting
- **Prettier**: Code formatting
- **TypeScript**: Type checking
- **Auto Rename Tag**: HTML/JSX tag management

### Settings

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["typescript", "typescriptreact"]
}
```

## Continuous Improvement

### Regular Reviews

- **Monthly**: Review and update linting rules
- **Quarterly**: Assess tooling effectiveness
- **Annually**: Evaluate overall code quality strategy

### Feedback Loop

- **Team feedback** on rule effectiveness
- **Performance monitoring** of pre-commit hooks
- **Error tracking** for common issues

### Rule Evolution

- **Add rules** based on common issues
- **Remove rules** that don't add value
- **Adjust severity** based on team needs
