<script setup lang="ts"></script>

<template>
  <div class="relative h-full flex flex-col gap-2">
    <div
      class="absolute w-full h-[50vh] tab:h-[50vh] desktop:h-[35vh] -z-1 bg-no-repeat bg-cover bg-[url('assets/images/purpleBackground.svg')] tab:bg-[url('assets/images/purpleBackground.svg')] desktop:bg-[url('assets/images/purpleBackground.svg')]"
    />
    <div
      class="flex gap-[0.625rem] items-center justify-center desktop:justify-start w-full p-3"
    >
      <img
        src="../assets/icons/document.svg"
        class="w-[1.618rem] h-[1.618rem]"
        alt="branding"
      />
      <p
        class="text-[1.125rem] leading-5 no-italic font-semibold text-[var(--primary-white)]"
      >
        Alche<span class="text-[var(--primary-500)]">Doc</span> AI
      </p>
    </div>
    <div class="flex-1 flex justify-center items-center">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
