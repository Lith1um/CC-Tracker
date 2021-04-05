import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyChangeModel } from '@core/models';

@Pipe({
  name: 'valueIncreased'
})
export class ValueIncreasedPipe implements PipeTransform {
  transform(change: number): boolean {
    if (isNaN(change)) {
      return;
    }
    return change > 0;
  }
}
