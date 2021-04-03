// Angular
import { Component } from '@angular/core';

// Models
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'cct-cell-price',
  template: `
    <mat-icon
      class="price-change"
      [class.price-change--negative]="!(delta | valueIncreased)">
      {{ (delta | valueIncreased)
        ? 'keyboard_arrow_up'
        : 'keyboard_arrow_down' }}
    </mat-icon>

    <span>{{price}} <ng-container *ngIf="pct">({{pct}}%)</ng-container></span>
  `,
  styleUrls: ['./cell-price.component.scss']
})
export class CellPriceComponent {
  price: string;
  pct: string;
  delta: string;

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    this.price = params.value;
    this.pct = params.data['1d']?.price_change_pct;
    this.delta = params.data['1d'];
  }
}
