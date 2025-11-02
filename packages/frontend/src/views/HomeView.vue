<script setup lang="ts">
import TopBar from '@/components/TopBar.vue'
import TeamRecommendations from '@/components/TeamRecommendations.vue'
import RoleTabsSection from '@/components/RoleTabsSection.vue'
import { getCharacterAvatar, handleImageError, getCharacterImage } from '@/data/avatars'
import { useHomeView } from '@/composables/useHomeView'
import { useCharactersApi } from '@/composables/useCharactersApi'
import { FILTER_OPTIONS } from '@/constants/filterOptions'
import { COLORS } from '@/constants/design'
import { onMounted } from 'vue'
import type { Character } from '@hsr-team-builder/shared'

// Use API-based characters
const { characters, loadCharacters } = useCharactersApi()

// Load characters in background when component mounts
onMounted(async () => {
  // Start loading in background - don't await
  loadCharacters()
})

const {
  selectedElements,
  selectedPaths,
  selectedRarities,
  selectedArchetypes,
  charactersByRole,
  selectedCharacter,
  searchQueryRef,
  showSearchSuggestions,
  searchSuggestions,
  selectedIndex,
  searchError,
  isSearching,
  isRateLimited,
  MIN_SEARCH_LENGTH,
  onKeyDown,
  toggleFilter,
  selectCharacter,
  handleSelectFromSearch,
  handleClearFilters,
  onSearchFocus,
  onSearchBlur,
  isCharacterRecommended,
  getRecommendationTier,
  getActiveTab,
  hasCharactersInRole,
} = useHomeView(characters)

// Helper functions - we'll use the API data now
const isNewFormatCharacter = (characterId: string) => {
  return characters.value.some((char) => char.id === characterId)
}

const getNewFormatCharacter = (characterId: string) => {
  return characters.value.find((char) => char.id === characterId)
}

// Search keydown handler for character details
const handleDetailSearchKeydown = (event: KeyboardEvent) => {
  onKeyDown(event, handleSelectFromSearch)
}

// Check if selected character has full API data (not just static data)
const hasFullCharacterData = (characterId: string) => {
  const character = characters.value.find((char) => char.id === characterId)
  // Character has full data if it has the teammateRecommendations property (even if empty array)
  return character && character.hasOwnProperty('teammateRecommendations')
}

// Scroll to character details when character is selected
const scrollToCharacterDetails = () => {
  const filterCard = document.querySelector('.filter-card')
  if (filterCard) {
    filterCard.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    })
  }
}

// Wrapper function for character selection with auto-scroll
const selectCharacterWithScroll = (character: Character, shouldTriggerSearch = true) => {
  selectCharacter(character, shouldTriggerSearch)
  // Use nextTick to ensure the DOM has updated with the character details
  setTimeout(() => {
    scrollToCharacterDetails()
  }, 100)
}
</script>

