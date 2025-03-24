import { useToast } from 'primevue';
import type { AlertTypeOptions } from '~/types';

export function useCustomToast() {
  const toast = useToast();

  const showToast = ({
    severity,
    summary,
    detail = '',
    life = 3000,
  }: AlertTypeOptions) => {
    toast.add({
      severity,
      summary,
      detail,
      life,
    });
  };

  return { showToast };
}
