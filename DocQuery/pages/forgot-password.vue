<script setup lang="ts">
import PasswordApiService from '~/services/PasswordApiService';

definePageMeta({
  layout: 'auth',
});

const form$ = ref();
const showForgotPassword = ref(true);

const handleContinue = async () => {
  await form$.value.validate();
  if (!form$.value.invalid) {
    const formData = form$?.value?.data;
    if (formData) {
      const response = await PasswordApiService.passwordRecovery(
        formData?.email,
      );
      if (response) {
        showForgotPassword.value = !showForgotPassword.value;
      }
    }
  }
};
</script>

<template>
  <div
    class="bg-surfaceBackground rounded-[1.25rem] p-8 tab:p-[3.75rem] w-[90%] tab:w-[65%] desktop:w-[35%] flex flex-col gap-8"
  >
    <div v-if="showForgotPassword">
      <div>
        <h4
          class="text-textPrimary font-semibold no-italic text-start text-xle tab:text-2xle mb-[16px]"
        >
          Forgot Password
        </h4>
        <div class="mb-[16px]">
          <p class="text-[var(--p-message-secondary-color)] text-[14px]">
            A password reset link will be sent to the email id given below.
            Please check your inbox to proceed.
          </p>
        </div>
      </div>
      <div>
        <div>
          <Vueform
            ref="form$"
            :display-errors="false"
            :add-classes="{
              FormElements: {
                container: '!gap-4 tab:!gap-[1.5625rem]',
              },
            }"
          >
            <div class="relative col-span-12">
              <TextElement
                class="gap-4"
                name="email"
                label="Email"
                :floating="false"
                :rules="['required', 'email']"
                :messages="{
                  required: 'Email is required',
                  email: 'Input a valid email address',
                }"
                autocomplete="off"
                :add-classes="{
                  ElementLayout: {
                    outerWrapper: 'gap-1.5',
                  },
                  TextElement: {
                    input: '!rounded-lg',
                  },
                  ElementLabel: {
                    container: `after:content-['*'] after:text-[var(--error-600)] !pb-0 text-[var(--neutral-300)] dark:text-[var(--neutral-300)] dark:text-[var(--neutral-300)]`,
                  },
                }"
              />
            </div>
            <div class="col-span-12 mt-[0.875rem] tab:mt-[0.3125rem]">
              <button
                :disabled="Boolean(form$?.invalid)"
                class="rounded-lg py-2 px-4 w-full focus:outline-borderFocus disabled:cursor-not-allowed disabled:bg-grey-300 disabled:opacity-50"
                :class="
                  form$?.invalid
                    ? 'bg-surfaceDisabled cursor-not-allowed'
                    : 'bg-loginPrimaryBg hover:bg-loginPrimaryHoverBg'
                "
                @click="handleContinue"
              >
                <span
                  class="font-medium text-[1rem]"
                  :class="
                    form$?.invalid ? 'text-[#666]' : 'text-loginPrimaryText'
                  "
                  >Continue</span
                >
              </button>
            </div>
          </Vueform>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="col-span-12">
        <div class="flex col-span-12 items-center">
          <div class="mr-[16px]">
            <div class="rounded-full p-[8px] bg-[#E6F6EB]">
              <Icon name="normal:greenTick" />
            </div>
          </div>
          <div>
            <h4 class="text-[#181818] text-[28px] font-semibold">
              Invitation Sent
            </h4>
          </div>
        </div>
      </div>
      <Divider />
      <div class="col-span-12">
        <div>
          <p class="text-[#181818]">
            We've sent an invitation to your email. Please check your inbox to
            take the next steps.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
::v-deep(.form-h-input-height) {
  height: 3rem;
  border-radius: 0.5rem;
  border: 0.0625rem solid #efefef;
  background: #fff;
}
::v-deep(.form-p-input) {
  padding-left: 12px;
  padding-right: 34px;
  background: #fff;
}
</style>
