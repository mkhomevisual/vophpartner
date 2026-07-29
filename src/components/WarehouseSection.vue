<script setup>
import { t } from '../i18n.js'
import UiIcon from './UiIcon.vue'

const mapUrl = 'https://maps.app.goo.gl/fdkgs4KiFJE5J2P26'
const mapEmbedUrl = 'https://www.google.com/maps?q=50.1761487,14.6968641&z=17&output=embed'
</script>

<template>
  <section id="warehouse" class="section border-y border-paper/8 bg-ink-900/45">
    <div class="container-site">
      <div class="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5">
          <p v-reveal class="overline-label">{{ t.warehouse.label }}</p>
          <h2 v-reveal="90" class="text-h2 mt-5 text-balance">{{ t.warehouse.title }}</h2>
          <p v-reveal="180" class="text-lead mt-6 max-w-xl">{{ t.warehouse.body }}</p>

          <a
            v-reveal="260"
            :href="mapUrl"
            target="_blank"
            rel="noreferrer"
            class="btn btn-primary mt-9"
          >
            <UiIcon name="pin" class="size-4.5" />
            {{ t.warehouse.cta }}
            <UiIcon name="arrow-right" class="btn-arrow size-4.5" />
          </a>
        </div>

        <div v-reveal="140" class="warehouse-map relative overflow-hidden rounded-(--radius-card) border border-paper/10 bg-ink-850 lg:col-span-7">
          <iframe
            :src="mapEmbedUrl"
            class="absolute inset-0 h-full w-full"
            title="CS Logistics group s.r.o."
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
          />
          <div class="pointer-events-none absolute inset-x-0 top-0 h-14 bg-linear-to-b from-ink-950/16 to-transparent" aria-hidden="true" />
          <div class="pointer-events-none absolute right-4 bottom-4 rounded-full border border-paper/15 bg-ink-950/85 px-3 py-1.5 text-xs font-medium tracking-wide text-paper shadow-lg backdrop-blur-sm" aria-hidden="true">
            CS Logistics group s.r.o.
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.warehouse-map {
  min-height: 22rem;
}

@media (min-width: 64rem) {
  .warehouse-map {
    min-height: 29rem;
  }
}
</style>
