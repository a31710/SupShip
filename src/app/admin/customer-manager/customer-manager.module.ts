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
import {InputNumberModule} from 'primeng/inputnumber';
import {InputMaskModule} from 'primeng/inputmask';
import { ContactReportComponent } from './contact-report/contact-report.component';
import { PostReportComponent } from './post-report/post-report.component';
import { DirectiveModule } from 'src/app/directive/directive.module';
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
    InputNumberModule,
    InputMaskModule,
    DirectiveModule,
  ],
  declarations: [CustomerManagerComponent,ViewCustomerComponent,UpdateCustomerComponent,CreateCustomerComponent,DetailCustomerComponent, ContactReportComponent,PostReportComponent]
})
export class CustomerManagerModule { }
