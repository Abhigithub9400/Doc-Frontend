<template>
  <div>
    <OverlayBadge v-if="value > 0" :severity="severity">
      <Icon
        name="icon:notification"
        width="24px"
        height="24px"
        :customize="customize"
      />
    </OverlayBadge>
    <Icon
      v-else
      name="icon:notification"
      width="24px"
      height="24px"
      :customize="customize"
    />
  </div>
</template>
<script setup lang="ts">
import OverlayBadge from 'primevue/overlaybadge';

defineProps({
  value: {
    type: Number,
    required: false,
    default: 0,
  },
  severity: {
    type: String,
    required: false,
    default: 'danger',
  },
});

const customize = (content: string, name: string, prefix: string) => {
  if (prefix !== 'icon') return content;

  return content
    .replace(/stroke-width="[^"]*"/g, `stroke-width="2"`)
    .replace(/fill="[^"]*"/g, `fill="var(--neutral-400)"`)
    .replace(/animation-duration="[^"]*"/g, `animation-duration="1s"`);
};
</script>
