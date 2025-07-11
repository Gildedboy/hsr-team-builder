<template>
  <div class="top-bar py-2 mb-4">
    <div class="container-fluid d-flex justify-content-between align-items-center">
      <!-- Title -->
      <h1 class="h4 mb-0 text-primary fw-bold ps-3">Honkai Star Rail Team Builder</h1>
      
      <!-- Buttons -->
      <div class="d-flex gap-2 align-items-center">
        <!-- Contact Modal Button -->
        <button 
          class="contact-btn"
          data-bs-toggle="modal" 
          data-bs-target="#contactModal"
        >
          <i class="fas fa-envelope me-1"></i> Contact
        </button>
        
        <!-- GitHub Link -->
        <a href="https://github.com/Gildedboy/hsr-team-builder" target="_blank" class="github-btn">
          <i class="fab fa-github me-1"></i> GitHub
        </a>
        
        <!-- Ko-fi Link -->
        <a href='https://ko-fi.com/Z8Z31V1ED' target='_blank'>
          <img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi5.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' />
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
import { ref, reactive, onMounted } from 'vue'

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

// Ko-fi widget script no longer needed
</script>

<style scoped>
.top-bar {
  border-bottom: 1px solid rgba(114, 164, 242, 0.2);
}

.contact-btn, .github-btn {
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
  background-color: #ff5e5b;
  color: white;
}

.contact-btn:hover {
  background-color: #e54b47;
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
</style>