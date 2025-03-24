<template>
  <div class="flex gap-2">
    <Checkbox
      v-show="!isDisabled"
      v-model="checked"
      binary
      @change="handleChange"
    />
    <label class="text-[0.875rem] font-normal !text-textPrimary">{{
      selectTitle
    }}</label>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import Checkbox from 'primevue/checkbox';

const props = defineProps({
  selectTitle: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    required: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const checked = ref(props.modelValue);

watch(
  () => {
    return props.modelValue;
  },
  (newValue) => {
    checked.value = newValue;
  },
);

const handleChange = () => {
  emit('update:modelValue', checked.value);
};
</script>
