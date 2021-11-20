import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonePipe } from './phone.pipe';
import { MoneyPipe } from './money.pipe';



@NgModule({
  declarations: [
    PhonePipe,
    MoneyPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PhonePipe,MoneyPipe
  ]
})
export class PipeModule { }
