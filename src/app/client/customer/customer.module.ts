import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { CustomerRoutingModule } from './customer-routing.module';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import { ReceiveComponent } from './receive/receive.component';

@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MatTabsModule,
    MatButtonModule,

  ],
  declarations: [CustomerComponent,ReceiveComponent]
})
export class CustomerModule { }
