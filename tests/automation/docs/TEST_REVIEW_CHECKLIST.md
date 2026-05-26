# Test Review Checklist

Before accepting a new or modified test, verify:

- the test validates real user-visible behavior or a real API contract
- the test belongs in the right layer
- locators prefer role, label, placeholder, text, then test id
- brittle CSS and XPath are avoided
- assertions are web-first or contract-focused
- no hard waits are used
- specs do not duplicate page object mechanics
- API requests live in typed clients
- test data is clear and not overfit to volatile counts
- `npm run typecheck` passes
- the test can run headless in CI
- failures will produce useful artifacts
