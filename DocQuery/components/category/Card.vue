<template>
  <div class="flex gap-4 w-full overflow-visible">
    <div class="w-full">
      <!--The below div is a v-for-->
      <div
        :id="`id-${folder?._id}-card-container`"
        class="flex flex-col p-4 border border-[#EFEFEF] bg-[#FFFFFF] gap-2.5 rounded-md mt-2 first:mt-0 hover:cursor-pointer relative"
        @click="openRepository"
      >
        <header class="flex flex-row items-center justify-between">
          <div class="flex flex-row gap-3 items-center">
            <BaseAvatar :name="folder?.name" text />
            <NuxtLink
              :to="`/repository/${folder?._id}`"
              class="text-base font-medium leading-6 not-italic text-[#000]"
            >
              {{ folder?.name }}
            </NuxtLink>
          </div>
          <div class="overflow-visible">
            <BaseActions
              :id="`${folder?._id}`"
              :append-id="`body`"
              :items="itemMenus"
            />
          </div>
        </header>
        <div class="flex flex-col gap-3 justify-center">
          <div class="flex flex-row gap-2 items-center">
            <IconFolder class="w-4 h-4" />
            <span
              class="text-sm leading-5 font-medium not-italic text-[#506031]"
              >{{
                `${folder?.documents.length ? `${folder?.documents?.length} Documents` : '0 Document'}`
              }}</span
            >
          </div>
          <hr />
          <div class="flex flex-row justify-between items-center">
            <span
              class="text-xs leading-[1.125rem] font-normal not-italic text-[#333]"
              >{{ formatDate(folder?.create_time) }}</span
            >
            <BaseBadge active />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import IconFolder from '~/components/common/IconRepository.vue';
import { useDateFormatter } from '~/composables/useDateFormatter';
import type { Repository } from '~/types/repository';

const props = defineProps({
  folder: {
    type: Object as PropType<Repository>,
    required: true,
  },
});

const emit = defineEmits(['onAction']);

const { formatDate } = useDateFormatter();

const openRepository = () => {
  //routing to repository display page.
};

const itemMenus = ref([
  {
    label: 'Edit',
    icon: 'pen-underline',
    command: () => {
      emit('onAction', {
        type: 'edit',
        folder: props?.folder,
      });
    },
  },
  {
    label: 'Settings',
    icon: 'settings',
    command: () => {},
  },
  {
    label: 'Delete',
    icon: 'trash-bin-2',
    command: () => {
      emit('onAction', {
        type: 'delete',
        folder: props?.folder,
      });
    },
  },
]);
</script>
