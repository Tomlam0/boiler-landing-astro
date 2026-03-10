# Security Documentation

## Security Overrides

This project uses `pnpm.overrides` to patch security vulnerabilities in transitive dependencies.
These overrides are **temporary** and should be removed when upstream packages are updated.

### Current Security Overrides

| Package | Vulnerability | CVE | Severity | Override | Affected Libraries |
| --- | --- | --- | --- | --- | --- |
| `tmp` | Arbitrary File Write via symlink | CVE-2025-54798 | Low 2.5/10 | `^0.2.4` | inquirer>external-editor (via @commitlint, commitizen) |
| `lodash` | Prototype Pollution in `_.unset` and `_.omit` | CVE-2025-13465 | Moderate 6.5 | `^4.17.23` | inquirer (via @commitlint, commitizen) |
| `ajv` | ReDoS when using `$data` option | CVE-2025-69873 | Moderate | `^8.18.0` *(@commitlint only)* | @commitlint packages (upgraded) |
| `minimatch` | ReDoS via repeated wildcards / nested extglobs | CVE-2026-26996 | High | `^10.2.3` | @typescript-eslint, eslint, commitizen |

### When to Remove Overrides

1. **Automatic**: Dependabot will create PRs when upstream packages release fixes
2. **Manual Check**: Run `pnpm audit` monthly
3. **Version Monitoring**: Watch release notes of affected packages

### Process for Removing Overrides

1. Update the affected package(s) to patched version
2. Remove corresponding override from `package.json`
3. Run `pnpm install` to apply changes
4. Verify with `pnpm audit` that the vulnerability is resolved
5. Update this SECURITY.md file

---

_Last updated: March 2026_
