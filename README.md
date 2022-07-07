# 🧠 Aidea 🧠

An application to allow people to suggest and join forces on ideas for new projects within an organization.

## Stack

**UI Framework:**  React  
**Hosting:** Vercel  
**Authentication**  Auth0  
**Testing:** Vitest  
**CI/CD:** GitHub Actions

## Configuration

The structure of this application was built upon an *ejected* **create-react-app**.
After this, other modifications where made in order to provide for a more enjoyable 
and productive developer experience while developing applications with this template:

### Import alias
Using relative paths (ex: `/../....`) is cumbersome.   

For this reason, we can import `src`-relative modules like `src/<path>` (ex: `src/components/Button`).

#### Configurations
- `.eslintrc.js`
- `jsconfig.json`
- `vite.config.js`