<template>
  <TopBar />
  <main class="container-fluid py-4" style="max-width: 1900px; margin: 0 auto">
    <!-- Main Content - Always show UI -->
    <div>
      <div class="text-center mb-4">
        <p class="lead text-white fw-bold px-3">
          Select a character on the main grid to see team recommendations or you can also use the
          filter section
        </p>
      </div>

      <!-- Filters and Team Recommendations Side by Side -->
      <div class="row mb-5">
        <!-- Dynamic Filter/Character Section -->
        <div class="col-lg-3 col-md-4 mb-4">
          <div class="card bg-dark border-primary filter-card" style="height: var(--panel-height); overflow: hidden;">
            <!-- Filter Section Header (when no character selected) -->
            <div v-if="!selectedCharacter" class="card-header d-flex justify-content-between align-items-center px-3">
              <h2 class="h5 text-primary mb-0">Filters</h2>
              <button
                @click="handleClearFilters()"
                class="btn btn-danger btn-sm fw-bold rounded-pill me-2 reset-button"
              >
                Reset
              </button>
            </div>
            <!-- Character Detail Header (when character selected) -->
            <div v-else class="card-header d-flex justify-content-between align-items-center px-3">
              <h2 class="h5 text-primary mb-0">Character Details</h2>
              <button
                @click="handleClearFilters()"
                class="btn btn-danger btn-sm fw-bold rounded-pill me-2 reset-button"
              >
                Reset
              </button>
            </div>
            
            <!-- Filter Content (when no character selected) -->
            <div v-if="!selectedCharacter" class="card-body">
              <!-- Search Bar -->
              <div class="mb-3 position-relative">
                <div class="position-relative">
                  <input
                    v-model="searchQueryRef"
                    type="text"
                    placeholder="Search characters..."
                    class="form-control bg-dark text-white border-primary pe-5"
                    @focus="onSearchFocus"
                    @blur="onSearchBlur"
                    @keydown="onKeyDown($event, (char) => handleSelectFromSearch(char))"
                    autocomplete="off"
                  />
                  <!-- Search indicator -->
                  <div class="position-absolute top-50 end-0 translate-middle-y me-3">
                    <i v-if="isSearching" class="fas fa-spinner fa-spin text-primary"></i>
                    <i v-else-if="searchQueryRef.length >= MIN_SEARCH_LENGTH" class="fas fa-search text-success"></i>
                    <i v-else class="fas fa-search text-muted"></i>
                  </div>
                </div>

                <!-- Rate Limiting Feedback -->
                <div v-if="isRateLimited" class="text-warning small mt-1">
                  <i class="fas fa-clock"></i> Please wait a moment before searching again...
                </div>

                <!-- Search Error Feedback -->
                <div v-if="searchError" class="text-danger small mt-1">
                  <i class="fas fa-exclamation-triangle"></i> {{ searchError }}
                </div>

                <!-- Search Suggestions Dropdown -->
                <div
                  v-if="showSearchSuggestions && searchSuggestions.length > 0"
                  class="position-absolute w-100 bg-dark border border-primary border-top-0 rounded-bottom search-suggestions"
                  style="z-index: 1000;"
                >
                  <div
                    v-for="(character, index) in searchSuggestions"
                    :key="character.id"
                    class="search-suggestion-item hover-bg-primary"
                    :class="{ 'bg-primary': selectedIndex === index }"
                    @click="handleSelectFromSearch(character)"
                  >
                    <img
                      :src="getCharacterAvatar(character.id)"
                      :alt="character.name"
                      class="rounded-circle search-suggestion-avatar"
                      width="24"
                      height="24"
                      loading="lazy"
                      @error="handleImageError"
                    />
                    <div>
                      <div class="text-white fw-semibold small">{{ character.name }}</div>
                      <div class="d-flex align-items-center gap-1">
                        <img
                          :src="`/images/element/${character.element}.webp`"
                          :alt="character.element"
                          class="search-suggestion-element-icon"
                          loading="lazy"
                          style="object-fit: contain"
                          sizes="12px"
                        />
                        <span class="text-light opacity-75 search-suggestion-element-text">{{
                          character.element
                        }}</span>
                        <span class="text-light opacity-75 mx-1">•</span>
                        <img
                          :src="`/images/path/${character.path}.webp`"
                          :alt="character.path"
                          class="search-suggestion-element-icon"
                          loading="lazy"
                          style="object-fit: contain"
                          sizes="12px"
                        />
                        <span class="text-light opacity-75 search-suggestion-element-text">{{
                          character.path
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Rarity -->
              <div class="mb-3">
                <h6 class="text-white small mb-2">Rarity:</h6>
                <div class="d-flex gap-2 justify-content-center">
                  <button
                    v-for="rarity in FILTER_OPTIONS.rarities"
                    :key="rarity"
                    @click="toggleFilter(selectedRarities, rarity)"
                    class="btn btn-sm fw-semibold"
                    :class="
                      selectedRarities.includes(rarity)
                        ? 'btn-outline-primary active'
                        : 'btn-outline-secondary'
                    "
                    :style="{
                      color: (rarity === 5 ? COLORS.rarity5 : COLORS.rarity4) + ' !important',
                      borderColor: (rarity === 5 ? COLORS.rarity5 : COLORS.rarity4) + ' !important',
                    }"
                  >
                    {{ rarity }}★
                  </button>
                </div>
              </div>

              <!-- Elements -->
              <div class="mb-3">
                <h6 class="text-white small mb-2">Elements:</h6>
                <div class="d-flex flex-wrap gap-2 justify-content-center">
                  <button
                    v-for="element in FILTER_OPTIONS.elements"
                    :key="element"
                    @click="toggleFilter(selectedElements, element)"
                    :title="element"
                    class="btn element-path-button"
                    :class="
                      selectedElements.includes(element)
                        ? 'btn-outline-primary active border-primary'
                        : 'btn-outline-secondary'
                    "
                  >
                    <img
                      :src="`/images/element/${element}.webp`"
                      :alt="element"
                      width="20"
                      height="20"
                      loading="lazy"
                      style="max-width: 20px; max-height: 20px; object-fit: contain"
                      sizes="20px"
                    />
                  </button>
                </div>
              </div>

              <!-- Paths -->
              <div class="mb-3">
                <h6 class="text-white small mb-2">Paths:</h6>
                <div class="d-flex flex-wrap gap-2 justify-content-center">
                  <button
                    v-for="path in FILTER_OPTIONS.paths"
                    :key="path"
                    @click="toggleFilter(selectedPaths, path)"
                    :title="path"
                    class="btn element-path-button"
                    :class="
                      selectedPaths.includes(path)
                        ? 'btn-outline-primary active border-primary'
                        : 'btn-outline-secondary'
                    "
                  >
                    <img
                      :src="`/images/path/${path}.webp`"
                      :alt="path"
                      width="20"
                      height="20"
                      loading="lazy"
                      style="max-width: 20px; max-height: 20px; object-fit: contain"
                      sizes="20px"
                    />
                  </button>
                </div>
              </div>

              <!-- Archetype -->
              <div>
                <h6 class="text-white small mb-2">Archetype:</h6>
                <div class="d-flex flex-wrap gap-2 justify-content-center">
                  <button
                    v-for="archetype in FILTER_OPTIONS.archetypes"
                    :key="archetype"
                    @click="toggleFilter(selectedArchetypes, archetype)"
                    class="btn btn-sm fw-medium rounded-pill"
                    :class="
                      selectedArchetypes.includes(archetype)
                        ? 'btn-primary text-dark'
                        : 'btn-outline-light'
                    "
                  >
                    {{ archetype }}
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Character Detail Content (when character selected) -->
            <div v-else class="card-body character-detail-content" style="min-height: var(--panel-height); max-height: var(--panel-height); overflow-y: auto; overflow-x: hidden; word-wrap: break-word; box-sizing: border-box; padding-bottom: 2rem;">
              <!-- Search Input for Character Details -->
              <div class="mb-3 position-relative">
                <div class="position-relative">
                  <input
                    v-model="searchQueryRef"
                    type="text"
                    placeholder="Search characters..."
                    class="form-control bg-dark text-white border-primary pe-5"
                    @focus="onSearchFocus"
                    @blur="onSearchBlur"
                    @keydown="handleDetailSearchKeydown"
                    autocomplete="off"
                  />
                  <!-- Search indicator -->
                  <div class="position-absolute top-50 end-0 translate-middle-y me-3">
                    <i v-if="isSearching" class="fas fa-spinner fa-spin text-primary"></i>
                    <i v-else-if="searchQueryRef.length >= MIN_SEARCH_LENGTH" class="fas fa-search text-success"></i>
                    <i v-else class="fas fa-search text-muted"></i>
                  </div>

                  <!-- Search Suggestions Dropdown -->
                  <div
                    v-if="showSearchSuggestions && searchSuggestions.length > 0"
                    class="position-absolute w-100 bg-dark border border-primary border-top-0 rounded-bottom search-suggestions"
                    style="z-index: 1000;"
                  >
                    <div
                      v-for="(character, index) in searchSuggestions"
                      :key="character.id"
                      class="search-suggestion-item hover-bg-primary"
                      :class="{ 'bg-primary': selectedIndex === index }"
                      @click="handleSelectFromSearch(character)"
                    >
                      <img
                        :src="getCharacterAvatar(character.id)"
                        :alt="character.name"
                        class="rounded-circle search-suggestion-avatar"
                        width="24"
                        height="24"
                        loading="lazy"
                        @error="handleImageError"
                      />
                      <div>
                        <div class="text-white fw-semibold small">{{ character.name }}</div>
                        <div class="d-flex align-items-center gap-1">
                          <img
                            :src="`/images/element/${character.element}.webp`"
                            :alt="character.element"
                            class="search-suggestion-element-icon"
                            loading="lazy"
                            style="object-fit: contain"
                            sizes="12px"
                          />
                          <span class="text-light opacity-75 search-suggestion-element-text">{{
                            character.element
                          }}</span>
                          <span class="text-light opacity-75 mx-1">•</span>
                          <img
                            :src="`/images/path/${character.path}.webp`"
                            :alt="character.path"
                            class="search-suggestion-element-icon"
                            loading="lazy"
                            style="object-fit: contain"
                            sizes="12px"
                          />
                          <span class="text-light opacity-75 search-suggestion-element-text">{{
                            character.path
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Rate Limiting Feedback -->
                <div v-if="isRateLimited" class="text-warning small mt-1">
                  <i class="fas fa-clock"></i> Please wait a moment before searching again...
                </div>

                <!-- Search Error Feedback -->
                <div v-if="searchError" class="text-danger small mt-1">
                  <i class="fas fa-exclamation-triangle"></i> {{ searchError }}
                </div>
              </div>
              
              <div v-if="getNewFormatCharacter(selectedCharacter.id)" class="character-detail-panel" style="word-wrap: break-word; overflow-wrap: break-word; width: 100%; box-sizing: border-box; padding-right: 10px;">
                <!-- Character Header -->
                <div class="detail-header mb-3 d-flex align-items-center">
                              <img 
              :src="getCharacterImage(selectedCharacter.id)" 
              :alt="selectedCharacter.name"
              class="detail-character-image"
              style="width: 200px; height: auto; object-fit: cover; border-radius: 8px; transform: translate(var(--character-image-offset-x), var(--character-image-offset-y)); margin-top: 20px;"
            />
                  <div class="detail-info flex-grow-1">
                    <div class="detail-name-row d-flex align-items-center gap-2 mb-2">
                      <h3 class="detail-name text-white mb-0">{{ selectedCharacter.name }}</h3>
                      <span
                        class="detail-rarity fw-bold"
                        :style="{ color: selectedCharacter.rarity === 4 ? '#8a5fcc' : '#ffd700' }"
                      >
                        {{ selectedCharacter.rarity }}★
                      </span>
                    </div>
                    <div class="detail-meta d-flex flex-wrap gap-3">
                      <div class="meta-item d-flex align-items-center gap-2">
                        <img
                          :src="`/images/element/${selectedCharacter.element}.webp`"
                          :alt="selectedCharacter.element"
                          class="meta-icon"
                          style="width: 24px; height: 24px;"
                        />
                        <span class="text-white">{{ selectedCharacter.element }}</span>
                      </div>
                      <div class="meta-item d-flex align-items-center gap-2">
                        <img
                          :src="`/images/path/${selectedCharacter.path}.webp`"
                          :alt="selectedCharacter.path"
                          class="meta-icon"
                          style="width: 24px; height: 24px;"
                        />
                        <span class="text-white">{{ selectedCharacter.path }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Character Details -->
                <div class="character-sections">
                  <!-- Roles -->
                  <div class="mb-3">
                    <h5 class="text-primary mb-2">Roles</h5>
                    <div class="d-flex flex-wrap gap-1" style="word-wrap: break-word; overflow-wrap: break-word; width: 100%; box-sizing: border-box;">
                      <span
                        v-for="role in getNewFormatCharacter(selectedCharacter.id)?.roles || []"
                        :key="role"
                        class="badge bg-primary text-dark"
                        style="word-wrap: break-word; overflow-wrap: break-word; word-break: break-word; white-space: normal; max-width: 100%; flex-shrink: 1; text-align: left;"
                      >
                        {{ role }}
                      </span>
                    </div>
                  </div>

                  <!-- Archetypes -->
                  <div class="mb-3">
                    <h5 class="text-primary mb-2">Archetypes</h5>
                    <div class="d-flex flex-wrap gap-1" style="word-wrap: break-word; overflow-wrap: break-word; width: 100%; box-sizing: border-box;">
                      <span
                        v-for="archetype in getNewFormatCharacter(selectedCharacter.id)?.archetype || []"
                        :key="archetype"
                        class="badge bg-info text-dark"
                        style="word-wrap: break-word; overflow-wrap: break-word; word-break: break-word; white-space: normal; max-width: 100%; flex-shrink: 1; text-align: left;"
                      >
                        {{ archetype }}
                      </span>
                    </div>
                  </div>

                  <!-- Labels -->
                  <div class="mb-4">
                    <h5 class="text-primary mb-2">Labels</h5>
                    <div class="d-flex flex-wrap gap-1" style="word-wrap: break-word; overflow-wrap: break-word; width: 100%; box-sizing: border-box; padding-bottom: 40px;">
                      <span
                        v-for="label in getNewFormatCharacter(selectedCharacter.id)?.labels?.slice().sort() || []"
                        :key="label"
                        class="badge bg-info text-dark small"
                        style="word-wrap: break-word; overflow-wrap: break-word; word-break: break-word; white-space: normal; max-width: 100%; flex-shrink: 1; text-align: left;"
                      >
                        {{ label }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Remove the separate character detail panel -->
        </div>

        <!-- Team Recommendations -->
        <div class="col-lg-9 col-md-8">
          <!-- Loading state when character is selected but doesn't have full API data -->
          <div v-if="selectedCharacter && !hasFullCharacterData(selectedCharacter.id)" class="card bg-dark border-primary text-center py-5" style="min-height: var(--panel-height);">
            <div class="card-body">
                            <div class="spinner-border text-primary mb-3" aria-label="Loading">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="text-white fw-bold mb-0">Loading character data from server...</p>
            </div>
          </div>
          <!-- Character recommendations available -->
          <TeamRecommendations
            v-else-if="
              selectedCharacter &&
              isNewFormatCharacter(selectedCharacter.id) &&
              getNewFormatCharacter(selectedCharacter.id)
            "
            :key="selectedCharacter.id"
            :character="getNewFormatCharacter(selectedCharacter.id)!"
            style="min-height: var(--panel-height); max-height: var(--panel-height); overflow-y: auto;"
          />
          <!-- Character selected but no recommendations available -->
          <div v-else-if="selectedCharacter" class="card bg-dark border-primary text-center py-5" style="min-height: var(--panel-height);">
            <div class="card-body">
              <p class="text-secondary mb-0">
                Character recommendations not available in new format
              </p>
            </div>
          </div>
          <!-- No character selected -->
          <div v-else class="card bg-dark border-primary text-center py-5" style="min-height: var(--panel-height);">
            <div class="card-body">
              <p class="text-white fw-bold mb-0">Select a character to see team recommendations</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Color Legend -->
      <div class="d-flex justify-content-center mb-3">
        <div class="d-flex gap-4 flex-wrap justify-content-center">
          <div class="d-flex align-items-center gap-2">
            <div class="legend-color" style="background-color: #ff00ff"></div>
            <span class="text-white legend-text">Selected</span>
          </div>
          <div class="d-flex align-items-center gap-2">
            <div class="legend-color" style="background-color: #ffd700"></div>
            <span class="text-white legend-text">BiS</span>
          </div>
          <div class="d-flex align-items-center gap-2">
            <div class="legend-color" style="background-color: #00d4ff"></div>
            <span class="text-white legend-text">Generalist</span>
          </div>
          <div class="d-flex align-items-center gap-2">
            <div class="legend-color" style="background-color: #2ecc71"></div>
            <span class="text-white legend-text">F2P</span>
          </div>
        </div>
      </div>

      <!-- Characters grouped by archetype -->
      <div class="card bg-dark border-primary mb-5" style="min-height: 500px;">
        <RoleTabsSection
          :characters-by-role="charactersByRole"
          :selected-character="selectedCharacter"
          :is-recommended="
            (charId: string) =>
              selectedCharacter ? isCharacterRecommended(selectedCharacter, charId) : false
          "
          :get-recommendation-tier="
            (charId: string) =>
              selectedCharacter ? getRecommendationTier(selectedCharacter, charId) : null
          "
          :selected-elements="selectedElements"
          :selected-paths="selectedPaths"
          :selected-rarities="selectedRarities"
          :get-active-tab="getActiveTab"
          :has-characters-in-role="hasCharactersInRole"
          @select="selectCharacterWithScroll"
        />
      </div>
    </div>
    <!-- End main content -->
  </main>
</template>
<style scoped>
/* Character image positioning variables */
:root {
  --character-image-offset-x: -16.7143%; /* Horizontal offset for character portrait positioning */
  --character-image-offset-y: -6.25%;   /* Vertical offset for character portrait positioning */
  --panel-height: 650px;                /* Standard height for filter and character detail panels */
}

.reset-button {
  height: 36px;
  padding: 8px 16px;
  border-radius: 18px;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.legend-text {
  font-size: 12px;
}

/* Custom Scrollbar Styling */
.character-detail-content::-webkit-scrollbar,
.card::-webkit-scrollbar {
  width: 8px;
}

.character-detail-content::-webkit-scrollbar-track,
.card::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.character-detail-content::-webkit-scrollbar-thumb,
.card::-webkit-scrollbar-thumb {
  background: #00d4ff;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.character-detail-content::-webkit-scrollbar-thumb:hover,
.card::-webkit-scrollbar-thumb:hover {
  background: #0099cc;
}

/* For Firefox */
.character-detail-content,
.card {
  scrollbar-width: thin;
  scrollbar-color: #00d4ff rgba(0, 0, 0, 0.2);
}

/* Global Firefox Scrollbar */
html {
  scrollbar-width: thin;
  scrollbar-color: #00d4ff #1a1a2e;
}
</style>
