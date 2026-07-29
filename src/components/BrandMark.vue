<script setup>
import { t } from '../i18n.js'
</script>

<template>
  <a href="#top" class="group inline-flex items-center gap-3" :aria-label="t.a11y.home">
    <span
      class="grid size-8 flex-none place-items-center rounded-lg bg-ember-500 transition-colors duration-300 group-hover:bg-ember-400"
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" class="size-4.5" fill="none" stroke="#0a0908" stroke-width="3">
        <path d="M5.5 5.5 12 19l6.5-13.5" />
      </svg>
    </span>
    <span class="font-display text-lg font-semibold tracking-tight text-paper">
      VOPH<span class="ml-2 hidden font-normal tracking-[0.18em] text-paper-faint text-[0.72em] uppercase min-[26rem]:inline">Partners</span>
    </span>
  </a>
</template>
