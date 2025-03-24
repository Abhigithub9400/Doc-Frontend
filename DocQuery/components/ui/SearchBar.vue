<template>
  <div class="relative flex items-center w-auto">
    <div class="relative">
      <InputText
        v-model="searchText"
        type="text"
        :placeholder="placeholder"
        pt:root:class="!h-10 !px-2 !pr-10 !py-2 !w-[235px] !rounded-lg"
        @input="searchInput"
      />
      <Button
        pt:root:style="top: 0; bottom: 0;"
        pt:root:class="!absolute !right-1 !p-2 !bg-transparent text-white !border-none t-1 b-1"
      >
        <Icon
          name="icon:search"
          :customize="customize"
          width="16px"
          height="16px"
        />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const searchText = ref('');

const emit = defineEmits(['input']);

defineProps({
  placeholder: {
    type: String,
    default: 'Search',
  },
});

const searchInput = () => {
  emit('input', searchText.value);
};

const customize = (content: string, name: string, prefix: string) => {
  if (prefix !== 'icon') return content;

  return content
    .replace(/stroke-width="[^"]*"/g, `stroke-width="2"`)
    .replace(/fill="[^"]*"/g, `fill="var(--neutral-400)"`)
    .replace(/animation-duration="[^"]*"/g, `animation-duration="1s"`);
};
</script>
