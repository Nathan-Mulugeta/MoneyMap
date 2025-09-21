# Development Workflow Guide

<!-- TODO: Adjust this guide to match the actual workflow and setup once the MoneyMap project is fully configured and tested -->

This guide covers the complete development process from initial setup to deployment for the MoneyMap project.

## Prerequisites

- Node.js 18+
- pnpm 8+
- Git
- IDE with TypeScript support (VS Code recommended)

## Initial Setup

### 1. Clone and Install

```bash
git clone <repository-url>
cd MoneyMap
pnpm install
```

### 2. Environment Setup

```bash
# Install dependencies for all workspaces
pnpm install

# Verify installation
pnpm lint
pnpm build
```

## Daily Development Workflow

### 1. Start Development

```bash
# Start all development servers
pnpm dev

# Or start specific apps
cd apps/web && pnpm dev
cd apps/mobile && pnpm dev
```

### 2. Making Changes

#### Code Quality (Automatic)

- **Pre-commit hooks** automatically run ESLint and Prettier
- **ESLint** fixes issues automatically where possible
- **Prettier** formats code consistently
- **lint-staged** only processes changed files

#### Manual Quality Checks

```bash
# Lint all code
pnpm lint

# Format all code
pnpm format

# Run tests
pnpm test

# Build all packages
pnpm build
```

### 3. Git Workflow

#### Branching

```bash
# Create feature branch
git checkout -b feature/MM-123-add-expense-tracking

# Create fix branch
git checkout -b fix/MM-456-auth-bug
```

#### Committing

```bash
# Stage changes
git add .

# Commit (pre-commit hooks run automatically)
git commit -m "feat(expenses): add multi-currency support"

# Push branch
git push origin feature/MM-123-add-expense-tracking
```

#### Pull Request Process

1. Create PR from feature branch to `main`
2. Ensure all CI checks pass
3. Request code review
4. Address feedback
5. Merge after approval

## Package Management

### Adding Dependencies

#### Root-level (shared tooling)

```bash
pnpm add -D -w eslint prettier typescript
```

#### App-specific

```bash
cd apps/web
pnpm add react-router-dom
```

#### Package-specific

```bash
cd packages/ui
pnpm add styled-components
```

### Workspace Commands

```bash
# Run command in all workspaces
pnpm -r build
pnpm -r test
pnpm -r lint

# Run command in specific workspace
pnpm --filter web build
pnpm --filter mobile test
```

## Code Quality Standards

### ESLint Rules

- **Unused variables**: Warning
- **Console statements**: Warning
- **Prefer const**: Error
- **Auto-fix**: Enabled for fixable issues

### Prettier Configuration

- **Semi-colons**: Required
- **Quotes**: Single quotes
- **Trailing commas**: ES5
- **Print width**: 80 characters

### File Organization

```
apps/
├── web/                 # Web application
│   ├── src/
│   ├── public/
│   └── package.json
├── mobile/              # Mobile application
│   ├── src/
│   ├── android/
│   ├── ios/
│   └── package.json
packages/
├── types/               # Shared TypeScript types
├── ui/                  # Shared UI components
└── utils/               # Shared utilities
```

## Troubleshooting

### Common Issues

#### Pre-commit Hook Fails

```bash
# Check what's failing
git commit -m "test" --no-verify

# Fix linting issues manually
pnpm lint --fix

# Try commit again
git commit -m "your message"
```

#### ESLint Configuration Issues

```bash
# Verify ESLint config
pnpm eslint --print-config src/index.ts

# Check for config conflicts
pnpm eslint --debug src/
```

#### Package Installation Issues

```bash
# Clear pnpm cache
pnpm store prune

# Reinstall all dependencies
rm -rf node_modules
pnpm install
```

### Performance Issues

#### Slow Pre-commit Hooks

- Ensure only staged files are processed
- Check for large files in staging area
- Consider excluding certain file types

#### Slow Build Times

- Use `pnpm -r` for parallel builds
- Check for circular dependencies
- Optimize TypeScript compilation

## Best Practices

### Commit Messages

- Use conventional commit format
- Be descriptive and clear
- Reference issue numbers when applicable

### Code Organization

- Keep shared code in packages
- Avoid circular dependencies
- Use TypeScript for type safety

### Testing

- Write tests for new features
- Maintain test coverage
- Run tests before committing

### Documentation

- Update ADRs for architectural decisions
- Keep guides current
- Document complex business logic

## CI/CD Integration

### Pre-merge Checks

- ESLint validation
- TypeScript compilation
- Test execution
- Build verification

### Deployment

- Automatic deployment from `main` branch
- Staging environment for testing
- Production deployment with approval

## Getting Help

- Check existing documentation in `/docs`
- Review ADRs for architectural decisions
- Ask team members for guidance
- Create issues for bugs or feature requests
