import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'
import { resolve } from 'node:path'

dotenv.config({ path: resolve(import.meta.dirname, '.env') })

const frontendBaseUrl =
  process.env.FRONTEND_BASE_URL ?? process.env.BASE_URL ?? 'https://hsr-team-builder.gilded.dev'
const apiBaseUrl =
  process.env.BACKEND_BASE_URL ?? process.env.API_BASE_URL ?? 'https://api.hsr-team-builder.gilded.dev'
const isCi = process.env.CI === 'true'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCi,
  retries: isCi ? 2 : 0,
  workers: isCi ? 2 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  timeout: 30_000,
  expect: {
    timeout: 7_500,
  },
  use: {
    baseURL: frontendBaseUrl,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
  },
  metadata: {
    apiBaseUrl,
    testEnv: process.env.TEST_ENV ?? 'local',
  },
  projects: [
    {
      name: 'chromium',
      testIgnore: /.*\.api\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chrome',
      testMatch: /.*(smoke|visual-guard).*\.spec\.ts/,
      testIgnore: /.*\.api\.spec\.ts/,
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'api',
      testMatch: /.*\.api\.spec\.ts/,
      use: {
        baseURL: apiBaseUrl,
      },
    },
  ],
})
