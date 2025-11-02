import { ref, computed, onMounted } from 'vue'
import { API_BASE_URL } from '@/config/api'

export interface VersionInfo {
  version: string
  releaseDate: string
  title: string
  description?: string
  features: string[]
  bugFixes: string[]
  breakingChanges?: string[]
  knownIssues?: string[]
}

export function useVersionInfo() {
  const currentVersionInfo = ref<VersionInfo | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Get current app version from environment
  const appVersion = computed(() => import.meta.env.VITE_APP_VERSION || 'v2.6.2')

  const fetchVersionInfo = async () => {
    isLoading.value = true
    error.value = null

    try {
      // Try to fetch the current version from API
      const response = await fetch(`${API_BASE_URL}/versions/${appVersion.value}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch version info: ${response.status}`)
      }

      const data = await response.json()
      currentVersionInfo.value = data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load version information'
      console.warn('Version info API unavailable, using fallback content')

      // Fallback content for current version
      currentVersionInfo.value = {
        version: appVersion.value,
        releaseDate: new Date().toISOString().split('T')[0],
        title: 'Responsive Character Details Fix',
        description: 'Improved mobile and desktop experience with better character detail layouts.',
        features: [
          'Responsive character details layout improvements',
          'Better mobile experience across all screen sizes',
          'Fixed text crowding on medium screens',
          'Improved character info visibility',
        ],
        bugFixes: [
          'Character details no longer hidden on smaller screens',
          'Mobile layout properly activates at correct breakpoints',
        ],
      }
    } finally {
      isLoading.value = false
    }
  }

  // Check if we have version info loaded
  const hasVersionInfo = computed(() => currentVersionInfo.value !== null)

  // Auto-fetch current version info when composable is used
  onMounted(() => {
    fetchVersionInfo()
  })

  return {
    // State
    currentVersionInfo,
    isLoading,
    error,
    appVersion,

    // Computed
    hasVersionInfo,

    // Methods
    fetchVersionInfo,
  }
}
