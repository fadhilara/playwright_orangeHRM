# Playwright OrangeHRM — TypeScript + Cucumber (BDD) + POM

Automated E2E tests for **OrangeHRM Demo**  
URL: https://opensource-demo.orangehrmlive.com/web/index.php/
<br>
Scenario:
- Login success & failed
- Add Job Title with upload file
- Sort Job Title

Tech stack:
- **Playwright** (Chromium by default)
- **TypeScript**
- **Cucumber (BDD)**
- **Page Object Model (POM)**
- **GitHub Actions** (CI)

---

## Quick Start

### Prerequisites
- Node.js 20+ (disarankan)
- Git

### Install
```bash
npm init -y
npm install playwright @cucumber/cucumber ts-node typescript @types/node --save-dev
npx playwright install
```

### Run locally
```bash
npm run cucumber regressionWebkit  #run in browser webkit / safari with tag @regression
npm run cucumber regressionFirefox #run in browser firefox with tag @regression
```
