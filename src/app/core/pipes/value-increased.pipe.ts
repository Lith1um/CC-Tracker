import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyChangeModel } from '@core/models';

@Pipe({
  name: 'valueIncreased'
})
export class ValueIncreasedPipe implements PipeTransform {
  transform(change: CurrencyChangeModel) {
    const priceChange = change?.price_change;

    return parseInt(priceChange) > 0 ?? false;
  }
}
