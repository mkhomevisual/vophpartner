<script setup>
import { t } from '../i18n.js'
import { useMagnetic } from '../motion.js'
import RouteField from './RouteField.vue'
import UiIcon from './UiIcon.vue'

const magnetic = useMagnetic()
</script>

<template>
  <section id="top" class="relative flex min-h-svh items-center overflow-hidden pt-18">
    <!-- route network -->
    <div
      class="pointer-events-none absolute inset-y-0 right-0 w-full opacity-60 md:w-[68%] md:opacity-100"
      aria-hidden="true"
    >
      <RouteField />
      <!-- readability fade over the routes -->
      <div class="absolute inset-0 bg-linear-to-r from-ink-950 via-ink-950/35 to-transparent" />
    </div>

    <!-- ambient light (above the fade so its edge never shows as a seam) -->
    <div
      class="ambient pointer-events-none absolute top-[-28%] left-[-18%] size-[70vmax]"
      style="background: radial-gradient(closest-side, rgb(238 95 7 / 0.13), transparent 70%)"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute right-[-20%] bottom-[-35%] size-[60vmax]"
      style="background: radial-gradient(closest-side, rgb(247 245 241 / 0.04), transparent 70%)"
      aria-hidden="true"
    />

    <!-- bottom fade -->
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-ink-950"
      aria-hidden="true"
    />

    <div class="container-site relative py-24 md:py-32">
      <p
        class="mb-8 inline-flex items-center gap-2.5 rounded-full border border-paper/12 bg-ink-900/60 px-4 py-2 font-display text-[0.78rem] font-medium tracking-[0.18em] uppercase text-paper-dim opacity-0"
        style="animation: fade-in 0.8s ease 0.15s forwards"
      >
        <span class="relative flex size-2" aria-hidden="true">
          <span class="absolute inline-flex h-full w-full rounded-full bg-ember-500 opacity-60 node-pulse" />
          <span class="relative inline-flex size-2 rounded-full bg-ember-500" />
        </span>
        {{ t.hero.badge }}
      </p>

      <h1 class="text-display max-w-4xl">
        <span
          v-for="(line, i) in t.hero.titleLines"
          :key="line"
          class="line-mask"
        >
          <span :style="{ '--rise-delay': `${120 + i * 130}ms` }">
            {{ line }}<template v-if="i === t.hero.titleLines.length - 1"><span class="text-ember-500">.</span></template>
          </span>
        </span>
      </h1>

      <p
        class="text-lead mt-7 max-w-xl font-medium text-paper opacity-0"
        style="animation: fade-in 0.9s ease 0.55s forwards"
      >
        {{ t.hero.sub }}
      </p>
      <p
        class="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-paper-dim opacity-0"
        style="animation: fade-in 0.9s ease 0.7s forwards"
      >
        {{ t.hero.support }}
      </p>

      <div
        class="mt-10 flex flex-wrap items-center gap-4 opacity-0"
        style="animation: fade-in 0.9s ease 0.85s forwards"
      >
        <a ref="magnetic" href="#contact" class="btn btn-primary">
          {{ t.hero.ctaPrimary }}
          <UiIcon name="arrow-right" class="btn-arrow size-4.5" />
        </a>
        <a href="#about" class="btn btn-ghost">{{ t.hero.ctaSecondary }}</a>
      </div>

      <ul
        class="mt-16 flex max-w-2xl flex-wrap gap-x-8 gap-y-3 border-t border-paper/10 pt-6 opacity-0"
        style="animation: fade-in 1s ease 1.05s forwards"
      >
        <li
          v-for="chip in t.hero.chips"
          :key="chip"
          class="flex items-center gap-2.5 text-[0.92rem] text-paper-dim"
        >
          <span class="size-1.5 flex-none bg-ember-500" aria-hidden="true" />
          {{ chip }}
        </li>
      </ul>
    </div>

    <!-- scroll cue: dot travelling down a hairline, like cargo on a route -->
    <a
      href="#about"
      class="group absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      :aria-label="t.hero.scroll"
    >
      <span class="scroll-line relative block h-12 w-px overflow-hidden bg-paper/15" aria-hidden="true">
        <span class="scroll-dot absolute left-1/2 size-1 -translate-x-1/2 rounded-full bg-ember-500" />
      </span>
    </a>
  </section>
</template>

<style scoped>
.scroll-dot {
  animation: scroll-travel 2.6s var(--ease-out-soft) infinite;
}
@keyframes scroll-travel {
  0% {
    transform: translate(-50%, -6px);
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  100% {
    transform: translate(-50%, 50px);
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .scroll-dot {
    animation: none;
    top: 50%;
  }
}
</style>
