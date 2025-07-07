<script setup lang="ts">
import TeamRecommendations from '@/components/TeamRecommendations.vue'
import { characters } from '@/data/characters'
import { getCharacterAvatar } from '@/data/avatars'
import { useCharacterFilters } from '@/composables/useCharacterFilters'
import { useCharacterGrouping } from '@/composables/useCharacterGrouping'
import { useCharacterSelection } from '@/composables/useCharacterSelection'
import { useSearch } from '@/composables/useSearch'
import { FILTER_OPTIONS } from '@/constants/filterOptions'

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
  hoveredCharacter,
  tooltipPosition,
  selectCharacter,
  showTooltip,
  hideTooltip,
  isCharacterRecommended
} = useCharacterSelection()

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
      <h1 style="font-size: 48px; font-weight: 700; margin-bottom: 15px; background: linear-gradient(135deg, #00d4ff, #9b59b6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
        Honkai Star Rail Team Builder
      </h1>
      <p style="font-size: 16px; color: #aaa; padding: 0 20px;">
        Select a character to see team recommendations and use filters to find specific archetypes
      </p>
    </div>

    <!-- Team Recommendations -->
    <div style="margin-bottom: 40px;">
      <TeamRecommendations v-if="selectedCharacter" :character="selectedCharacter" />
    </div>

    <!-- Filter Section -->
    <div style="background: rgba(255, 255, 255, 0.05); padding: 25px; border-radius: 15px; margin-bottom: 40px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h3 style="color: #00d4ff; font-size: 24px; font-weight: 600; margin: 0;">Filters</h3>
        <button 
          @click="handleClearFilters()"
          style="padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; font-size: 12px; font-weight: 600; background: #e74c3c; color: white; transition: all 0.2s;"
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
          style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 2px solid rgba(0, 212, 255, 0.3); background: rgba(0, 0, 0, 0.3); color: white; font-size: 14px; outline: none; transition: border-color 0.2s;"
          @focus="onSearchFocus"
          @blur="onSearchBlur"
        />
        
        <!-- Search Suggestions Dropdown -->
        <div 
          v-if="showSearchSuggestions && searchSuggestions.length > 0"
          style="position: absolute; top: 100%; left: 0; right: 0; background: rgba(0, 0, 0, 0.95); border: 2px solid #00d4ff; border-top: none; border-radius: 0 0 8px 8px; z-index: 50; max-height: 200px; overflow-y: auto;"
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
                <span style="color: #aaa; font-size: 12px;">{{ character.element }}</span>
                <span style="color: #666;">•</span>
                <img :src="`/images/path/${character.path}.webp`" :alt="character.path" style="width: 16px; height: 16px;" />
                <span style="color: #aaa; font-size: 12px;">{{ character.path }}</span>
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
              color: rarity === 5 ? '#ffd700' : '#8a5fcc'
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
                borderColor: selectedElements.includes(element) ? '#00d4ff' : 'transparent'
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
                borderColor: selectedPaths.includes(path) ? '#00d4ff' : 'transparent'
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
              background: selectedArchetypes.includes(archetype) ? '#00d4ff' : 'rgba(255, 255, 255, 0.1)',
              color: selectedArchetypes.includes(archetype) ? 'black' : 'white'
            }"
          >
            {{ archetype }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Characters grouped by archetype -->
    <div style="background: rgba(255, 255, 255, 0.08); border-radius: 15px; padding: 25px; margin-bottom: 40px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); overflow-x: auto;">
      <table style="width: 100%; border-collapse: separate; border-spacing: 0; min-width: 800px; border: 1px solid #333; border-radius: 12px; overflow: hidden;">
        <thead>
          <tr style="background: linear-gradient(135deg, #1a1a2e, #16213e);">
            <th style="color: #00d4ff; padding: 20px; text-align: center; font-size: 18px; font-weight: 700; border-bottom: 2px solid #444; border-right: 1px solid #333; width: 33.33%;">DPS</th>
            <th style="color: #00d4ff; padding: 20px; text-align: center; font-size: 18px; font-weight: 700; border-bottom: 2px solid #444; border-right: 1px solid #333; width: 33.33%;">Sub-DPS / Buffer / Debuffer</th>
            <th style="color: #00d4ff; padding: 20px; text-align: center; font-size: 18px; font-weight: 700; border-bottom: 2px solid #444; width: 33.34%;">Sustain</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td valign="top" style="vertical-align: top; padding: 20px; background: rgba(0, 212, 255, 0.05); border-right: 1px solid #333;">
              <div v-for="(chars, category) in charactersByRole.dps" :key="category" v-show="chars.length > 0" style="margin-bottom: 25px;">
                <h3 style="color: #00d4ff; font-size: 16px; margin-bottom: 15px; padding: 8px 12px; background: rgba(0, 212, 255, 0.1); border-radius: 8px; border-left: 4px solid #00d4ff;">{{ category }} ({{ chars.length }})</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, 70px); gap: 10px; padding: 0 8px; justify-content: start;">
                  <div 
                    v-for="char in chars" 
                    :key="char.id" 
                    @click="selectCharacter(char)" 
                    @mouseenter="showTooltip(char, $event)"
                    @mouseleave="hideTooltip()"
                    style="cursor: pointer; transition: all 0.3s ease; position: relative; border-radius: 8px; overflow: hidden;"
                    :style="{
                      opacity: (selectedCharacter && !isCharacterRecommended(selectedCharacter, char.id) && selectedCharacter.id !== char.id) || 
                               (selectedElements.length > 0 && !selectedElements.includes(char.element)) ||
                               (selectedPaths.length > 0 && !selectedPaths.includes(char.path)) ||
                               (selectedRarities.length > 0 && !selectedRarities.includes(char.rarity)) ? '0.25' : '1',
                      transform: selectedCharacter?.id === char.id ? 'scale(1.1)' : 'scale(1)',
                      boxShadow: selectedCharacter?.id === char.id ? '0 4px 12px rgba(0, 212, 255, 0.8)' : 
                                 selectedCharacter && isCharacterRecommended(selectedCharacter, char.id) ? '0 0 8px rgba(46, 204, 113, 0.6)' : 
                                 '0 2px 6px rgba(0, 0, 0, 0.3)',
                      border: selectedCharacter?.id === char.id ? '2px solid #00d4ff' : 
                              selectedCharacter && isCharacterRecommended(selectedCharacter, char.id) ? '2px solid #2ecc71' : 
                              '2px solid transparent',
                      filter: (selectedCharacter && !isCharacterRecommended(selectedCharacter, char.id) && selectedCharacter.id !== char.id) || 
                              (selectedElements.length > 0 && !selectedElements.includes(char.element)) ||
                              (selectedPaths.length > 0 && !selectedPaths.includes(char.path)) ||
                              (selectedRarities.length > 0 && !selectedRarities.includes(char.rarity)) ? 'grayscale(70%)' : 'none'
                    }"
                  >
                    <img 
                      :src="getCharacterAvatar(char.id)" 
                      :alt="char.name" 
                      style="width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 50%;"
                      @error="$event.target.src = '/images/placeholder.svg'"
                    />
                    <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0, 0, 0, 0.8)); color: white; font-size: 10px; padding: 4px 2px; text-align: center; font-weight: 500;">
                      {{ char.name }}
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td valign="top" style="vertical-align: top; padding: 20px; background: rgba(155, 89, 182, 0.05); border-right: 1px solid #333;">
              <div v-for="(chars, category) in charactersByRole.support" :key="category" v-show="chars.length > 0" style="margin-bottom: 25px;">
                <h3 style="color: #00d4ff; font-size: 16px; margin-bottom: 15px; padding: 8px 12px; background: rgba(0, 212, 255, 0.1); border-radius: 8px; border-left: 4px solid #00d4ff;">{{ category }} ({{ chars.length }})</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, 70px); gap: 10px; padding: 0 8px; justify-content: start;">
                  <div 
                    v-for="char in chars" 
                    :key="char.id" 
                    @click="selectCharacter(char)" 
                    @mouseenter="showTooltip(char, $event)"
                    @mouseleave="hideTooltip()"
                    style="cursor: pointer; transition: all 0.3s ease; position: relative; border-radius: 8px; overflow: hidden;"
                    :style="{
                      opacity: (selectedCharacter && !isCharacterRecommended(selectedCharacter, char.id) && selectedCharacter.id !== char.id) || 
                               (selectedElements.length > 0 && !selectedElements.includes(char.element)) ||
                               (selectedPaths.length > 0 && !selectedPaths.includes(char.path)) ||
                               (selectedRarities.length > 0 && !selectedRarities.includes(char.rarity)) ? '0.25' : '1',
                      transform: selectedCharacter?.id === char.id ? 'scale(1.1)' : 'scale(1)',
                      boxShadow: selectedCharacter?.id === char.id ? '0 4px 12px rgba(0, 212, 255, 0.8)' : 
                                 selectedCharacter && isCharacterRecommended(selectedCharacter, char.id) ? '0 0 8px rgba(46, 204, 113, 0.6)' : 
                                 '0 2px 6px rgba(0, 0, 0, 0.3)',
                      border: selectedCharacter?.id === char.id ? '2px solid #00d4ff' : 
                              selectedCharacter && isCharacterRecommended(selectedCharacter, char.id) ? '2px solid #2ecc71' : 
                              '2px solid transparent',
                      filter: (selectedCharacter && !isCharacterRecommended(selectedCharacter, char.id) && selectedCharacter.id !== char.id) || 
                              (selectedElements.length > 0 && !selectedElements.includes(char.element)) ||
                              (selectedPaths.length > 0 && !selectedPaths.includes(char.path)) ||
                              (selectedRarities.length > 0 && !selectedRarities.includes(char.rarity)) ? 'grayscale(70%)' : 'none'
                    }"
                  >
                    <img 
                      :src="getCharacterAvatar(char.id)" 
                      :alt="char.name" 
                      style="width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 50%;"
                      @error="$event.target.src = '/images/placeholder.svg'"
                    />
                    <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0, 0, 0, 0.8)); color: white; font-size: 10px; padding: 4px 2px; text-align: center; font-weight: 500;">
                      {{ char.name }}
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td valign="top" style="vertical-align: top; padding: 20px; background: rgba(46, 204, 113, 0.05);">
              <div v-for="(chars, category) in charactersByRole.sustain" :key="category" v-show="chars.length > 0" style="margin-bottom: 25px;">
                <h3 style="color: #00d4ff; font-size: 16px; margin-bottom: 15px; padding: 8px 12px; background: rgba(0, 212, 255, 0.1); border-radius: 8px; border-left: 4px solid #00d4ff;">{{ category }} ({{ chars.length }})</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, 70px); gap: 10px; padding: 0 8px; justify-content: start;">
                  <div 
                    v-for="char in chars" 
                    :key="char.id" 
                    @click="selectCharacter(char)" 
                    @mouseenter="showTooltip(char, $event)"
                    @mouseleave="hideTooltip()"
                    style="cursor: pointer; transition: all 0.3s ease; position: relative; border-radius: 8px; overflow: hidden;"
                    :style="{
                      opacity: (selectedCharacter && !isCharacterRecommended(selectedCharacter, char.id) && selectedCharacter.id !== char.id) || 
                               (selectedElements.length > 0 && !selectedElements.includes(char.element)) ||
                               (selectedPaths.length > 0 && !selectedPaths.includes(char.path)) ||
                               (selectedRarities.length > 0 && !selectedRarities.includes(char.rarity)) ? '0.25' : '1',
                      transform: selectedCharacter?.id === char.id ? 'scale(1.1)' : 'scale(1)',
                      boxShadow: selectedCharacter?.id === char.id ? '0 4px 12px rgba(0, 212, 255, 0.8)' : 
                                 selectedCharacter && isCharacterRecommended(selectedCharacter, char.id) ? '0 0 8px rgba(46, 204, 113, 0.6)' : 
                                 '0 2px 6px rgba(0, 0, 0, 0.3)',
                      border: selectedCharacter?.id === char.id ? '2px solid #00d4ff' : 
                              selectedCharacter && isCharacterRecommended(selectedCharacter, char.id) ? '2px solid #2ecc71' : 
                              '2px solid transparent',
                      filter: (selectedCharacter && !isCharacterRecommended(selectedCharacter, char.id) && selectedCharacter.id !== char.id) || 
                              (selectedElements.length > 0 && !selectedElements.includes(char.element)) ||
                              (selectedPaths.length > 0 && !selectedPaths.includes(char.path)) ||
                              (selectedRarities.length > 0 && !selectedRarities.includes(char.rarity)) ? 'grayscale(70%)' : 'none'
                    }"
                  >
                    <img 
                      :src="getCharacterAvatar(char.id)" 
                      :alt="char.name" 
                      style="width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 50%;"
                      @error="$event.target.src = '/images/placeholder.svg'"
                    />
                    <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0, 0, 0, 0.8)); color: white; font-size: 10px; padding: 4px 2px; text-align: center; font-weight: 500;">
                      {{ char.name }}
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Character Tooltip -->
    <div 
      v-if="hoveredCharacter" 
      style="position: fixed; z-index: 1000; pointer-events: none; background: rgba(0, 0, 0, 0.9); border: 2px solid #00d4ff; border-radius: 8px; padding: 12px; color: white; font-size: 14px; max-width: 280px;"
      :style="{
        left: tooltipPosition.x + 10 + 'px',
        top: tooltipPosition.y - 10 + 'px'
      }"
    >
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
        <img 
          :src="getCharacterAvatar(hoveredCharacter.id)" 
          :alt="hoveredCharacter.name" 
          style="width: 48px; height: 48px; border-radius: 50%; border: 2px solid #00d4ff;"
          @error="$event.target.src = '/images/placeholder.svg'"
        />
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="font-weight: bold; font-size: 16px; color: #00d4ff;">{{ hoveredCharacter.name }}</div>
          <div :style="{ color: hoveredCharacter.rarity === 4 ? '#8a5fcc' : '#ffd700', fontSize: '14px' }">{{ hoveredCharacter.rarity }}★</div>
        </div>
      </div>
      
      <div style="margin-bottom: 6px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <img :src="`/images/element/${hoveredCharacter.element}.webp`" :alt="hoveredCharacter.element" style="width: 20px; height: 20px;" />
          <span style="font-weight: 600;">{{ hoveredCharacter.element }}</span>
          <span style="color: #aaa;">•</span>
          <img :src="`/images/path/${hoveredCharacter.path}.webp`" :alt="hoveredCharacter.path" style="width: 20px; height: 20px;" />
          <span style="font-weight: 600;">{{ hoveredCharacter.path }}</span>
        </div>
      </div>
      
      <div style="margin-top: 8px;">
        <div style="display: flex; flex-wrap: wrap; gap: 4px;">
          <span 
            v-for="label in hoveredCharacter.labels.slice().sort()" 
            :key="label"
            style="font-size: 11px; padding: 3px 6px; border-radius: 10px; background: #00d4ff; color: black; font-weight: 500;"
          >
            {{ label }}
          </span>
        </div>
      </div>
    </div>

  </main>
</template>