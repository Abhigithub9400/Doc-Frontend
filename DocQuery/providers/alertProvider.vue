<script setup lang="ts">
const customIconObject = reactive<Record<string, string>>({
  success: 'alert-success',
  info: 'alert-info',
  error: 'alert-error',
  logout: '',
  warning: 'alert-warning',
  delete: `alert-error`,
});
</script>

<template>
  <div id="alert-provider" class="alert-provider-component">
    <slot />
    <Toast
      position="bottom-right"
      :pt="{
        closeButton: {
          class: 'inline line-height-0 w-auto h-auto m-0 text-black',
        },
        buttonContainer: {
          class: 'custom-toast-close-button-container flex',
        },
        message: ({ props: { message } }) => {
          return {
            class: `custom-toast custom-toast-${customIconObject[message?.severity as string]}`,
          };
        },
      }"
    >
      <template #message="{ message }">
        <div
          class="custom-toast-message w-full"
          :class="`toast-${message.severity}`"
        >
          <div class="custom-toast-container flex">
            <div class="toast-icon">
              <div class="mr-[12px]">
                <Icon
                  width="32px"
                  height="32px"
                  :name="`normal:${customIconObject[message.severity as string]}`"
                />
              </div>
            </div>
            <div class="w-full flex items-center">
              <span
                class="text-[14px] font-medium"
                :class="`text-${customIconObject[message?.severity as string]}`"
              >
                {{ message?.summary }}
              </span>
            </div>
          </div>
        </div>
      </template>
    </Toast>
  </div>
</template>

<style scoped></style>
