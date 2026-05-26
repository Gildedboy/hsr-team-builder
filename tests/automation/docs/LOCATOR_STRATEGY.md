# Locator Strategy

Use stable, readable locators that match user-visible behavior.

Priority order:

1. `getByRole()`
2. `getByLabel()`
3. `getByPlaceholder()`
4. `getByText()` for stable copy
5. `getByTestId()` for app-specific widgets
6. CSS selectors only when no better locator exists
7. XPath only as a last resort

Avoid generated classes, deep CSS chains, `nth-child`, and raw DOM paths. When a critical flow has no accessible locator, add a clear `data-testid` to the product code and document the reason.
