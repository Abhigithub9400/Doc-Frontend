<template>
  <div
    v-if="totalRecords > 0 && totalRecords > perPage"
    ref="pagination"
    class="flex justify-between items-center p-3 bg-white shadow-md h-fit"
  >
    <!--Left Section-->
    <div class="flex items-center gap-2 h-full">
      <!--Previous Button-->
      <Button
        pt:root:class="!h-full !px-2 !py-0 !border !border-[#e5e5ea] !rounded"
        :disabled="currentPage === 1"
        @click="prevPage"
      >
        <Icon
          name="normal:chevronLeft"
          :customize="
            (content: string, tag: string, prefix: string) =>
              customize(content, tag, prefix, currentPage === 1)
          "
        />
      </Button>
      <!--Page Links-->
      <Button
        v-for="page in pageNumbers"
        :key="page"
        :class="[
          'text-sm leading-[1.125rem] font-normal no-italic text-[#313131] !border !border-[#e5e5ea] !rounded',
          { active: page === currentPage },
        ]"
        @click="goToPage(page)"
        >{{ page }}</Button
      >
      <!--Next Button-->
      <Button
        pt:root:class="!h-full !px-2 !py-0 !border !border-[#e5e5ea] !rounded"
        :disabled="currentPage === totalPages"
        @click="nextPage"
      >
        <Icon
          name="normal:chevronRight"
          :customize="
            (content: string, tag: string, prefix: string) =>
              customize(content, tag, prefix, currentPage === totalPages)
          "
        />
      </Button>
      <!--Records per page dropdown-->
      <Select
        v-model="perPage"
        :options="perPageOptions"
        pt:root:class="!px-2 !py-1 !h-full !gap-2"
        pt:label:class="!p-0 !flex !items-center !text-sm !leading-[1.125rem] !font-normal !no-italic !text-textPrimary"
        pt:dropdown:class="!w-fit"
        class="text-xs"
        @change="handleSelectionChange"
      />
    </div>

    <!--Left Section-->
    <div class="text-textPrimary text-base font-medium no-italic">
      {{ startRow }}-{{ endRow }} of {{ totalRecords }}
    </div>
  </div>
</template>

<script setup lang="ts">
//Imports
import Button from 'primevue/button';
import Select from 'primevue/select';

//Props
const props = defineProps({
  totalRecords: { type: Number, required: true },
  perPageOptions: {
    type: Array,
    default: () => {
      return [10, 25, 50, 100];
    },
  },
  defaultPerPage: { type: Number, default: 50 },
  visiblePageLinks: { type: Number, default: 3 },
});

//Emits
const emit = defineEmits(['page-change']);

//Reactive States
const currentPage = ref(1);
const perPage = ref(props.defaultPerPage);
const pagination = ref<HTMLElement | null>(null);

//Computed Properties
const totalPages = computed(() => {
  return Math.ceil(props.totalRecords / perPage.value);
});

const startRow = computed(() => {
  return (currentPage.value - 1) * perPage.value + 1;
});

const endRow = computed(() => {
  return Math.min(currentPage.value * perPage.value, props.totalRecords);
});

const pageNumbers = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const visible = props.visiblePageLinks;

  if (total <= visible) {
    return Array.from({ length: total }, (_, i) => {
      return i + 1;
    });
  }

  const pages = [];
  const lastVisibleStart = total - visible + 1;

  if (current < lastVisibleStart) {
    for (let i = current; i < current + visible; i++) {
      pages.push(i);
    }
    pages.push('...');
    pages.push(total);
  } else {
    for (let i = lastVisibleStart; i <= total; i++) {
      pages.push(i);
    }
  }
  return pages;
});

const emitPageChange = () => {
  emit('page-change', {
    currentPage: currentPage.value,
    perPage: perPage.value,
  });
};

//Methods

const goToPage = (page: number | string) => {
  if (
    page === '...' ||
    (page as number) < 1 ||
    (page as number) > totalPages.value
  ) {
    return;
  }

  currentPage.value = page as number;
  emitPageChange();
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value = currentPage.value - 1;
    emitPageChange();
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value = currentPage.value + 1;
    emitPageChange();
  }
};

const handleSelectionChange = () => {
  perPage.value = Number(perPage.value);
  const newTotalPages = Math.ceil(props.totalRecords / perPage.value);
  if (currentPage.value > newTotalPages) {
    currentPage.value = newTotalPages;
  }
  emitPageChange();
};

const customize = (
  content: string,
  _: string,
  prefix: string,
  isDisabled: boolean,
) => {
  if (prefix !== 'icon') return content;

  const fillColor = isDisabled ? 'var(#626262)' : 'var(--neutral-400)';

  return content
    .replace(/stroke-width="[^"]*"/g, `stroke-width="2"`)
    .replace(/fill="[^"]*"/g, `fill="${fillColor}"`)
    .replace(/animation-duration="[^"]*"/g, `animation-duration="1s"`);
};
</script>

<style scoped>
.active {
  background-color: var(--neutral-800);
  color: var(--neutral-white);
  border-color: var(--neutral-800);
}

button {
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
}
</style>
