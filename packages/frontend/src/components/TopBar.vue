<template>
  <div class="top-bar py-2 mb-4">
    <div
      class="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center gap-2"
      style="max-width: 1900px; margin: 0 auto"
    >
      <!-- Title -->
      <div class="d-flex align-items-center justify-content-center justify-content-md-start">
        <h1 class="h4 mb-0 text-primary fw-bold">Honkai Star Rail Team Builder</h1>
        <span
          class="badge bg-secondary ms-2 cursor-pointer"
          data-bs-toggle="modal"
          data-bs-target="#infoModal"
          style="font-size: 10px"
        >
          {{ appVersion }}
        </span>
      </div>

      <!-- Buttons -->
      <div class="d-flex gap-2 align-items-center flex-wrap justify-content-center">
        <div class="tb-toggle d-flex align-items-center">
          <span class="tb-toggle-label">TRAILBLAZER</span>
          <div class="tb-toggle-group">
            <button
              type="button"
              :class="trailblazerAvatarVariant === 'stelle' ? 'tb-toggle-btn active' : 'tb-toggle-btn'"
              @click="setTrailblazerAvatarVariant('stelle')"
              aria-label="Use Stelle Trailblazer avatar"
              title="Stelle avatar"
            >
              <i class="fas fa-venus" aria-hidden="true"></i>
            </button>
            <button
              type="button"
              :class="trailblazerAvatarVariant === 'caelus' ? 'tb-toggle-btn active' : 'tb-toggle-btn'"
              @click="setTrailblazerAvatarVariant('caelus')"
              aria-label="Use Caelus Trailblazer avatar"
              title="Caelus avatar"
            >
              <i class="fas fa-mars" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        <!-- Contact Modal Button -->
        <button class="contact-btn" data-bs-toggle="modal" data-bs-target="#contactModal">
          <i class="fas fa-envelope me-1"></i> Contact
        </button>

        <!-- GitHub Link -->
        <a href="https://github.com/Gildedboy/hsr-team-builder" target="_blank" class="github-btn">
          <i class="fab fa-github me-1"></i> GitHub
        </a>

        <!-- Ko-fi Link -->
        <a href="https://ko-fi.com/Z8Z31V1ED" target="_blank">
          <img
            height="36"
            style="border: 0px; height: 36px"
            src="https://storage.ko-fi.com/cdn/kofi5.png?v=6"
            border="0"
            alt="Buy Me a Coffee at ko-fi.com"
          />
        </a>
      </div>
    </div>
  </div>

  <!-- Contact Modal -->
  <div class="modal fade" id="contactModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content bg-dark border-primary">
        <div class="modal-header border-primary">
          <h5 class="modal-title text-primary">Contact</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form action="https://formspree.io/f/mqabrlor" method="POST">
            <input type="hidden" name="_subject" value="HSR Team Builder Contact" />

            <div class="mb-3">
              <label for="contact-type" class="form-label text-white small">Type:</label>
              <select
                id="contact-type"
                name="type"
                class="form-select bg-dark text-white border-primary"
                required
              >
                <option value="">Select...</option>
                <option value="team-suggestion">Team/Teammate Suggestion</option>
                <option value="bug-report">Bug Report</option>
                <option value="general-suggestion">General Suggestion/Page Improvements</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="contact-message" class="form-label text-white small">Message:</label>
              <textarea
                id="contact-message"
                name="message"
                class="form-control bg-dark text-white border-primary"
                rows="4"
                placeholder="Describe your suggestion, bug report, or feedback..."
                required
                maxlength="500"
              ></textarea>
            </div>

            <button type="submit" class="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Info Modal -->
  <div class="modal fade" id="infoModal" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content bg-dark border-primary">
        <div class="modal-header border-primary">
          <h5 class="modal-title text-primary">Information</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <!-- Tabs -->
          <ul class="nav nav-tabs mb-3" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                id="version-info-tab-button"
                class="nav-link custom-tab active"
                data-bs-toggle="tab"
                data-bs-target="#version-info-tab"
                type="button"
                role="tab"
                aria-controls="version-info-tab"
                aria-selected="true"
              >
                Version Info
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                id="roadmap-tab-button"
                class="nav-link custom-tab"
                data-bs-toggle="tab"
                data-bs-target="#todo-tab"
                type="button"
                role="tab"
                aria-controls="todo-tab"
                aria-selected="false"
              >
                Roadmap
              </button>
            </li>
          </ul>

          <!-- Tab Content -->
          <div class="tab-content">
            <!-- Version Info Tab -->
            <div
              class="tab-pane fade show active"
              id="version-info-tab"
              role="tabpanel"
              aria-labelledby="version-info-tab-button"
            >
              <div class="text-white">
                <h6 class="text-primary mb-3">{{ appVersion }} Release Notes</h6>

                <!-- Loading State -->
                <div v-if="isLoading && !hasVersionInfo" class="mb-3">
                  <div class="spinner-border spinner-border-sm text-primary me-2" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <small class="text-muted">Loading version information...</small>
                </div>

                <!-- Error State -->
                <div v-else-if="error && !hasVersionInfo" class="mb-3">
                  <div class="text-warning small">
                    <i class="fas fa-exclamation-triangle me-1"></i>
                    Unable to load latest version info. Showing cached content.
                  </div>
                </div>

                <!-- Dynamic Content -->
                <div v-if="currentVersionInfo" class="version-content">
                  <div v-if="currentVersionInfo.description" class="mb-3">
                    <p class="text-light">{{ currentVersionInfo.description }}</p>
                  </div>

                  <!-- Features -->
                  <div v-if="currentVersionInfo.features?.length" class="mb-3">
                    <h6 class="text-success mb-2">✨ New Features</h6>
                    <ul class="list-unstyled">
                      <li
                        v-for="feature in currentVersionInfo.features"
                        :key="feature"
                        class="mb-1 small"
                      >
                        • {{ feature }}
                      </li>
                    </ul>
                  </div>

                  <!-- Bug Fixes -->
                  <div v-if="currentVersionInfo.bugFixes?.length" class="mb-3">
                    <h6 class="text-info mb-2">🐛 Bug Fixes</h6>
                    <ul class="list-unstyled">
                      <li v-for="fix in currentVersionInfo.bugFixes" :key="fix" class="mb-1 small">
                        • {{ fix }}
                      </li>
                    </ul>
                  </div>

                  <!-- Breaking Changes -->
                  <div v-if="currentVersionInfo.breakingChanges?.length" class="mb-3">
                    <h6 class="text-warning mb-2">⚠️ Breaking Changes</h6>
                    <ul class="list-unstyled">
                      <li
                        v-for="change in currentVersionInfo.breakingChanges"
                        :key="change"
                        class="mb-1 small"
                      >
                        • {{ change }}
                      </li>
                    </ul>
                  </div>

                  <!-- Known Issues -->
                  <div v-if="currentVersionInfo.knownIssues?.length" class="mb-3">
                    <h6 class="text-danger mb-2">🔴 Known Issues</h6>
                    <ul class="list-unstyled">
                      <li
                        v-for="issue in currentVersionInfo.knownIssues"
                        :key="issue"
                        class="mb-1 small"
                      >
                        • {{ issue }}
                      </li>
                    </ul>
                  </div>

                  <!-- Release Date -->
                  <div
                    v-if="currentVersionInfo.releaseDate"
                    class="mt-3 pt-2 border-top border-secondary"
                  >
                    <small class="text-muted">
                      Released on
                      {{ new Date(currentVersionInfo.releaseDate).toLocaleDateString() }}
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <!-- Roadmap Tab -->
            <div
              class="tab-pane fade"
              id="todo-tab"
              role="tabpanel"
              aria-labelledby="roadmap-tab-button"
            >
              <div class="text-white">
                <h6 class="text-primary mb-3">Upcoming Features</h6>

                <!-- Loading State -->
                <div v-if="isLoadingRoadmap && roadmapItems.length === 0" class="mb-3">
                  <div class="spinner-border spinner-border-sm text-primary me-2" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <small class="text-muted">Loading roadmap...</small>
                </div>

                <!-- Error State -->
                <div v-else-if="roadmapError && roadmapItems.length === 0" class="mb-3">
                  <div class="text-warning small">
                    <i class="fas fa-exclamation-triangle me-1"></i>
                    Unable to load roadmap. Showing cached content.
                  </div>
                </div>

                <!-- Roadmap Items -->
                <ul v-if="roadmapItems.length > 0" class="list-unstyled">
                  <li v-for="item in roadmapItems" :key="item" class="mb-2">• {{ item }}</li>
                </ul>

                <!-- No roadmap items -->
                <div v-else-if="!isLoadingRoadmap" class="text-muted">
                  <i class="fas fa-check-circle me-1"></i>
                  No upcoming features planned at this time.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAvatarPreference } from '@/composables/useAvatarPreference'
