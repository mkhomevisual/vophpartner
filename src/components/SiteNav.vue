<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { t, lang, setLang, LANGUAGES } from '../i18n.js'
import { useScrollProgress } from '../motion.js'
import BrandMark from './BrandMark.vue'
import UiIcon from './UiIcon.vue'

const scrolled = ref(false)
const menuOpen = ref(false)
const activeId = ref('')
const progress = useScrollProgress()

let sectionObserver = null

const onScroll = () => {
  scrolled.value = window.scrollY > 24
}

const closeMenu = () => {
  menuOpen.value = false
}

const onKeydown = (e) => {
  if (e.key === 'Escape') closeMenu()
}

watch(menuOpen, (open) => {
  document.documentElement.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)

  // Scrollspy — highlight the section currently in view
  sectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) activeId.value = entry.target.id
      }
    },
    { rootMargin: '-35% 0px -55% 0px' },
  )
  document.querySelectorAll('main section[id]').forEach((s) => sectionObserver.observe(s))
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  sectionObserver?.disconnect()
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300"
    :class="
      scrolled || menuOpen
        ? 'border-b border-paper/8 bg-ink-950/85 backdrop-blur-md'
        : 'border-b border-transparent'
    "
  >
    <nav class="container-site flex h-18 items-center justify-between gap-6">
      <BrandMark />

      <!-- Desktop links -->
      <ul class="hidden items-center gap-8 lg:flex">
        <li v-for="link in t.nav.links" :key="link.id">
          <a
            :href="`#${link.id}`"
            class="group relative py-2 text-[0.92rem] font-medium transition-colors duration-250"
            :class="activeId === link.id ? 'text-paper' : 'text-paper-dim hover:text-paper'"
            :aria-current="activeId === link.id ? 'true' : undefined"
          >
            {{ link.label }}
            <span
              class="absolute inset-x-0 -bottom-0.5 h-px origin-left bg-ember-500 transition-transform duration-300"
              :class="activeId === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'"
              aria-hidden="true"
            />
          </a>
        </li>
      </ul>

      <div class="flex items-center gap-3.5">
        <!-- Language selector — compact enough for all seven localizations -->
        <label class="relative block" :aria-label="t.a11y.langLabel">
          <select
            class="appearance-none rounded-full border border-paper/12 bg-ink-950 py-2 pr-8 pl-3 font-display text-[0.72rem] font-semibold tracking-widest uppercase text-paper outline-none transition-colors duration-250 hover:border-paper/30"
            :value="lang"
            :aria-label="t.a11y.langLabel"
            @change="setLang($event.target.value)"
          >
            <option v-for="language in LANGUAGES" :key="language.code" :value="language.code">
              {{ language.short }}
            </option>
          </select>
          <UiIcon name="chevron-down" class="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-paper-faint" />
        </label>

        <a href="#contact" class="btn btn-primary hidden px-5! py-2.5! md:inline-flex">
          {{ t.nav.cta }}
        </a>

        <!-- Mobile menu button -->
        <button
          type="button"
          class="grid size-10 place-items-center rounded-full border border-paper/12 text-paper lg:hidden"
          :aria-label="menuOpen ? t.a11y.menuClose : t.a11y.menuOpen"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          @click="menuOpen = !menuOpen"
        >
          <svg viewBox="0 0 24 24" class="size-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
            <g v-if="!menuOpen">
              <path d="M4 8h16" />
              <path d="M4 16h16" />
            </g>
            <g v-else>
              <path d="m6 6 12 12" />
              <path d="m18 6-12 12" />
            </g>
          </svg>
        </button>
      </div>
    </nav>

    <!-- Scroll progress hairline -->
    <div
      class="absolute inset-x-0 bottom-0 h-px origin-left bg-ember-500/80"
      :style="{ transform: `scaleX(${progress})` }"
      aria-hidden="true"
    />

    <!-- Mobile overlay (teleported: header's backdrop-filter would
         otherwise become its containing block and collapse it) -->
    <Teleport to="body">
      <Transition name="menu">
        <div
          v-if="menuOpen"
          id="mobile-menu"
          class="fixed inset-x-0 top-18 bottom-0 z-40 flex flex-col overflow-y-auto bg-ink-950/97 backdrop-blur-xl lg:hidden"
        >
          <ul class="container-site flex flex-1 flex-col justify-center gap-2 py-10">
            <li v-for="(link, i) in t.nav.links" :key="link.id" :style="{ '--i': i }" class="menu-item">
              <a
                :href="`#${link.id}`"
                class="group flex items-baseline gap-4 border-b border-paper/8 py-4 font-display text-3xl font-semibold tracking-tight text-paper transition-colors hover:text-ember-400"
                @click="closeMenu"
              >
                <span class="text-sm font-normal text-paper-faint tabular-nums">0{{ i + 1 }}</span>
                {{ link.label }}
              </a>
            </li>
            <li class="menu-item pt-8" :style="{ '--i': t.nav.links.length }">
              <a href="#contact" class="btn btn-primary w-full" @click="closeMenu">
                {{ t.nav.cta }}
                <svg viewBox="0 0 24 24" class="btn-arrow size-4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M4.5 12h14" />
                  <path d="m13 6.5 5.5 5.5-5.5 5.5" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<style scoped>
.menu-enter-active {
  transition: opacity 0.3s ease;
}
.menu-leave-active {
  transition: opacity 0.2s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}

.menu-enter-active .menu-item {
  animation: menu-item-in 0.5s var(--ease-out-soft) both;
  animation-delay: calc(var(--i) * 55ms);
}
@keyframes menu-item-in {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .menu-enter-active .menu-item {
    animation: none;
  }
}
</style>
