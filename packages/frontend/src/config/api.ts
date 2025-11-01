// API Configuration
const isDevelopment = import.meta.env.DEV

// Development API URL - can be overridden by VITE_API_URL env var
const DEV_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// Production API URL (your custom Railway backend domain)
const PROD_API_URL = import.meta.env.VITE_API_URL || 'https://api.hsr-team-builder.gilded.dev'

export const API_BASE_URL = import.meta.env.VITE_API_URL || (isDevelopment ? DEV_API_URL : PROD_API_URL)

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
}

//console.log(`🌐 API Base URL: ${API_BASE_URL} (${isDevelopment ? 'development' : 'production'})`)
