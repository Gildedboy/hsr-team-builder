# Assertion Strategy

Assertions should validate behavior users see or contracts the API guarantees.

Use Playwright web-first assertions:

```ts
await expect(page.getByRole('heading', { name: /team builder/i })).toBeVisible()
await expect(page).toHaveURL('/')
```

Avoid `waitForTimeout()`. Prefer locator assertions or targeted `waitForResponse()` only when the behavior depends on a network response.

API tests should validate status, content type where useful, response shape, required fields, and meaningful business fields. Avoid exact counts unless controlled by a fixture or guaranteed by the contract.
