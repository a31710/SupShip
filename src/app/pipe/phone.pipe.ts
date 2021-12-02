import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return this.formatPhone(value);
  }

  formatPhone(x:any) {
    return x?.toString().replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '$1 $2 $3');
  }

}
