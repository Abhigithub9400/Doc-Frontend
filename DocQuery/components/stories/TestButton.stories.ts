import type { Meta, StoryFn } from '@storybook/vue3';

import TestButton from '../TestButton.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta: Meta<typeof TestButton> = {
  title: 'Components/TestButton',
  component: TestButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    btnClass: {
      control: 'select',
      options: ['btn-primary', 'btn-secondary'],
      description: 'CSS class for the button styling (primary or secondary)',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;

// Default story: Shows the button with default settings
export const Default: StoryFn<typeof TestButton> = (args) => {
  return {
    components: { TestButton },
    setup() {
      return { args };
    },
    template: '<TestButton v-bind="args" />', // Bind Storybook args to the component
  };
};

Default.args = {
  btnClass: 'btn-primary', // Default state
};

export const Playground: StoryFn<typeof TestButton> = (args) => {
  return {
    components: { TestButton },
    setup() {
      return { args };
    },
    template: '<TestButton v-bind="args" @click="args.onClick" />',
  };
};

Playground.args = {
  btnClass: 'btn-primary',
};
