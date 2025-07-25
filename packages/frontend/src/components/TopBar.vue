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
          {{ appVersion }} {{ deploymentType }}
        </span>
      </div>

      <!-- Buttons -->
      <div class="d-flex gap-2 align-items-center flex-wrap justify-content-center">
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
              <label class="form-label text-white small">Type:</label>
              <select name="type" class="form-select bg-dark text-white border-primary" required>
                <option value="">Select...</option>
                <option value="team-suggestion">Team/Teammate Suggestion</option>
                <option value="bug-report">Bug Report</option>
                <option value="general-suggestion">General Suggestion/Page Improvements</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label text-white small">Message:</label>
              <textarea
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
                class="nav-link active custom-tab"
                data-bs-toggle="tab"
                data-bs-target="#missing-tab"
                type="button"
                role="tab"
              >
                Missing Characters
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link custom-tab"
                data-bs-toggle="tab"
                data-bs-target="#todo-tab"
                type="button"
                role="tab"
              >
                TO-DO
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link custom-tab"
                data-bs-toggle="tab"
                data-bs-target="#changelog-tab"
                type="button"
                role="tab"
              >
                CHANGELOGS
              </button>
            </li>
          </ul>

          <!-- Tab Content -->
          <div class="tab-content">
            <div class="tab-pane fade show active" id="todo-tab" role="tabpanel">
              <div class="text-white">
                <h6 class="text-primary mb-3">Upcoming Features</h6>
                <ul class="list-unstyled">
                  <li class="mb-2">• Add "Check Prydwen Build" link</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Get version from environment variable, fallback to default
const appVersion = import.meta.env.VITE_APP_VERSION || 'v1.2.0'
const apiUrl = import.meta.env.VITE_API_URL
const deploymentType = apiUrl ? 'API-Enabled' : 'Static'
</script>

<style scoped>
.top-bar {
  border-bottom: 1px solid rgba(114, 164, 242, 0.2);
}

.contact-btn,
.github-btn {
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

.cursor-pointer {
  cursor: pointer;
}
</style>
