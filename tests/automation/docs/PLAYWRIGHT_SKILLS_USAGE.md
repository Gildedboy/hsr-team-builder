# Playwright Skills Usage

This framework uses the TestDino Playwright skill guidance as standards material, not as a runtime dependency.

This requirement applies no matter where an agent is launched from. If you start Codex or another tool outside `tests/automation`, read the root `AGENTS.md` file first, then this document.

Install or discover the skill with the Skills CLI when it is missing:

```bash
npx skills add testdino-hq/playwright-skill
```

If the agent environment already has `playwright-skill` installed locally, use that copy instead of reinstalling.

Apply it when generating, reviewing, or refactoring tests:

- prefer user-facing locators and web-first assertions
- rely on Playwright auto-waiting instead of hard waits
- place raw UI mechanics in page objects
- place API calls in typed clients
- share setup through fixtures
- keep tests isolated and CI-safe
- use traces, screenshots, and reports for debugging artifacts

Reference material:

- `https://github.com/testdino-hq/playwright-skill`
- `https://playwright.dev/docs/getting-started-cli`
- coding-agent `playwright-cli` skill for authorized browser inspection of this app

Workflow:

```txt
discover behavior -> inspect locators -> generate draft -> refactor into framework structure -> review -> run locally -> fix flakiness risks
```

Use official Playwright CLI commands alongside Playwright Test:

```bash
npm run cli:install-browsers
npm run cli:codegen -- https://hsr-team-builder.gilded.dev
npm run test:smoke
npm run report
```

Use the coding-agent `playwright-cli` package and skill for exploratory browser operations such as `open`, `snapshot`, `click`, screenshots, and trace debugging:

```bash
npm run agent:install-skills
npm run agent:open -- https://hsr-team-builder.gilded.dev
npm run agent:snapshot
```

Treat CLI output as discovery data; the accepted automation remains Playwright Test code under `tests/automation/tests`.
