<script setup>
import { t } from './i18n.js'
import SiteNav from './components/SiteNav.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import WhySection from './components/WhySection.vue'
import BrandStrip from './components/BrandStrip.vue'
import ProcessSection from './components/ProcessSection.vue'
import LogisticsSection from './components/LogisticsSection.vue'
import WarehouseSection from './components/WarehouseSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <a
    href="#main"
    class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-full focus:bg-ember-500 focus:px-5 focus:py-2.5 focus:font-medium focus:text-ink-950"
  >
    {{ t.a11y.skip }}
  </a>

  <SiteNav />

  <main id="main">
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <WhySection />
    <BrandStrip />
    <ProcessSection />
    <LogisticsSection />
    <WarehouseSection />
    <ContactSection />
  </main>

  <SiteFooter />
</template>
