const isProduction = process.env.NODE_ENV === 'production'

const readEnv = (name: string) => process.env[name]?.trim()

const requireEnv = (name: string) => {
  const value = readEnv(name)
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

const getSecureProductionEnv = (name: string, developmentFallback: string, invalidValues: string[]) => {
  if (!isProduction) {
    return readEnv(name) || developmentFallback
  }

  const value = requireEnv(name)
  if (invalidValues.includes(value)) {
    throw new Error(
      `Unsafe production environment variable: ${name} must be set to a non-placeholder value`,
    )
  }

  return value
}

export const getDatabaseUrl = () =>
  isProduction
    ? requireEnv('DATABASE_URL')
    : readEnv('DATABASE_URL') || 'postgresql://postgres:password@localhost:5432/hsr_team_builder'

export const getRedisUrl = () =>
  isProduction ? requireEnv('REDIS_URL') : readEnv('REDIS_URL') || 'redis://localhost:6379'

export const getJwtSecret = () =>
  getSecureProductionEnv('JWT_SECRET', 'hsr-team-builder-secret-key', [
    'hsr-team-builder-secret-key',
    'your-super-secret-jwt-key-change-this-in-production',
  ])

export const getAdminUsername = () =>
  getSecureProductionEnv('ADMIN_USERNAME', 'admin', ['admin', 'your-username-here'])

export const getAdminPassword = () =>
  getSecureProductionEnv('ADMIN_PASSWORD', 'change-me-in-production', [
    'change-me-in-production',
    'your-secure-password-here',
  ])

export const validateRuntimeEnv = () => {
  getDatabaseUrl()
  getRedisUrl()
  getJwtSecret()
  getAdminUsername()
  getAdminPassword()
}
