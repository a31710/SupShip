import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { CustomerRoutingModule } from './customer-routing.module';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import { ReceiveComponent } from './receive/receive.component';
import { ContactComponent } from './contact/contact.component';
import {CalendarModule} from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MatTabsModule,
    MatButtonModule,
    CalendarModule,
    FormsModule,
  ],
  declarations: [CustomerComponent,ReceiveComponent, ContactComponent]
})
export class CustomerModule { }
