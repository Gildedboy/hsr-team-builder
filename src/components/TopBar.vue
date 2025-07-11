<template>
  <div class="top-bar py-2 mb-4">
    <div class="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
      <!-- Title -->
      <h1 class="h4 mb-0 text-primary fw-bold ps-3 text-center text-md-start">Honkai Star Rail Team Builder</h1>
      
      <!-- Buttons -->
      <div class="d-flex gap-2 align-items-center flex-wrap justify-content-center">
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
// Contact form uses HTML submission to Formspree
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