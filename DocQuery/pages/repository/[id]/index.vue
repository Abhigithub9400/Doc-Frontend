<script setup lang="ts">
import RepositoryApiService from '~/services/RepositoryApiService';

const route = useRoute();

const currentRepository = ref({});

const requestRepositoryById = async (id) => {
  const response = await RepositoryApiService.getRepositoryById(id);
  if (response) {
    currentRepository.value = response;
  }
};

onMounted(() => {
  requestRepositoryById(route?.params?.id);
});
</script>

<template>
  <div>
    <div class="p-2">
      <h3>{{ currentRepository?.name }}</h3>
    </div>
    <div
      class="relative flex flex-row pl-[320px] w-full m-2"
      :style="{
        height: `calc(100vh - 80px)`,
      }"
    >
      <div
        class="flex absolute h-full inset-x-0 w-[320px] bg-[#fff] p-2 rounded-[12px]"
      >
        <ul class="w-full">
          <li class="w-full">
            <div
              class="bg-repository-active text-white rounded-[12px] w-full py-2 px-3"
            >
              Documents
            </div>
          </li>
        </ul>
      </div>
      <div />
    </div>
  </div>
</template>

<style scoped></style>
