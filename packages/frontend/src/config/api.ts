// API Configuration
const isDevelopment = import.meta.env.DEV

// Development API URL (your local backend)
const DEV_API_URL = 'http://localhost:3001'

// Production API URL (your Railway backend)
// Update this with your actual Railway backend URL after deployment
const PROD_API_URL = import.meta.env.VITE_API_URL || 'https://your-backend-name.railway.app'

export const API_BASE_URL = isDevelopment ? DEV_API_URL : PROD_API_URL

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
}

console.log(`🌐 API Base URL: ${API_BASE_URL} (${isDevelopment ? 'development' : 'production'})`)
