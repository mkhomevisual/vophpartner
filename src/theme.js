import { ref, watch } from 'vue'

/* ============================================================
   Theme state — LIGHT is the default (client requirement).
   `.dark` on <html> restores the dark palette. The pre-paint
   snippet in index.html applies the stored choice before CSS
   renders, so there is no flash.
   ============================================================ */

const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('voph-theme') : null
export const theme = ref(stored === 'dark' ? 'dark' : 'light')

export function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

watch(
  theme,
  (value) => {
    if (typeof document === 'undefined') return
    localStorage.setItem('voph-theme', value)
    document.documentElement.classList.toggle('dark', value === 'dark')
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', value === 'dark' ? '#0a0908' : '#f6f3ee')
  },
  { immediate: true },
)
