// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Formly
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

// Firebase
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// Services
import { AuthService } from '@auth/services';

// Components
import { LoginComponent, RegisterComponent } from '@auth/components';

// Validation
import {
  emailValidator,
  emailValidatorMessage,
  fieldMatchValidator,
  minlengthValidationMessage
} from '@core/validation';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      validators: [
        { name: 'fieldMatch', validation: fieldMatchValidator },
        { name: 'email', validation: emailValidator }
      ],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        { name: 'minlength', message: minlengthValidationMessage },
        { name: 'email', message: emailValidatorMessage },
      ],
    }),
    FormlyMaterialModule,

    // Material
    MatButtonModule,
    MatSnackBarModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {}
