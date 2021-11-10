import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client-routing-module';
import { HeaderComponent } from './shared/header/header.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CreateScheduleComponent } from './create-schedule/create-schedule.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import {MatStepperModule} from '@angular/material/stepper';
import {SelectButtonModule} from 'primeng/selectbutton';
@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    MatTabsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    SelectButtonModule
  ],
  declarations: [ClientComponent,HeaderComponent,SideBarComponent,CreateScheduleComponent,CreateCustomerComponent]
})
export class ClientModule { }
