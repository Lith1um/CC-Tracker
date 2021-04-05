// Angular
import { ChangeDetectionStrategy, Component } from '@angular/core';

// Models
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'cct-cell-price',
  template: `
    <mat-icon
      class="price-change"
      [class.price-change--negative]="!(change | valueIncreased)">
      {{ (change | valueIncreased)
        ? 'keyboard_arrow_up'
        : 'keyboard_arrow_down' }}
    </mat-icon>

    <span>{{price}} <ng-container *ngIf="pct">({{pct}}%)</ng-container></span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./cell-price.component.scss']
})
export class CellPriceComponent {
  price: number;
  pct: number;
  change: number;

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    this.price = Math.round((parseFloat(params.value) + Number.EPSILON) * 100000) / 100000;
    this.change = parseFloat(params.data['1d']?.price_change);

    const priceChangePct = parseFloat(params.data['1d']?.price_change_pct) * 100;
    this.pct = Math.round((priceChangePct + Number.EPSILON) * 100) / 100;
  }
}
