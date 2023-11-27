# Changelog

## [1.4.0](https://github.com/theponti/aidea/compare/v1.3.0...v1.4.0) (2023-11-27)


### Features

* **ci:** run deploy after code quality success ([5e8bec8](https://github.com/theponti/aidea/commit/5e8bec84ff3b92ed4c3a8c05d750efcff8bd813e))

## [1.3.0](https://github.com/theponti/aidea/compare/v1.2.0...v1.3.0) (2023-10-19)


### Features

* **header:** add auth menu with avatar ([24c15b3](https://github.com/theponti/aidea/commit/24c15b3e0c5318806166560b723579f78de65337))

## [1.2.0](https://github.com/theponti/aidea/compare/v1.1.1...v1.2.0) (2023-05-18)


### Features

* upgrade to trpc version 10 ([#87](https://github.com/theponti/aidea/issues/87)) ([d13516d](https://github.com/theponti/aidea/commit/d13516d1e2778ed7310020690c0138b498e3dd04))


### Bug Fixes

* **next-auth:** upgrade next-auth to 4.22.1 ([18190d2](https://github.com/theponti/aidea/commit/18190d24fb73ff4e0cbb8d04741dcb8bf87b7a8c))

## [1.1.1](https://github.com/theponti/aidea/compare/v1.1.0...v1.1.1) (2023-04-24)


### Bug Fixes

* **github:** do not use latest pnpm in github actions ([9b71c9b](https://github.com/theponti/aidea/commit/9b71c9b656664579009bfa9f1f73955458d6f00e))
* **github:** use pnpm v7.29.1 in github actions ([d4756b3](https://github.com/theponti/aidea/commit/d4756b37f7aeba4990a799bb63374557d69a3c6e))

## [1.1.0](https://github.com/theponti/aidea/compare/v1.0.0...v1.1.0) (2022-11-07)


### Features

* add Recommendations ([#80](https://github.com/theponti/aidea/issues/80)) ([ea4e151](https://github.com/theponti/aidea/commit/ea4e151cb2e4ca954f4fe054ebafea4521fc7c45))

## 1.0.0 (2022-10-31)


### Features

* Add Firebase Authentication ([be2f991](https://github.com/theponti/aidea/commit/be2f99181a71cc998d744f3bd55a606d89065b5d))
* Add Firebase Authentication ([911718c](https://github.com/theponti/aidea/commit/911718c394d658ae52932e4e499a322e491b7292))
* **app/*:** Migrate to vitest from jest ([42452ae](https://github.com/theponti/aidea/commit/42452ae257869459c5d71db2c305482d6d665e3e))
* **components/AlertError:** create and use AlertError component ([7b0909a](https://github.com/theponti/aidea/commit/7b0909adccd6736a8fad7fde621ba6dd2800f384))
* **components/Header:** Add Get Started button to Header ([5f8047c](https://github.com/theponti/aidea/commit/5f8047c10174c754e5eec56d1328a5e823f61a88))
* convert to create-ponti-app ([e979d8a](https://github.com/theponti/aidea/commit/e979d8a8df3c6e201a24dadd03beba189ce58a7d))
* **dashboard:** add idea form and list ([47efcf9](https://github.com/theponti/aidea/commit/47efcf9ce9c1ee080d6ce13ffa0dc87fd99e870f))
* Fetch ideas from Firebase ([81203b8](https://github.com/theponti/aidea/commit/81203b800104600199972617a14c5f4c30995dbe))
* **github:** add emojis to steps in vercel deploys ([c1e7529](https://github.com/theponti/aidea/commit/c1e7529be424d3e87a467bb63eda13f208237505))
* **Header:** Use Button for Log In button ([7bd82a8](https://github.com/theponti/aidea/commit/7bd82a83377dfa869d281e93e3c8df688e6203b1))
* **Idea*:** add loading states to submit and trash buttons ([835e4dd](https://github.com/theponti/aidea/commit/835e4ddc1d4e3098fabb18f55f3c6953a71aca49))
* **IdeaForm:** improve styles and hide submit if no description ([1d56e8f](https://github.com/theponti/aidea/commit/1d56e8ffd4c10ed95b6c8e4b0009a4600c61ba95))
* **pages/*:** use router instead of server side props ([355a5a4](https://github.com/theponti/aidea/commit/355a5a4bab32d84b2f65838e8e108c991adca5f3))
* **pages/index:** redirect auth user to dashboard ([1648a02](https://github.com/theponti/aidea/commit/1648a02bd00f68280ef435c3c27e7829c8393317))
* **prisma:** add createdAt and updatedAt to Idea table ([215cfbd](https://github.com/theponti/aidea/commit/215cfbdf96ce85c0019a01aa183ca03255ea27fd))
* **prisma:** remove title from Idea ([f4bc149](https://github.com/theponti/aidea/commit/f4bc149849e1569681de6699eee760a6cd016a71))
* **README:** add Github and Vercel env set up ([3e07e44](https://github.com/theponti/aidea/commit/3e07e447cd01d38061c1bffccdf1421f9df25986))
* Save Ideas To Firebase ([4782a93](https://github.com/theponti/aidea/commit/4782a937ba9324d64ba1f7959074a53f26907157))
* Save user org to document ([266596f](https://github.com/theponti/aidea/commit/266596feb7d1ecca6bec047cf2943ba2d8aeef9c))
* Save votes to Firebase ([4d9161b](https://github.com/theponti/aidea/commit/4d9161b4d8fc7dea39104c135765d054b944c2b6))
* **server/router/ideas:** order by createdAt desc ([17ab248](https://github.com/theponti/aidea/commit/17ab248a5c3d86b9eac830a261aa63d01d7fbe20))
* **user:** add ability to delete account ([78fb993](https://github.com/theponti/aidea/commit/78fb993a89bd7d4c7cac7025ca21e6b403be7b67))
* **vscode:** add defaultFormatter for prisma files ([fba0f90](https://github.com/theponti/aidea/commit/fba0f90f19a6f35365d83a5da3c159449d6ef1d3))


### Bug Fixes

* Add uid to user in UserContext ([c9b0aa0](https://github.com/theponti/aidea/commit/c9b0aa049ad2a2a374c3bee279a6538b855edfba)), closes [#46](https://github.com/theponti/aidea/issues/46)
* **components/Header:** Fix header tests ([2b11844](https://github.com/theponti/aidea/commit/2b1184403ca8cda9a650c6ff8c5a4283b64d6fc0))
* **componnets/header:** Hide Account link if user not authenticated ([32435a0](https://github.com/theponti/aidea/commit/32435a05d6c848a4e8b61ec28ddd7cc2409f5e24))
* **cypress:** update projectId ([92d8dce](https://github.com/theponti/aidea/commit/92d8dceb6b00f5d8f26d1723df49e6bf426f62eb))
* **dashboard:** move idea components to components dir ([530be9f](https://github.com/theponti/aidea/commit/530be9f08d98912e954409fac279214c88c02169))
* fix firebase deploy ([4ebb30a](https://github.com/theponti/aidea/commit/4ebb30a852d8375c5cdbc40eca194a3d8fb61125))
* fix formatting for prettier ([22b8ea0](https://github.com/theponti/aidea/commit/22b8ea0e78d6ae300c22bab205f9fe8f7b672e98))
* format Application & fix tests ([cdc1d08](https://github.com/theponti/aidea/commit/cdc1d08cbcc7b336296cde30cb44febc66c1cdca))
* **github:** add missing envs for vercel build ([42adb12](https://github.com/theponti/aidea/commit/42adb12e1634df8f2fa5ba1bde32de80eec0a672))
* **git:** ignore .stylelintcache ([4eab832](https://github.com/theponti/aidea/commit/4eab83239a1dd4567bf34bd5794065e616a6144a))
* **IdeaForm:** clear error and add bottom margin to AlertError ([c3ae287](https://github.com/theponti/aidea/commit/c3ae287ec64d714aa6202f8c053ac2473f3f08d2))
* Optimize dependencies ([ecb9948](https://github.com/theponti/aidea/commit/ecb99488c4d3b1221b2d255ca2fc5504f9c8b7c0))
* package.json & yarn.lock to reduce vulnerabilities ([37d3517](https://github.com/theponti/aidea/commit/37d35174e7aa0b1be786462458a9ab078b0761ce))
* **pages/*:** return response of getProtectedServerSideProps ([8689f50](https://github.com/theponti/aidea/commit/8689f50eb0664cd3186e45cba43a183097ea9f8b))
* **prisma:** add native binaryTarget ([4cbb3b6](https://github.com/theponti/aidea/commit/4cbb3b6d13a1588ddc8d08072b031ddf51d45c1d))
* **prisma:** add rhel-openssl-1.0.x to binaryTargets ([4d84cc4](https://github.com/theponti/aidea/commit/4d84cc4f8fe7897a0190d53ddebae8d350163a5a))
* Provide mock for context/Firebase ([81d725a](https://github.com/theponti/aidea/commit/81d725a44fcf554de08faa18a9bad57a8d6d4187))
* **README:** fix link in Notes ([76e5baf](https://github.com/theponti/aidea/commit/76e5bafbdd29adc658f478516a2bfb88068f81fc))
* Remove additionalData from createUser func ([d8078f4](https://github.com/theponti/aidea/commit/d8078f434bd666f20e9ed14d400c5e60f3c980d0))
* revert firestore rules ([c0ae4e4](https://github.com/theponti/aidea/commit/c0ae4e45085a8cc758246fd94e0c62136801dabc))
* Set SignIn as default when no user ([51f2789](https://github.com/theponti/aidea/commit/51f27890b9de6dea37dd4f06aff95998be4a915a))
* Update create & update of user document ([825ac35](https://github.com/theponti/aidea/commit/825ac35c89cab6dc1cd57898fd45a67085469c68))
* upgrade @emotion/react from 11.9.3 to 11.10.0 ([912ceaf](https://github.com/theponti/aidea/commit/912ceaf29f6b2719f01480f135dcfb1d6b5df85b))
* upgrade @emotion/styled from 11.9.3 to 11.10.0 ([677c356](https://github.com/theponti/aidea/commit/677c356c0e71dcf20d78b8afc4acfbf7f48fc094))
* upgrade @mui/icons-material from 5.8.4 to 5.10.2 ([06ae326](https://github.com/theponti/aidea/commit/06ae32643d8db4bcb189b702634c80700945a34b))
* upgrade @mui/material from 5.8.7 to 5.9.0 ([9f92015](https://github.com/theponti/aidea/commit/9f92015477e912a1848ca749f7fc8ebccc5af718))
* upgrade react-hook-form from 7.33.1 to 7.34.0 ([a1929f3](https://github.com/theponti/aidea/commit/a1929f374a3ff04904971ed42614964eb7d87f9c))
* **vercel:** remove env vars from vercel actions ([d7c53da](https://github.com/theponti/aidea/commit/d7c53da047d293e2a23483cfcb8bd86ac3b83743))
* **vite:** Fix linting errors in vite config ([5b9d4ef](https://github.com/theponti/aidea/commit/5b9d4ef7df40c921d66a016b0690fe7fcc47be95))
