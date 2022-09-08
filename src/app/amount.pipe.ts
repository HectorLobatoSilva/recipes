import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'amount' })
export class AmountPipe implements PipeTransform {
  transform(value: any, type: string = 'KG', limit: number = 2) {
    return `${value.toFixed(limit)} ${type}`;
  }
}
