import type { IValidationRule } from '~/types';

export const passwordValidationRules = (
  password: string,
): Array<IValidationRule> => {
  return [
    {
      message: 'At least 8-20 characters',
      valid: /.{8,20}/.test(password),
    },
    {
      message: 'At least 1 uppercase letter',
      valid: /[A-Z]/.test(password),
    },
    {
      message: 'At least 1 special character',
      valid: /[\W_]/.test(password),
    },
    { message: 'At least 1 number', valid: /\d/.test(password) },
  ];
};
