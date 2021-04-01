import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyChangeModel } from '@core/models';

@Pipe({
  name: 'valueIncreased'
})
export class ValueIncreasedPipe implements PipeTransform {
  transform(change: CurrencyChangeModel): boolean {
    const priceChange = change?.price_change;

    return parseInt(priceChange, 10) > 0 ?? false;
  }
}
