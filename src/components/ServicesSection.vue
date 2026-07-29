<script setup>
import { t } from '../i18n.js'
import UiIcon from './UiIcon.vue'
</script>

<template>
  <section id="services" class="services-section relative overflow-hidden">
    <div class="services-ambient pointer-events-none absolute inset-0" aria-hidden="true" />

    <div class="container-site relative py-24 md:py-32 lg:py-40">
      <div class="max-w-2xl">
        <p v-reveal class="services-label">{{ t.services.label }}</p>
        <h2 v-reveal="90" class="text-h2 mt-5 text-white text-balance">{{ t.services.title }}</h2>
      </div>

      <div class="mt-14 grid gap-5 md:mt-18 md:grid-cols-3">
        <article
          v-for="(item, i) in t.services.items"
          :key="item.num"
          v-reveal="i * 120"
          class="service-card flex min-h-[22rem] flex-col p-8 md:min-h-[24rem] md:p-10"
        >
          <div class="flex items-start justify-between gap-5">
            <span class="font-display text-sm font-medium tracking-[0.2em] text-[#716a62]">
              {{ item.num }}
            </span>
            <span class="grid size-11 place-items-center rounded-xl bg-ember-500 text-[#0a0908]" aria-hidden="true">
              <UiIcon :name="item.icon" class="size-5" />
            </span>
          </div>

          <div class="mt-auto pt-16">
            <h3 class="text-h3 text-[#16130f]">{{ item.title }}</h3>
            <p class="mt-4 text-[0.98rem] leading-relaxed text-[#6e675e]">{{ item.body }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-section {
  background: linear-gradient(125deg, var(--color-ember-600), var(--color-ember-500) 42%, var(--color-ember-400) 72%, var(--color-ember-500));
  background-size: 170% 170%;
  animation: services-gradient 22s ease-in-out infinite alternate;
}

.services-ambient {
  background:
    radial-gradient(circle at 12% 16%, rgb(255 214 183 / 0.24), transparent 29%),
    radial-gradient(circle at 91% 86%, rgb(179 74 0 / 0.25), transparent 35%);
  animation: services-ambient-shift 18s ease-in-out infinite alternate;
}

.services-label {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  color: rgb(255 255 255 / 0.82);
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.services-label::before {
  width: 0.6rem;
  height: 0.6rem;
  flex: none;
  background: white;
  content: '';
}

.service-card {
  position: relative;
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 0.72);
  border-radius: var(--radius-card);
  background: rgb(255 255 255 / 0.98);
  box-shadow: 0 20px 44px -30px rgb(100 37 0 / 0.38);
  transition: transform 0.45s var(--ease-out-soft), box-shadow 0.35s ease;
}

.service-card:hover {
  box-shadow: 0 28px 54px -30px rgb(100 37 0 / 0.48);
  transform: translateY(-4px);
}

@keyframes services-gradient {
  from { background-position: 0% 48%; }
  to { background-position: 100% 52%; }
}

@keyframes services-ambient-shift {
  from { transform: translate3d(-1.5%, -1%, 0) scale(1); }
  to { transform: translate3d(1.5%, 1%, 0) scale(1.035); }
}

@media (prefers-reduced-motion: reduce) {
  .services-section,
  .services-ambient {
    animation: none;
  }
  .service-card:hover {
    transform: none;
  }
}
</style>
