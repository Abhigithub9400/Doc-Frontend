import { Validator } from '@vueform/vueform';

export const passwordValidation = class extends Validator {
  check(value: string): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;
    return passwordRegex.test(value);
  }
  get msg() {
    return `Password should contain 8-20 characters, At least one uppercase, special character and number`;
  }
};
