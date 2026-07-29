<script setup>
import { prefersReducedMotion } from '../motion.js'

/* Abstract sourcing-route network — the hero's visual backbone.
   Pure SVG: faint meridians, trade routes, pulsing nodes and
   SMIL cargo dots (skipped entirely under reduced motion). */
const animate = !prefersReducedMotion()

const routes = [
  { id: 'r1', d: 'M40 620 C 220 560, 330 470, 470 380 S 740 210, 880 150', dur: '13s', begin: '0s' },
  { id: 'r2', d: 'M120 700 C 300 640, 430 540, 560 470 S 800 340, 900 300', dur: '17s', begin: '4s' },
  { id: 'r3', d: 'M-20 480 C 160 440, 320 350, 480 260 S 720 90, 860 40', dur: '15s', begin: '8s' },
]

const nodes = [
  { x: 470, y: 380 },
  { x: 880, y: 150 },
  { x: 560, y: 470 },
  { x: 860, y: 40 },
]

/* container-grid motif on route intersections */
const squares = [
  [180, 545], [332, 468], [640, 300], [782, 200], [520, 415], [240, 610],
]
</script>

<template>
  <svg
    viewBox="0 0 900 760"
    class="h-full w-full"
    fill="none"
    aria-hidden="true"
    preserveAspectRatio="xMidYMid slice"
  >
    <!-- faint meridian arcs -->
    <g stroke="currentColor" class="text-paper/4">
      <circle cx="900" cy="380" r="330" />
      <circle cx="900" cy="380" r="500" />
      <circle cx="900" cy="380" r="670" />
    </g>

    <!-- base routes -->
    <g stroke="currentColor" class="text-paper/10" stroke-width="1">
      <path v-for="r in routes" :key="r.id" :id="r.id" :d="r.d" />
    </g>

    <!-- animated ember dashes on two routes -->
    <g v-if="animate" stroke="currentColor" class="text-ember-500/50" stroke-width="1">
      <path class="route-dash" :d="routes[0].d" />
      <path class="route-dash" :d="routes[2].d" style="animation-delay: -4.5s" />
    </g>

    <!-- container-grid squares -->
    <g class="text-paper/25" fill="currentColor">
      <rect v-for="([x, y], i) in squares" :key="i" :x="x" :y="y" width="3" height="3" />
    </g>

    <!-- nodes + pulse rings -->
    <g>
      <template v-for="(n, i) in nodes" :key="i">
        <circle :cx="n.x" :cy="n.y" r="3" class="fill-ember-500" />
        <circle
          v-if="animate"
          :cx="n.x"
          :cy="n.y"
          r="9"
          class="node-pulse stroke-ember-500/60"
          :style="{ animationDelay: `${i * 0.8}s` }"
        />
      </template>
    </g>

    <!-- cargo dots travelling the routes (SMIL, no JS) -->
    <g v-if="animate">
      <circle v-for="r in routes" :key="`dot-${r.id}`" r="2.4" class="fill-paper/80">
        <animateMotion :dur="r.dur" :begin="r.begin" repeatCount="indefinite" rotate="none">
          <mpath :href="`#${r.id}`" />
        </animateMotion>
      </circle>
    </g>
  </svg>
</template>
