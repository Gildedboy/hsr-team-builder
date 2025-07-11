<template>
  <div class="card bg-dark border-primary">
    <div class="card-header">
      <h3 class="h5 text-primary mb-0">Contact & Support</h3>
    </div>
    <div class="card-body">
      <div class="d-flex gap-3 justify-content-center">
        <!-- Contact Modal Button -->
        <button 
          class="btn btn-outline-primary btn-sm" 
          data-bs-toggle="modal" 
          data-bs-target="#contactModal"
        >
          <i class="fas fa-envelope me-1"></i> Contact
        </button>
        
        <!-- GitHub Link -->
        <a href="https://github.com/Gildedboy/hsr-team-builder" target="_blank" class="btn btn-outline-light btn-sm">
          <i class="fab fa-github me-1"></i> GitHub
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
          <form @submit.prevent="submitForm" v-if="!submitted">
            <div class="mb-3">
              <label class="form-label text-white small">Type:</label>
              <select v-model="formData.type" class="form-select bg-dark text-white border-primary" required>
                <option value="">Select...</option>
                <option value="team-suggestion">Team/Teammate Suggestion</option>
                <option value="bug-report">Bug Report</option>
                <option value="general-suggestion">General Suggestion/Page Improvements</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label text-white small">Message:</label>
              <textarea 
                v-model="formData.message" 
                class="form-control bg-dark text-white border-primary" 
                rows="4" 
                placeholder="Describe your suggestion, bug report, or feedback..."
                required
                maxlength="500"
              ></textarea>
              <small class="text-muted">{{ formData.message.length }}/500</small>
            </div>

            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </button>
          </form>

          <div v-else class="text-center text-success">
            <i class="fas fa-check-circle fa-2x mb-2"></i>
            <p>Thank you for your feedback!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const formData = reactive({
  type: '',
  message: ''
})

const isSubmitting = ref(false)
const submitted = ref(false)

const submitForm = async () => {
  isSubmitting.value = true
  
  try {
    const subject = encodeURIComponent(`HSR Team Builder - ${formData.type}`)
    const body = encodeURIComponent(formData.message)
    window.location.href = `mailto:contact@gilded.dev?subject=${subject}&body=${body}`
    submitted.value = true
  } catch (error) {
    alert('Failed to open email client')
  } finally {
    isSubmitting.value = false
  }
}
</script>