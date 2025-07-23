<template>
  <!-- Desktop Table View -->
  <div class="d-none d-lg-block">
    <div class="table-responsive">
      <table class="table table-dark mb-0">
        <thead>
          <tr class="bg-gradient">
            <th class="text-primary text-center fw-bold border-end border-primary role-column-width">
              DPS / Sub-DPS
            </th>
            <th class="text-primary text-center fw-bold border-end border-primary role-column-width">
              Amplifier
            </th>
            <th class="text-primary text-center fw-bold role-column-width-last">Sustain</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="align-top p-3 border-end border-primary role-section-dps">
              <CharacterRoleSection
                :role-characters="charactersByRole.dps"
                :selected-character="selectedCharacter"
                :is-recommended="isRecommended"
                :get-recommendation-tier="getRecommendationTier"
                :selected-elements="selectedElements"
                :selected-paths="selectedPaths"
                :selected-rarities="selectedRarities"
                @select="$emit('select', $event)"
              />
            </td>
            <td class="align-top p-3 border-end border-primary role-section-support">
              <CharacterRoleSection
                :role-characters="charactersByRole.support"
                :selected-character="selectedCharacter"
                :is-recommended="isRecommended"
                :get-recommendation-tier="getRecommendationTier"
                :selected-elements="selectedElements"
                :selected-paths="selectedPaths"
                :selected-rarities="selectedRarities"
                @select="$emit('select', $event)"
              />
            </td>
            <td class="align-top p-3 role-section-sustain">
              <CharacterRoleSection
                :role-characters="charactersByRole.sustain"
                :selected-character="selectedCharacter"
                :is-recommended="isRecommended"
                :get-recommendation-tier="getRecommendationTier"
                :selected-elements="selectedElements"
                :selected-paths="selectedPaths"
                :selected-rarities="selectedRarities"
                @select="$emit('select', $event)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Mobile Tab View -->
  <div class="d-lg-none">
    <ul class="nav nav-tabs nav-fill" role="tablist">
      <li v-show="hasCharactersInRole('dps')" class="nav-item" role="presentation">
        <button
          :class="getActiveTab() === 'dps' ? 'nav-link active fw-bold custom-tab' : 'nav-link fw-bold custom-tab'"
          data-bs-toggle="tab"
          data-bs-target="#dps-tab"
          type="button"
          role="tab"
        >
          DPS
        </button>
      </li>
      <li v-show="hasCharactersInRole('support')" class="nav-item" role="presentation">
        <button
          :class="getActiveTab() === 'support' ? 'nav-link active fw-bold custom-tab' : 'nav-link fw-bold custom-tab'"
          data-bs-toggle="tab"
          data-bs-target="#support-tab"
          type="button"
          role="tab"
        >
          Support
        </button>
      </li>
      <li v-show="hasCharactersInRole('sustain')" class="nav-item" role="presentation">
        <button
          :class="getActiveTab() === 'sustain' ? 'nav-link active fw-bold custom-tab' : 'nav-link fw-bold custom-tab'"
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
        :class="getActiveTab() === 'dps' ? 'tab-pane fade show active p-3' : 'tab-pane fade p-3'"
        id="dps-tab"
        role="tabpanel"
        class="role-section-dps"
      >
        <CharacterRoleSection
          :role-characters="charactersByRole.dps"
          :selected-character="selectedCharacter"
          :is-recommended="isRecommended"
          :get-recommendation-tier="getRecommendationTier"
          :selected-elements="selectedElements"
          :selected-paths="selectedPaths"
          :selected-rarities="selectedRarities"
          @select="$emit('select', $event)"
        />
      </div>
      <div
        :class="getActiveTab() === 'support' ? 'tab-pane fade show active p-3' : 'tab-pane fade p-3'"
        id="support-tab"
        role="tabpanel"
        class="role-section-support"
      >
        <CharacterRoleSection
          :role-characters="charactersByRole.support"
          :selected-character="selectedCharacter"
          :is-recommended="isRecommended"
          :get-recommendation-tier="getRecommendationTier"
          :selected-elements="selectedElements"
          :selected-paths="selectedPaths"
          :selected-rarities="selectedRarities"
          @select="$emit('select', $event)"
        />
      </div>
      <div
        :class="getActiveTab() === 'sustain' ? 'tab-pane fade show active p-3' : 'tab-pane fade p-3'"
        id="sustain-tab"
        role="tabpanel"
        class="role-section-sustain"
      >
        <CharacterRoleSection
          :role-characters="charactersByRole.sustain"
          :selected-character="selectedCharacter"
          :is-recommended="isRecommended"
          :get-recommendation-tier="getRecommendationTier"
          :selected-elements="selectedElements"
          :selected-paths="selectedPaths"
          :selected-rarities="selectedRarities"
          @select="$emit('select', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character } from '@hsr-team-builder/shared'
import CharacterRoleSection from './CharacterRoleSection.vue'

interface Props {
  charactersByRole: {
    dps: Record<string, Character[]>
    support: Record<string, Character[]>
    sustain: Record<string, Character[]>
  }
  selectedCharacter?: Character | null
  isRecommended: (charId: string) => boolean
  getRecommendationTier: (charId: string) => 'bis' | 'generalist' | 'f2p' | null
  selectedElements: string[]
  selectedPaths: string[]
  selectedRarities: number[]
  getActiveTab: () => string
  hasCharactersInRole: (role: 'dps' | 'support' | 'sustain') => boolean
}

interface Emits {
  (e: 'select', character: Character): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>