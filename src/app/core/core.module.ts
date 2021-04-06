// Angular
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

// Modules
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { AngularFireModule } from '@angular/fire';
import { AgGridModule } from 'ag-grid-angular';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
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
  CellPriceComponent,
  CurrenciesTableComponent,
  HomeComponent,
  NavigationComponent,
  ToolbarComponent,
  ToolbarUserComponent
} from '@core/components';
import { NomicsService } from './services';
import { ValueIncreasedPipe } from './pipes';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    // Firebase
    AngularFireModule.initializeApp(environment.firebase),

    ReactiveFormsModule,
    FormlyModule.forRoot(),

    AgGridModule.withComponents([
      CellPriceComponent
    ]),

    // Material
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatToolbarModule
  ],
  declarations: [
    CellPriceComponent,
    CurrenciesTableComponent,
    HomeComponent,
    NavigationComponent,
    ToolbarComponent,
    ToolbarUserComponent,

    ValueIncreasedPipe
  ],
  providers: [
    NomicsService,
    DatePipe
  ],
  exports: [
    NavigationComponent,
    ToolbarComponent
  ]
})
export class CoreModule {}
