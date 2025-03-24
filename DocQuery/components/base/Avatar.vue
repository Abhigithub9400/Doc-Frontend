<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  avatarIcon: {
    type: Object,
    required: false,
    default: () => {
      import('~/components/common/IconAvatar.vue');
    },
  },
  text: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const avatar = computed(() => {
  if (props.text) {
    return props.name
      .split(' ')
      .map((part) => {
        return part[0];
      })
      .join('')
      .substring(0, 2);
  } else {
    return props.avatarIcon;
  }
});
</script>

<template>
  <div
    class="flex justify-center items-center rounded-lg bg-[#ECFDF3] px-[0.188rem] w-9 h-9"
  >
    <p v-if="text" class="text-[1rem] text-[#027A48] font-medium">
      {{ avatar }}
    </p>
    <component :is="avatar" v-if="!text" class="" />
  </div>
</template>
