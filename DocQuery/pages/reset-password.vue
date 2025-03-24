<script setup lang="ts">
import { authApiService } from '~/services';
import IconEyeClosed from '~/components/common/IconEyeClosed.vue';
import IconEyeOpen from '~/components/common/IconEyeOpen.vue';
import { passwordValidation } from '~/utils/password.validation.rule';
import PasswordErrorMessage from '~/components/PasswordErrorMessage.vue';
import PasswordApiService from '~/services/PasswordApiService';

definePageMeta({
  layout: 'auth',
});

const form$ = ref();
const resetFormData = ref({
  password: '',
  password_confirmation: '',
});

const handleFormDataChange = (formData) => {
  resetFormData.value = formData;
};

const showPassword = ref(false);
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
const isLinkExpired = ref(false);
const isExpireCheckComplete = ref(false);
const isPasswordResetSuccess = ref(false);
const route = useRoute();
const email = route.query.email;

const queryToken = route?.query?.token;
const tempToken = Array.isArray(queryToken)
  ? queryToken[0]
  : (queryToken ?? '');

const token = ref(tempToken);

const verifyTokenCall = async () => {
  isExpireCheckComplete.value = false;
  try {
    const response = await PasswordApiService.verifyToken(token.value);
    if (response) {
      isLinkExpired.value = false;
      isExpireCheckComplete.value = true;
    } else {
      isLinkExpired.value = true;
    }
  } catch (err) {
    console.error(err);
    isLinkExpired.value = true;
  } finally {
    isExpireCheckComplete.value = true;
  }
};

onMounted(() => {
  if (token.value) {
    verifyTokenCall();
  } else {
    isLinkExpired.value = true;
    isExpireCheckComplete.value = true;
  }
});

const resendLink = async () => {
  //
  try {
    const response = await authApiService.resendLink(email);
    if (response) {
      //
    }
  } catch (err) {
    console.error(err);
  } finally {
    //
  }
};

const changePassword = async () => {
  isPasswordResetSuccess.value = true;
  if (!form$.value.invalid) {
    const data = form$.value?.data as Record<string, string>;
    if (data?.password) {
      const response = await PasswordApiService.resetPassword({
        password: data.password,
        token: token.value,
      });
      if (response) {
        //
        isPasswordResetSuccess.value = true;
      }
    }
  }
};
</script>

