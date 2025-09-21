# ADR-010: Code Quality & Linting Strategy

## Status

Accepted

## Context

We need to establish consistent code quality standards across our monorepo to ensure maintainability, readability, and prevent bugs. This includes TypeScript/JavaScript linting, code formatting, and automated enforcement.

## Decision

We will use the following tools and configuration:

### Linting

- **ESLint v9** with flat config format (`eslint.config.js`)
- **@eslint/js** for base JavaScript rules
- Custom rules for TypeScript/JSX support
- Focus on essential rules: unused variables, console warnings, const preferences

### Code Formatting

- **Prettier** for consistent code formatting
- Configuration in `.prettierrc`
- Integration with ESLint via `eslint-config-prettier`

### Enforcement

- **Husky v9** for Git hooks
- **lint-staged** for running tools only on staged files
- Pre-commit hook runs ESLint and Prettier automatically

## Rationale

### ESLint v9 Choice

- Latest version with improved performance and flat config
- Better TypeScript support and modern JavaScript features
- Simplified configuration compared to legacy `.eslintrc` format

### Prettier Integration

- Eliminates formatting debates in code reviews
- Consistent code style across the entire codebase
- Works seamlessly with ESLint

### Automated Enforcement

- Prevents poorly formatted code from being committed
- Reduces manual code review overhead
- Ensures consistent quality standards

## Consequences

### Positive

- Consistent code quality across all packages
- Automated enforcement reduces manual effort
- Modern tooling with better performance
- Clear, maintainable configuration

### Negative

- Initial setup complexity with ESLint v9 migration
- Some React Native specific rules not yet compatible with ESLint v9
- Team needs to adapt to new configuration format

### Mitigation

- Start with basic rules and expand gradually
- Document configuration changes clearly
- Provide team training on new tooling

## Implementation

- ESLint config: `eslint.config.js`
- Prettier config: `.prettierrc`
- Husky hooks: `.husky/pre-commit`
- Package.json scripts for manual execution
- Lint-staged configuration for staged file processing
