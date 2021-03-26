// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Modules
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { AngularFireModule } from '@angular/fire';
import { StoreModule } from '@ngrx/store';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

// env
import { environment } from 'src/environments/environment';

// Components
import {
  HomeComponent,
  NavigationComponent,
  ToolbarComponent
} from '@core/components';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    // Firebase
    AngularFireModule.initializeApp(environment.firebase),

    StoreModule.forRoot({}, {}),

    ReactiveFormsModule,
    FormlyModule.forRoot(),

    // Material
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatRippleModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  declarations: [
    HomeComponent,
    NavigationComponent,
    ToolbarComponent
  ],
  exports: [
    NavigationComponent,
    ToolbarComponent
  ]
})
export class CoreModule {}
