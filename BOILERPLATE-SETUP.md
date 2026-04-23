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

**Content Pages:**

- [`Terms`](src/features/legal/data/terms-data.ts) - Update the terms and privacy data

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

## Hosting and CI/CD Setup

### Vercel Hosting

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

Create a new account on Vercel.

This step will need the phone number from your client, which should be active to send you back the verification codes

<div align="right">

[⬆️ Back to Top](#boilerplate-setup-guide)

</div>

To log in to the Vercel account and push your project, follow these steps:

1. **Log in to Vercel using the CLI:**

   Open your terminal and run (follow the steps):

   ```bash
   vercel login
   ```

   Once you're logged into your Vercel account, you can deploy it by running:

   ```bash
   vercel --prod
   ```

This section is only needed for the **initial project setup**.
After connecting your project to the Vercel account, thanks to the `GitHub Actions`, deployments will be automatic.

You can now go to `Vercel project settings` > `Functions` > `Advanced Settings` > `Europe Region`

Then `Vercel project settings` > `Environments` and add the same domain than your production with the prefix `staging-` but for the `Preview` environment.

**Note:** For client acceptance testing, you may need to disable `Vercel Authentication` in your project settings under `Deployment Protection` to allow external access to preview deployments without requiring a Vercel account.

This will ensure that the push from the `staging` branch will be deployed to the `preview` environment for acceptance testing, where Vercel will deploy the staging changes to the preview domain.

### GitHub Actions Workflow

<div align="right">

[⬆️ Back to Top](#boilerplate-setup-guide)

</div>

![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

To securely manage sensitive information, we use GitHub Secrets to store environment variables.
The following environment variables are required for the Vercel deployment:

- `VERCEL_ORG_ID`: Your Vercel organization ID.
- `VERCEL_PROJECT_ID`: Your Vercel project ID.
- `VERCEL_TOKEN`: Your Vercel authentication token.

You can obtain `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` in the `.vercel/project.json` file (if this project is loged to Vercel).

To retrieve the `VERCEL_TOKEN`, follow these steps:

1. Log in to your Vercel account.
2. Navigate to the [Vercel Tokens](https://vercel.com/account/tokens) page.
3. Name the token `GitHub Actions Deployment`, give project's scope and never expire.
4. Click `Create`.

#### Adding Secrets to GitHub

1. Navigate to your GitHub repository.
2. Click on **Settings**.
3. In the **Secrets and variables** section, select **Actions** and **Secrets**.
4. Click **New repository secret**.
5. Add the following secrets:
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
   - `VERCEL_TOKEN`

## 🔐 Before going live — Security reminder

Once the project is delivered or goes to production, make sure 2FA is enabled on the critical accounts:

- **Master email** (ProtonMail / Google) — recovery vector for everything else
- **Domain registrar** (OVH, Namecheap…) — a compromised registrar = full DNS takeover
- **DNS / Hosting** — Cloudflare, Vercel
- **Code** — GitHub

Prefer passkey or TOTP (authenticator app) over SMS. Store recovery codes offline.

## All is setup ! You can now delete this file and start coding 😎
