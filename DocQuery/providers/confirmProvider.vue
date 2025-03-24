<script setup lang="ts">
import { confirmationContent } from '~/utils/confirmation.constant';
import { useCustomConfirm } from '~/composables/useCustomConfirm';

const { closeConfirm } = useCustomConfirm();
</script>

<template>
  <div id="confirm-provider" class="confirm-provider-component">
    <slot />
    <ConfirmDialog
      :pt="{
        root: {
          class: 'custom-confirm-dialog',
        },
      }"
    >
      <template #container="{ message, acceptCallback, rejectCallback }">
        <div id="confirm-card" class="confirm-card custom-confirm">
          <div class="absolute right-4 top-4">
            <button type="button" @click="closeConfirm">
              <Icon name="normal:close" />
            </button>
          </div>
          <div id="confirm-content" class="flex mb-32">
            <div class="">
              <div
                class="p-4 rounded-lg mr-[16px]"
                :class="`confirm-card-icon-${message?.type}`"
              >
                <Icon
                  :name="`normal:${confirmationContent[message?.icon]?.icon || 'information'}`"
                />
              </div>
            </div>
            <div class="">
              <h4 class="font-semibold text-xle text-textPrimary mb-2">
                {{ message?.header }}
              </h4>
              <div>
                <p class="font-normal text-lg text-textPrimary opacity-50">
                  {{ message?.message }}
                </p>
              </div>
            </div>
          </div>
          <div id="confirm-actions" class="flex justify-end mt-[32px]">
            <div v-if="message?.rejectProps">
              <button
                class="mr-6 rounded-lg py-2 px-4 border border-[var(--primary-black)] focus:outline-borderFocus disabled:cursor-not-allowed disabled:bg-grey-300 disabled:opacity-50"
                @click="rejectCallback"
              >
                <span class="text-textPrimary">
                  {{ message?.rejectProps?.label || 'Cancel' }}
                </span>
              </button>
            </div>
            <div>
              <button
                class="rounded-lg py-2 px-4 focus:outline-borderFocus disabled:cursor-not-allowed disabled:bg-grey-300 disabled:opacity-50"
                :class="
                  message?.rejectProps
                    ? 'bg-surfaceActionButton hover:bg-surfaceActionButtonHover'
                    : 'border border-[var(--primary-black)] focus:outline-borderFocus'
                "
                @click="acceptCallback"
              >
                <span
                  class="font-medium text-[1rem]"
                  :class="
                    message?.rejectProps
                      ? 'text-borderAction'
                      : 'text-textPrimary'
                  "
                >
                  {{ message?.acceptProps?.label || 'Confirm' }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </template>
    </ConfirmDialog>
  </div>
</template>

<style scoped></style>
