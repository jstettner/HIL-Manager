# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- `pnpm dev`: Run dev server with Turbo
- `pnpm build`: Build the project
- `pnpm start`: Start production server
- `pnpm lint`: Run ESLint
- `pnpm format`: Check formatting with Prettier
- `pnpm format:fix`: Fix formatting with Prettier

## Code Style Guidelines
- **Imports**: Use absolute imports with `@/` prefix
- **Types**: Use strict TypeScript, explicitly type React components and props
- **Components**: Use functional components with React hooks
- **Naming**: Use PascalCase for components, camelCase for variables and functions
- **React**: Use Next.js App Router and React Server Components where appropriate
- **CSS**: Use Tailwind with `cn()` utility for conditional class names
- **Error Handling**: Use Suspense boundaries for async components
- **UI Components**: Use Radix UI primitives with Tailwind styling

## Database Guidelines
- **Security** Make sure to use row level security on all tables
- **Authentication** Always check authentication close to where data is being accessed
- **Users and Organizations** Structure authentication such that each user belongs to an organization.
- **Data Population** When adding data, do not use hardcoded fallbacks, instead, add example data directly to the database.
- **Migrations** When creating migrations remotely, also make sure to add them to supabase/migrations to keep the local project in sync with the remote.
