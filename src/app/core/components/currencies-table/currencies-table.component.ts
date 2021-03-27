import { AfterViewInit, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NomicsService } from '@core/services';

import { CurrencyModel } from '@core/models';

import { catchError, map, take } from 'rxjs/operators'
import { of } from 'rxjs';

@Component({
  selector: 'app-currencies-table',
  template: `
    <div class="header">
      <span>Markets</span>

      <button mat-icon-button [disabled]="isLoadingResults" color="primary" (click)="getCurrencies()">
        <mat-icon>refresh</mat-icon>
      </button>
    </div>

    <div class="example-container">

      <div 
        class="example-loading-shade"
        *ngIf="isLoadingResults">
        <mat-spinner></mat-spinner>
      </div>

      <table
        *ngIf="!isLoadingResults"
        mat-table
        class="example-table"
        [dataSource]="currencies">
        <ng-container matColumnDef="rank">
          <th mat-header-cell *matHeaderCellDef>Rank</th>
          <td mat-cell *matCellDef="let row">{{row.rank}}</td>
        </ng-container>

        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Currency</th>
          <td mat-cell *matCellDef="let row">{{row.name}}</td>
        </ng-container>

        <ng-container matColumnDef="currency">
          <th mat-header-cell *matHeaderCellDef>Currency</th>
          <td mat-cell *matCellDef="let row">{{row.currency}}</td>
        </ng-container>

        <ng-container matColumnDef="price">
          <th mat-header-cell *matHeaderCellDef>Price</th>
          <td mat-cell *matCellDef="let row">
            {{row.price}}

            <mat-icon
              class="price-change"
              [class.price-change--negative]="!(row['1d'] | valueIncreased)">
              {{ (row['1d'] | valueIncreased)
                ? 'arrow_upward'
                : 'arrow_downward' }}
            </mat-icon>
          </td>
        </ng-container>

        <ng-container matColumnDef="price_date">
          <th mat-header-cell *matHeaderCellDef>Last Updated</th>
          <td mat-cell *matCellDef="let row">{{row.price_timestamp | date : 'medium' }}</td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styleUrls: ['./currencies-table.component.scss']
})
export class CurrenciesTableComponent implements AfterViewInit {

  displayedColumns: string[] = ['rank', 'name', 'currency', 'price', 'price_date'];
  isLoadingResults = true;
  resultsLength: number = 0;

  currencies: CurrencyModel[];

  constructor(
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
