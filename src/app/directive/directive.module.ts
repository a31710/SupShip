import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneNumberDirective } from './phone-number.directive';
import { DateDirective } from './date.directive';
import { MoneyDirective } from './money.directive';
import { TimeDirective } from './time.directive';



@NgModule({
  declarations: [
    PhoneNumberDirective,
    DateDirective,
    MoneyDirective,
      TimeDirective
   ],
  imports: [
    CommonModule
  ],
  exports:[PhoneNumberDirective,DateDirective,MoneyDirective,TimeDirective]
})
export class DirectiveModule { }
