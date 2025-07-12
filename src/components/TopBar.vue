<template>
  <div class="top-bar py-2 mb-4">
    <div class="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
      <!-- Title -->
      <div class="d-flex align-items-center justify-content-center justify-content-md-start">
        <h1 class="h4 mb-0 text-primary fw-bold">Honkai Star Rail Team Builder</h1>
        <span 
          class="badge bg-secondary ms-2 cursor-pointer"
          data-bs-toggle="modal" 
          data-bs-target="#infoModal"
          style="font-size: 10px;"
        >
          v1.2.0
        </span>
      </div>
      
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
            <div class="tab-pane fade show active" id="missing-tab" role="tabpanel">
              <div class="text-white">
                <h6 class="text-primary mb-3">Characters Missing Updates</h6>
                
                <div class="mb-4">
                  <strong class="text-warning">DPS Characters:</strong>
                  <ul class="list-unstyled ms-3 small mt-2">
                    <li>• Jade - Incomplete team compositions</li>
                    <li>• Kafka - Missing teammate sections</li>
                    <li>• Boothill - No data</li>
                    <li>• Firefly - No data</li>
                    <li>• Feixiao - No data</li>
                    <li>• Rappa - No data</li>
                    <li>• Destruction Trailblazer - No data</li>
                    <li>• Xueyi - No data</li>
                    <li>• Dan Heng - No data</li>
                    <li>• Arlan - No data</li>
                    <li>• Serval - No data</li>
                    <li>• Hook - No data</li>
                    <li>• Qingque - No data</li>
                    <li>• Sushang - No data</li>
                    <li>• Herta - No data</li>
                    <li>• Misha - No data</li>
                    <li>• Hunt March 7th - No data</li>
                    <li>• Moze - No data</li>
                    <li>• Aglaea - No data</li>
                    <li>• Castorice - No data</li>
                    <li>• Mydei - No data</li>
                    <li>• Phainon - No data</li>
                    <li>• Saber - No data</li>
                    <li>• Archer - No data</li>
                    <li>• Anaxa - No data</li>
                    <li>• The Herta - No data</li>
                  </ul>
                </div>
                
                <div class="mb-4">
                  <strong class="text-warning">Support Characters:</strong>
                  <ul class="list-unstyled ms-3 small mt-2">
                    <li>• Bronya - No data</li>
                    <li>• Sparkle - No data</li>
                    <li>• Robin - No data</li>
                    <li>• Ruan Mei - No data</li>
                    <li>• Sunday - No data</li>
                    <li>• Tingyun - No data</li>
                    <li>• Asta - No data</li>
                    <li>• Hanya - No data</li>
                    <li>• Yukong - No data</li>
                    <li>• Pela - No data</li>
                    <li>• Silver Wolf - No data</li>
                    <li>• Jiaoqiu - No data</li>
                    <li>• Guinaifen - No data</li>
                    <li>• Sampo - No data</li>
                    <li>• Luka - No data</li>
                    <li>• Welt - No data</li>
                    <li>• Harmony Trailblazer - No data</li>
                    <li>• Remembrance Trailblazer - No data</li>
                    <li>• Tribbie - No data</li>
                    <li>• Cipher - No data</li>
                    <li>• Fugue - No data</li>
                  </ul>
                </div>
                
                <div class="mb-4">
                  <strong class="text-warning">Sustain Characters:</strong>
                  <ul class="list-unstyled ms-3 small mt-2">
                    <li>• Aventurine - No data</li>
                    <li>• Fu Xuan - No data</li>
                    <li>• Gepard - No data</li>
                    <li>• March 7th - No data</li>
                    <li>• Fire Trailblazer - No data</li>
                    <li>• Huohuo - No data</li>
                    <li>• Bailu - No data</li>
                    <li>• Luocha - No data</li>
                    <li>• Lingsha - No data</li>
                    <li>• Gallagher - No data</li>
                    <li>• Lynx - No data</li>
                    <li>• Natasha - No data</li>
                    <li>• Hyacine - No data</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="todo-tab" role="tabpanel">
              <div class="text-white">
                <h6 class="text-primary mb-3">Upcoming Features</h6>
                <ul class="list-unstyled">
                  <li class="mb-2">• Add "Check Prydwen Build" link</li>
                </ul>
              </div>
            </div>
            <div class="tab-pane fade" id="changelog-tab" role="tabpanel">
              <div class="text-white">
                <h6 class="text-primary mb-3">Recent Updates</h6>
                <div class="mb-3">
                  <strong class="text-warning">v1.2.0</strong> - Latest
                  <ul class="list-unstyled mt-2 ms-3">
                    <li>• Added desktop padding for better layout</li>
                    <li>• Added color legend for character recommendations</li>
                    <li>• Fixed mobile tab switching bug</li>
                    <li>• Added multiple archetype support</li>
                    <li>• Improved teammate section sorting</li>
                  </ul>
                </div>
                <div class="mb-3">
                  <strong class="text-warning">v1.1.0</strong>
                  <ul class="list-unstyled mt-2 ms-3">
                    <li>• Enhanced character tooltip system</li>
                    <li>• Improved team recommendation display</li>
                    <li>• Added archetype filtering</li>
                  </ul>
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