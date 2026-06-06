<template>
  <div class="roster-import-overlay" @click="$emit('close')">
    <div class="roster-import-modal bg-dark border border-primary" @click.stop>
      <div class="roster-import-header">
        <div>
          <h2 class="h5 text-primary mb-1">Import Roster</h2>
          <p class="text-secondary small mb-0">
            Supports
            <a
              href="https://github.com/IceDynamix/reliquary-archiver"
              target="_blank"
              rel="noopener noreferrer"
            >
              IceDynamix Reliquary Archiver
            </a>
            JSON exports. The file is processed locally in your browser.
          </p>
        </div>
        <button
          class="roster-import-close"
          type="button"
          aria-label="Close import dialog"
          @click="$emit('close')"
        >
          &times;
        </button>
      </div>

      <div class="roster-import-source">
        <input
          ref="fileInputRef"
          class="visually-hidden"
          type="file"
          accept="application/json,.json"
          @change="handleFileChange"
        />
        <button
          class="btn btn-primary btn-sm fw-semibold roster-import-control"
          type="button"
          @click="openFilePicker"
        >
          Upload JSON
        </button>
        <span class="roster-import-or text-secondary small">or</span>
        <input
          v-model="pastedJson"
          class="form-control bg-dark text-white border-primary roster-import-control"
          type="text"
          spellcheck="false"
          placeholder="Paste JSON file content"
          @paste="handlePaste"
          @keydown.ctrl.enter.prevent="handlePastedJson"
        />
      </div>

      <div v-if="errorMessage" class="alert alert-danger py-2 small mb-3">
        {{ errorMessage }}
      </div>

      <div v-if="preview" class="roster-import-preview">
        <div class="d-flex flex-wrap gap-2 mb-3">
          <span class="badge bg-success">Found {{ preview.matchedCharacters.length }} characters</span>
        </div>
        <p class="text-secondary small mb-3">
          Applying this import updates your roster to match the characters found in the uploaded
          file.
        </p>

        <div class="d-flex justify-content-end gap-2">
          <button class="btn btn-outline-secondary btn-sm" type="button" @click="$emit('close')">
            Cancel
          </button>
          <button
            class="btn btn-success btn-sm fw-semibold"
            type="button"
            :disabled="preview.ownedCharacterIds.length === 0"
            @click="$emit('apply', preview.ownedCharacterIds)"
          >
            Apply Import
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Character } from '@hsr-team-builder/shared'
import {
  MAX_ROSTER_IMPORT_BYTES,
  parseReliquaryRosterArchive,
  type RosterImportPreview,
} from '@/utils/rosterImport'

const props = defineProps<{
  characters: Character[]
}>()

defineEmits<{
  (event: 'close'): void
  (event: 'apply', ownedCharacterIds: string[]): void
}>()

const preview = ref<RosterImportPreview | null>(null)
const errorMessage = ref('')
const pastedJson = ref('')
const fileInputRef = ref<HTMLInputElement | null>(null)

const parseImportJson = (jsonText: string) => {
  if (new Blob([jsonText]).size > MAX_ROSTER_IMPORT_BYTES) {
    throw new Error('Import file is too large.')
  }

  const parsedFile = JSON.parse(jsonText) as unknown
  preview.value = parseReliquaryRosterArchive(parsedFile, props.characters)
}

const openFilePicker = () => {
  preview.value = null
  errorMessage.value = ''
  fileInputRef.value?.click()
}

const handleFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  preview.value = null
  errorMessage.value = ''

  if (!file) {
    return
  }

  if (file.size > MAX_ROSTER_IMPORT_BYTES) {
    errorMessage.value = 'Import file is too large.'
    input.value = ''
    return
  }

  try {
    parseImportJson(await file.text())
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Unable to read import file.'
  }
}

const handlePaste = () => {
  window.setTimeout(() => {
    if (pastedJson.value.trim().length > 0) {
      handlePastedJson()
    }
  }, 0)
}

const handlePastedJson = () => {
  preview.value = null
  errorMessage.value = ''

  try {
    parseImportJson(pastedJson.value)
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Unable to parse JSON content.'
  }
}
</script>

<style scoped>
.roster-import-overlay {
  align-items: center;
  background: rgba(0, 0, 0, 0.72);
  display: flex;
  inset: 0;
  justify-content: center;
  padding: 20px;
  position: fixed;
  z-index: 2000;
}

.roster-import-modal {
  border-radius: 8px;
  max-height: min(720px, calc(100vh - 40px));
  max-width: 720px;
  overflow: auto;
  padding: 20px;
  width: 100%;
}

.roster-import-header {
  align-items: flex-start;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  margin-bottom: 18px;
}

.roster-import-close {
  align-items: center;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 50%;
  color: #ffffff;
  display: inline-flex;
  font-size: 22px;
  height: 32px;
  justify-content: center;
  line-height: 1;
  width: 32px;
}

.roster-import-close:hover {
  border-color: rgba(255, 255, 255, 0.5);
}

.roster-import-source {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
}

.roster-import-control {
  flex: 1 1 0;
  min-height: 38px;
  min-width: 220px;
}

.roster-import-or {
  flex: 0 0 auto;
}

</style>
