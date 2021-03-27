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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

// env
import { environment } from 'src/environments/environment';

// Components
import {
  CurrenciesTableComponent,
  HomeComponent,
  NavigationComponent,
  ToolbarComponent
} from '@core/components';
import { NomicsService } from './services';
import { ValueIncreasedPipe } from './pipes';

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
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatToolbarModule
  ],
  declarations: [
    CurrenciesTableComponent,
    HomeComponent,
    NavigationComponent,
    ToolbarComponent,

    ValueIncreasedPipe
  ],
  providers: [
    NomicsService
  ],
  exports: [
    NavigationComponent,
    ToolbarComponent
  ]
})
export class CoreModule {}
