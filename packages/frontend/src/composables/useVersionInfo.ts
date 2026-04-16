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
  const RETRY_DELAY_MS = 10000

  let versionRetryTimer: ReturnType<typeof setTimeout> | null = null
  let roadmapRetryTimer: ReturnType<typeof setTimeout> | null = null

  const configuredAppVersion = import.meta.env.VITE_APP_VERSION?.trim()
  const versionEndpoint = configuredAppVersion
    ? `${API_BASE_URL}/versions/${configuredAppVersion}`
    : `${API_BASE_URL}/versions/latest`

  // Use the deployed app version when available, otherwise show the latest API version in dev.
  const appVersion = computed(
    () => currentVersionInfo.value?.version || configuredAppVersion || 'latest',
  )

  const clearVersionRetryTimer = () => {
    if (versionRetryTimer) {
      clearTimeout(versionRetryTimer)
      versionRetryTimer = null
    }
  }

  const clearRoadmapRetryTimer = () => {
    if (roadmapRetryTimer) {
      clearTimeout(roadmapRetryTimer)
      roadmapRetryTimer = null
    }
  }

  const fetchVersionInfo = async () => {
    if (isLoading.value) {
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(versionEndpoint)

      if (!response.ok) {
        throw new Error(`Failed to fetch version info: ${response.status}`)
      }

      const data = await response.json()
      currentVersionInfo.value = data
      clearVersionRetryTimer()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load version information'
      console.warn('Version info API unavailable, using fallback content')

      // Fallback content for current version
      currentVersionInfo.value = {
        version: configuredAppVersion || 'latest',
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

      if (!versionRetryTimer) {
        versionRetryTimer = setTimeout(() => {
          versionRetryTimer = null
          void fetchVersionInfo()
        }, RETRY_DELAY_MS)
      }
    } finally {
      isLoading.value = false
    }
  }

  const fetchRoadmap = async () => {
    if (isLoadingRoadmap.value) {
      return
    }

    isLoadingRoadmap.value = true
    roadmapError.value = null

    try {
      const response = await fetch(`${API_BASE_URL}/versions/roadmap`)

      if (!response.ok) {
        throw new Error(`Failed to fetch roadmap: ${response.status}`)
      }

      const data = await response.json()
      roadmapItems.value = Array.isArray(data) ? data : []
      clearRoadmapRetryTimer()
    } catch (err) {
      roadmapError.value = err instanceof Error ? err.message : 'Failed to load roadmap'
      console.warn('Roadmap API unavailable, using fallback content')

      // Fallback roadmap content
      roadmapItems.value = [
        'Allow users to pick their owned characters, store locally, and recommend teams based on their roster',
      ]

      if (!roadmapRetryTimer) {
        roadmapRetryTimer = setTimeout(() => {
          roadmapRetryTimer = null
          void fetchRoadmap()
        }, RETRY_DELAY_MS)
      }
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
