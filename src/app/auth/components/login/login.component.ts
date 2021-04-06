// Angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
          color="primary"
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
        <span>Login with Google</span>
      </button>

      <p>No account yet? <a routerLink="/app/register">Create an account</a></p>
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
        required: true,
      },
      validators: {
        validation: ['email']
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Password',
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
    this.form.markAllAsTouched();

    if (!this.form.valid) {
      return;
    }

    // form passed validation
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;

    this.authService.logIn(email, password);
  }

}
