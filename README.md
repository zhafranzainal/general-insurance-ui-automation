# general-insurance-ui-automation
UI automation framework for General Insurance systems using Playwright and TypeScript.

## Features
- Modern **Playwright + TypeScript** automation framework  
- Page Object Model (POM) based structure  
- Reusable **flows**, **pages**, and **utils**  
- Supports multi-frame/micro-app architecture  

## Folder Structure
```
general-insurance-ui-automation/
│
├─ modules/
│  ├─ policy-admin/
│  │  ├─ pages/           # Page objects
│  │  ├─ flows/           # Business flows
│  │  ├─ data/            # Test data & constants
│  │  └─ tests/           # Test specs
│  │
│  └─ ...                 # Other modules
│
├─ shared/
│  ├─ pages/              # Shared page objects (e.g. login, side menu)
│  ├─ flows/              # Shared flows (e.g. login)
│  ├─ models/             # TypeScript interfaces & types
│  ├─ utils/              # Utility functions
│  └─ tests/              # Base test class to auto start debug session
│
├─ playwright.config.ts   # Playwright configuration
├─ package.json           # Dependencies and scripts
└─ README.md
```

## Setup

1. Install dependencies:
```bash
   npm install
```

2. Set up environment variables:
```bash
   cp .env.example .env
```

3. Install Playwright browsers:
```bash
   npx playwright install
```

## Running Tests

Run all tests:
```bash
npm test
```

Run specific test with debug mode:
```bash
npx playwright test modules/policy-admin/tests/nb-mp-valid.spec.ts --debug
```

## Adding New Tests

1. **Create test data** in `modules/<module>/data`
2. **Use flows** in `modules/<module>/flows` for business logic
3. **Use page objects** in `modules/<module>/pages` or `shared/pages` for UI interactions
4. **Write test specs** in `modules/<module>/tests` using `test()` from `shared/tests/base.test.ts`
