<script setup lang="ts">
import { passwordValidationRules } from '~/utils/validation.helper';

const props = defineProps({
  password: {
    type: String,
    default: '',
  },
});
const validationRules = computed(() => {
  return passwordValidationRules(props.password);
});
</script>

<template>
  <div v-if="password" class="col-span-12">
    <ul class="d-flex">
      <li v-for="rule in validationRules" :key="rule.message" class="flex">
        <span class="inline-flex text-[12px] items-center mb-[10px]">
          <span class="mr-2">
            <Icon v-if="rule.valid" name="normal:greenTick" />
            <Icon v-else name="normal:redTick" />
          </span>
          <span :class="rule.valid ? 'text-[#1C1C1C]' : 'text-[#6D6D6D]'">
            {{ rule.message }}
          </span>
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
