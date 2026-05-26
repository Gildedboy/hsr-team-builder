# Test Review Checklist

Every new or modified test must be reviewed against this checklist before being accepted.

## 1. Purpose

- [ ] The test has a clear reason to exist.
- [ ] The test validates user-visible behavior or a real API contract.
- [ ] The test is not duplicating another test without adding value.
- [ ] The test belongs at the correct layer: smoke, API, E2E, integration, or visual guard.

## 2. Locator Quality

- [ ] Uses `getByRole()` where possible.
- [ ] Uses `getByLabel()` for form controls where possible.
- [ ] Uses `getByTestId()` for app-specific components where needed.
- [ ] Avoids brittle CSS selectors.
- [ ] Avoids XPath.
- [ ] Avoids `nth-child`.
- [ ] Locator names are readable and stable.
- [ ] Missing stable selectors are documented or fixed with `data-testid`.

## 3. Assertion Quality

- [ ] Uses Playwright web-first assertions.
- [ ] Avoids hard waits.
- [ ] Validates meaningful outcomes.
- [ ] Does not overfit to volatile data.
- [ ] Does not assert implementation details.
- [ ] API assertions validate status and contract shape.
- [ ] E2E assertions validate visible behavior.

## 4. Waiting and Flakiness

- [ ] Does not use `waitForTimeout()` except debug-only documented usage.
- [ ] Relies on locator auto-waiting where possible.
- [ ] Uses `expect()` auto-retry assertions.
- [ ] Avoids race conditions.
- [ ] Avoids uncontrolled external dependencies where possible.
- [ ] Any dependency on dynamic data is documented.

## 5. POM and Framework Boundaries

- [ ] Raw UI mechanics live in page objects.
- [ ] Specs remain readable.
- [ ] Shared business flows live in `src/flows`.
- [ ] Shared assertions live in `src/assertions`.
- [ ] Shared setup lives in fixtures.
- [ ] API requests live in API clients.
- [ ] There is no duplicated locator logic across specs.

## 6. TypeScript Quality

- [ ] Types are explicit where useful.
- [ ] Avoids `any` unless justified.
- [ ] No unused code.
- [ ] No dead helpers.
- [ ] No duplicated types.
- [ ] `npm run typecheck` passes.

## 7. CI Compatibility

- [ ] The test can run headless.
- [ ] The test does not depend on local-only state.
- [ ] The test works with environment variables.
- [ ] The test produces useful failure artifacts.
- [ ] The test does not require secrets unless documented.

## 8. Debuggability

- [ ] Failure message would be understandable.
- [ ] Assertions are close to the behavior they validate.
- [ ] Trace/screenshot/video would help debug the failure.
- [ ] Test data is clear.

## 9. Acceptance

A test can be accepted only if:

- [ ] it passes locally or is intentionally skipped with a clear TODO
- [ ] it passes the checklist
- [ ] it does not introduce framework debt
