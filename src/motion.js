import { ref, onMounted, onBeforeUnmount } from 'vue'

/* ============================================================
   VOPH Partners — motion utilities
   Rules (voph-motion-interactions / voph-performance):
   - transform + opacity only
   - one shared IntersectionObserver
   - everything respects prefers-reduced-motion
   ============================================================ */

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const finePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

/* ------------------------------------------------------------
   v-reveal — scroll reveal directive
   Usage: v-reveal            (default)
          v-reveal="120"      (transition-delay in ms, for stagger)
   ------------------------------------------------------------ */

let io = null

function observer() {
  if (io) return io
  io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in')
          io.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  )
  return io
}

export const vReveal = {
  mounted(el, binding) {
    if (prefersReducedMotion()) return
    el.classList.add('reveal')
    if (typeof binding.value === 'number' && binding.value > 0) {
      el.style.setProperty('--reveal-delay', `${binding.value}ms`)
    }
    observer().observe(el)
  },
  unmounted(el) {
    io?.unobserve(el)
  },
}

/* ------------------------------------------------------------
   useCounter — count-up number when element enters the viewport
   ------------------------------------------------------------ */

export function useCounter(target, { duration = 1100, decimals = 0 } = {}) {
  const display = ref(0)
  const el = ref(null)

  onMounted(() => {
    if (!el.value || prefersReducedMotion()) {
      display.value = target
      return
    }
    const watcher = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        watcher.disconnect()
        const start = performance.now()
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          const factor = 10 ** decimals
          display.value = Math.round(eased * target * factor) / factor
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    watcher.observe(el.value)
    onBeforeUnmount(() => watcher.disconnect())
  })

  return { display, el }
}

/* ------------------------------------------------------------
   pointerGlow — feeds --mx/--my to .card-glow backgrounds
   Attach to a parent; works for all .card-glow children.
   ------------------------------------------------------------ */

export function usePointerGlow(containerRef) {
  const onMove = (e) => {
    const card = e.target.closest('.card-glow')
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    card.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  onMounted(() => {
    if (!finePointer() || !containerRef.value) return
    containerRef.value.addEventListener('pointermove', onMove, { passive: true })
  })
  onBeforeUnmount(() => {
    containerRef.value?.removeEventListener('pointermove', onMove)
  })
}

/* ------------------------------------------------------------
   useMagnetic — restrained magnetic pull on a CTA (max ~5px)
   ------------------------------------------------------------ */

export function useMagnetic(strength = 0.18, max = 5) {
  const el = ref(null)

  onMounted(() => {
    const node = el.value
    if (!node || !finePointer() || prefersReducedMotion()) return

    const clamp = (v) => Math.max(-max, Math.min(max, v))
    const onMove = (e) => {
      const rect = node.getBoundingClientRect()
      const dx = e.clientX - (rect.left + rect.width / 2)
      const dy = e.clientY - (rect.top + rect.height / 2)
      node.style.transform = `translate(${clamp(dx * strength)}px, ${clamp(dy * strength)}px)`
    }
    const onLeave = () => {
      node.style.transform = ''
    }

    node.addEventListener('pointermove', onMove, { passive: true })
    node.addEventListener('pointerleave', onLeave, { passive: true })
    onBeforeUnmount(() => {
      node.removeEventListener('pointermove', onMove)
      node.removeEventListener('pointerleave', onLeave)
    })
  })

  return el
}

/* ------------------------------------------------------------
   useScrollProgress — 0..1 page scroll fraction (rAF-throttled)
   ------------------------------------------------------------ */

export function useScrollProgress() {
  const progress = ref(0)
  let ticking = false

  const measure = () => {
    const doc = document.documentElement
    const total = doc.scrollHeight - doc.clientHeight
    progress.value = total > 0 ? Math.min(doc.scrollTop / total, 1) : 0
    ticking = false
  }
  const onScroll = () => {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(measure)
    }
  }

  onMounted(() => {
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
  })
  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

  return progress
}

/* ------------------------------------------------------------
   useSectionFlow — 0..1 progress of a section moving through
   the viewport; drives the process-line draw on scroll.
   ------------------------------------------------------------ */

export function useSectionFlow(sectionRef) {
  const flow = ref(0)
  let ticking = false

  const measure = () => {
    const node = sectionRef.value
    if (node) {
      const rect = node.getBoundingClientRect()
      const vh = window.innerHeight
      // Starts when the section top reaches 85% of the viewport. The route
      // finishes as the timeline reaches the visual centre of the viewport.
      const travel = Math.max(rect.height * 0.54, vh * 0.3)
      const raw = (vh * 0.85 - rect.top) / travel
      flow.value = Math.max(0, Math.min(1, raw))
    }
    ticking = false
  }
  const onScroll = () => {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(measure)
    }
  }

  onMounted(() => {
    if (prefersReducedMotion()) {
      flow.value = 1
      return
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
  })
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  })

  return flow
}
