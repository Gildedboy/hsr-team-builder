<script setup lang="ts">
import TeamRecommendations from '@/components/TeamRecommendations.vue'
import CharacterGrid from '@/components/CharacterGrid.vue'
import { characters } from '@/data/characters'
import { getCharacterAvatar } from '@/data/avatars'
import { useCharacterFilters } from '@/composables/useCharacterFilters'
import { useCharacterGrouping } from '@/composables/useCharacterGrouping'
import { useCharacterSelection } from '@/composables/useCharacterSelection'
import { useSearch } from '@/composables/useSearch'
import { FILTER_OPTIONS } from '@/constants/filterOptions'
import { COLORS } from '@/constants/design'
import type { Character } from '@/types/Character'

const {
  selectedElements,
  selectedPaths,
  selectedRarities,
  selectedArchetypes,
  filteredCharacters,
  toggleFilter,
  clearFilters,
} = useCharacterFilters(characters)

const { charactersByRole } = useCharacterGrouping(filteredCharacters)

const { selectedCharacter, selectCharacter, isCharacterRecommended, getRecommendationTier } =
  useCharacterSelection()

const {
  searchQuery: searchQueryRef,
  showSearchSuggestions,
  searchSuggestions,
  selectCharacterFromSearch,
  onSearchFocus,
  onSearchBlur,
} = useSearch()

const handleSelectFromSearch = (character: Character) => {
  selectCharacterFromSearch(character, selectCharacter)
}

const handleClearFilters = () => {
  clearFilters()
  searchQueryRef.value = ''
  selectedCharacter.value = null
}
</script>

