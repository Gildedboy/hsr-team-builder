# Assertion Strategy

## Purpose

Assertions must validate meaningful behavior, not implementation details.

Prefer assertions that reflect what the user sees or what the API contract guarantees.

## Preferred UI Assertions

Use Playwright web-first assertions:

```ts
await expect(locator).toBeVisible();
await expect(locator).toBeHidden();
await expect(locator).toHaveText('...');
await expect(locator).toContainText('...');
await expect(locator).toHaveAttribute('aria-selected', 'true');
await expect(page).toHaveURL(/\/teams/);
await expect(page).toHaveTitle(/HSR/);
```

These assertions auto-retry and reduce flakiness.

## Avoid Manual Waiting

Do not use:

```ts
await page.waitForTimeout(3000);
```

Instead use:

```ts
await expect(page.getByTestId('team-results')).toBeVisible();
```

or:

```ts
await page.waitForResponse(response =>
  response.url().includes('/teams') && response.status() === 200
);
```

Only use network waiting when the user behavior truly depends on that response.

## API Assertions

API tests should validate:

- status code
- content type if relevant
- response shape
- required fields
- important business fields
- empty/error states where applicable

Example:

```ts
expect(response.status()).toBe(200);
expect(Array.isArray(data)).toBe(true);
expect(data.length).toBeGreaterThan(0);
expect(data[0]).toHaveProperty('id');
expect(data[0]).toHaveProperty('name');
```

Prefer reusable assertion helpers:

```ts
expectValidCharacter(character);
expectValidTeam(team);
expectValidSource(source);
```

## Avoid Overfitting

Do not assert volatile data unless the data is controlled.

Avoid:

```ts
expect(characterCount).toBe(57);
```

Prefer:

```ts
expect(characterCount).toBeGreaterThan(0);
```

Only use exact values when:

- the fixture controls the data
- the API contract guarantees the value
- the test explains why the value is stable

## User-Visible Behavior First

For E2E tests, prefer:

```ts
await expect(teamResultsPage.resultsContainer).toBeVisible();
await teamResultsPage.expectTeamContainsCharacter('Firefly');
```

Avoid asserting internal Vue/NestJS implementation details.

## Error Assertions

When testing negative behavior, assert the visible result.

Good:

```ts
await expect(page.getByText('No teams found')).toBeVisible();
```

Bad:

```ts
expect(component.internalState.error).toBe(true);
```

## Assertion Review Questions

Before accepting an assertion, ask:

1. Does this prove the flow works?
2. Would a real user care about this result?
3. Is this assertion stable?
4. Is this better validated at API level instead of UI level?
5. Is the test overfitting to current data?
