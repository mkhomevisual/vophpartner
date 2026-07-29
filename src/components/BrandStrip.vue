<script setup>
import { t, BRANDS } from '../i18n.js'
import BrandPaths from './BrandPaths.vue'
</script>

<template>
  <section class="relative overflow-hidden border-y border-paper/8 bg-ink-900/50 py-18 md:py-24" :aria-label="t.brands.label">
    <BrandPaths />

    <div class="container-site relative">
      <p v-reveal class="overline-label">{{ t.brands.label }}</p>

      <ul v-reveal="120" class="mt-9 grid grid-cols-2 overflow-hidden rounded-(--radius-card) border border-paper/8 sm:grid-cols-3 lg:mt-12 lg:grid-cols-4">
        <li v-for="brand in BRANDS" :key="brand.name" class="brand-logo-cell">
          <img
            :src="brand.src"
            :alt="brand.name"
            class="brand-logo"
            loading="lazy"
            decoding="async"
          />
        </li>
      </ul>
    </div>
  </section>
</template>
