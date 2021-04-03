// Angular
import { AfterViewInit, Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

// rxjs
import { catchError, map, take } from 'rxjs/operators';
import { of } from 'rxjs';

// Services
import { NomicsService } from '@core/services';

// Models
import { CurrencyModel } from '@core/models';
import { ICellRendererParams } from 'ag-grid-community';
import { CellPriceComponent } from '../cell-price/cell-price.component';

@Component({
  selector: 'cct-currencies-table',
  template: `
    <div class="header">
      <span>Markets</span>

      <button
        mat-icon-button
        color="primary"
        [disabled]="isLoadingResults"
        (click)="getCurrencies()">
        <mat-icon>refresh</mat-icon>
      </button>
    </div>

    <div class="example-container">

      <div
        class="example-loading-shade"
        *ngIf="isLoadingResults">
        <mat-spinner></mat-spinner>
      </div>

      <ag-grid-angular
        class="ag-theme-material"
        domLayout="autoHeight"
        [suppressMovableColumns]="true"
        [suppressLoadingOverlay]="true"
        [rowData]="currencies"
        [defaultColDef]="defaultColDef"
        [columnDefs]="displayedColumns"
        [frameworkComponents]="frameworkComponents"
      >
      </ag-grid-angular>
    </div>
  `,
  styleUrls: ['./currencies-table.component.scss']
})
export class CurrenciesTableComponent implements AfterViewInit {

  defaultColDef = {
    flex: 1
  };

  frameworkComponents = {
    cellPriceComponent: CellPriceComponent,
  };

  displayedColumns = [
    { field: 'rank' },
    { field: 'name' },
    { field: 'currency'},
    {
      field: 'price',
      cellRenderer: 'cellPriceComponent',
    },
    {
      headerName: 'Last updated',
      field: 'price_timestamp',
      valueFormatter: (data: ICellRendererParams) => {
        return this.datePipe.transform(data.value, 'short');
      }
    }
  ];
  isLoadingResults = true;
  resultsLength = 0;

  currencies: CurrencyModel[];

  constructor(
    private datePipe: DatePipe,
    private nomicsService: NomicsService,
    private snackBar: MatSnackBar) {}

  ngAfterViewInit(): void {
    this.getCurrencies();
  }

  getCurrencies(): void {
    this.isLoadingResults = true;

    this.nomicsService.getCurrencies()
      .pipe(
        map(currencies => {
          this.isLoadingResults = false;
          this.resultsLength = currencies.length;

          return currencies;
        }),
        catchError(error => {
          this.isLoadingResults = false;
          console.log(error);
          this.showError(error.statusText);

          return of([]);
        }),
        take(1)
      ).subscribe(currencies => this.currencies = currencies);
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 4000,
    });
  }

}
