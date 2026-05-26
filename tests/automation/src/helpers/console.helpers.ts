import type { ConsoleMessage, Page } from '@playwright/test'

const CRITICAL_MESSAGE_TYPES = new Set(['error'])
const IGNORED_ERROR_PATTERNS = [
  /Failed to load characters/i,
  /Failed to load resource/i,
  /ERR_BLOCKED_BY_CLIENT/i,
  /ERR_NAME_NOT_RESOLVED/i,
]

export function collectCriticalConsoleErrors(page: Page): string[] {
  const errors: string[] = []

  page.on('console', (message: ConsoleMessage) => {
    if (!CRITICAL_MESSAGE_TYPES.has(message.type())) {
      return
    }

    const text = message.text()
    if (IGNORED_ERROR_PATTERNS.some((pattern) => pattern.test(text))) {
      return
    }

    errors.push(text)
  })

  page.on('pageerror', (error) => {
    errors.push(error.message)
  })

  return errors
}
