<template>
  <div class="relative h-full flex flex-col gap-2">
    <div
      class="absolute w-full h-[50vh] tab:h-[50vh] desktop:h-[35vh] -z-1 bg-no-repeat bg-cover bg-[url('assets/images/purpleBackground.svg')] tab:bg-[url('assets/images/purpleBackgroundMd.svg')] desktop:bg-[url('assets/images/purpleBackground.svg')]"
    />
    <div
      class="flex gap-[0.625rem] items-center justify-center desktop:justify-start w-full p-3"
    >
      <img
        src="../../assets/icons/document.svg"
        class="w-[1.618rem] h-[1.618rem]"
        alt="branding"
      />
      <p
        class="text-[1.125rem] leading-5 no-italic font-semibold text-[var(--primary-white)]"
      >
        Alche<span class="">Doc</span> AI
      </p>
    </div>
    <div class="flex-1 flex justify-center items-center">
      <div
        class="bg-surfaceBackground rounded-[1.25rem] p-8 tab:p-[3.75rem] w-[90%] tab:w-[65%] desktop:w-[35%] flex flex-col gap-8"
      >
        <div>
          <p
            class="text-textPrimary font-semibold no-italic text-start text-xle tab:text-2xle"
          >
            Welcome to Alche<span class="text-[var(--login-primary)]">Doc</span>
            AI
          </p>
        </div>
        <div v-if="isSessionExpired">
          <div
            class="flex bg-[#FFECEC] text-[var(--vf-error-color)] pt-[4px] pb-[4px] px-[4px] rounded-[8px] text-center justify-center align-center"
          >
            <Icon name="normal:danger-red-triangle" />
            <span class="ml-[8px]">
              Your session has expired. Please log in again
            </span>
          </div>
        </div>
        <Vueform
          ref="form$"
          :endpoint="false"
          :model-value="loginData"
          :display-errors="false"
          :add-classes="{
            FormElements: {
              container: '!gap-4 tab:!gap-[1.5625rem]',
            },
          }"
          @update:model-value="handleLogin"
        >
          <TextElement
            class="gap-4"
            name="username"
            :label="`${isSuperAdmin ? 'Email' : 'Email or Username'}`"
            placeholder="Enter your email"
            :floating="false"
            :rules="['required', 'email']"
            :messages="{
              required: `${isSuperAdmin ? 'Email' : 'Username/Email'}  is required`,
              email: 'Please enter a valid email address.',
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
                container: `after:content-['*'] after:text-[var(--error-600)] !pb-0 text-[#666] dark:text-primary-black`,
              },
            }"
          />
          <div class="relative col-span-12">
            <TextElement
              class=""
              name="password"
              label="Password"
              :input-type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              :floating="false"
              :rules="['required']"
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
                  container: `after:content-['*'] after:text-[var(--error-600)] !pb-0 text-[#666] dark:text-primary-black`,
                },
              }"
              @change="handlePasswordChange"
            />

            <div
              class="absolute top-[2.75rem] right-2 cursor-pointer"
              @click="togglePassword"
            >
              <IconEyeOpen v-show="showPassword" />
              <IconEyeClosed v-show="!showPassword" />
            </div>
          </div>

          <div v-if="!isSuperAdmin" class="text-center col-span-12">
            <a
              href="/forgot-password"
              class="text-textLink hover:text-textLinkHover text-[0.875rem] font-medium focus:outline-borderFocus"
              >Forgot password?
            </a>
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
              @click="handleSubmit"
            >
              <span
                class="font-medium text-[1rem]"
                :class="
                  form$?.invalid ? 'text-[#666]' : 'text-loginPrimaryText'
                "
                >Login</span
              >
            </button>
          </div>
        </Vueform>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import IconEyeClosed from '~/components/common/IconEyeClosed.vue';
import IconEyeOpen from '~/components/common/IconEyeOpen.vue';
import { useAuthStore } from '~/stores';
import type { ILoginRequest } from '~/types';

const authStore = useAuthStore();

const route = useRoute();
const router = useRouter();

const role: string = Array.isArray(route.params.role)
  ? route.params.role[0]
  : route.params.role || 'default';
const allowedRoles = ['default', 'super-admin'];

const isSuperAdmin = computed(() => {
  return route.params.role === 'super-admin';
});

onMounted(() => {
  if (!allowedRoles.includes(role)) {
    router.push('/login'); // Redirect to `/login` if the role is not allowed
  }
});
const showPassword = ref(false);
const loginData = ref({ username: '', password: '' });
const form$ = ref();

definePageMeta({
  layout: false,
});

const handleLogin = async (formData: ILoginRequest) => {
  loginData.value = formData;
};

const password = ref('');

const handlePasswordChange = (value: string) => {
  password.value = value;
};

const handleSubmit = async () => {
  await form$.value.validate();
  if (form$.value.formErrors.length === 0) {
    const data = {
      username: loginData.value.username,
      password: loginData.value.password,
    };
    try {
      const response = await authStore.login(data);
      form$.value?.reset();
      if (response.access_token && response.refresh_token) {
        const response = await authStore.whoami();
        if (response.is_super_admin) {
          navigateTo('/tenant');
        }
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error(error);
    }
  }
};

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const isSessionExpired = computed(() => {
  try {
    const session = sessionStorage.getItem('session');
    if (session) {
      return JSON.parse(session);
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
});
</script>
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
