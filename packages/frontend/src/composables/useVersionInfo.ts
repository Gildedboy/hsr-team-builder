import { ref, computed } from 'vue'
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
  roadmapItems?: string[]
}

export function useVersionInfo() {
  const currentVersionInfo = ref<VersionInfo | null>(null)
  const roadmapItems = ref<string[]>([])
  const isLoading = ref(false)
  const isLoadingRoadmap = ref(false)
  const error = ref<string | null>(null)
  const roadmapError = ref<string | null>(null)

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

  const fetchRoadmap = async () => {
    isLoadingRoadmap.value = true
    roadmapError.value = null

    try {
      const response = await fetch(`${API_BASE_URL}/versions/roadmap`)

      if (!response.ok) {
        throw new Error(`Failed to fetch roadmap: ${response.status}`)
      }

      const data = await response.json()
      roadmapItems.value = Array.isArray(data) ? data : []
    } catch (err) {
      roadmapError.value = err instanceof Error ? err.message : 'Failed to load roadmap'
      console.warn('Roadmap API unavailable, using fallback content')

      // Fallback roadmap content
      roadmapItems.value = [
        'Add "Check Prydwen Build" link',
        'Enhanced mobile responsiveness',
        'Additional team composition recommendations'
      ]
    } finally {
      isLoadingRoadmap.value = false
    }
  }

  // Check if we have version info loaded
  const hasVersionInfo = computed(() => currentVersionInfo.value !== null)

  return {
    // State
    currentVersionInfo,
    roadmapItems,
    isLoading,
    isLoadingRoadmap,
    error,
    roadmapError,
    appVersion,

    // Computed
    hasVersionInfo,

    // Methods
    fetchVersionInfo,
    fetchRoadmap,
  }
}
