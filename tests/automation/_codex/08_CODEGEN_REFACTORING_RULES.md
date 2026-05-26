# Playwright Codegen Refactoring Rules

## Purpose

Playwright codegen is allowed for discovery, but generated output must not be accepted as final framework code.

## Allowed Use

Use codegen to:

- discover user flows
- inspect available locators
- understand page transitions
- capture draft interactions
- identify missing testability hooks

Example:

```bash
npx playwright codegen https://hsr-team-builder.gilded.dev
```

Optional temporary output:

```bash
npx playwright codegen https://hsr-team-builder.gilded.dev --output tmp/generated/team-builder.generated.spec.ts
```

## Forbidden Use

Do not:

- commit raw generated specs as final tests
- keep locator-heavy specs
- rely on generated CSS selectors without review
- keep duplicated generated interactions
- keep arbitrary waits
- accept generated code without POM refactoring

## Required Refactoring Flow

After codegen:

1. Identify the user flow.
2. Extract stable locators.
3. Replace brittle locators.
4. Add or recommend `data-testid` where needed.
5. Move UI mechanics into page objects.
6. Move repeated actions into flows.
7. Move reusable checks into assertions.
8. Use fixtures for page objects/API clients.
9. Add tags such as `@smoke`, `@frontend-critical`, `@backend-critical`, `@regression`.
10. Run the test.
11. Review against `TEST_REVIEW_CHECKLIST.md`.

## Example Transformation

Raw generated code:

```ts
await page.locator('div:nth-child(2) > button').click();
await page.locator('.results').click();
```

Refactored code:

```ts
await teamBuilderPage.selectMainCharacter('Firefly');
await teamBuilderPage.generateTeams();
await teamResultsPage.expectResultsVisible();
```

## Temporary Generated Files

If generated files are kept for reference, place them under:

```txt
tests/automation/tmp/generated/
```

And add this to `.gitignore`:

```txt
tests/automation/tmp/
```

## Missing Selectors Policy

If stable locators do not exist, Codex should add `data-testid` attributes to frontend components when safe.

If adding test IDs is not safe in the current task, document the recommendation in:

```txt
tests/automation/docs/MISSING_TESTABILITY_HOOKS.md
```

Suggested format:

```md
# Missing Testability Hooks

## Component: Character Card

Recommended test IDs:

- `character-card-{character-id}`
- `disable-character-{character-id}`

Reason:

Current locators depend on visual structure and may break after layout changes.
```

## Codegen Review Questions

Before accepting refactored code, ask:

1. Is any raw generated selector still present?
2. Is the spec readable?
3. Did repeated code move to POM/flow/helper?
4. Are assertions meaningful?
5. Does the test run in CI?
6. Would this survive a CSS/layout refactor?
