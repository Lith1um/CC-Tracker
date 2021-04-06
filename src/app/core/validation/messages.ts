// Formly
import { FormlyFieldConfig } from '@ngx-formly/core';

export const emailValidatorMessage = (_: any, field: FormlyFieldConfig) =>
  `"${field.formControl.value}" is not a valid email address`;

export const minlengthValidationMessage = (err: any, field: FormlyFieldConfig): string => {
  return `Password must have at least ${field.templateOptions.minLength} characters`;
};
