import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneNumberDirective } from './phone-number.directive';
import { DateDirective } from './date.directive';
import { MoneyDirective } from './money.directive';



@NgModule({
  declarations: [
    PhoneNumberDirective,
    DateDirective,
    MoneyDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[PhoneNumberDirective,DateDirective,MoneyDirective]
})
export class DirectiveModule { }
