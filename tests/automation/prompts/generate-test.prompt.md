# Generate Test Prompt

Create a Playwright TypeScript test for HSR Team Builder.

Requirements:

- use existing fixtures from `src/fixtures/test.fixture.ts`
- use page objects or API clients instead of raw mechanics in the spec
- prefer role, label, placeholder, text, then test id locators
- avoid hard waits
- validate one clear behavior
- keep the test CI-safe and environment-variable driven
- review against `docs/TEST_REVIEW_CHECKLIST.md`