<template>
  <main class="container-fluid py-4">
    <div class="text-center mb-5">
      <h1 class="display-3 fw-bold mb-3 gradient-text">Honkai Star Rail Team Builder</h1>
      <p class="lead text-secondary px-3">
        Select a character to see team recommendations or use filters and archetypes
      </p>
    </div>

    <!-- Filters and Team Recommendations Side by Side -->
    <div class="row mb-5">
      <!-- Filter Section -->
      <div class="col-lg-3 col-md-4 mb-4">
        <div class="card bg-dark border-primary h-100">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h3 class="h5 text-primary mb-0">Filters</h3>
            <button
              @click="handleClearFilters()"
              class="btn btn-warning btn-sm fw-bold rounded-pill"
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
                class="position-absolute w-100 bg-dark border border-primary border-top-0 rounded-bottom"
                style="top: 100%; z-index: 1050; max-height: 150px; overflow-y: auto"
              >
                <div
                  v-for="character in searchSuggestions"
                  :key="character.id"
                  class="p-2 cursor-pointer d-flex align-items-center gap-2 hover-bg-primary"
                  @click="handleSelectFromSearch(character)"
                >
                  <img
                    :src="getCharacterAvatar(character.id)"
                    :alt="character.name"
                    class="rounded-circle"
                    style="width: 24px; height: 24px"
                    @error="$event.target.src = '/images/placeholder.svg'"
                  />
                  <div>
                    <div class="text-white fw-semibold small">{{ character.name }}</div>
                    <div class="d-flex align-items-center gap-1">
                      <img
                        :src="`/images/element/${character.element}.webp`"
                        :alt="character.element"
                        style="width: 12px; height: 12px"
                      />
                      <span class="text-secondary" style="font-size: 10px">{{
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
                  :style="{ color: rarity === 5 ? COLORS.rarity5 : COLORS.rarity4 }"
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
                  class="btn p-2 border-2"
                  :class="
                    selectedElements.includes(element)
                      ? 'btn-outline-primary active border-primary'
                      : 'btn-outline-secondary border-transparent'
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
                  class="btn p-2 border-2"
                  :class="
                    selectedPaths.includes(path)
                      ? 'btn-outline-primary active border-primary'
                      : 'btn-outline-secondary border-transparent'
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
      <!-- Desktop Table View -->
      <div class="d-none d-lg-block">
        <div class="table-responsive">
          <table class="table table-dark mb-0">
            <thead>
              <tr class="bg-gradient">
                <th
                  class="text-primary text-center fw-bold border-end border-primary"
                  style="width: 33.33%"
                >
                  DPS
                </th>
                <th
                  class="text-primary text-center fw-bold border-end border-primary"
                  style="width: 33.33%"
                >
                  Sub-DPS / Buffer / Debuffer
                </th>
                <th class="text-primary text-center fw-bold" style="width: 33.34%">Sustain</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  class="align-top p-3 border-end border-primary"
                  style="background: rgba(0, 212, 255, 0.05)"
                >
                  <div
                    v-for="(chars, category) in charactersByRole.dps"
                    :key="category"
                    v-show="chars.length > 0"
                    class="mb-4"
                  >
                    <h3
                      class="h5 text-primary mb-3 p-2 rounded border-start border-primary border-3"
                      style="background: rgba(255, 255, 255, 0.1)"
                    >
                      {{ category }} ({{ chars.length }})
                    </h3>
                    <CharacterGrid
                      :characters="chars"
                      :selected-character="selectedCharacter"
                      :is-recommended="
                        (charId) =>
                          selectedCharacter
                            ? isCharacterRecommended(selectedCharacter, charId)
                            : false
                      "
                      :get-recommendation-tier="
                        (charId) =>
                          selectedCharacter
                            ? getRecommendationTier(selectedCharacter, charId)
                            : null
                      "
                      :selected-elements="selectedElements"
                      :selected-paths="selectedPaths"
                      :selected-rarities="selectedRarities"
                      @select="selectCharacter"
                    />
                  </div>
                </td>
                <td
                  class="align-top p-3 border-end border-primary"
                  style="background: rgba(155, 89, 182, 0.05)"
                >
                  <div
                    v-for="(chars, category) in charactersByRole.support"
                    :key="category"
                    v-show="chars.length > 0"
                    class="mb-4"
                  >
                    <h3
                      class="h5 text-primary mb-3 p-2 rounded border-start border-primary border-3"
                      style="background: rgba(255, 255, 255, 0.1)"
                    >
                      {{ category }} ({{ chars.length }})
                    </h3>
                    <CharacterGrid
                      :characters="chars"
                      :selected-character="selectedCharacter"
                      :is-recommended="
                        (charId) =>
                          selectedCharacter
                            ? isCharacterRecommended(selectedCharacter, charId)
                            : false
                      "
                      :get-recommendation-tier="
                        (charId) =>
                          selectedCharacter
                            ? getRecommendationTier(selectedCharacter, charId)
                            : null
                      "
                      :selected-elements="selectedElements"
                      :selected-paths="selectedPaths"
                      :selected-rarities="selectedRarities"
                      @select="selectCharacter"
                    />
                  </div>
                </td>
                <td class="align-top p-3" style="background: rgba(46, 204, 113, 0.05)">
                  <div
                    v-for="(chars, category) in charactersByRole.sustain"
                    :key="category"
                    v-show="chars.length > 0"
                    class="mb-4"
                  >
                    <h3
                      class="h5 text-primary mb-3 p-2 rounded border-start border-primary border-3"
                      style="background: rgba(255, 255, 255, 0.1)"
                    >
                      {{ category }} ({{ chars.length }})
                    </h3>
                    <CharacterGrid
                      :characters="chars"
                      :selected-character="selectedCharacter"
                      :is-recommended="
                        (charId) =>
                          selectedCharacter
                            ? isCharacterRecommended(selectedCharacter, charId)
                            : false
                      "
                      :get-recommendation-tier="
                        (charId) =>
                          selectedCharacter
                            ? getRecommendationTier(selectedCharacter, charId)
                            : null
                      "
                      :selected-elements="selectedElements"
                      :selected-paths="selectedPaths"
                      :selected-rarities="selectedRarities"
                      @select="selectCharacter"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Mobile Tab View -->
      <div class="d-lg-none">
        <ul class="nav nav-tabs nav-fill" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active fw-bold custom-tab"
              data-bs-toggle="tab"
              data-bs-target="#dps-tab"
              type="button"
              role="tab"
            >
              DPS
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link fw-bold custom-tab"
              data-bs-toggle="tab"
              data-bs-target="#support-tab"
              type="button"
              role="tab"
            >
              Support
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link fw-bold custom-tab"
              data-bs-toggle="tab"
              data-bs-target="#sustain-tab"
              type="button"
              role="tab"
            >
              Sustain
            </button>
          </li>
        </ul>
        <div class="tab-content">
          <div
            class="tab-pane fade show active p-3"
            id="dps-tab"
            role="tabpanel"
            style="background: rgba(0, 212, 255, 0.05)"
          >
            <div
              v-for="(chars, category) in charactersByRole.dps"
              :key="category"
              v-show="chars.length > 0"
              class="mb-4"
            >
              <h3
                class="h5 text-primary mb-3 p-2 rounded border-start border-primary border-3"
                style="background: rgba(255, 255, 255, 0.1)"
              >
                {{ category }} ({{ chars.length }})
              </h3>
              <CharacterGrid
                :characters="chars"
                :selected-character="selectedCharacter"
                :is-recommended="
                  (charId) =>
                    selectedCharacter ? isCharacterRecommended(selectedCharacter, charId) : false
                "
                :get-recommendation-tier="
                  (charId) =>
                    selectedCharacter ? getRecommendationTier(selectedCharacter, charId) : null
                "
                :selected-elements="selectedElements"
                :selected-paths="selectedPaths"
                :selected-rarities="selectedRarities"
                @select="selectCharacter"
              />
            </div>
          </div>
          <div
            class="tab-pane fade p-3"
            id="support-tab"
            role="tabpanel"
            style="background: rgba(155, 89, 182, 0.05)"
          >
            <div
              v-for="(chars, category) in charactersByRole.support"
              :key="category"
              v-show="chars.length > 0"
              class="mb-4"
            >
              <h3
                class="h5 text-primary mb-3 p-2 rounded border-start border-primary border-3"
                style="background: rgba(255, 255, 255, 0.1)"
              >
                {{ category }} ({{ chars.length }})
              </h3>
              <CharacterGrid
                :characters="chars"
                :selected-character="selectedCharacter"
                :is-recommended="
                  (charId) =>
                    selectedCharacter ? isCharacterRecommended(selectedCharacter, charId) : false
                "
                :get-recommendation-tier="
                  (charId) =>
                    selectedCharacter ? getRecommendationTier(selectedCharacter, charId) : null
                "
                :selected-elements="selectedElements"
                :selected-paths="selectedPaths"
                :selected-rarities="selectedRarities"
                @select="selectCharacter"
              />
            </div>
          </div>
          <div
            class="tab-pane fade p-3"
            id="sustain-tab"
            role="tabpanel"
            style="background: rgba(46, 204, 113, 0.05)"
          >
            <div
              v-for="(chars, category) in charactersByRole.sustain"
              :key="category"
              v-show="chars.length > 0"
              class="mb-4"
            >
              <h3
                class="h5 text-primary mb-3 p-2 rounded border-start border-primary border-3"
                style="background: rgba(255, 255, 255, 0.1)"
              >
                {{ category }} ({{ chars.length }})
              </h3>
              <CharacterGrid
                :characters="chars"
                :selected-character="selectedCharacter"
                :is-recommended="
                  (charId) =>
                    selectedCharacter ? isCharacterRecommended(selectedCharacter, charId) : false
                "
                :get-recommendation-tier="
                  (charId) =>
                    selectedCharacter ? getRecommendationTier(selectedCharacter, charId) : null
                "
                :selected-elements="selectedElements"
                :selected-paths="selectedPaths"
                :selected-rarities="selectedRarities"
                @select="selectCharacter"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
