# Security Documentation

## Security Overrides

This project uses `pnpm.overrides` to patch security vulnerabilities in transitive dependencies.
These overrides are **temporary** and should be removed when upstream packages are updated.

### Current Security Overrides

| Package   | Vulnerability                                          | CVE | Severity | Override   | Affected Libraries       |
| --------- | ------------------------------------------------------ | --- | -------- | ---------- | ------------------------ |
| `devalue` | Prototype Pollution via crafted serialized input (XSS) | N/A | Moderate | `^5.6.4`  | astro, @astrojs/react    |

### When to Remove Overrides

1. **Automatic**: Dependabot will create PRs when upstream packages release fixes
2. **Manual Check**: Run `pnpm audit --prod` monthly
3. **Version Monitoring**: Watch release notes of affected packages

### Process for Removing Overrides

1. Update the affected package(s) to patched version
2. Remove corresponding override from `package.json`
3. Run `pnpm install` to apply changes
4. Verify with `pnpm audit --prod` that the vulnerability is resolved
5. Update this SECURITY.md file

---

_Last updated: 2026-03-23_
