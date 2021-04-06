// Angular
import { AbstractControl, FormControl } from '@angular/forms';

export const emailValidator = (control: FormControl) => {
  return !control.value || /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(control.value)
    ? null
    : { email: true };
};

export const fieldMatchValidator = (control: AbstractControl): {} => {
  const { password, passwordConfirm } = control.value;

  // avoid displaying the message error when values are empty
  if (!passwordConfirm || !password) {
    return null;
  }

  if (passwordConfirm === password) {
    return null;
  }

  return { fieldMatch: { message: 'Password does not match' } };
};
