// Angular
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';

// Formly
import { FormlyFieldConfig } from '@ngx-formly/core';

// Services
import { AuthService } from '@auth/services';

@Component({
  selector: 'cct-register',
  template: `
    <h1>Register your account</h1>

    <form
      [formGroup]="form"
      (ngSubmit)="onSubmit()"
    >
      <formly-form
        [form]="form"
        [fields]="fields"
      ></formly-form>

      <div class="button-group">
        <button
          mat-raised-button
          color="primary"
          type="submit"
        >
          Register
        </button>
      </div>
    </form>

    <div class="register__auth">
      <button
        mat-raised-button
        color="warn"
        class="register__auth-button"
        (click)="authService.googleAuth()"
      >
        <span>Sign up with Google</span>
      </button>

      <p>Already registered? <a routerLink="/app/login">Log in</a></p>
    </div>
  `,
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        required: true,
      },
      validators: {
        validation: ['email']
      }
    },
    {
      validators: {
        validation: [
          {
            name: 'fieldMatch',
            options: { errorPath: 'passwordConfirm' }
          },
        ],
      },
      fieldGroup: [
        {
          key: 'password',
          type: 'input',
          templateOptions: {
            type: 'password',
            label: 'Password',
            required: true,
            minLength: 8
          },
        },
        {
          key: 'passwordConfirm',
          type: 'input',
          templateOptions: {
            type: 'password',
            label: 'Confirm Password',
            placeholder: 'Please re-enter your password',
            required: true,
          },
        }
      ]
    }
  ];

  constructor(
    private fb: FormBuilder,
    public authService: AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({});
  }

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (!this.form.valid) {
      return;
    }

    // form passed validation
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;

    this.authService.register(email, password);
  }

}
