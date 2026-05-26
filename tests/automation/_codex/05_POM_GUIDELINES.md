# Page Object Model Guidelines

## Purpose

Page Objects keep tests readable and reduce duplication.

Specs should describe behavior. Page objects should handle interaction details.

## Required Principles

- One page object per meaningful page or large component.
- Page objects should expose user actions.
- Specs should not contain raw locator-heavy logic.
- Shared business flows belong in `src/flows`.
- Shared assertions belong in `src/assertions`.
- Shared test setup belongs in fixtures.

## Example Structure

```txt
src/pages/base.page.ts
src/pages/home.page.ts
src/pages/character-grid.page.ts
src/pages/team-builder.page.ts
src/pages/team-results.page.ts
src/pages/source-selector.page.ts
```

## BasePage Responsibilities

`BasePage` may include:

- `goto(path: string)`
- `waitForPageReady()`
- `expectNoBlankPage()`
- `expectNoCriticalConsoleErrors()`
- shared navigation helpers

It should not know product-specific flows.

## Page Object Example

Good:

```ts
export class TeamBuilderPage {
  constructor(private readonly page: Page) {}

  async selectMainCharacter(characterName: string): Promise<void> {
    await this.page.getByRole('button', { name: characterName }).click();
  }

  async generateTeams(): Promise<void> {
    await this.page.getByRole('button', { name: 'Generate Team' }).click();
  }

  async expectReady(): Promise<void> {
    await expect(this.page.getByTestId('team-builder')).toBeVisible();
  }
}
```

## Spec Example

Good:

```ts
test('@frontend-critical user can generate team recommendations', async ({
  homePage,
  teamBuilderPage,
  teamResultsPage
}) => {
  await homePage.gotoHome();
  await teamBuilderPage.expectReady();
  await teamBuilderPage.selectMainCharacter('Firefly');
  await teamBuilderPage.generateTeams();
  await teamResultsPage.expectResultsVisible();
});
```

Bad:

```ts
test('user can generate teams', async ({ page }) => {
  await page.goto('/');
  await page.locator('.grid > div:nth-child(2)').click();
  await page.locator('.button-primary').click();
  await expect(page.locator('.results')).toBeVisible();
});
```

## Assertions in Page Objects

Page objects may contain page-level expectation methods:

```ts
async expectResultsVisible(): Promise<void> {}
async expectCharacterDisabled(name: string): Promise<void> {}
```

However, complex business validation should live in:

```txt
src/assertions/
```

## Flows

Use `src/flows` for multi-page or multi-component behavior.

Example:

```txt
src/flows/team-builder.flow.ts
```

A flow can coordinate:

- HomePage
- CharacterGridPage
- TeamBuilderPage
- TeamResultsPage

## POM Review Questions

Before accepting a page object, ask:

1. Does it hide UI mechanics?
2. Are method names written as user actions?
3. Is there duplicated locator logic?
4. Is the spec still readable?
5. Is this page object too large?
6. Should part of this belong in a component object or flow?
