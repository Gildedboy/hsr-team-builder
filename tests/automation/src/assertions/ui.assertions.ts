import { expect, type Locator, type Page } from '@playwright/test'

export async function expectNoBlankPage(page: Page): Promise<void> {
  await expect(page.locator('body')).not.toBeEmpty()
  await expect(page.locator('#app')).not.toBeEmpty()
}

export async function expectVisibleWithinViewport(locator: Locator): Promise<void> {
  await expect(locator).toBeVisible()

  const box = await locator.boundingBox()
  expect(box, 'locator has a bounding box').not.toBeNull()
  expect(box?.width, 'locator width').toBeGreaterThan(0)
  expect(box?.height, 'locator height').toBeGreaterThan(0)
}
