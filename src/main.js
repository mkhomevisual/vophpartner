import { createApp } from 'vue'
import '@fontsource-variable/inter'
import '@fontsource-variable/space-grotesk'
import './style.css'
import App from './App.vue'
import { vReveal } from './motion.js'

createApp(App).directive('reveal', vReveal).mount('#app')
