<script setup>
defineProps({
  label: { type: String, required: true },
  title: { type: String, required: true },
  lead: { type: String, default: '' },
})
</script>

<template>
  <div class="max-w-2xl">
    <p v-reveal class="overline-label">{{ label }}</p>
    <h2 v-reveal="90" class="text-h2 mt-5 text-balance">{{ title }}</h2>
    <p v-if="lead" v-reveal="180" class="text-lead mt-6">{{ lead }}</p>
  </div>
</template>
