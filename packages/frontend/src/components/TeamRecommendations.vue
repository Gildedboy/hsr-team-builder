<template>
  <div class="card bg-dark border-primary h-100">
    <!-- No Data Message -->
    <div
      v-if="hasNoTeamData"
      class="card-body d-flex flex-column justify-content-center align-items-center text-center py-5"
    >
      <img
        src="/images/anime-satania.gif"
        alt="No data"
        class="mb-3"
        style="width: 120px; height: auto; border-radius: 8px"
      />
      <h3 class="text-primary mb-3">{{ character.name }}</h3>
      <p class="text-secondary mb-0">This character doesn't have enough data yet.</p>
      <p class="text-secondary small mt-2">
        Teammate recommendations and team compositions are being worked on.
      </p>
    </div>

    <!-- Regular Content -->
    <div v-else class="d-flex flex-column h-100">
      <div class="card-header text-center" style="padding-top: 10px">
        <h4 class="text-primary mb-0">Suggested Teammates for {{ character.name }}</h4>
      </div>

      <div class="card-body d-flex flex-column align-items-center p-3 flex-grow-1">
        <!-- Teammate Sections Tabs -->
        <div
          v-if="character.teammateRecommendations"
          class="d-flex gap-2 justify-content-center mb-3 flex-wrap"
        >
          <button
            v-for="section in character.teammateRecommendations"
            :key="section.name"
            class="btn btn-sm fw-semibold custom-tab px-2"
            :class="{ active: activeTeammateTab === section.name }"
            @click="activeTeammateTab = section.name"
          >
            {{ section.name }}
          </button>
        </div>

        <!-- Teammate Recommendations -->
        <div v-if="currentTeammateSection" class="w-100 mb-3 flex-grow-1">
          <div class="d-flex align-items-start justify-content-center gap-4 w-100">
            <RecommendationTier
              v-if="currentTeammateSection.bis.length > 0"
              tier="bis"
              :entries="currentTeammateSection.bis"
              :active-tab="activeTeammateTab"
              :characters="characters"
              @show-tooltip="showTooltip"
              @hide-tooltip="hideTooltip"
            />

            <RecommendationTier
              v-if="currentTeammateSection.generalist.length > 0"
              tier="generalist"
              :entries="currentTeammateSection.generalist"
              :active-tab="activeTeammateTab"
              :characters="characters"
              @show-tooltip="showTooltip"
              @hide-tooltip="hideTooltip"
            />

            <RecommendationTier
              v-if="currentTeammateSection.f2p.length > 0"
              tier="f2p"
              :entries="currentTeammateSection.f2p"
              :active-tab="activeTeammateTab"
              :characters="characters"
              @show-tooltip="showTooltip"
              @hide-tooltip="hideTooltip"
            />
          </div>
        </div>

        <!-- Separator Line -->
        <hr
          v-if="character.teamCompositions"
          class="w-100 border-primary opacity-50"
          style="margin: 1.5rem 0"
        />

        <!-- Team Compositions -->
        <div v-if="character.teamCompositions" class="w-100 flex-grow-1">
          <h4 class="text-center text-primary mb-3">Suggested Teams for {{ character.name }}</h4>

          <!-- Team Composition Tabs -->
          <div class="d-flex gap-2 justify-content-center mb-3 flex-wrap">
            <button
              v-for="team in character.teamCompositions"
              :key="team.name"
              class="btn btn-sm fw-semibold custom-tab px-3"
              :class="{ active: activeTeamTab === team.name }"
              @click="activeTeamTab = team.name"
            >
              {{ team.name }}
            </button>
          </div>

          <!-- Team Display -->
          <div
            v-if="currentTeamComposition"
            class="d-flex flex-column flex-lg-row justify-content-around gap-3 mb-3"
          >
            <div class="text-center">
              <h5 class="text-warning mb-2">BiS Team</h5>
              <div class="d-flex gap-1 gap-sm-2 justify-content-center flex-wrap">
                <div
                  v-for="entry in currentTeamComposition.bis.characters"
                  :key="`${currentTeamComposition.name}-bis-${entry.originalId}-${entry.id}`"
                  class="team-character-item"
                  @mouseenter="entry.kind !== 'custom' ? showTooltip(entry.id, $event) : undefined"
                  @mouseleave="hideTooltip"
                >
                  <img
                    :src="getCharacterAvatar(entry.id)"
                    :alt="getCharacterName(entry.id)"
                    class="team-character-avatar"
                    :class="{ 'is-unavailable': entry.kind === 'unavailable' }"
                    @error="($event.target as HTMLImageElement).src = '/images/placeholder.svg'"
                  />
                  <div v-if="entry.kind !== 'owned'" class="team-character-status">
                    {{ getEntryStatus(entry) }}
                  </div>
                </div>
              </div>
              <p v-if="currentTeamComposition.bis.description" class="text-muted small mt-2">
                {{ currentTeamComposition.bis.description }}
              </p>
            </div>

            <div v-if="currentTeamComposition.f2p" class="text-center">
              <h5 class="text-success mb-2">F2P Team</h5>
              <div class="d-flex gap-1 gap-sm-2 justify-content-center flex-wrap">
                <div
                  v-for="entry in currentTeamComposition.f2p.characters"
                  :key="`${currentTeamComposition.name}-f2p-${entry.originalId}-${entry.id}`"
                  class="team-character-item"
                  @mouseenter="entry.kind !== 'custom' ? showTooltip(entry.id, $event) : undefined"
                  @mouseleave="hideTooltip"
                >
                  <img
                    :src="getCharacterAvatar(entry.id)"
                    :alt="getCharacterName(entry.id)"
                    class="team-character-avatar"
                    :class="{ 'is-unavailable': entry.kind === 'unavailable' }"
                    @error="($event.target as HTMLImageElement).src = '/images/placeholder.svg'"
                  />
                  <div v-if="entry.kind !== 'owned'" class="team-character-status">
                    {{ getEntryStatus(entry) }}
                  </div>
                </div>
              </div>
              <p v-if="currentTeamComposition.f2p.description" class="text-muted small mt-2">
                {{ currentTeamComposition.f2p.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <CharacterTooltip :character="hoveredCharacter" :position="tooltipPosition" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Character } from '@hsr-team-builder/shared'
import { useTooltip } from '@/composables/useTooltip'
import { getCharacterAvatar } from '@/data/avatars'
import { useCharactersApi } from '@/composables/useCharactersApi'
import {
  type ResolvedCharacterEntry,
  useRoster,
} from '@/composables/useRoster'
import CharacterTooltip from './CharacterTooltip.vue'
import RecommendationTier from './RecommendationTier.vue'

interface Props {
  character: Character
}

const props = defineProps<Props>()

// Get characters from API
const { characters } = useCharactersApi()
const { getResolvedTeammateSections, getResolvedTeamCompositions } = useRoster()

const resolvedTeammateSections = computed(() =>
  getResolvedTeammateSections(props.character, characters.value),
)

const resolvedTeamCompositions = computed(() =>
  getResolvedTeamCompositions(props.character, characters.value),
)

const activeTeammateTab = ref(resolvedTeammateSections.value[0]?.name || '')
const activeTeamTab = ref(resolvedTeamCompositions.value[0]?.name || '')

watch(
  resolvedTeammateSections,
  (sections) => {
    if (!sections.some((section) => section.name === activeTeammateTab.value)) {
      activeTeammateTab.value = sections[0]?.name || ''
    }
  },
  { immediate: true },
)

watch(
  resolvedTeamCompositions,
  (teams) => {
    if (!teams.some((team) => team.name === activeTeamTab.value)) {
      activeTeamTab.value = teams[0]?.name || ''
    }
  },
  { immediate: true },
)

const currentTeammateSection = computed(() =>
  resolvedTeammateSections.value.find((section) => section.name === activeTeammateTab.value),
)

const currentTeamComposition = computed(() =>
  resolvedTeamCompositions.value.find((team) => team.name === activeTeamTab.value),
)

const hasNoTeamData = computed(() => {
  const hasNoTeammates = resolvedTeammateSections.value.length === 0
  const hasNoCompositions = resolvedTeamCompositions.value.length === 0
  return hasNoTeammates && hasNoCompositions
})

const { hoveredCharacter, tooltipPosition, showTooltip, hideTooltip } = useTooltip()

const getCharacterName = (characterId: string): string => {
  const char = characters.value.find((c) => c.id === characterId)
  return char?.name || characterId
}

const getEntryStatus = (entry: ResolvedCharacterEntry) => {
  const displayedCharacter = characters.value.find((character) => character.id === entry.id)

  if (entry.kind === 'free') {
    return 'Free'
  }

  if (entry.kind === 'fallback') {
    const originalCharacter = characters.value.find((character) => character.id === entry.originalId)

    if (entry.isFree && originalCharacter?.roles.includes('SUSTAIN')) {
      return `Free Sustain Option: ${displayedCharacter?.name || entry.name} for ${entry.originalName}`
    }

    return `${displayedCharacter?.name || entry.name} replacing ${entry.originalName}`
  }

  if (entry.kind === 'unavailable') {
    return 'Not obtained yet'
  }

  return ''
}
</script>

<style scoped>
.custom-tab {
  background-color: rgba(255, 255, 255, 0.1) !important;
  color: white !important;
  border: none !important;
}

.custom-tab.active {
  background-color: #00d4ff !important;
  color: black !important;
}

.team-character-item {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  max-width: 88px;
}

.team-character-avatar {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.team-character-avatar.is-unavailable {
  filter: grayscale(100%) saturate(0.2);
  opacity: 0.5;
}

.team-character-status {
  color: rgba(255, 255, 255, 0.84);
  font-size: 0.72rem;
  line-height: 1.2;
  margin-top: 0.35rem;
}
</style>
