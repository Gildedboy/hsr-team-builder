# Page Object Model Guidelines

Page objects keep specs readable and centralize UI mechanics.

Principles:

- one page object per meaningful page or large component
- expose user actions, not selectors
- keep specs behavior-focused
- place multi-component workflows in `src/flows`
- place reusable business assertions in `src/assertions`
- use fixtures to provide page objects to tests

Example method names:

```ts
await homePage.gotoHome()
await homePage.searchForCharacter('Kafka')
await rosterPage.enterEditMode()
```
