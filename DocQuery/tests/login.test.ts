import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Role from '~/pages/login/[[role]].vue';

describe('LoginPage.vue', () => {
  it('renders login form', () => {
    const wrapper = mount(Role);
    expect(wrapper.find('h1').text()).toBe('Role');
    expect(wrapper.find('input#email').exists()).toBe(true);
    expect(wrapper.find('input#password').exists()).toBe(true);
    expect(wrapper.find('button').text()).toBe('Role');
  });

  it('shows an error message on invalid login', async () => {
    const wrapper = mount(Role);

    await wrapper.find('#email').setValue('wrong@example.com');
    await wrapper.find('#password').setValue('wrongpassword');
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.text()).toContain('Invalid email or password');
  });

  it('alerts on valid login', async () => {
    const wrapper = mount(Role);

    window.alert = vi.fn();

    await wrapper.find('#email').setValue('root@docquery.ai');
    await wrapper.find('#password').setValue('Super@admin#');
    await wrapper.find('form').trigger('submit.prevent');

    expect(window.alert).toHaveBeenCalledWith('test alert');
  });
});
