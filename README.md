<a id="readme-top"></a>

<div align="center">

# Project

![Astro](https://img.shields.io/badge/Astro-BC52EE?style=for-the-badge&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn/ui](https://img.shields.io/badge/shadcn/ui-8A2BE2?style=for-the-badge&2F&logo=shadcnui&color=131316)

A modern Astro application with React islands, TypeScript, Tailwind CSS, and Shadcn/ui components.

</div>

<details>

<summary>📋 Table of Contents</summary>

- [▶️ Prerequisites](#prerequisites)

- [🏗️ Project Structure](#project-structure)
  - [Architecture](#architecture)

  - [Scripts](#scripts)

  - [Import Aliases](#import-aliases)

  - [File Naming Convention](#file-naming-convention)

- [⚙️ Project Installation](#project-installation)

- [🚀 Quick Start](#quick-start)

- [💿 Project Usage](#project-usage)
  - [Component Architecture](#component-architecture)

- [🔐 Security Monitoring](#security-monitoring)

- [💰 Vercel Budget Management](#vercel-budget-management)

- [🤝 Contributing](#contributing)

- [📞 Contact](#contact)

</details>

## Prerequisites

Before setting up the project, ensure you have the following:

- Node.js (using `nvm`):
  - Minimum required version: 24.x (LTS)
  - `nvm use` to use the project's version
- pnpm (package manager)
- Vercel CLI installed locally (optional, for deployment)

# 🏗️

# Project Structure

## Architecture

```bash
├── .github/                          # GitHub Actions workflows for CI/CD.
├── .husky/                           # Husky hooks for commit validation.
├── src/
│   ├── assets/                       # Optimized assets (images, fonts).
│   ├── layouts/                      # Astro layout components.
│   │   ├── base-layout.astro
│   │   └── public-layout.astro
│   ├── pages/                        # File-based routing.
│   │   ├── mentions-legales/
│   │   ├── 404.astro
│   │   ├── index.astro
│   │   └── robots.txt.ts
│   ├── features/                     # Feature modules — components, data co-located.
│   │   ├── landing/components/
│   │   └── legal/data/
│   ├── shared/                       # Cross-cutting concerns.
│   │   ├── components/
│   │   │   ├── layout/               # Nav, Footer.
│   │   │   ├── seo/                  # Head component.
│   │   │   ├── services/             # MotionPreset, etc.
│   │   │   └── ui/                   # Shadcn/ui primitives.
│   │   ├── hooks/
│   │   ├── lib/                      # env, seo/, utils.
│   │   └── types/
│   └── styles/                       # Global CSS, design tokens.
└── public/                           # Static assets (favicon, OG images).
```

This project uses a **Feature-Driven Architecture** where each feature owns its logic. `shared/` contains only reusables used by ≥2 features.

## Scripts

<div align="right">

[⬆️ Back to Top](#readme-top)

</div>

### Development

```bash
pnpm dev              # Start the development server
pnpm build            # Build the application for production
pnpm preview          # Preview the production build
```

### Code Quality

```bash
pnpm ts               # Check TypeScript types (astro check + tsc)
pnpm lint             # Check for linting errors
pnpm lint:fix         # Fix linting errors
pnpm format           # Format code with Prettier
pnpm format:check     # Check if code is formatted
pnpm knip             # Analyze unused exports and dependencies
```

### Git & Commit

```bash
pnpm cz               # Create conventional commit messages with emojis
```

## Import Aliases

<div align="right">

[⬆️ Back to Top](#readme-top)

</div>

This project uses import aliases for easier module resolution.

The aliases are defined in the tsconfig.json file as follows:

```bash
 "baseUrl": ".",
    "paths":
      "@/*": ["./src/*"],
```

This alias allows you to import modules using the `@/` prefix instead of relative paths.

## File Naming Convention

<div align="right">

[⬆️ Back to Top](#readme-top)

</div>

We use **kebab-case** for file names (`my-component.tsx` instead of `MyComponent.tsx`) to ensure cross-platform compatibility.

This prevents case-sensitivity issues between Windows (case-insensitive) and Linux/Unix (case-sensitive) systems, making the codebase more robust across different development environments.

# 💿

# Project Installation

<div align="right">

[⬆️ Back to Top](#readme-top)

</div>

1. Clone the repository:

```bash
git clone https://github.com/Tomlam0/boiler-landing-astro.git
cd project
```

2. Install the dependencies:

```bash
pnpm i
```

3. Create env files (if needed)

Create the env files for development:

```bash
.env.local
```

The application may require environment variables defined in a `.env.example` file if present.

## Quick Start

<div align="right">

[⬆️ Back to Top](#readme-top)

</div>

**Launch the development environment:**

```bash
pnpm dev
```

The application will be available at `http://localhost:4321`.

# 🔧

# Project Usage

## Component Architecture

<div align="right">

[⬆️ Back to Top](#readme-top)

</div>

This project follows a modular component architecture with clear separation of concerns:

### Component Organization

- **`shared/components/ui/`**: Shadcn/ui primitives (Button, Sheet, etc.)
- **`shared/components/layout/`**: Layout components (Nav, Footer)
- **`shared/components/services/`**: Reusable components (MotionPreset, etc.)
- **`shared/components/seo/`**: SEO head component
- **`features/<name>/components/`**: Feature-scoped components, co-located with their data

### Astro Islands Pattern

- **Static by default**: Pages are `.astro` files with zero client JS
- **React islands**: Interactive components use `client:load`, `client:visible`, or `client:idle`
- **CVA in templates**: Use `buttonVariants()` directly in Astro templates instead of `<Button asChild>`

## Security Monitoring

<div align="right">

[⬆️ Back to Top](#readme-top)

</div>

This project uses **Dependabot** for automated security vulnerability scanning of npm dependencies.

### 🔐 Enabling Dependabot

To activate Dependabot for this repository:

1. Navigate to repository **Settings** > **Advanced Security**
2. Enable features in this order:
   - **Dependency graph** ✅
   - **Dependabot alerts** ✅

### 🛡️ How It Works

Once activated, Dependabot will:

- Scan your dependencies for known vulnerabilities
- Send alerts via GitHub&apos;s Security tab

### ⚙️ Configuration Options

The `.github/dependabot.yml` file controls update behavior:

- **Monitoring-only mode**: No automatic pull requests will be created
- **Daily vulnerability scans**: Checks run every day at 03:00 Europe/Paris time
- **Security focus**: All version updates are ignored, only critical security issues trigger alerts

This configuration allows you to review security vulnerabilities at your own pace and decide when to apply updates manually.

> **Note**: The `.github/dependabot.yml` file is already configured with `open-pull-requests-limit: 0` for monitoring-only behavior.

## Vercel Budget Management

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

<div align="right">

[⬆️ Back to Top](#readme-top)

</div>

### Current Spend Configuration

- **Soft Limit**: $20/month (email alerts to project maintainers)
- **Hard Limit**: $50/month (automatic deployment suspension)

> **Note**: Most small to medium projects will remain within Vercel's free tier limits.These settings serve as a safety net for unexpected traffic spikes or misconfigured functions.

#### 🚨 **Budget Exceeded Protocol**

If spend limits are approached:

1. **Check Vercel Analytics** - Identify traffic spikes or unusual usage patterns
2. **Review Function Logs** - Look for inefficient or runaway serverless functions
3. **Optimize Performance** - Implement caching, reduce API calls, optimize images

#### ⚙️ **Configuring Spend Limits**

To replicate this setup on a new Vercel project:

1. Navigate to **Project Settings** → **Usage & Billing**
2. Set **Spending Limit** to $50
3. Configure **Usage Alerts** at $20 threshold
4. Add team member emails for notifications

> **Note**: These limits help maintain cost control during development. Production deployments may require adjusted thresholds based on actual usage patterns.

## Contributing

<div align="right">

[⬆️ Back to Top](#readme-top)

</div>

Please read the [**Contributing Guidelines**](./CONTRIBUTING.md)

## Contact

<div align="right">

[⬆️ Back to Top](#readme-top)

</div>

For any questions, please contact contact@thomas-lambert-dev.com.
