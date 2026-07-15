# MS Food

MS Food is a React/Vite burger landing page designed for GitHub Pages deployment.

## Live site

After the GitHub Pages workflow runs successfully, open the site at:

https://syedmohammadbuxshah-glitch.github.io/Ms-food/

## Run locally

**Prerequisites:** Node.js 20+

1. Install dependencies:
   ```bash
   npm install
   ```
2. Optional: copy `.env.example` to `.env.local` and set any required environment variables.
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Deploy to GitHub Pages

The repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml`. Push to `main` or run the workflow manually from the Actions tab to publish the latest build to GitHub Pages.
