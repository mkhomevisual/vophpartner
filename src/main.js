import { createApp, createSSRApp } from 'vue'
import '@fontsource-variable/inter'
import '@fontsource-variable/space-grotesk'
import './style.css'
import App from './App.vue'
import { vReveal } from './motion.js'

if (typeof window !== 'undefined') {
  localStorage.removeItem('voph-theme')
  document.documentElement.classList.remove('dark')
}

const app = import.meta.env.DEV ? createApp(App) : createSSRApp(App)

app.directive('reveal', vReveal).mount('#app')
