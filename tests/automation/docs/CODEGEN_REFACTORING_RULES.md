# Codegen Refactoring Rules

Playwright codegen may help discover flows and candidate locators, but raw output is not final test code.

Use:

```bash
npm run cli:codegen -- https://hsr-team-builder.gilded.dev
```

For coding-agent browser exploration, use the `playwright-cli` skill against the HSR Team Builder app only:

```bash
npm run agent:open -- https://hsr-team-builder.gilded.dev
npm run agent:snapshot
```

Refactor codegen output by:

- replacing brittle selectors with role, label, text, or test id locators
- moving repeated UI mechanics into page objects
- moving multi-step business behavior into flows
- removing hard waits
- replacing manual sleeps with web-first assertions
- extracting repeated API calls into typed clients
- keeping assertions close to the behavior they validate
