[![🧐 Code Quality](https://github.com/theponti/aidea/actions/workflows/code-quality.yml/badge.svg)](https://github.com/theponti/aidea/actions/workflows/code-quality.yml)

# 🧠 aidea 🧠

An application to help you keep track of your ideas, your thoughts, your lists, and
colloborate with others.

## Features

- **Application**
  - 🤟 **Language:** Typescript
  - 🖥️ **UI:** ⚡️ [NextJS](https://nextjs.org/docs/getting-started) w/ ⚛️ React 18
  - 🔐 **Auth:** [Next-Auth.js](https://next-auth.js.org)
  - 🗂 **Data:** [Prisma](https://prisma.io)
  - 📞 **API:** [tRPC v10](https://trpc.io)
  - 💅 **Styling:** [TailwindCSS](https://tailwindcss.com) with [daisyUI](https://daisyui.com)
- 🧪 **Testing:**
  - [Vitest](https://vitest.dev/)
  - [Cypress](https://www.cypress.io/)
- 🚀 **Deployment**
  - [Vercel](https://vercel.com)
  - [Railway](https://railway.app)

## Set up

### Local

1. Copy environment variable example file

```sh
cp .env.example .env
```

2. Set `NEXTAUTH_SECRET` to a random string using helper script
3. Set `GOOGLE_CLIENT_ID` to a random string
4. Set `GOOGLE_CLIENT_SECRET` to a random string
5. Start Postgres database

```sh
docker-compose up -d
```

6. Install dependencies

```sh
npm install
```

7. Run migrations

```sh
npm run db:migrate:dev
```

### Github

This repository runs several Github actions for code quality, testing, and deployment.

To run them properly, you'll need to set some secrets for those actions to run properly:

```sh
# Continuous integration
gh secret set CYPRESS_RECORD_KEY
gh secret set DATABASE_URL
gh secret set NEXTAUTH_SECRET
gh secret set NEXTAUTH_URL
gh secret set GOOGLE_CLIENT_ID
gh secret set GOOGLE_CLIENT_SECRET
```

## Notes

This application was built with [create-ponti-app](https://github.com/theponti/create-ponti-app)
