import { createSSRApp } from 'vue'
import App from './App.vue'
import { setLocale } from './i18n.js'
import { vReveal } from './motion.js'

export function createApp(locale) {
  setLocale(locale)
  return createSSRApp(App).directive('reveal', vReveal)
}
