import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerManagerComponent } from './customer-manager.component';
import { CustomerManagerRoutingModule } from './customer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';

@NgModule({
  imports: [
    CommonModule,
    CustomerManagerRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [CustomerManagerComponent,ViewCustomerComponent,UpdateCustomerComponent,CreateCustomerComponent]
})
export class CustomerManagerModule { }
