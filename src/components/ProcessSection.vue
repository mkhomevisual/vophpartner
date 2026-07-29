<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { t } from '../i18n.js'
import { prefersReducedMotion, useSectionFlow } from '../motion.js'
import SectionHead from './SectionHead.vue'

const sectionEl = ref(null)
const stepsEl = ref(null)
const flow = useSectionFlow(stepsEl)
const activeCount = ref(prefersReducedMotion() ? 4 : 0)

/* The reading sequence plays once as this section enters the viewport.
   The route itself remains independently scroll-driven. */
let revealObserver = null
let revealTimers = []

const startSequence = () => {
  if (activeCount.value || prefersReducedMotion()) return
  revealTimers = [0, 360, 720, 1080].map((delay, index) =>
    window.setTimeout(() => {
      activeCount.value = index + 1
    }, delay),
  )
}

onMounted(() => {
  if (!sectionEl.value || prefersReducedMotion()) return
  revealObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      startSequence()
      revealObserver?.disconnect()
    },
    { threshold: 0.18, rootMargin: '0px 0px -10% 0px' },
  )
  revealObserver.observe(sectionEl.value)
})

onBeforeUnmount(() => {
  revealObserver?.disconnect()
  revealTimers.forEach((timer) => window.clearTimeout(timer))
})
</script>

<template>
  <section id="process" ref="sectionEl" class="section">
    <div class="container-site">
      <SectionHead :label="t.process.label" :title="t.process.title" />

      <div
        ref="stepsEl"
        class="relative mt-16 md:mt-24"
        :style="{ '--flow': flow }"
      >
        <!-- The route ends at the fourth node; it must never run past Partnership. -->
        <div class="process-track absolute top-1.25 hidden h-px bg-paper/10 md:block" aria-hidden="true">
          <div
            class="h-full origin-left bg-linear-to-r from-ember-600 to-ember-400"
            :style="{ transform: `scaleX(${flow})` }"
          />
          <span
            v-if="flow > 0"
            class="process-cargo"
            :style="{ left: `${Math.min(flow, 1) * 100}%` }"
          />
        </div>
        <!-- vertical route line (mobile) -->
        <div class="absolute top-1 bottom-6 left-1.25 w-px bg-paper/10 md:hidden" aria-hidden="true">
          <div
            class="w-full origin-top bg-linear-to-b from-ember-600 to-ember-400"
            :style="{ transform: `scaleY(${flow})` }"
          />
        </div>

        <ol class="grid gap-y-12 md:grid-cols-4 md:gap-x-8">
          <li
            v-for="(step, i) in t.process.steps"
            :key="step.title"
            class="process-step relative pl-10 md:pl-0 md:pt-10"
            :class="{ 'is-reached': i < activeCount }"
            :style="{ '--step-index': i }"
          >
            <!-- node dot -->
            <span
              class="absolute top-0.5 left-0 grid size-2.75 place-items-center md:top-0"
              aria-hidden="true"
            >
              <span
                class="process-node size-2.75 rounded-full border-2 transition-all duration-500"
                :class="
                  i < activeCount
                    ? 'is-active border-ember-500 bg-ember-500 shadow-[0_0_14px_2px_rgb(255_122_38/0.45)]'
                    : 'border-paper/25 bg-ink-950'
                "
              />
            </span>

            <span
              class="font-display text-sm font-semibold tracking-[0.2em] transition-colors duration-500"
              :class="i < activeCount ? 'text-ember-600' : 'text-paper-faint'"
            >
              0{{ i + 1 }}
            </span>
            <h3 class="mt-3 font-display text-xl font-semibold tracking-tight">
              {{ step.title }}
            </h3>
            <p class="mt-2.5 max-w-[16rem] text-[0.95rem] leading-relaxed text-paper-faint">
              {{ step.body }}
            </p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.process-track {
  /* Four grid columns carry three 2rem gaps. Align the route to node centres,
     not to the outer grid edge, so it stops precisely at Partnership. */
  left: 0.34375rem;
  right: calc(25% - 1.8125rem);
}

.process-cargo {
  position: absolute;
  top: 50%;
  display: block;
  width: 0.46rem;
  height: 0.46rem;
  border-radius: 999px;
  background: var(--color-ember-400);
  box-shadow: 0 0 0 4px rgb(255 122 38 / 0.12), 0 0 16px 2px rgb(255 122 38 / 0.38);
  transform: translate(-50%, -50%);
  transition: left 0.34s var(--ease-out-soft);
}

.process-cargo::after {
  position: absolute;
  inset: -0.45rem;
  border: 1px solid rgb(255 122 38 / 0.38);
  border-radius: inherit;
  content: '';
  animation: cargo-ripple 2.4s var(--ease-out-soft) infinite;
}

.process-node.is-active {
  animation: process-node-settle 0.55s var(--ease-out-soft) both;
}

.process-step {
  opacity: 0.32;
  filter: blur(2px);
  transform: translateY(16px);
  transition:
    opacity 0.72s ease,
    filter 0.72s ease,
    transform 0.78s var(--ease-out-soft);
  transition-delay: calc(var(--step-index) * 45ms);
}

.process-step.is-reached {
  opacity: 1;
  filter: none;
  transform: none;
}

@keyframes cargo-ripple {
  0%, 28% { opacity: 0; transform: scale(0.45); }
  48% { opacity: 0.75; }
  100% { opacity: 0; transform: scale(1.2); }
}

@keyframes process-node-settle {
  0% { transform: scale(0.45); }
  72% { transform: scale(1.16); }
  100% { transform: scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .process-step {
    opacity: 1;
    filter: none;
    transform: none;
    transition: none;
  }
  .process-cargo { transition: none; }
  .process-cargo::after,
  .process-node.is-active { animation: none; }
}
</style>
