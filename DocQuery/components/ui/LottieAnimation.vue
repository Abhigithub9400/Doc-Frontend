<template>
  <DotLottieVue
    :src="src"
    :autoplay="autoplay"
    :loop="loop"
    :speed="speed"
    :direction="direction"
    :style="{ width: width, height: height }"
    @complete="$emit('complete')"
    @loop-complete="$emit('loop-complete')"
    @frame="$emit('frame', $event)"
    @ready="$emit('ready')"
  />
</template>

<script setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';

defineProps({
  src: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '100%',
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  loop: {
    type: Boolean,
    default: true,
  },
  speed: {
    type: Number,
    default: 1,
  },
  direction: {
    type: Number,
    default: 1, // 1 for forward, -1 for reverse
  },
});

defineEmits(['complete', 'loop-complete', 'frame', 'ready']);
</script>
