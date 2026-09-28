This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Documentation

Project conventions and operating procedures live in [`docs/`](./docs):

- [`docs/site-architecture.md`](./docs/site-architecture.md): public routes, redirects, canonicals, sitemap and internal-link decisions.
- [`docs/forms-and-leads.md`](./docs/forms-and-leads.md): lead payloads, form taxonomy, privacy notice and conversion-event data contract.
- [`docs/analytics-and-consent.md`](./docs/analytics-and-consent.md): Vercel Analytics, optional GA4, consent behavior and verification.
- [`docs/deployment.md`](./docs/deployment.md): production domain, Cloudflare routing and production analytics checks.

On Windows, use the `.cmd` variants when invoking npm from PowerShell:

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run build
```

Read the applicable document before changing its area. Route, sitemap, redirect, metadata, shared navigation or form changes require the appropriate validation described there.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
