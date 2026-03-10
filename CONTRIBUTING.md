<div align="center">

# Contribution Guidelines

To ensure a consistent and high-quality codebase, please follow these guidelines.

</div>

## ✍️ Commit Message Convention

This project uses **Conventional Commits** to create a clear, readable, and automated commit history.

**⚠️ All commits are linted and validated automatically with Husky.**

### How to Commit

Instead of `git commit`, use the following command:

```bash
pnpm cz
```

This will launch an interactive command-line tool that guides you through creating a compliant commit message.

### The Commit Prompt Flow

The `pnpm cz` command will ask you for the following:

1.  **Choose the type of change**: Select the commit type (e.g., `feat`, `fix`, `docs`, `refactor` etc.).
2.  **What is the scope of this change?**: Specify the part of the codebase affected (e.g., `auth`, `components`, `database`).
3.  **Write a short, imperative tense description**: Provide a concise summary of the change (e.g., "add password reset form").
4.  **Provide a longer description (optional)**: Add more context if needed.
5.  **Are there any breaking changes?**: Indicate if the commit introduces a breaking change.
6.  **Does this change affect any open issues?**: Link to any relevant Jira ticket or GitHub issues.

### Example Commit Message

```
✨ feat(auth): add google oauth provider (TICKET-155)
```

## lint-staged, husky, and commitlint

This project uses the following tools to enforce code quality and commit conventions:

- **Husky**: Runs scripts at different stages of the Git process (e.g., pre-commit, commit-msg, pre-push).
- **lint-staged**: Runs linters (ESLint, Prettier) on staged files before they are committed.
- **commitlint**: Checks if your commit messages meet the Conventional Commits format.

These tools are configured to run automatically. If your code has linting errors or your commit message is not formatted correctly, the commit will be aborted. This ensures that all code entering the repository is clean and follows project standards.

## 🚀 Development Workflow

The development workflow follows a structured branching strategy to ensure code quality and proper testing before production deployment.

### Branch Structure

- **`main`**: Production branch - stable, deployment-ready code
- **`staging`**: Integration branch - testing environment with preview deployment
- **`feat/TICKET-XX-short-description`**: Feature branches for individual epics

### Development Process

1. **Feature Development**
   - Create a new feature branch from `staging` using the naming convention:
     ```bash
     git checkout staging
     git pull origin staging
     git checkout -b feat/TICKET-23-short-description
     ```
   - The ticket number should match the Jira epic reference or other ticket system.

2. **Commit and Push**
   - Make your changes and commit using `pnpm cz` (following the commit convention above)
   - Push your feature branch to origin
   - ⚠️ Feature branches are not automatically deployed - only staging and main branches trigger Vercel deployments

3. **Integration Testing**
   - Create a Pull Request from your feature branch to `staging`
   - Once approved and merged, changes are automatically deployed to the staging preview environment
   - Conduct thorough testing on the staging environment

4. **Production Deployment**
   - After successful testing on staging, create a Pull Request from `staging` to `main`
   - Once approved and merged, changes are automatically deployed to production
   - The `main` branch should always contain stable, production-ready code

### Important Notes

- **Direct commits to `main` are automatically blocked** by husky hooks - all changes must go through the staging process
- **Only merge commits are allowed on `main`** (e.g., `git merge staging`)
- **Always test on staging** before merging to production
- **Keep feature branches focused** - one epic/ticket per branch
- **Review process is mandatory** for both staging and production merges
