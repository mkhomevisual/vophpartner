<script setup>
import { onMounted, ref } from 'vue'
import { t } from '../i18n.js'
import { prefersReducedMotion } from '../motion.js'

/* Supply-flow diagram: Brands → VOPH Partners → Markets.
   Desktop: SVG connector layer + SMIL cargo dots in a fixed-ratio
   canvas so everything scales uniformly. Mobile: vertical stack. */
const animate = ref(true)

onMounted(() => {
  animate.value = !prefersReducedMotion()
})

const lanes = [
  { id: 'lane-in', d: 'M150 150 H 250', dur: '3.2s', begin: '0s' },
  { id: 'lane-out', d: 'M350 150 H 450', dur: '3.2s', begin: '1.6s' },
]
</script>

<template>
  <section class="border-y border-paper/8 bg-ink-900/60">
    <div class="container-site section">
      <div class="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <!-- copy -->
        <div class="lg:col-span-5">
          <p v-reveal class="overline-label">{{ t.logistics.label }}</p>
          <h2 v-reveal="90" class="text-h2 mt-5 text-balance">{{ t.logistics.title }}</h2>
          <p v-reveal="180" class="text-lead mt-6">{{ t.logistics.body }}</p>

          <ul v-reveal="260" class="mt-9 flex flex-wrap gap-3">
            <li
              v-for="chip in t.logistics.chips"
              :key="chip"
              class="flex items-center gap-2.5 rounded-full border border-paper/12 px-4 py-2 text-[0.88rem] text-paper-dim"
            >
              <span class="size-1.5 flex-none bg-ember-500" aria-hidden="true" />
              {{ chip }}
            </li>
          </ul>
        </div>

        <!-- diagram: desktop -->
        <div v-reveal="200" class="hidden md:block lg:col-span-7">
          <div class="relative mx-auto aspect-[2/1] max-w-2xl" role="img" :aria-label="`${t.logistics.diagram.left.title} → ${t.logistics.diagram.hub.title} → ${t.logistics.diagram.right.title}`">
            <!-- connector layer -->
            <svg viewBox="0 0 600 300" class="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
              <!-- decorative network fan -->
              <g stroke="currentColor" class="text-paper/7">
                <path d="M100 150 C 40 100, 30 60, 10 30" />
                <path d="M100 150 C 45 195, 30 240, 15 275" />
                <path d="M500 150 C 560 105, 575 65, 590 30" />
                <path d="M500 150 C 558 192, 572 235, 588 272" />
              </g>

              <!-- main lanes -->
              <g stroke="currentColor" class="text-paper/15">
                <path v-for="lane in lanes" :key="lane.id" :id="lane.id" :d="lane.d" />
              </g>
              <g v-if="animate" stroke="currentColor" class="text-ember-500/60">
                <path class="route-dash" d="M150 150 H 250" />
                <path class="route-dash" d="M350 150 H 450" style="animation-delay: -4.5s" />
              </g>

              <!-- hub pulse -->
              <g v-if="animate">
                <circle cx="300" cy="150" r="16" class="node-pulse stroke-ember-500/50" />
              </g>

              <!-- cargo dots -->
              <g v-if="animate">
                <circle v-for="lane in lanes" :key="`dot-${lane.id}`" r="3" class="fill-ember-400">
                  <animateMotion :dur="lane.dur" :begin="lane.begin" repeatCount="indefinite" rotate="none">
                    <mpath :href="`#${lane.id}`" />
                  </animateMotion>
                </circle>
              </g>
            </svg>

            <!-- endpoint: brands -->
            <div class="absolute top-1/2 left-0 w-[27%] -translate-y-1/2">
              <div class="rounded-2xl border border-paper/12 bg-ink-850 p-5 text-center">
                <p class="font-display text-base font-semibold">{{ t.logistics.diagram.left.title }}</p>
                <p class="mt-1 text-xs leading-snug text-paper-faint">{{ t.logistics.diagram.left.sub }}</p>
              </div>
            </div>

            <!-- hub: VOPH -->
            <div class="absolute top-1/2 left-1/2 w-[30%] -translate-x-1/2 -translate-y-1/2">
              <div
                class="rounded-2xl border border-ember-500/45 bg-ink-850 p-6 text-center shadow-[0_0_50px_-10px_rgb(255_122_38/0.35)]"
              >
                <span class="mx-auto mb-3 grid size-9 place-items-center rounded-lg bg-ember-500" aria-hidden="true">
                  <svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="#0a0908" stroke-width="3">
                    <path d="M5.5 5.5 12 19l6.5-13.5" />
                  </svg>
                </span>
                <p class="font-display text-base font-semibold">{{ t.logistics.diagram.hub.title }}</p>
                <p class="mt-1 text-xs leading-snug text-paper-faint">{{ t.logistics.diagram.hub.sub }}</p>
              </div>
            </div>

            <!-- endpoint: markets -->
            <div class="absolute top-1/2 right-0 w-[27%] -translate-y-1/2">
              <div class="rounded-2xl border border-paper/12 bg-ink-850 p-5 text-center">
                <p class="font-display text-base font-semibold">{{ t.logistics.diagram.right.title }}</p>
                <p class="mt-1 text-xs leading-snug text-paper-faint">{{ t.logistics.diagram.right.sub }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- diagram: mobile (vertical) -->
        <div v-reveal="200" class="md:hidden">
          <div class="mx-auto flex max-w-xs flex-col items-center">
            <div class="w-full rounded-2xl border border-paper/12 bg-ink-850 p-5 text-center">
              <p class="font-display font-semibold">{{ t.logistics.diagram.left.title }}</p>
              <p class="mt-1 text-xs text-paper-faint">{{ t.logistics.diagram.left.sub }}</p>
            </div>
            <div class="h-10 w-px border-l border-dashed border-ember-500/50" aria-hidden="true" />
            <div
              class="w-full rounded-2xl border border-ember-500/45 bg-ink-850 p-6 text-center shadow-[0_0_40px_-10px_rgb(255_122_38/0.3)]"
            >
              <p class="font-display font-semibold">{{ t.logistics.diagram.hub.title }}</p>
              <p class="mt-1 text-xs text-paper-faint">{{ t.logistics.diagram.hub.sub }}</p>
            </div>
            <div class="h-10 w-px border-l border-dashed border-ember-500/50" aria-hidden="true" />
            <div class="w-full rounded-2xl border border-paper/12 bg-ink-850 p-5 text-center">
              <p class="font-display font-semibold">{{ t.logistics.diagram.right.title }}</p>
              <p class="mt-1 text-xs text-paper-faint">{{ t.logistics.diagram.right.sub }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
