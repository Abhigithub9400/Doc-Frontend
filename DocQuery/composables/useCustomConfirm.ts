import { useConfirm } from 'primevue/useconfirm';
import type { ShowConfirmOptions } from '~/types';

export function useCustomConfirm() {
  const confirm = useConfirm();
  let confirmPromiseResolve: ((_value: Record<string, string>) => void) | null =
    null;

  /**
   * @description Reset confirm resolve
   */
  const resetConfirm = () => {
    confirmPromiseResolve = null;
  };

  /**
   * @description Open confirm box with option, under hood it use primeVue ConfirmDialog
   * @param options
   */
  const openConfirm = (
    options: ShowConfirmOptions,
  ): Promise<Record<string, string>> => {
    return new Promise((resolve) => {
      confirm.require(options);
      confirmPromiseResolve = (value) => {
        return resolve(value);
      };
    });
  };

  /**
   * @description Close confirm box
   */
  const closeConfirm = () => {
    setTimeout(() => {
      if (confirm.close) {
        confirm.close();
      }
      if (confirmPromiseResolve) {
        confirmPromiseResolve({ action: 'cancel' });
      }

      resetConfirm();
    });
  };

  return { closeConfirm, openConfirm };
}
