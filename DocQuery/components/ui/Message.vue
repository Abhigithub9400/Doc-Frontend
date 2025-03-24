<template>
  <Message
    :severity="severity"
    pt:root:class="!outline-none"
    pt:content:class="py-1 px-2"
    pt:text:class="!text-xs !leading-[1.125rem]"
  >
    <slot />
  </Message>
</template>

<script setup lang="ts">
import Message from 'primevue/message';

defineProps({
  severity: {
    type: String as () => 'success' | 'secondary' | 'warn' | 'error',
    default: 'success',
  },
});
</script>
