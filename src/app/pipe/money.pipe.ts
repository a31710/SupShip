import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    const output = this.numberWithCommas(value);
    return `${output} VNĐ`;
  }

  numberWithCommas(x:any) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

}
