<script setup>
import { t } from '../i18n.js'
import SectionHead from './SectionHead.vue'
import UiIcon from './UiIcon.vue'
</script>

<template>
  <section id="why" class="section">
    <div class="container-site">
      <SectionHead :label="t.why.label" :title="t.why.title" />

      <ul class="mt-14 grid gap-x-10 md:mt-18 md:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="(item, i) in t.why.items"
          :key="item.title"
          v-reveal="(i % 3) * 100"
          class="group border-t border-paper/10 py-8"
        >
          <span
            class="grid size-10 place-items-center rounded-lg bg-ember-500 text-white shadow-[0_10px_20px_rgb(232_103_25_/_0.18)] transition duration-300 group-hover:-translate-y-0.5 group-hover:bg-ember-600"
            aria-hidden="true"
          >
            <UiIcon :name="item.icon" class="size-4.5" />
          </span>
          <h3 class="mt-5 font-display text-lg font-semibold tracking-tight">{{ item.title }}</h3>
          <p class="mt-2 text-[0.95rem] leading-relaxed text-paper-faint">{{ item.body }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
