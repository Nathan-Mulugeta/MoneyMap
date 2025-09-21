# ADR-011: Monorepo Tooling & Package Management

## Status

Accepted

## Context

We have a monorepo structure with multiple apps (`apps/web`, `apps/mobile`) and shared packages (`packages/types`, `packages/ui`, `packages/utils`). We need to establish tooling and package management strategies that work effectively across this structure.

## Decision

We will use the following tooling and strategies:

### Package Management

- **pnpm** as the primary package manager
- **pnpm workspaces** for monorepo management
- Workspace configuration in `pnpm-workspace.yaml`
- Root-level dependency management with `-w` flag for shared tools

### Workspace Structure

```
<repo-root>/
├── apps/
│   ├── mobile/          # React Native app
│   └── web/             # Web app
├── packages/
│   ├── types/           # Shared TypeScript types
│   ├── ui/              # Shared UI components
│   └── utils/           # Shared utilities
├── serverless/          # Serverless functions
└── docs/                # Documentation
```

### Dependency Management Strategy

- **Root-level dev dependencies** for shared tooling (ESLint, Prettier, Husky, TypeScript)
- **App-specific dependencies** installed in individual app directories
- **Shared packages** as internal dependencies between apps and packages
- Use `pnpm -r` for running commands across all workspaces

### Scripts Organization

- Root-level scripts for workspace-wide operations (`dev`, `build`, `test`, `lint`)
- Individual package scripts for specific functionality
- Use `pnpm -r <script>` for running scripts across all packages

## Rationale

### pnpm Choice

- Faster installation and disk efficiency through content-addressable storage
- Better monorepo support with workspaces
- Strict dependency resolution prevents phantom dependencies
- Compatible with npm ecosystem

### Workspace Structure

- Clear separation between apps and shared packages
- Enables code sharing while maintaining app independence
- Scalable structure for future growth
- Aligns with common monorepo patterns

### Dependency Strategy

- Shared tooling at root level reduces duplication
- App-specific dependencies stay isolated
- Clear boundaries between shared and app-specific code

## Consequences

### Positive

- Efficient package management with pnpm
- Clear workspace boundaries
- Shared tooling reduces maintenance overhead
- Scalable structure for team growth

### Negative

- Learning curve for pnpm-specific commands
- Need to be explicit about workspace root dependencies
- More complex dependency resolution

### Mitigation

- Document pnpm-specific commands and workflows
- Use `-w` flag explicitly for root dependencies
- Provide clear guidelines for dependency placement

## Implementation

- `pnpm-workspace.yaml` for workspace configuration
- Root `package.json` with shared dev dependencies
- Individual `package.json` files in apps and packages
- Scripts for common monorepo operations
- Clear documentation for dependency management
