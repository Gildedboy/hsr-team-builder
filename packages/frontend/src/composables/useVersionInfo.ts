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

  const configuredAppVersion = import.meta.env.VITE_APP_VERSION?.trim()

  // Use the deployed app version when available, otherwise show the latest API version in dev.
  const appVersion = computed(
    () => currentVersionInfo.value?.version || configuredAppVersion || 'latest',
  )

  const fetchVersionInfo = async () => {
    if (isLoading.value) {
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(
        configuredAppVersion ? `${API_BASE_URL}/versions` : `${API_BASE_URL}/versions/latest`,
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch version info: ${response.status}`)
      }

      const data = await response.json()
      if (configuredAppVersion && Array.isArray(data)) {
        currentVersionInfo.value =
          data.find((versionInfo: VersionInfo) => versionInfo.version === configuredAppVersion) ||
          data[0] ||
          null
      } else {
        currentVersionInfo.value = data
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load version information'
      currentVersionInfo.value = null
      console.warn('Version info API unavailable')
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
    } catch (err) {
      roadmapError.value = err instanceof Error ? err.message : 'Failed to load roadmap'
      console.warn('Roadmap API unavailable, using fallback content')

      // Fallback roadmap content
      roadmapItems.value = [
        'Allow users to pick their owned characters, store locally, and recommend teams based on their roster',
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
