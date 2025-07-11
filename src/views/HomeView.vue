<script setup lang="ts">
import TopBar from '@/components/TopBar.vue'
import TeamRecommendations from '@/components/TeamRecommendations.vue'
import RoleTabsSection from '@/components/RoleTabsSection.vue'
import { getCharacterAvatar } from '@/data/avatars'
import { useHomeView } from '@/composables/useHomeView'
import { FILTER_OPTIONS } from '@/constants/filterOptions'
import { COLORS } from '@/constants/design'


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
} = useHomeView()
</script>

<template>
  <TopBar />
  <main class="container-fluid py-4">
    <div class="text-center mb-4">
      <p class="lead text-secondary px-3">
        Select a character to see team recommendations or use filters and archetypes
      </p>
    </div>

    <!-- Filters and Team Recommendations Side by Side -->
    <div class="row mb-5">
      <!-- Filter Section -->
      <div class="col-lg-3 col-md-4 mb-4">
        <div class="card bg-dark border-primary filter-card">
          <div class="card-header d-flex justify-content-between align-items-center px-3">
            <h3 class="h5 text-primary mb-0">Filters</h3>
            <button
              @click="handleClearFilters()"
              class="btn btn-warning btn-sm fw-bold rounded-pill me-2 reset-button"
            >
              RESET
            </button>
          </div>
          <div class="card-body">
            <!-- Search Bar -->
            <div class="mb-3 position-relative">
              <input
                v-model="searchQueryRef"
                type="text"
                placeholder="Search..."
                class="form-control bg-dark text-white border-primary"
                @focus="onSearchFocus"
                @blur="onSearchBlur"
              />

              <!-- Search Suggestions Dropdown -->
              <div
                v-if="showSearchSuggestions && searchSuggestions.length > 0"
                class="position-absolute w-100 bg-dark border border-primary border-top-0 rounded-bottom search-suggestions"
              >
                <div
                  v-for="character in searchSuggestions"
                  :key="character.id"
                  class="search-suggestion-item hover-bg-primary"
                  @click="handleSelectFromSearch(character)"
                >
                  <img
                    :src="getCharacterAvatar(character.id)"
                    :alt="character.name"
                    class="rounded-circle search-suggestion-avatar"
                    @error="($event.target as HTMLImageElement).src = '/images/placeholder.svg'"
                  />
                  <div>
                    <div class="text-white fw-semibold small">{{ character.name }}</div>
                    <div class="d-flex align-items-center gap-1">
                      <img
                        :src="`/images/element/${character.element}.webp`"
                        :alt="character.element"
                        class="search-suggestion-element-icon"
                      />
                      <span class="text-secondary search-suggestion-element-text">{{
                        character.element
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Rarity -->
            <div class="mb-3">
              <label class="form-label text-white small">Rarity:</label>
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
                    borderColor: (rarity === 5 ? COLORS.rarity5 : COLORS.rarity4) + ' !important'
                  }"
                >
                  {{ rarity }}★
                </button>
              </div>
            </div>

            <!-- Elements -->
            <div class="mb-3">
              <label class="form-label text-white small">Elements:</label>
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
                    style="width: 20px; height: 20px"
                  />
                </button>
              </div>
            </div>

            <!-- Paths -->
            <div class="mb-3">
              <label class="form-label text-white small">Paths:</label>
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
                    style="width: 20px; height: 20px"
                  />
                </button>
              </div>
            </div>

            <!-- Archetype -->
            <div>
              <label class="form-label text-white small">Archetype:</label>
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
        </div>
      </div>

      <!-- Team Recommendations -->
      <div class="col-lg-9 col-md-8">
        <TeamRecommendations
          v-if="selectedCharacter"
          :key="selectedCharacter.id"
          :character="selectedCharacter"
        />
        <div v-else class="card bg-dark border-primary text-center py-5">
          <div class="card-body">
            <p class="text-secondary mb-0">Select a character to see team recommendations</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Characters grouped by archetype -->
    <div class="card bg-dark border-primary mb-5">
      <RoleTabsSection
        :characters-by-role="charactersByRole"
        :selected-character="selectedCharacter"
        :is-recommended="(charId: string) => selectedCharacter ? isCharacterRecommended(selectedCharacter, charId) : false"
        :get-recommendation-tier="(charId: string) => selectedCharacter ? getRecommendationTier(selectedCharacter, charId) : null"
        :selected-elements="selectedElements"
        :selected-paths="selectedPaths"
        :selected-rarities="selectedRarities"
        :get-active-tab="getActiveTab"
        :has-characters-in-role="hasCharactersInRole"
        @select="selectCharacter"
      />
    </div>

  </main>
</template>
