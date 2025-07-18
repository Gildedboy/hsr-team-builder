// Import CSS files (these will be processed by Vite and split automatically)
import './assets/main.css'
import './assets/components.css'

// Import Bootstrap - will be in the vendor-css chunk
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

// Font loading optimization
document.fonts.ready.then(() => {
  document.documentElement.classList.add('fonts-loaded');
});

// Register Service Worker for caching
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration.scope)
        
        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('New service worker installed, ready to update');
              }
            });
          }
        });
      })
      .catch((error) => {
        console.warn('Service Worker registration failed:', error)
      })
  })
}
