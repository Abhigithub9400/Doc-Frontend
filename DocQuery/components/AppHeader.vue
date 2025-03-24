<template>
  <div
    class="p-4 border-b border-b-borderPrimary100 bg-[#FFF] flex justify-between items-center"
  >
    <p class="text-[#181818] text-[1.125rem] font-semibold">
      Alche<span class="text-[#82A935] text-[1.125rem] font-semibold">Doc</span>
      AI
    </p>
    <div class="flex items-center gap-6">
      <button @click="handleNotification">
        <UiOverlayBadge :value="99" />
      </button>
      <ProfileSettings />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['on:click']);

const handleNotification = () => {
  emit('on:click');
};
</script>
