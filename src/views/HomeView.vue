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
  isCharacterRecommended
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

    <!-- Team Recommendations -->
    <div style="margin-bottom: 40px;">
      <TeamRecommendations v-if="selectedCharacter" :character="selectedCharacter" />
    </div>

    <!-- Filter Section -->
    <div :style="{ background: COLORS.bgPrimary, padding: '25px', borderRadius: '15px', marginBottom: '40px' }">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h3 :style="{ color: COLORS.primary, fontSize: '24px', fontWeight: '600', margin: '0' }">Filters</h3>
        <button 
          @click="handleClearFilters()"
          :style="{ padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '600', background: COLORS.warning, color: 'white', transition: 'all 0.2s' }"
        >
          RESET
        </button>
      </div>
      
      <!-- Search Bar -->
      <div style="margin-bottom: 20px; position: relative;">
        <input 
          v-model="searchQueryRef"
          type="text"
          placeholder="Search characters..."
          :style="{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: `2px solid rgba(0, 212, 255, 0.3)`, background: 'rgba(0, 0, 0, 0.3)', color: 'white', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s' }"
          @focus="onSearchFocus"
          @blur="onSearchBlur"
        />
        
        <!-- Search Suggestions Dropdown -->
        <div 
          v-if="showSearchSuggestions && searchSuggestions.length > 0"
          :style="{ position: 'absolute', top: '100%', left: '0', right: '0', background: 'rgba(0, 0, 0, 0.95)', border: `2px solid ${COLORS.primary}`, borderTop: 'none', borderRadius: '0 0 8px 8px', zIndex: '50', maxHeight: '200px', overflowY: 'auto' }"
        >
          <div 
            v-for="character in searchSuggestions"
            :key="character.id"
            style="padding: 12px; cursor: pointer; display: flex; align-items: center; gap: 12px; transition: background-color 0.2s;"
            @click="handleSelectFromSearch(character)"
            @mouseenter="$event.target.style.background = 'rgba(0, 212, 255, 0.2)'"
            @mouseleave="$event.target.style.background = 'transparent'"
          >
            <img 
              :src="getCharacterAvatar(character.id)" 
              :alt="character.name" 
              style="width: 32px; height: 32px; border-radius: 50%;"
              @error="$event.target.src = '/images/placeholder.svg'"
            />
            <div>
              <div style="color: white; font-weight: 600; font-size: 14px;">{{ character.name }}</div>
              <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
                <img :src="`/images/element/${character.element}.webp`" :alt="character.element" style="width: 16px; height: 16px;" />
                <span :style="{ color: COLORS.textSecondary, fontSize: '12px' }">{{ character.element }}</span>
                <span :style="{ color: COLORS.textMuted }">•</span>
                <img :src="`/images/path/${character.path}.webp`" :alt="character.path" style="width: 16px; height: 16px;" />
                <span :style="{ color: COLORS.textSecondary, fontSize: '12px' }">{{ character.path }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 20px; align-items: center;">
        <!-- Rarity -->
        <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
          <span style="color: white; font-size: 14px; margin-right: 8px;">★:</span>
          <button 
            v-for="rarity in FILTER_OPTIONS.rarities" 
            :key="rarity"
            @click="toggleFilter(selectedRarities, rarity)"
            style="padding: 6px 12px; border-radius: 8px; border: none; cursor: pointer; font-size: 14px; font-weight: 600; transition: all 0.2s;"
            :style="{
              background: selectedRarities.includes(rarity) ? 'rgba(0, 212, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
              color: rarity === 5 ? COLORS.rarity5 : COLORS.rarity4
            }"
          >
            {{ rarity }}★
          </button>
        </div>
        
        <!-- Elements and Paths -->
        <div style="display: flex; gap: 15px; justify-content: center;">
          <div style="display: flex; flex-wrap: wrap; gap: 4px; justify-content: center;">
            <button 
              v-for="element in FILTER_OPTIONS.elements" 
              :key="element"
              @click="toggleFilter(selectedElements, element)"
              style="padding: 8px; border-radius: 8px; border: 2px solid transparent; cursor: pointer; transition: all 0.2s;"
              :style="{
                background: selectedElements.includes(element) ? 'rgba(0, 212, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                borderColor: selectedElements.includes(element) ? COLORS.primary : 'transparent'
              }"
            >
              <img :src="`/images/element/${element}.webp`" :alt="element" style="width: 20px; height: 20px;" />
            </button>
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 4px; justify-content: center;">
            <button 
              v-for="path in FILTER_OPTIONS.paths" 
              :key="path"
              @click="toggleFilter(selectedPaths, path)"
              style="padding: 8px; border-radius: 8px; border: 2px solid transparent; cursor: pointer; transition: all 0.2s;"
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
        <div style="display: flex; flex-wrap: wrap; gap: 4px; justify-content: flex-end;">
          <button 
            v-for="archetype in FILTER_OPTIONS.archetypes" 
            :key="archetype"
            @click="toggleFilter(selectedArchetypes, archetype)"
            style="font-size: 12px; padding: 6px 12px; border-radius: 20px; border: none; cursor: pointer; font-weight: 500; transition: all 0.2s;"
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