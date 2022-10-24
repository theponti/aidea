# 🧠 Aidea 🧠

Enabling users to join forces to build amazing projects.

## Features

- ⚡️ [NextJS](https://nextjs.org/docs/getting-started)
- ⚛️ React 18
- ✨ TypeScript
- 🔐 **Auth:** [Next-Auth.js](https://next-auth.js.org)
- 🗂 **Data:** [Prisma](https://prisma.io)
- 📞 **API:** [tRPC v10](https://trpc.io)
- 💅 **Styling:** [TailwindCSS](https://tailwindcss.com) & [daisyUI](https://daisyui.com/docs/install/)
- 🧪 **Testing:** [Vitest](https://vitest.dev/)
- [Vercel](https://vercel.com)

## Set up

### Github

This repo run several Github actions for code quality, testing, and deployment.

To run them properly, you'll need to set some secrets for those actions to run properly:

```sh
# These are used in Code Quality
gh secret set CYPRESS_RECORD_KEY

# These are used in Code Quality & Deployment
gh secret set DATABASE_URL
gh secret set NEXTAUTH_SECRET
gh secret set NEXTAUTH_URL
gh secret set GOOGLE_CLIENT_ID
gh secret set GOOGLE_CLIENT_SECRET

# These are used in Deployment
gh secret set VERCEL_ORG_ID
gh secret set VERCEL_PROJECT_ID
gh secret set VERCEL_TOKEN
```

### Vercel

This repo deploys to Vercel. For the application to run properly, some secrets need to be set:

```sh
vercel env add DATABASE_URL <environment>
vercel env add NEXTAUTH_SECRET <environment>
vercel env add GOOGLE_CLIENT_ID <environment>
vercel env add GOOGLE_CLIENT_SECRET <environment>
```

### Vercel x NEXTAUTH

Vercel creates automatic previews of deployments, which is fantastic! In order to get these previews to work with NextAuth, we have to set up two seperate env variables:

```sh
vercel env add NEXTAUTH_URL <environment>
```

```sh
vercel env add NEXTAUTH_URL <environment>
```

For the `preview` URL, you'll have to use the static one that doesn't change. This is the URL that does not have the unique hash in it and is different from your project's `production` URL.

For the `production` URL, you can find this on the project page.

## Notes

This application was built with [create-ponti-app](https://github.com/theponti/create-ponti-app)
