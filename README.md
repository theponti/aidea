[![🧐 Code Quality](https://github.com/theponti/aidea/actions/workflows/code-quality.yml/badge.svg)](https://github.com/theponti/aidea/actions/workflows/code-quality.yml)

# 🧠 aidea

manage your mind with ease

## 📚 stack

- 🤟 **Language:** Typescript
- 🖥️ **UI:** ⚡️ [NextJS](https://nextjs.org/docs/getting-started) w/ ⚛️ React 18
- 🔐 **Auth:** [Next-Auth.js](https://next-auth.js.org)
- 🗂 **Data:** [Prisma](https://prisma.io)
- 📞 **API:** [tRPC](https://trpc.io)
- 💅 **Styling:** [TailwindCSS](https://tailwindcss.com) with [daisyUI](https://daisyui.com)
- 🧪 **Testing:**
  - [Vitest](https://vitest.dev/)
  - [Playwright](https://www.cypress.io/)
- 🚀 **Deployment**
  - [Railway](https://railway.app)

## 🛠️ Set up

### Local

1. Create local environment variable file:

```sh
cp .env.example .env
```

2. Set `NEXTAUTH_SECRET`
3. Set `GOOGLE_CLIENT_ID`
4. Set `GOOGLE_CLIENT_SECRET`

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
npx prisma migrate dev
```

### Github

This repository requires the following secrets to run the code quality, testing, and deployment Github Actions:

```sh
gh secret set DATABASE_URL
gh secret set NEXTAUTH_SECRET
gh secret set NEXTAUTH_URL
gh secret set GOOGLE_CLIENT_ID
gh secret set GOOGLE_CLIENT_SECRET
```
