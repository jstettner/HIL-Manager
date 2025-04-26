## Getting Started

Make sure you have a recent version node.js version (v22.14.0) installed.

I'd recommend installing pnpm instead of npm.

Install project dependencies (this includes dev dependencies):

```bash
pnpm install
```

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The page auto-updates as you edit files.

## Database

Install [Docker Desktop](https://docs.docker.com/desktop/setup/install/mac-install/).

```bash
supabase login
supabase link --project-ref evsiyukxzqxyxdfgrytq
```

Don't use this. Hard fix for migrations

```bash
# For each migration that exists remotely
supabase migration repair --status reverted <>
rm -rf supabase/migrations
supabase db pull
# Say yes to update remote migrations.
```

Pull and seed your local database

```bash
supabase db pull
supabase db dump --data-only > supabase/seed.sql
supabase db reset
```

Start a local instance of supabase:

```bash
supabase start
```

**Important**
If you're setting up an mcp server for supabase make sure you use the local postgres url instead of directly modifying
the remote instance, as the migrations will get out of sync and can be a pain in the ass to fix.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

Deployments automatically occur when pushing to the main branch.

To deploy a dev build (if you want to link the build to another employee) you can run `vercel .`
if you proper permissions.
