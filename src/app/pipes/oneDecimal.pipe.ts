import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'oneDecimal',
})
export class OneDecimalPipe implements PipeTransform {
  transform(value: number): string {
    return value % 1 === 0 ? value.toString() : value.toFixed(1);
  }
}