import { useVersionInfo } from '@/composables/useVersionInfo'

// Get version info from API
const {
  currentVersionInfo,
  roadmapItems,
  isLoading,
  isLoadingRoadmap,
  error,
  roadmapError,
  appVersion,
  hasVersionInfo,
  fetchVersionInfo,
  fetchRoadmap,
} = useVersionInfo()

const { trailblazerAvatarVariant, setTrailblazerAvatarVariant } = useAvatarPreference()

// Fetch version info and roadmap when component mounts
onMounted(() => {
  fetchVersionInfo()
  fetchRoadmap()
})
</script>

<style scoped>
.top-bar {
  border-bottom: 1px solid rgba(114, 164, 242, 0.2);
}

.contact-btn,
.github-btn,
.tb-toggle-btn {
  height: 36px;
  padding: 8px 16px;
  border-radius: 18px;
  border: none;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.contact-btn {
  background-color: #dc3545;
  color: white;
}

.contact-btn:hover {
  background-color: #bb2d3b;
  color: white;
}

.github-btn {
  background-color: #333;
  color: white;
}

.github-btn:hover {
  background-color: #555;
  color: white;
  text-decoration: none;
}

.tb-toggle {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(114, 164, 242, 0.2);
  border-radius: 18px;
  gap: 10px;
  padding: 4px 6px 4px 12px;
}

.tb-toggle-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.tb-toggle-group {
  display: flex;
  gap: 4px;
}

.tb-toggle-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.78);
  height: 28px;
  min-width: 28px;
  padding: 0 10px;
  font-size: 14px;
}

.tb-toggle-btn.active {
  background: #00d4ff;
  color: #111827;
}

.tb-toggle-btn i {
  display: block;
}

.cursor-pointer {
  cursor: pointer;
}

.custom-tab {
  background-color: transparent;
  border: 1px solid rgba(114, 164, 242, 0.2);
  color: rgba(255, 255, 255, 0.7);
  border-bottom: none;
}

.custom-tab:hover {
  background-color: rgba(114, 164, 242, 0.1);
  color: #72a4f2;
  border-color: rgba(114, 164, 242, 0.3);
}

.custom-tab.active {
  background-color: #72a4f2;
  color: #1a1a2e;
  border-color: #72a4f2;
}

.fallback-content {
  animation: fadeIn 0.3s ease-in;
}

.version-content,
.changelog-content {
  animation: fadeIn 0.3s ease-in;
}

.changelog-content .border-bottom:last-child {
  border-bottom: none !important;
  padding-bottom: 0 !important;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
