<script setup>
import { t } from '../i18n.js'
import BrandMark from './BrandMark.vue'

const year = new Date().getFullYear()
const warehouseMapUrl = 'https://maps.app.goo.gl/fdkgs4KiFJE5J2P26'
</script>

<template>
  <footer class="border-t border-paper/8 bg-ink-950">
    <div class="container-site pt-16 pb-10">
      <div class="grid gap-12 md:grid-cols-12">
        <div class="md:col-span-6">
          <BrandMark />
          <p class="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-paper-faint">
            {{ t.footer.tagline }}
          </p>
        </div>

        <nav class="md:col-span-3" :aria-label="t.footer.navLabel">
          <p class="text-xs font-medium tracking-[0.18em] uppercase text-paper-faint">
            {{ t.footer.navLabel }}
          </p>
          <ul class="mt-4 space-y-2.5">
            <li v-for="link in t.nav.links" :key="link.id">
              <a
                :href="`#${link.id}`"
                class="text-[0.95rem] text-paper-dim transition-colors duration-250 hover:text-paper"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </nav>

        <div class="md:col-span-3">
          <p class="text-xs font-medium tracking-[0.18em] uppercase text-paper-faint">
            {{ t.footer.contactLabel }}
          </p>
          <ul class="mt-4 space-y-2.5 text-[0.95rem] text-paper-dim">
            <li v-for="card in t.contact.cards" :key="card.label">
              <a :href="card.href" class="break-all transition-colors duration-250 hover:text-paper">
                {{ card.value }}
              </a>
            </li>
            <li class="pt-2">
              <a
                :href="warehouseMapUrl"
                target="_blank"
                rel="noreferrer"
                class="text-paper-faint transition-colors duration-250 hover:text-paper"
              >
                {{ t.warehouse.label }} — CS Logistics group s.r.o.
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-14 flex flex-col gap-3 border-t border-paper/8 pt-7 text-sm text-paper-faint sm:flex-row sm:items-center sm:justify-between"
      >
        <p>© {{ year }} VOPH Partners. {{ t.footer.rights }}</p>
        <p class="font-display text-xs font-medium tracking-[0.22em] uppercase">
          FMCG trading <span class="text-ember-500">&</span> sourcing
        </p>
      </div>
    </div>
  </footer>
</template>
