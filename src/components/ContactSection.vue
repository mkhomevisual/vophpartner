<script setup>
import { ref } from 'vue'
import { t } from '../i18n.js'
import { usePointerGlow } from '../motion.js'
import UiIcon from './UiIcon.vue'

const grid = ref(null)
usePointerGlow(grid)
</script>

<template>
  <section id="contact" class="section relative overflow-hidden">
    <!-- centered ember glow -->
    <div
      class="pointer-events-none absolute top-1/2 left-1/2 size-[80vmin] -translate-x-1/2 -translate-y-1/2"
      style="background: radial-gradient(closest-side, rgb(238 95 7 / 0.1), transparent 70%)"
      aria-hidden="true"
    />

    <div class="container-site relative">
      <div class="mx-auto max-w-3xl text-center">
        <p v-reveal class="overline-label">{{ t.contact.label }}</p>
        <h2 v-reveal="90" class="text-display mt-6">
          {{ t.contact.title.slice(0, -1)
          }}<span class="text-ember-500">{{ t.contact.title.slice(-1) }}</span>
        </h2>
        <p v-reveal="180" class="text-lead mt-6">{{ t.contact.body }}</p>
      </div>

      <div ref="grid" class="mx-auto mt-14 grid max-w-4xl gap-5 md:mt-18 md:grid-cols-3">
        <a
          v-for="(card, i) in t.contact.cards"
          :key="card.label"
          v-reveal="i * 110"
          :href="card.href"
          class="card card-glow group flex flex-col items-center gap-1 p-8 text-center"
        >
          <span
            class="mb-4 grid size-12 place-items-center rounded-xl border border-paper/10 text-ember-400 transition-colors duration-300 group-hover:border-ember-500/50"
            aria-hidden="true"
          >
            <UiIcon :name="card.icon" class="size-5" />
          </span>
          <span class="text-xs font-medium tracking-[0.18em] uppercase text-paper-faint">
            {{ card.label }}
          </span>
          <span class="font-display text-lg font-semibold tracking-tight break-all">
            {{ card.value }}
          </span>
        </a>
      </div>
    </div>
  </section>
</template>
