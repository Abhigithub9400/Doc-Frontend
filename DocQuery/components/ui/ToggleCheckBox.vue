<template>
  <div class="flex gap-2">
    <input type="checkbox" :checked="toggleCheck" @change="onChange" />
    <label class="text-[#000] text-[0.875rem] font-normal">{{
      selectTitle
    }}</label>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  toggleCheck: {
    type: Boolean,
    default: false,
  },
  selectTitle: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:toggleCheck']);

const onChange = (event: Event) => {
  const newValue = (event.target as HTMLInputElement).checked;
  if (newValue !== props.toggleCheck) {
    emit('update:toggleCheck', newValue);
  }
};
</script>

<style scoped>
input[type='checkbox'] {
  position: relative;
  width: 40px;
  height: 22px;
  -webkit-appearance: none;
  appearance: none;
  background: #ccc;
  outline: none;
  border-radius: 2rem;
  cursor: pointer;
}

input[type='checkbox']::before {
  content: '';
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  top: 3px;
  left: 3px;
  transition: 0.5s;
}

input[type='checkbox']:checked::before {
  transform: translateX(100%);
  background: #ccc;
}

input[type='checkbox']:checked {
  background: #141a08;
}
</style>
