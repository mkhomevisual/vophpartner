<script setup>
import { onMounted, ref } from 'vue'
import { prefersReducedMotion } from '../motion.js'

/* Decorative supply paths, inspired by the requested reference.
   They stay behind the brand grid and are omitted for reduced motion. */
// Start deterministically for SSR hydration, then respect the visitor's
// preference after mounting in the browser.
const animate = ref(true)

onMounted(() => {
  animate.value = !prefersReducedMotion()
})

const paths = [
  'M-80 640 C 150 520, 230 860, 435 620 S 690 300, 920 510 S 1190 860, 1520 570',
  'M-120 500 C 110 350, 250 690, 455 465 S 725 120, 930 350 S 1250 720, 1530 380',
  'M-100 820 C 135 610, 265 980, 485 760 S 720 440, 985 670 S 1260 980, 1550 740',
  'M-40 260 C 160 150, 310 420, 495 270 S 760 -10, 960 190 S 1280 490, 1510 230',
  'M0 980 C 210 790, 340 1090, 565 900 S 800 610, 1050 820 S 1320 1080, 1510 910',
  'M-180 370 C 100 240, 245 560, 425 375 S 730 40, 900 250 S 1230 610, 1580 300',
]
</script>

<template>
  <svg
    class="brand-paths absolute inset-0 h-full w-full"
    viewBox="0 0 1440 1120"
    fill="none"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="brand-path-gradient" x1="0" x2="1" y1="0" y2="0">
        <stop stop-color="var(--color-ember-500)" stop-opacity="0" />
        <stop offset="0.2" stop-color="var(--color-ember-500)" stop-opacity="0.55" />
        <stop offset="0.75" stop-color="var(--color-ember-400)" stop-opacity="0.42" />
        <stop offset="1" stop-color="var(--color-ember-500)" stop-opacity="0" />
      </linearGradient>
    </defs>

    <g class="brand-paths-base">
      <path v-for="(path, i) in paths" :key="`base-${i}`" :d="path" />
    </g>
    <g v-if="animate" class="brand-paths-trace">
      <path
        v-for="(path, i) in paths"
        :key="`trace-${i}`"
        :d="path"
        :style="{ '--path-delay': `${i * -2.7}s`, '--path-duration': `${15 + (i % 3) * 2.5}s` }"
      />
    </g>
  </svg>
</template>

<style scoped>
.brand-paths {
  color: var(--color-ember-500);
  opacity: 0.55;
}

.brand-paths-base path {
  stroke: currentColor;
  stroke-width: 1.1;
  opacity: 0.12;
}

.brand-paths-trace path {
  stroke: url(#brand-path-gradient);
  stroke-width: 1.8;
  stroke-dasharray: 10 16 180 920;
  stroke-dashoffset: 1120;
  animation: brand-path-flow var(--path-duration) linear var(--path-delay) infinite;
}

@keyframes brand-path-flow {
  to {
    stroke-dashoffset: -1120;
  }
}

@media (prefers-reduced-motion: reduce) {
  .brand-paths-trace path {
    animation: none;
  }
}
</style>