<template>
  <div
    class="bg-surfaceBackground rounded-[1.25rem] p-8 tab:p-[3.75rem] w-[90%] tab:w-[65%] desktop:w-[35%] flex flex-col"
  >
    <div v-if="isPasswordResetSuccess">
      <div class="col-span-12">
        <div class="flex col-span-12 items-center">
          <div class="mr-[16px]">
            <div class="rounded-full p-[8px] bg-[#E6F6EB]">
              <Icon name="normal:greenTick" />
            </div>
          </div>
          <div>
            <h4 class="text-[#181818] text-[28px] font-semibold">
              Password reset successful
            </h4>
          </div>
        </div>
      </div>
      <Divider />
      <div class="col-span-12 mb-[32px]">
        <div>
          <p class="text-[#181818]">
            Your password has been successfully changed. Please sign in using
            your new password.
          </p>
        </div>
      </div>
      <div class="col-span-12 mt-[0.875rem] tab:mt-[0.3125rem]">
        <a
          href="/login"
          class="inline-block text-center rounded-lg py-2 px-4 w-full focus:outline-borderFocus disabled:cursor-not-allowed disabled:bg-grey-300 disabled:opacity-50 bg-loginPrimaryBg hover:bg-loginPrimaryHoverBg"
        >
          <span class="font-medium text-[1rem] text-loginPrimaryText"
            >Go to Sign in</span
          >
        </a>
      </div>
    </div>
    <div v-else>
      <div
        v-if="!isExpireCheckComplete && !isLinkExpired"
        class="flex w-full h-full items-center justify-center"
      >
        <div
          class="col-span-12 relative flex items-center justify-center w-full"
        >
          <ProgressSpinner />
        </div>
      </div>
      <div v-else-if="isExpireCheckComplete && isLinkExpired">
        <div class="w-[420px] mx-auto">
          <div class="flex items-center mb-[16px]">
            <div class="rounded-full bg-[#FFEDED] p-[12px] mr-[12px]">
              <Icon name="normal:linkBroken" />
            </div>
            <div class="flex items-center">
              <h4 class="text-[#B80000] font-semibold text-[24px]">
                Expired Link
              </h4>
            </div>
          </div>
          <div class="col-span-12 mb-[32px]">
            <p class="mb-0">
              The reset link is invalid or has expired. Please request a new
              one.
            </p>
          </div>
          <div>
            <button
              class="bg-loginPrimaryBg hover:bg-loginPrimaryHoverBg rounded-lg py-2 px-4 w-full h-[40px] focus:outline-borderFocus disabled:cursor-not-allowed disabled:bg-grey-300 disabled:opacity-50"
              @click="resendLink"
            >
              <span class="font-medium text-loginPrimaryText text-[1rem]"
                >Resend link</span
              >
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="isExpireCheckComplete && !isLinkExpired"
        class="col-span-12 items-center justify-center w-full"
      >
        <div>
          <div>
            <h4
              class="text-textPrimary font-semibold no-italic text-start text-xle tab:text-2xle mb-[32px]"
            >
              Reset Password
            </h4>
          </div>
        </div>
        <div>
          <Vueform
            ref="form$"
            :endpoint="false"
            :model-value="resetFormData"
            :display-errors="false"
            :add-classes="{
              FormElements: {
                container: '!gap-4 tab:!gap-[1.5625rem]',
              },
            }"
            @update:model-value="handleFormDataChange"
          >
            <div class="relative col-span-12">
              <TextElement
                class=""
                name="password"
                label="New Password"
                :input-type="showPassword ? 'text' : 'password'"
                :floating="false"
                :rules="['required', 'confirmed', passwordValidation]"
                :messages="{
                  required: 'Password is required',
                }"
                :add-classes="{
                  ElementLayout: {
                    outerWrapper: 'gap-1.5',
                  },
                  TextElement: {
                    input: '!rounded-lg',
                  },
                  ElementLabel: {
                    container: `after:content-['*'] after:text-[var(--error-600)] !pb-0 text-[var(--neutral-300)]`,
                  },
                }"
              />

              <div
                class="absolute top-[2.75rem] right-2 cursor-pointer"
                @click="togglePassword"
              >
                <IconEyeOpen v-show="showPassword" />
                <IconEyeClosed v-show="!showPassword" />
              </div>
            </div>
            <div class="relative col-span-12">
              <TextElement
                class=""
                name="password_confirmation"
                label="Confirm Password"
                :input-type="showPassword ? 'text' : 'password'"
                :floating="false"
                :rules="['required']"
                :messages="{
                  required: 'Confirmation Password is required',
                }"
                :add-classes="{
                  ElementLayout: {
                    outerWrapper: 'gap-1.5',
                  },
                  TextElement: {
                    input: '!rounded-lg',
                  },
                  ElementLabel: {
                    container: `after:content-['*'] after:text-[var(--error-600)] !pb-0 text-[var(--neutral-300)]`,
                  },
                }"
              />

              <div
                class="absolute top-[2.75rem] right-2 cursor-pointer"
                @click="togglePassword"
              >
                <IconEyeOpen v-show="showPassword" />
                <IconEyeClosed v-show="!showPassword" />
              </div>
            </div>
            <div class="col-span-12">
              <password-error-message :password="resetFormData.password" />
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
                @click="changePassword"
              >
                <span
                  class="font-medium text-[1rem]"
                  :class="
                    form$?.invalid ? 'text-[#666]' : 'text-loginPrimaryText'
                  "
                  >Save</span
                >
              </button>
            </div>
          </Vueform>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
