# Locator Strategy

## Purpose

Locators must be stable, readable, and aligned with user-visible behavior.

Bad locators create flaky tests and expensive maintenance.

## Locator Priority

Use this priority order:

1. `getByRole()`
2. `getByLabel()`
3. `getByPlaceholder()`
4. `getByText()` only when text is stable
5. `getByTestId()`
6. CSS selectors only when no better option exists
7. XPath only as a last resort

## Preferred Examples

### Buttons

Good:

```ts
page.getByRole('button', { name: 'Generate Team' });
```

Acceptable if there is no accessible name:

```ts
page.getByTestId('generate-team-button');
```

Bad:

```ts
page.locator('button:nth-child(3)');
```

## Forms and Filters

Good:

```ts
page.getByLabel('Character');
page.getByRole('combobox', { name: 'Source' });
```

Bad:

```ts
page.locator('.select > div > input');
```

## App-Specific Components

Use `data-testid` for complex app-specific components:

```html
<div data-testid="character-card-firefly"></div>
<button data-testid="disable-character-firefly"></button>
<section data-testid="team-results"></section>
```

## Recommended data-testid Names

Use kebab-case:

```txt
character-grid
character-card-firefly
team-builder-form
team-results
team-card-1
source-selector
source-option-animeflv
source-option-animeav1
reset-preferences-button
```

## Dynamic Data

When data is dynamic, prefer stable container locators plus assertions.

Example:

```ts
const teamResults = page.getByTestId('team-results');
await expect(teamResults).toBeVisible();
await expect(teamResults.getByTestId(/team-card-/)).toHaveCountGreaterThan(0);
```

If custom count helpers are needed, implement them in assertions.

## Forbidden Patterns

Avoid:

```ts
page.locator('div > div > div:nth-child(2)')
page.locator('.class-generated-by-framework')
page.locator('/html/body/div[1]/main/div[2]')
page.getByText('Submit') // if multiple Submit buttons exist
```

## When to Add data-testid

Add `data-testid` when:

- the element is critical to a test flow
- role/name is unavailable or unstable
- there are repeated cards/components
- text changes due to localization or content
- CSS classes are generated or styling-only
- the component has no reliable accessible label

## Locator Review Questions

Before accepting a locator, ask:

1. Would this still work after a CSS refactor?
2. Would this still work if layout changes?
3. Does it represent how the user finds the element?
4. Is the name stable?
5. Is this selector readable to another QA engineer?
