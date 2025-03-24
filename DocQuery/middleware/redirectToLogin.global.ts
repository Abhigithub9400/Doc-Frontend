import { useAuthStore } from '~/stores';

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  const publicPages: Array<string> = [
    '/login',
    '/login/super-admin',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/test',
  ];
  if (!publicPages.includes(to.path) && !authStore.getIsAuthenticated) {
    return navigateTo('/login', { replace: true });
  }
  if (to.path === '/') {
    // Additional checks here.
    if (!authStore.getIsAuthenticated) {
      if (authStore.getIsSuperAdmin) {
        return navigateTo('/login/super-admin', { replace: true });
      } else {
        return navigateTo('/login', { replace: true });
      }
    } else {
      return navigateTo('/tenant', { replace: true });
    }
  }
});
