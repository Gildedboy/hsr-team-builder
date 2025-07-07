<script setup lang="ts">
import TeamRecommendations from '@/components/TeamRecommendations.vue'
import CharacterTooltip from '@/components/CharacterTooltip.vue'
import CharacterGrid from '@/components/CharacterGrid.vue'
import { characters } from '@/data/characters'
import { getCharacterAvatar } from '@/data/avatars'
import { useCharacterFilters } from '@/composables/useCharacterFilters'
import { useCharacterGrouping } from '@/composables/useCharacterGrouping'
import { useCharacterSelection } from '@/composables/useCharacterSelection'
import { useSearch } from '@/composables/useSearch'
import { useTooltip } from '@/composables/useTooltip'
import { FILTER_OPTIONS } from '@/constants/filterOptions'
import { COLORS } from '@/constants/design'

const {
  selectedElements,
  selectedPaths,
  selectedRarities,
  selectedArchetypes,
  searchQuery,
  filteredCharacters,
  toggleFilter,
  clearFilters
} = useCharacterFilters(characters)

const { charactersByRole } = useCharacterGrouping(filteredCharacters)

const {
  selectedCharacter,
  selectCharacter,
  isCharacterRecommended,
  getRecommendationTier
} = useCharacterSelection()

const { hoveredCharacter, tooltipPosition, showTooltip, hideTooltip } = useTooltip()

const {
  searchQuery: searchQueryRef,
  showSearchSuggestions,
  searchSuggestions,
  selectCharacterFromSearch,
  onSearchFocus,
  onSearchBlur
} = useSearch()

const handleSelectFromSearch = (character: any) => {
  selectCharacterFromSearch(character, selectCharacter)
}

const handleClearFilters = () => {
  clearFilters()
  searchQueryRef.value = ''
  selectedCharacter.value = null
}
</script>

