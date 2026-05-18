# Security Documentation

## Security Overrides

This project uses `pnpm.overrides` (declared in `pnpm-workspace.yaml`) to patch security
vulnerabilities in transitive dependencies. These overrides are **temporary** and should
be removed when upstream packages release fixes that pull the patched version directly.

### Current Security Overrides

| Package     | Vulnerability                                                                       | CVE                                      | Severity        | Override                            | Affected Libraries / Blocking Parents                                                  |
| ----------- | ----------------------------------------------------------------------------------- | ---------------------------------------- | --------------- | ----------------------------------- | -------------------------------------------------------------------------------------- |
| `devalue`   | DoS via sparse array deserialization                                                | GHSA-77vg-94rm-hx3p                      | High            | `^5.8.1`                            | `astro` (pulls `^5.6.3`), `@astrojs/react` (pulls `^5.6.4`)                            |
| `picomatch` | ReDoS via extglob quantifiers + glob matching in POSIX character classes            | GHSA-c2c7-rcm5-vvqj, GHSA-3v7f-55p6-f55p | High / Moderate | `^2.3.2`                            | `anymatch` (via `chokidar`, `unstorage`), `micromatch` (via `fast-glob`, `findup-sync`) |
| `lodash`    | Code injection via `_.template` imports + prototype pollution via array path bypass | GHSA-r5fr-rjxr-66jc, GHSA-f23m-r3pf-42rh | High / Moderate | `^4.18.1`                           | `@sanity/id-utils`, `@sanity/mutate`, `@sanity/sdk`                                    |
| `defu`      | Prototype pollution via `__proto__` key in defaults                                 | GHSA-737v-mqg7-c878                      | High            | `^6.1.5`                            | `h3` (via `unstorage` → `astro`); `astro` pins `h3@1.15.10`                            |
| `postcss`   | XSS via unescaped `</style>` in CSS stringify output                                | GHSA-qx2v-qp2m-jg93                      | Moderate        | `^8.5.10`                           | `vite` (override pins to `^7.3.3`, which ships `postcss ^8.5.6`)                       |
| `js-yaml`   | Prototype pollution in merge (`<<`) — only `v3.x` line affected                     | GHSA-mh29-5h37-fv8m                      | Moderate        | `js-yaml@3: ^3.14.2` (scoped to v3) | `@vercel/frameworks` (pins exactly `3.13.1`, via `@sanity/cli`)                        |

`vite: ^7.3.3` is also present in overrides — kept pinned to the v7 line for compatibility
with the current Astro/Cloudflare stack.

### Installing Security Fixes Inside the Cooldown Window

`pnpm-workspace.yaml` sets `minimumReleaseAge: 10080` (7 days) as a supply-chain defense.
When a CVE patch is younger than 7 days, install it once with
`pnpm install --config.minimum-release-age=0` (or temporarily comment out
`minimumReleaseAge`). The patched version is then locked into `pnpm-lock.yaml`; subsequent
`pnpm install` runs reuse the lockfile and do not re-check the cooldown.

### When to Remove Overrides

1. **Automatic**: Dependabot will create PRs when upstream packages release fixes.
2. **Manual check**: Run `pnpm audit --prod` monthly. When a parent no longer needs the
   override (i.e. its `package.json` `dependencies` field already lists a patched version),
   delete the override entry, run `pnpm install`, and re-audit.
3. **Version monitoring**: Watch release notes of affected parents (`astro`, `@astrojs/*`,
   `sanity`, `vite`, `@vercel/frameworks`).

### Process for Removing an Override

1. Confirm the relevant parents now depend on a patched version
   (`npm view <parent>@latest dependencies.<vulnerable-package>`).
2. Delete the override line in `pnpm-workspace.yaml`.
3. Run `pnpm install` and verify with `pnpm audit --prod`.
4. Re-run `pnpm ts && pnpm lint`.
5. Update this `SECURITY.md` file.

---

_Last updated: 2026-05-18_
