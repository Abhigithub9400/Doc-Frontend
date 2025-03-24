<template>
  <div class="h-full flex justify-center items-center">
    <Button
      variant="outlined"
      pt:root:class="h-full w-auto aspect-square flex justify-center items-center !bg-surfacePage rounded-lg border border-solid border-borderPrimary100 !px-2 !py-2"
    >
      <Icon
        name="icon:filter"
        :customize="customize"
        width="1.25rem"
        height="1.25rem"
      />
    </Button>
    <!-- Popover shall be included here after the UI design is finalized -->
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';

const customize = (content: string, name: string, prefix: string) => {
  if (prefix !== 'icon') return content;

  return content
    .replace(/stroke-width="[^"]*"/g, `stroke-width="2"`)
    .replace(/fill="[^"]*"/g, `fill="var(--neutral-400)"`)
    .replace(/animation-duration="[^"]*"/g, `animation-duration="1s"`);
};
</script>
