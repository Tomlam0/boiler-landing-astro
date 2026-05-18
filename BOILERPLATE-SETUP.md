# BOILERPLATE SETUP GUIDE

**⚠️ IMPORTANT: This file should be DELETED after completing your project setup!**

This guide walks you through customizing this boilerplate template for your new project.
Once you've completed all steps, delete this file and proceed with normal development.

---

## 📋 MANDATORY CUSTOMIZATIONS

### 1. 🏷️ Project Identity

**Files to update:**

- [`metadata.ts`](src/shared/lib/seo/metadata.ts) - Update all the pages metadatas as needed
- [`structured-data.ts`](src/shared/lib/seo/structured-data.ts) - Update Organization `name`, `description`, `logo` with real project data
- [`README.md`](./README.md) - Update [`title`](./README.md), [`description`](./README.md)
- [`package.json`](./package.json#L2) - Update the name
- [`CLAUDE.md`](./CLAUDE.md) - Update the first line description (project name, stack specifics)
- [`wrangler.jsonc`](./wrangler.jsonc) - Update the `name` field (Cloudflare worker slug). Ships with `landing-astro` — replace by your slug. The staging worker name is derived from `--name landing-astro-staging` in [`deploy-staging.yml`](.github/workflows/deploy-staging.yml) — update that too.
- [`package.json`](./package.json) - Update `deploy:sanity:staging` and `deploy:sanity:prod` scripts: replace `--url boiler-landing-astro-staging` / `--url boiler-landing-astro` with your real Sanity hostname slugs (**must be unique globally on `<slug>.sanity.studio`**). Quick check: `curl -s https://<slug>.sanity.studio/ | head -c 50` — if it returns `{"statusCode":404...}`, the slug is free.

**Content Pages:**

- Mentions légales — populate via the Sanity Studio under the **Legal** document (privacy policy, terms, cookie policy)
- Landing copy — populate via the Sanity Studio under the **Landing** document (hero title, subtitle, CTAs)
- Site settings (footer copyright, social links, OG image) — Sanity Studio → **Paramètres**

**Branding & Assets:**

- `public/favicon.ico` - Replace with your favicon
- `public/images/logo.webp` - Add your logo for structured data (Organization schema, recommended: 200x60px)
- `public/images/og-image.webp` - Add your Open Graph image for social sharing (recommended: 1200x630px)

### 2. 🚀 Installation Setup

```bash
# 1. Create new root files .env.local and .env.test and get the env from Bitwarden
touch .env.local

# 2. Install libs
pnpm i

# 3. Initiate the git repository
git init

# 4. Create new project on Github and execute the following commands (replace "your-project-name" with this new project name)
git add .
git commit -m "project init"
git branch -M main
git remote add origin https://github.com/Tomlam0/your-project-name.git
git push -u origin main

# 7. Create new staging branch and push to remote
git checkout -b staging
git push -u origin staging
```

Now that you have a new remote project, you can update the following files:

- [`README.md`](./README.md) - Update the [`repository URL`](./README.md#160)

## 🔧 DETAILED SETUP PROCESS

The first step is to create a new email address with ProtonMail and use it to create all new client accounts.

## Sanity Setup

![Sanity](https://img.shields.io/badge/Sanity-F03E2F?style=for-the-badge&logo=sanity&logoColor=white)

<div align="right">

[⬆️ Back to Top](#boilerplate-setup-guide)

</div>

1. **Create a new Sanity account + project**
   - Go to [Sanity.io](https://www.sanity.io/) → create an **organization** first, then a project inside it.
   - Note the `projectId` from the project overview.

2. **Datasets**
   - Sanity creates `production` by default. Create a `development` dataset too:
     ```bash
     pnpm exec sanity dataset create development
     ```
   - Mark `development` as **Private** if available (Growth Plan).

3. **API Tokens** — Sanity dashboard → API → Tokens. Create 3:
   - `backend` — **Editor** permissions → goes to `SANITY_API_TOKEN`
   - `preview` — **Viewer** permissions → goes to `SANITY_API_READ_TOKEN`
   - `deploy-studio` — custom token with grant `sanity.project.deployStudio` → goes to `SANITY_DEPLOY_STUDIO_TOKEN` (used only by the GitHub deploy workflows)

4. **CORS origins** — Sanity dashboard → API → CORS origins. Add all 4 with "Credentials: Allowed":
   - `http://localhost:4321` (Astro dev server)
   - `http://localhost:3333` (local `sanity dev`)
   - `https://<slug>-staging.sanity.studio` (staging Studio)
   - `https://<slug>.sanity.studio` (production Studio)

5. **Studio deployment**
   - The Studio is deployed as a **standalone app on `<slug>.sanity.studio`** (NOT embedded in the Astro site). Two studios — one per environment — both pointing at the `production` dataset:
     - **Staging studio** → `<slug>-staging.sanity.studio` — preview-only (mutating actions stripped)
     - **Production studio** → `<slug>.sanity.studio` — full publish rights
   - Update slugs in [`package.json`](./package.json) scripts (`deploy:sanity:staging` / `deploy:sanity:prod`) before first deploy — must be globally unique on Sanity.
   - Local dev: `pnpm dev` lances Astro (:4321) + `sanity dev` (:3333) en parallèle, mounted on the `development` dataset.

## Hosting and CI/CD Setup

### Cloudflare Workers Hosting

![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)

Create a new account on Cloudflare.

<div align="right">

[⬆️ Back to Top](#boilerplate-setup-guide)

</div>

The site is deployed to **Cloudflare Workers Static Assets** via the [`@astrojs/cloudflare`](https://docs.astro.build/en/guides/integrations-guide/cloudflare/) adapter. Configuration lives in [`wrangler.jsonc`](./wrangler.jsonc) at the repo root.

To log in locally and run a one-off deployment:

1. **Log in to Cloudflare using Wrangler:**

   ```bash
   pnpm exec wrangler login
   ```

2. **Deploy manually (optional):**

   ```bash
   pnpm build
   pnpm exec wrangler deploy --name landing-astro
   ```

This section is only needed for the **initial project setup**.
After connecting your project to Cloudflare, thanks to the `GitHub Actions`, deployments will be automatic on push to `staging` (→ `landing-astro-staging`) and `main` (→ `landing-astro`).

To attach a custom domain, go to **Cloudflare Dashboard → Workers & Pages → your worker → Settings → Domains & Routes**.

### GitHub Actions Workflow

<div align="right">

[⬆️ Back to Top](#boilerplate-setup-guide)

</div>

![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

**Secrets** (GitHub repo → Settings → Secrets and variables → Actions → Secrets tab):

- `CLOUDFLARE_API_TOKEN` — Cloudflare API token with **Edit Workers** permissions (used by `wrangler deploy`)
- `CLOUDFLARE_ACCOUNT_ID` — Cloudflare account ID (dashboard right sidebar)
- `SANITY_API_TOKEN` — backend token (Editor permissions)
- `SANITY_API_READ_TOKEN` — preview token (Viewer permissions) — auto-pushed as Worker secret by the staging CI for `/api/draft-mode/*`
- `SANITY_DEPLOY_STUDIO_TOKEN` — Sanity token with `sanity.project.deployStudio` grant
- `SANITY_REVALIDATE_SECRET` — random HMAC secret (`openssl rand -base64 32`) shared with the Sanity webhook. Auto-pushed as Worker secret by the staging CI.
- `REPO_DISPATCH_TOKEN` — fine-grained PAT that lets the staging Worker trigger the prod deploy workflow when Sanity publishes new content. Auto-pushed as Worker secret by the staging CI. See **Creating the REPO_DISPATCH_TOKEN** below for the precise click-by-click setup.

**Variables** (same screen → Variables tab — non-sensitive):

- `SITE_URL` — production site URL (e.g. `https://landing-astro.<your-cf-account>.workers.dev/`)
- `SITE_URL_STAGING` — staging site URL (e.g. `https://landing-astro-staging.<your-cf-account>.workers.dev/`)
- `SANITY_PROJECT_ID` — your Sanity projectId
- `SANITY_DATASET` — usually `production` for both envs (the separation is via Studio workspaces, not datasets)
- `SANITY_API_VERSION` — Sanity API version (e.g. `2024-10-18`)
- `SANITY_STUDIO_URL` — production Studio URL (e.g. `https://<slug>.sanity.studio`)
- `SANITY_STUDIO_URL_STAGING` — staging Studio URL (e.g. `https://<slug>-staging.sanity.studio`)

### Creating the REPO_DISPATCH_TOKEN

This token lets the staging Worker call the GitHub API to trigger a prod redeploy when content changes in Sanity. The setup is one-off and the token has minimal blast radius (scoped to one repo, one permission).

1. Go to [github.com/settings/personal-access-tokens](https://github.com/settings/personal-access-tokens)
2. Click **Generate new token** → **Fine-grained tokens**
3. Fill the form:
   - **Token name**: `sanity-rebuild-dispatch` (or any memorable name)
   - **Description** (optional): `Triggers prod rebuild on Sanity publish`
   - **Resource owner**: your personal account
   - **Expiration**: `No expiration` (or set a date if your org enforces rotation)
   - **Repository access**: select **Only select repositories** → pick this repo from the dropdown
4. Scroll down to **Permissions** → **Repository permissions** → click **Add permissions**
5. In the popup, search for and check **`Contents`** only. Close the popup.
6. Back in the form, the **Contents** permission now has a dropdown — set it to **Read and write**
7. Leave every other permission (Account permissions, all other Repository permissions) on **No access**

> ⚠️ Use **Contents: Read and write**, NOT Actions. The `POST /repos/{owner}/{repo}/dispatches` endpoint we call to trigger a rebuild requires the Contents permission. The Actions permission is for a different endpoint (manual `workflow_dispatch`) and won't work here — GitHub returns `403 "Resource not accessible by personal access token"` if you only grant Actions. 8. Click **Generate token** at the bottom 9. Copy the `github_pat_...` string immediately (GitHub won't show it again) 10. Paste it as the value of the `REPO_DISPATCH_TOKEN` secret in GitHub repo → Settings → Secrets and variables → Actions → Secrets

### Sanity publish → prod rebuild webhook

Production runs as **prerendered static HTML** — to refresh content after a publish, we trigger a GitHub workflow rebuild. The staging Worker exposes `/api/sanity-rebuild` which validates the Sanity webhook signature and dispatches a `repository_dispatch` event to GitHub. That re-runs the prod deploy workflow.

The staging CI automatically pushes `SANITY_API_READ_TOKEN`, `SANITY_REVALIDATE_SECRET`, `REPO_DISPATCH_TOKEN`, and `GITHUB_REPO` (derived from `github.repository`) to the Worker on every deploy — no manual `wrangler secret put` needed.

**Sanity webhook config** (manage portal → API → Webhooks):

> ⚠️ **Create this webhook only AFTER your first successful staging deploy.** The `/api/sanity-rebuild` endpoint must be live (and its secrets populated by the CI) before Sanity starts hitting it — otherwise the first webhook attempts will 500/401 and Sanity may auto-disable the hook after repeated failures.
>
> Recommended order:
>
> 1. Add the GitHub Secrets (`SANITY_REVALIDATE_SECRET`, `REPO_DISPATCH_TOKEN`, etc.)
> 2. Push to `staging` → CI deploys the Worker with secrets
> 3. Push to `main` → CI deploys the prod build
> 4. _Then_ create this Sanity webhook

- **URL**: `https://landing-astro-staging.<your-cf-account>.workers.dev/api/sanity-rebuild`
- **Dataset**: `production`
- **Trigger on**: Create, Update, Delete
- **Filter** (optional): `_type in ["article", "homepage", "blogPage", "contactPage", "legal", "settings"]`
- **HTTP method**: POST
- **Secret**: paste the same value as `SANITY_REVALIDATE_SECRET`
- **Trigger webhook when drafts are modified**: **off**
- **Trigger webhook when versions are modified**: **off**

You only need **one** webhook (not two — staging doesn't rebuild, only prod does).

To create the API token:

1. Log in to your Cloudflare account.
2. Navigate to [User Profile → API Tokens](https://dash.cloudflare.com/profile/api-tokens).
3. Click **Create Token** → use the **Edit Cloudflare Workers** template.
4. Restrict the token to your account and zone, then click **Create Token**.

To retrieve the account ID: in the Cloudflare dashboard, the account ID is shown in the right sidebar of the **Workers & Pages** overview page.

#### Adding Secrets and Variables to GitHub

1. Navigate to your GitHub repository.
2. Click on **Settings**.
3. In the **Secrets and variables** section, select **Actions**.
4. Under the **Secrets** tab, click **New repository secret** and add:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
   - `SANITY_API_TOKEN`
   - `SANITY_API_READ_TOKEN`
   - `SANITY_DEPLOY_STUDIO_TOKEN`
   - `SANITY_REVALIDATE_SECRET`
   - `REPO_DISPATCH_TOKEN`
5. Under the **Variables** tab, click **New repository variable** and add:
   - `SITE_URL`
   - `SITE_URL_STAGING`
   - `SANITY_PROJECT_ID`
   - `SANITY_DATASET`
   - `SANITY_API_VERSION`
   - `SANITY_STUDIO_URL`
   - `SANITY_STUDIO_URL_STAGING`

## 🔐 Before going live — Security reminder

Once the project is delivered or goes to production, make sure 2FA is enabled on the critical accounts:

- **Master email** (ProtonMail / Google) — recovery vector for everything else
- **Domain registrar** (OVH, Namecheap…) — a compromised registrar = full DNS takeover
- **DNS / Hosting** — Cloudflare
- **Code** — GitHub

Prefer passkey or TOTP (authenticator app) over SMS. Store recovery codes offline.

## All is setup ! You can now delete this file and start coding 😎
