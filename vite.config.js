import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative assets let the same build work at https://user.github.io/repository/
  // and at a custom domain without changing the repository name.
  base: './',
  plugins: [vue(), tailwindcss()],
})