<template>
  <main class="min-h-screen px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8" style="padding-left: max(1rem, 10px); padding-right: max(1rem, 10px);">
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 :style="{ fontSize: '48px', fontWeight: '700', marginBottom: '15px', background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }">
        Honkai Star Rail Team Builder
      </h1>
      <p :style="{ fontSize: '16px', color: COLORS.textSecondary, padding: '0 20px' }">
        Select a character to see team recommendations and use filters to find specific archetypes
      </p>
    </div>

    <!-- Filters and Team Recommendations Side by Side -->
    <div style="display: flex; gap: 20px; margin-bottom: 40px;">
      <!-- Filter Section (1/4 width) -->
      <div :style="{ flex: '1', background: COLORS.bgPrimary, padding: '20px', borderRadius: '15px', minHeight: 'fit-content' }">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
          <h3 :style="{ color: COLORS.primary, fontSize: '20px', fontWeight: '600', margin: '0' }">Filters</h3>
          <button 
            @click="handleClearFilters()"
            :style="{ padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: '600', background: COLORS.warning, color: 'white', transition: 'all 0.2s' }"
          >
            RESET
          </button>
        </div>
        
        <!-- Search Bar -->
        <div style="margin-bottom: 15px; position: relative;">
          <input 
            v-model="searchQueryRef"
            type="text"
            placeholder="Search..."
            :style="{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: `2px solid rgba(0, 212, 255, 0.3)`, background: 'rgba(0, 0, 0, 0.3)', color: 'white', fontSize: '13px', outline: 'none', transition: 'border-color 0.2s' }"
            @focus="onSearchFocus"
            @blur="onSearchBlur"
          />
          
          <!-- Search Suggestions Dropdown -->
          <div 
            v-if="showSearchSuggestions && searchSuggestions.length > 0"
            :style="{ position: 'absolute', top: '100%', left: '0', right: '0', background: 'rgba(0, 0, 0, 0.95)', border: `2px solid ${COLORS.primary}`, borderTop: 'none', borderRadius: '0 0 6px 6px', zIndex: '50', maxHeight: '150px', overflowY: 'auto' }"
          >
            <div 
              v-for="character in searchSuggestions"
              :key="character.id"
              style="padding: 8px; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: background-color 0.2s;"
              @click="handleSelectFromSearch(character)"
              @mouseenter="$event.target.style.background = 'rgba(0, 212, 255, 0.2)'"
              @mouseleave="$event.target.style.background = 'transparent'"
            >
              <img 
                :src="getCharacterAvatar(character.id)" 
                :alt="character.name" 
                style="width: 24px; height: 24px; border-radius: 50%;"
                @error="$event.target.src = '/images/placeholder.svg'"
              />
              <div>
                <div style="color: white; font-weight: 600; font-size: 12px;">{{ character.name }}</div>
                <div style="display: flex; align-items: center; gap: 4px; margin-top: 2px;">
                  <img :src="`/images/element/${character.element}.webp`" :alt="character.element" style="width: 12px; height: 12px;" />
                  <span :style="{ color: COLORS.textSecondary, fontSize: '10px' }">{{ character.element }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Rarity -->
        <div style="margin-bottom: 12px;">
          <span style="color: white; font-size: 12px; display: block; margin-bottom: 6px;">Rarity:</span>
          <div style="display: flex; gap: 6px;">
            <button 
              v-for="rarity in FILTER_OPTIONS.rarities" 
              :key="rarity"
              @click="toggleFilter(selectedRarities, rarity)"
              style="padding: 4px 8px; border-radius: 6px; border: none; cursor: pointer; font-size: 12px; font-weight: 600; transition: all 0.2s;"
              :style="{
                background: selectedRarities.includes(rarity) ? 'rgba(0, 212, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                color: rarity === 5 ? COLORS.rarity5 : COLORS.rarity4
              }"
            >
              {{ rarity }}★
            </button>
          </div>
        </div>
        
        <!-- Elements -->
        <div style="margin-bottom: 12px;">
          <span style="color: white; font-size: 12px; display: block; margin-bottom: 6px;">Elements:</span>
          <div style="width: 100%; display: flex; flex-wrap: wrap; gap: 4px; justify-content: center;">
            <button 
              v-for="element in FILTER_OPTIONS.elements" 
              :key="element"
              @click="toggleFilter(selectedElements, element)"
              :title="element"
              style="padding: 8px; border-radius: 6px; border: 2px solid transparent; cursor: pointer; transition: all 0.2s;"
              :style="{
                background: selectedElements.includes(element) ? 'rgba(0, 212, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                borderColor: selectedElements.includes(element) ? COLORS.primary : 'transparent'
              }"
            >
              <img :src="`/images/element/${element}.webp`" :alt="element" style="width: 20px; height: 20px;" />
            </button>
          </div>
        </div>
        
        <!-- Paths -->
        <div style="margin-bottom: 12px;">
          <span style="color: white; font-size: 12px; display: block; margin-bottom: 6px;">Paths:</span>
          <div style="width: 100%; display: flex; flex-wrap: wrap; gap: 4px; justify-content: center;">
            <button 
              v-for="path in FILTER_OPTIONS.paths" 
              :key="path"
              @click="toggleFilter(selectedPaths, path)"
              :title="path"
              style="padding: 8px; border-radius: 6px; border: 2px solid transparent; cursor: pointer; transition: all 0.2s;"
              :style="{
                background: selectedPaths.includes(path) ? 'rgba(0, 212, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                borderColor: selectedPaths.includes(path) ? COLORS.primary : 'transparent'
              }"
            >
              <img :src="`/images/path/${path}.webp`" :alt="path" style="width: 20px; height: 20px;" />
            </button>
          </div>
        </div>
        
        <!-- Archetype -->
        <div>
          <span style="color: white; font-size: 12px; display: block; margin-bottom: 6px;">Archetype:</span>
          <div style="display: flex; flex-wrap: wrap; gap: 4px;">
            <button 
              v-for="archetype in FILTER_OPTIONS.archetypes" 
              :key="archetype"
              @click="toggleFilter(selectedArchetypes, archetype)"
              style="font-size: 10px; padding: 4px 8px; border-radius: 12px; border: none; cursor: pointer; font-weight: 500; transition: all 0.2s;"
              :style="{
                background: selectedArchetypes.includes(archetype) ? COLORS.primary : 'rgba(255, 255, 255, 0.1)',
                color: selectedArchetypes.includes(archetype) ? 'black' : 'white'
              }"
            >
              {{ archetype }}
            </button>
          </div>
        </div>
      </div>

      <!-- Team Recommendations (3/4 width) -->
      <div style="flex: 3;">
        <TeamRecommendations v-if="selectedCharacter" :key="selectedCharacter.id" :character="selectedCharacter" />
        <div v-else :style="{ background: COLORS.bgPrimary, padding: '40px', borderRadius: '15px', textAlign: 'center' }">
          <p :style="{ color: COLORS.textSecondary, fontSize: '16px', margin: '0' }">Select a character to see team recommendations</p>
        </div>
      </div>
    </div>
    
    <!-- Characters grouped by archetype -->
    <div :style="{ background: COLORS.bgSecondary, borderRadius: '15px', padding: '25px', marginBottom: '40px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)', overflowX: 'auto' }">
      <table :style="{ width: '100%', borderCollapse: 'separate', borderSpacing: '0', minWidth: '800px', border: `1px solid ${COLORS.border}`, borderRadius: '12px', overflow: 'hidden' }">
        <thead>
          <tr style="background: linear-gradient(135deg, #1a1a2e, #16213e);">
            <th :style="{ color: COLORS.primary, padding: '20px', textAlign: 'center', fontSize: '18px', fontWeight: '700', borderBottom: `2px solid ${COLORS.border}`, borderRight: `1px solid ${COLORS.border}`, width: '33.33%' }">DPS</th>
            <th :style="{ color: COLORS.primary, padding: '20px', textAlign: 'center', fontSize: '18px', fontWeight: '700', borderBottom: `2px solid ${COLORS.border}`, borderRight: `1px solid ${COLORS.border}`, width: '33.33%' }">Sub-DPS / Buffer / Debuffer</th>
            <th :style="{ color: COLORS.primary, padding: '20px', textAlign: 'center', fontSize: '18px', fontWeight: '700', borderBottom: `2px solid ${COLORS.border}`, width: '33.34%' }">Sustain</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td valign="top" :style="{ verticalAlign: 'top', padding: '20px', background: 'rgba(0, 212, 255, 0.05)', borderRight: `1px solid ${COLORS.border}` }">
              <div v-for="(chars, category) in charactersByRole.dps" :key="category" v-show="chars.length > 0" style="margin-bottom: 25px;">
                <h3 :style="{ color: COLORS.primary, fontSize: '16px', marginBottom: '15px', padding: '8px 12px', background: 'rgba(0, 212, 255, 0.1)', borderRadius: '8px', borderLeft: `4px solid ${COLORS.primary}` }">{{ category }} ({{ chars.length }})</h3>
                <CharacterGrid 
                  :characters="chars"
                  :selected-character="selectedCharacter"
                  :is-recommended="(charId) => selectedCharacter ? isCharacterRecommended(selectedCharacter, charId) : false"
                  :get-recommendation-tier="(charId) => selectedCharacter ? getRecommendationTier(selectedCharacter, charId) : null"
                  :selected-elements="selectedElements"
                  :selected-paths="selectedPaths"
                  :selected-rarities="selectedRarities"
                  @select="selectCharacter"
                  @hover="showTooltip"
                  @unhover="hideTooltip"
                />
              </div>
            </td>
            <td valign="top" :style="{ verticalAlign: 'top', padding: '20px', background: 'rgba(155, 89, 182, 0.05)', borderRight: `1px solid ${COLORS.border}` }">
              <div v-for="(chars, category) in charactersByRole.support" :key="category" v-show="chars.length > 0" style="margin-bottom: 25px;">
                <h3 :style="{ color: COLORS.primary, fontSize: '16px', marginBottom: '15px', padding: '8px 12px', background: 'rgba(0, 212, 255, 0.1)', borderRadius: '8px', borderLeft: `4px solid ${COLORS.primary}` }">{{ category }} ({{ chars.length }})</h3>
                <CharacterGrid 
                  :characters="chars"
                  :selected-character="selectedCharacter"
                  :is-recommended="(charId) => selectedCharacter ? isCharacterRecommended(selectedCharacter, charId) : false"
                  :get-recommendation-tier="(charId) => selectedCharacter ? getRecommendationTier(selectedCharacter, charId) : null"
                  :selected-elements="selectedElements"
                  :selected-paths="selectedPaths"
                  :selected-rarities="selectedRarities"
                  @select="selectCharacter"
                  @hover="showTooltip"
                  @unhover="hideTooltip"
                />
              </div>
            </td>
            <td valign="top" :style="{ verticalAlign: 'top', padding: '20px', background: 'rgba(46, 204, 113, 0.05)' }">
              <div v-for="(chars, category) in charactersByRole.sustain" :key="category" v-show="chars.length > 0" style="margin-bottom: 25px;">
                <h3 :style="{ color: COLORS.primary, fontSize: '16px', marginBottom: '15px', padding: '8px 12px', background: 'rgba(0, 212, 255, 0.1)', borderRadius: '8px', borderLeft: `4px solid ${COLORS.primary}` }">{{ category }} ({{ chars.length }})</h3>
                <CharacterGrid 
                  :characters="chars"
                  :selected-character="selectedCharacter"
                  :is-recommended="(charId) => selectedCharacter ? isCharacterRecommended(selectedCharacter, charId) : false"
                  :get-recommendation-tier="(charId) => selectedCharacter ? getRecommendationTier(selectedCharacter, charId) : null"
                  :selected-elements="selectedElements"
                  :selected-paths="selectedPaths"
                  :selected-rarities="selectedRarities"
                  @select="selectCharacter"
                  @hover="showTooltip"
                  @unhover="hideTooltip"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <CharacterTooltip :character="hoveredCharacter" :position="tooltipPosition" />

  </main>
</template>