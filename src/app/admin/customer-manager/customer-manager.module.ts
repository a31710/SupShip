import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerManagerComponent } from './customer-manager.component';
import { CustomerManagerRoutingModule } from './customer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { SharedModule } from 'src/app/shared/share.module';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { DetailCustomerComponent } from './detail-customer/detail-customer.component';
@NgModule({
  imports: [
    CommonModule,
    CustomerManagerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MatTabsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,

  ],
  declarations: [CustomerManagerComponent,ViewCustomerComponent,UpdateCustomerComponent,CreateCustomerComponent,DetailCustomerComponent]
})
export class CustomerManagerModule { }
