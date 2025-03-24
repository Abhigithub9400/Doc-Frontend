<template>
  <Vueform v-bind="vueform" :endpoint="false" />
</template>

<script setup lang="ts">
const toggleState = ref('Active');
const vueform = ref({
  size: 'md',
  displayErrors: false,
  schema: {
    name: {
      type: 'text',
      rules: ['required', 'max:255'],
      placeholder: 'Enter Tenant Name',
      label: 'Tenant Name *',
      fieldName: 'tenant name',
      floating: false,
    },
    container: {
      type: 'group',
      schema: {
        email: {
          type: 'text',
          inputType: 'email',
          placeholder: 'Enter Email',
          label: 'Email *',
          columns: {
            container: 6,
            label: 12,
            wrapper: 12,
          },
          fieldName: 'tenant email',
          floating: false,
          rules: ['required', 'max:255', 'email'],
        },
        status: {
          type: 'toggle',
          label: 'Tenant Status *',
          text: toggleState,
          columns: {
            container: 6,
            label: 12,
            wrapper: 12,
          },
          align: 'left',
          fieldName: 'tenant status',
          default: true,
          onChange(newValue: boolean) {
            toggleState.value = newValue ? 'Active' : 'Inactive';
          },
        },
      },
    },
    description: {
      type: 'textarea',
      rows: 2,
      label: 'Description',
    },
    tenant_configuration_label: {
      type: 'static',
      content: 'Tenant Configurations',
      tag: 'p',
      addClass: '!text-lg !text-textPrimary',
    },
  },
});
</script>
