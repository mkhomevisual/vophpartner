<script setup>
import { t, BRANDS, publicAssetPath } from '../i18n.js'
import BrandPaths from './BrandPaths.vue'
</script>

<template>
  <section id="brands" class="relative overflow-hidden border-y border-paper/8 bg-ink-900/50 py-18 md:py-24">
    <BrandPaths />

    <div class="container-site relative">
      <h2 v-reveal class="overline-label">{{ t.brands.label }}</h2>

      <ul class="mt-9 grid grid-cols-2 overflow-hidden rounded-(--radius-card) border border-paper/8 sm:grid-cols-3 lg:mt-12 lg:grid-cols-4">
        <li v-for="(brand, index) in BRANDS" :key="brand.name" v-reveal="80 + index * 55" class="brand-logo-cell">
          <img
            :src="publicAssetPath(brand.src)"
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
