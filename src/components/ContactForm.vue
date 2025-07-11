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

            <button type="submit" class="btn btn-primary">
              Send Message
            </button>
          </form>


        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// Simple HTML form submission - no JavaScript needed
</script>