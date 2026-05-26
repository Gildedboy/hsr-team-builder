# Playwright Skills Usage

## Purpose

This project uses Playwright skills as a standards layer for generating, reviewing, and improving tests.

The goal is not to blindly generate tests. The goal is to create maintainable Playwright TypeScript automation using proven practices.

## References

Use these references as guidance:

```txt
https://github.com/testdino-hq/playwright-skill
https://playwright.dev/docs/getting-started-cli
```

## Required Skill Areas

Apply guidance from these areas:

- core Playwright testing
- locators
- assertions
- waiting and auto-waiting
- Page Object Model
- fixtures
- API testing
- CI/CD
- debugging
- Playwright CLI
- codegen usage
- flaky test prevention

## How Codex Must Use Skills

Before generating or modifying tests, Codex must consider:

1. Is the locator stable?
2. Is the assertion user-visible and meaningful?
3. Is the test relying on Playwright auto-waiting correctly?
4. Is there any hard wait?
5. Does this belong in a spec, page object, helper, fixture, flow, or API client?
6. Is the test readable for a QA engineer?
7. Is the test CI-safe?
8. Does the test depend on unstable external data?
9. Is there a better test layer for this validation?

## Skill Usage Workflow

Use this workflow:

```txt
discover behavior
→ inspect locators
→ generate draft
→ refactor into framework structure
→ review against checklist
→ run locally
→ fix flakiness risks
→ accept
```

## Codegen Policy

Playwright codegen may be used to discover flows and locators.

However:

- raw codegen output must not be final test code
- generated selectors must be reviewed
- generated actions must be refactored into POMs or flows
- duplicated logic must be extracted
- missing stable selectors should result in a data-testid recommendation or implementation

## Runtime Dependency Policy

Do not add Playwright skills as runtime test dependencies unless required.

Use them as:

- local reference material
- implementation guidance
- review checklist input
- prompt context

## Final Review Requirement

Every new or modified test must be reviewed against:

```txt
tests/automation/docs/TEST_REVIEW_CHECKLIST.md
```
