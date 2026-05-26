export type AutomationConfig = {
  frontendBaseUrl: string
  apiBaseUrl: string
  testEnv: string
  isCi: boolean
}

export const automationConfig: AutomationConfig = {
  frontendBaseUrl:
    process.env.FRONTEND_BASE_URL ?? process.env.BASE_URL ?? 'https://hsr-team-builder.gilded.dev',
  apiBaseUrl:
    process.env.BACKEND_BASE_URL ??
    process.env.API_BASE_URL ??
    'https://api.hsr-team-builder.gilded.dev',
  testEnv: process.env.TEST_ENV ?? 'local',
  isCi: process.env.CI === 'true',
}
