<script setup>
import { t, lang } from '../i18n.js'
import { useCounter } from '../motion.js'

/* Count-up stats — values are brief-derived, not invented:
   1 contact point, 11 listed brands, 3 service pillars */
const counters = [
  useCounter(5.9, { decimals: 1 }),
  useCounter(50),
  useCounter(3468),
  useCounter(10),
]

const formatStat = (stat, value) =>
  new Intl.NumberFormat(lang.value, {
    maximumFractionDigits: stat.decimals ?? 0,
    minimumFractionDigits: stat.decimals ?? 0,
  }).format(value)
</script>

<template>
  <section id="about" class="section">
    <div class="container-site">
      <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5">
          <p v-reveal class="overline-label">{{ t.about.label }}</p>
          <h2 v-reveal="90" class="text-h2 mt-5 text-balance">{{ t.about.title }}</h2>
        </div>

        <div class="lg:col-span-7 lg:pt-1">
          <p v-reveal class="text-lead">{{ t.about.lead }}</p>
          <p v-reveal="100" class="mt-5 max-w-xl leading-relaxed text-paper-faint">
            {{ t.about.body }}
          </p>

          <dl class="mt-14 grid gap-8 border-t border-paper/10 pt-10 sm:grid-cols-2">
            <div
              v-for="(stat, i) in t.about.stats"
              :key="stat.label"
              v-reveal="i * 110"
              :ref="(el) => (counters[i].el.value = el)"
              class="flex flex-col-reverse"
            >
              <dt class="mt-3 text-sm leading-snug text-paper-faint">{{ stat.label }}</dt>
              <dd class="font-display text-5xl font-semibold tracking-tight text-paper">
                <span v-if="stat.prefix">{{ stat.prefix }}</span>{{ formatStat(stat, counters[i].display.value)
                }}<span class="text-ember-500">{{ stat.suffix }}</span>
              </dd>
            </div>
          </dl>

          <blockquote
            v-reveal="180"
            class="mt-12 border-l-2 border-ember-500 pl-6 font-display text-xl font-medium leading-snug tracking-tight text-paper md:text-2xl"
          >
            „{{ t.about.quote }}“
          </blockquote>
        </div>
      </div>
    </div>
  </section>
</template>
