<script setup>
/* Geometric stroke icon set — consistent 1.5px stroke (voph-asset-direction) */
const icons = {
  boxes:
    '<rect x="3.5" y="13" width="7" height="7"/><rect x="13.5" y="13" width="7" height="7"/><rect x="8.5" y="4" width="7" height="7"/>',
  globe:
    '<circle cx="12" cy="12" r="8.5"/><ellipse cx="12" cy="12" rx="3.8" ry="8.5"/><path d="M3.5 12h17"/>',
  exchange:
    '<path d="M4 8h14"/><path d="m14.5 4.5 3.5 3.5-3.5 3.5"/><path d="M20 16H6"/><path d="m9.5 12.5-3.5 3.5 3.5 3.5"/>',
  tag: '<path d="M12.7 3.5h7.8v7.8l-9.2 9.2a1.6 1.6 0 0 1-2.3 0l-5.5-5.5a1.6 1.6 0 0 1 0-2.3l9.2-9.2Z"/><circle cx="16.4" cy="7.6" r="1.3"/>',
  bolt: '<path d="M13 3 5.5 13.5h5L9.5 21 18 10.5h-5L13 3Z"/>',
  check: '<circle cx="12" cy="12" r="8.5"/><path d="m8.5 12.3 2.4 2.4 4.8-5.2"/>',
  link: '<path d="M10.2 13.8a4.2 4.2 0 0 0 6 .4l2.6-2.6a4.2 4.2 0 0 0-5.9-5.9l-1.5 1.5"/><path d="M13.8 10.2a4.2 4.2 0 0 0-6-.4l-2.6 2.6a4.2 4.2 0 0 0 5.9 5.9l1.5-1.5"/>',
  layers:
    '<path d="m12 3.5 8.5 4.7L12 12.9 3.5 8.2 12 3.5Z"/><path d="m3.5 12.6 8.5 4.7 8.5-4.7"/><path d="m3.5 16.9 8.5 4.7 8.5-4.7"/>',
  phone:
    '<path d="M8.7 4.2c.5 1.3.9 2.3 1.4 3.4.2.4.1.8-.2 1.1l-1.6 1.5a13.7 13.7 0 0 0 5.5 5.5l1.5-1.6c.3-.3.7-.4 1.1-.2 1.1.5 2.1.9 3.4 1.4.4.2.7.6.7 1v2.2a2 2 0 0 1-2.2 2A16.4 16.4 0 0 1 3.5 5.7a2 2 0 0 1 2-2.2h2.2c.4 0 .8.3 1 .7Z"/>',
  mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m3.8 7.5 8.2 5.8 8.2-5.8"/>',
  calendar:
    '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10.2h17"/><path d="M8 3v3.5"/><path d="M16 3v3.5"/>',
  'arrow-right': '<path d="M4.5 12h14"/><path d="m13 6.5 5.5 5.5-5.5 5.5"/>',
  'arrow-down': '<path d="M12 4.5v14"/><path d="m6.5 13 5.5 5.5L17.5 13"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.8v2.4"/><path d="M12 18.8v2.4"/><path d="M2.8 12h2.4"/><path d="M18.8 12h2.4"/><path d="m5.5 5.5 1.7 1.7"/><path d="m16.8 16.8 1.7 1.7"/><path d="m18.5 5.5-1.7 1.7"/><path d="m7.2 16.8-1.7 1.7"/>',
  moon: '<path d="M20 13.6A8 8 0 0 1 10.4 4a7.7 7.7 0 1 0 9.6 9.6Z"/>',
  'chevron-down': '<path d="m7 10 5 5 5-5"/>',
  pin: '<path d="M19 10.4c0 4.7-7 10.1-7 10.1s-7-5.4-7-10.1a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10.4" r="2.3"/>',
}

const props = defineProps({
  name: { type: String, required: true },
})
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    v-html="icons[props.name]"
  />
</template>
