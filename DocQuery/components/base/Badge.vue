<template>
  <Tag
    unstyled
    :value="value"
    :pt:root:class="`bg-[${background}] px-2 py-1 rounded-lg flex`"
    :pt:root:style="`background: ${background}`"
    :pt:label:style="`color: ${color}`"
    :pt:label:class="`text-[${color}] text-xs leading-[1.125rem] font-normal not-italic`"
  />
</template>
<script setup lang="ts">
import Tag from 'primevue/tag';
const props = defineProps({
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
  label: {
    type: String,
    required: false,
    default: '',
  },
});

const background = computed(() => {
  if (props.active) {
    return '#CCEBD6';
  } else {
    return '#EFEFEF';
  }
});

const color = computed(() => {
  if (props.active) {
    return '#027A27';
  } else {
    return '#181818';
  }
});

const value = computed(() => {
  if (props.label) {
    return props.labe;
  }
  if (props.active) {
    return 'Active';
  } else {
    return 'Inactive';
  }
});
</script>
