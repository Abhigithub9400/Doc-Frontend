<template>
  <Button
    ref="button"
    :class="[
      buttonStyles,
      iconPosition === 'right' ? '!flex-row-reverse' : '!flex-row',
    ]"
    :disabled="disabled"
    @click="handleClick"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @focus="isFocused = true"
    @blur="isFocused = false"
  >
    <Icon
      v-if="props.icon"
      :name="`icon:${icon}`"
      :customize="customize"
      width="16px"
      height="16px"
    />
    <span class="flex flex-row">{{ props.label }}</span>
  </Button>
</template>
<script setup lang="ts">
import Button from 'primevue/button';

const props = withDefaults(
  defineProps<{
    label?: string;
    variant?: 'primary' | 'secondary' | 'outlined' | 'hugged';
    size?: 'small' | 'medium' | 'large';
    iconPosition?: 'left' | 'right';
    icon?: string | null;
    disabled?: boolean;
  }>(),
  {
    label: '',
    variant: 'primary',
    iconPosition: 'left',
    icon: null,
    disabled: false,
    size: 'large',
  },
);

const emit = defineEmits(['click']);

const button = ref<InstanceType<typeof Button>>();
const isHovered = ref(false);
const isFocused = ref(false);

const iconColor = (variant: string, state: string) => {
  switch (variant) {
    case 'primary':
      if (state === 'default' || state === 'hover' || state === 'focus') {
        return 'var(--neutral-white)';
      } else if (state === 'disabled') {
        return 'var(--neutral-300)';
      }
      break;
    case 'secondary':
      if (state === 'default' || state === 'focus') {
        return 'var(--secondary-900)';
      } else if (state === 'hover') {
        return 'var(--secondary-600)';
      } else if (state === 'disabled') {
        return 'var(--neutral-300)';
      }
      break;
    case 'outlined':
      if (state === 'default' || state === 'focus' || state === 'hover') {
        return 'var(--neutral-400)';
      } else if (state === 'disabled') {
        return 'var(--neutral-300)';
      }
      break;
    case 'hugged':
      if (state === 'default' || state === 'focus') {
        return 'var(--secondary-900)';
      } else if (state === 'hover') {
        return 'var(--neutral-600)';
      } else if (state === 'disabled') {
        return 'var(--neutral-300)';
      }
      break;
  }
};

const customize = (content: string, name: string, prefix: string) => {
  if (prefix !== 'icon') return content;

  let color = iconColor(props.variant, 'default');

  if (props.disabled) {
    color = iconColor(props.variant, 'disabled');
  } else if (isHovered.value) {
    color = iconColor(props.variant, 'hover');
  } else if (isFocused.value) {
    color = iconColor(props.variant, 'focus');
  }

  return content
    .replace(/stroke-width="[^"]*"/g, `stroke-width="2"`)
    .replace(/fill="[^"]*"/g, `fill="${color}"`)
    .replace(/animation-duration="[^"]*"/g, `animation-duration="1s"`);
};

const handleClick = () => {
  emit('click', { isActionTriggered: true });
};

const buttonStyles = computed(() => {
  const baseStyles = '!flex !items-center !gap-2 !rounded-lg';

  const variantStyles = {
    primary: [
      '!bg-surfaceActionButton !text-textInverse',
      'hover:!bg-surfaceActionButtonHover',
      'focus:!bg-surfaceActionButton focus:!border focus:!border-textLinkHover',
      'disabled:!bg-surfaceDisabled disabled:!text-textDisabled disabled:!cursor-not-allowed',
    ],
    secondary: [
      '!bg-surfaceBackground !text-surfaceActionButton !border !border-surfaceActionButton',
      'hover:!border-surfaceActionButtonHover',
      'focus:!bg-surfaceBackgroundGrey focus:!border focus:!border-surfaceActionButton',
      'disabled:!bg-surfaceBackground disabled:!text-textDisabled disbled:!border disabled:!border-borderPrimary100 disabled:!cursor-not-allowed',
    ],
    outlined: [
      '!bg-surfaceBackground !text-textPrimary !border !border-borderPrimary100',
      'hover:!border-borderPrimary200',
      'focus:!bg-surfaceBackgroundGrey focus:!border focus:!border-borderPrimary200',
      'disabled:!bg-surfaceBackground disabled:!text-textDisabled100 disabled:!border disabled:!border-borderPrimary100 disabled:!cursor-not-allowed',
    ],
    hugged: [
      '!bg-transparent !text-surfaceActionButton !border-none',
      'hover:!text-surfaceActionButtonHover',
      'focus:!bg-neutral-700',
      'disabled:!text-textDisabled disabled:!cursor-not-allowed',
    ],
  };

  const sizeStyles = {
    small: '!text-base !font-normal !no-italic !px-4 !py-1.5',
    medium: '!text-base !font-normal !no-italic !px-4 !py-2',
    large: '!text-base !font-normal !no-italic !px-4 !py-2.25',
  };

  return [
    baseStyles,
    variantStyles[props.variant],
    props.size && sizeStyles[props.size],
  ];
});
</script>
