# ADR-012: Git Hooks & Pre-commit Workflow

## Status

Accepted

## Context

We need to ensure code quality and consistency before code is committed to the repository. Manual enforcement is error-prone and doesn't scale with team growth. We need automated checks that run before commits are accepted.

## Decision

We will implement the following Git hooks and workflow:

### Git Hooks

- **Husky v9** for Git hook management
- **Pre-commit hook** for automated quality checks
- **Modern Husky format** without deprecated shell scripts

### Pre-commit Workflow

- **lint-staged** for running tools only on staged files
- **ESLint** with `--fix` flag for automatic code fixes
- **Prettier** for automatic code formatting
- **File filtering** for TypeScript/JavaScript files only

### Hook Configuration

```bash
# .husky/pre-commit
pnpm lint-staged
```

```json
// package.json lint-staged config
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"]
  }
}
```

## Rationale

### Husky v9 Choice

- Modern, maintained version of Husky
- Simplified configuration without shell script boilerplate
- Better performance and reliability
- Future-proof with ongoing support

### lint-staged Integration

- Only processes staged files, improving performance
- Prevents unnecessary processing of unchanged files
- Reduces commit time and resource usage
- Focuses quality checks on actual changes

### Automated Fixes

- ESLint `--fix` automatically corrects fixable issues
- Prettier automatically formats code consistently
- Reduces manual intervention and human error
- Ensures consistent code style across all commits

## Consequences

### Positive

- Automatic code quality enforcement
- Consistent code formatting across all commits
- Reduced manual code review overhead
- Prevents poorly formatted code from entering repository
- Fast execution with staged-file processing

### Negative

- Commits may be slower due to pre-commit checks
- Developers need to understand and fix linting errors
- Potential for commit failures if issues can't be auto-fixed
- Learning curve for new team members

### Mitigation

- Clear error messages and documentation
- Gradual rule introduction to avoid overwhelming changes
- Team training on linting rules and fixes
- Fallback options for emergency commits

## Implementation

- Husky installation and initialization
- Pre-commit hook configuration
- lint-staged setup with ESLint and Prettier
- Package.json scripts for manual execution
- Documentation for developers on workflow
- CI/CD integration for additional checks

## Monitoring

- Track commit success/failure rates
- Monitor pre-commit hook performance
- Collect feedback on rule effectiveness
- Adjust rules based on team needs and project evolution
