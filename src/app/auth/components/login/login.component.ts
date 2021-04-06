// Angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

// Formly
import { FormlyFieldConfig } from '@ngx-formly/core';

// Services
import { AuthService } from '@auth/services';

@Component({
  selector: 'cct-login',
  template: `
    <h1>Log in to your account</h1>

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
          type="submit"
        >
          Login
        </button>
      </div>
    </form>

    <div class="login__auth">
      <button
        mat-raised-button
        color="warn"
        class="login__auth-button"
        (click)="authService.googleAuth()"
      >
        Login with Google
      </button>
    </div>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Password',
        placeholder: '********',
        required: true,
      }
    }
  ];

  constructor(
    private fb: FormBuilder,
    public authService: AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({});
  }

  onSubmit(): void {
    console.log('form', this.form.value);
  }

}
