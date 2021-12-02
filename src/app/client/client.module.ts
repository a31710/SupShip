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
import { DetailCustomerComponent } from './detail-customer/detail-customer.component';
import { TimelineModule } from "primeng/timeline";
import { CardModule } from "primeng/card";
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {InputMaskModule} from 'primeng/inputmask';
import { HomeComponent } from './home/home.component';
import { DetailScheduleComponent } from './detail-schedule/detail-schedule.component';
import { DirectiveModule } from '../directive/directive.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { PipeModule } from '../pipe/pipe.module';
@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    MatTabsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    SelectButtonModule,
    TimelineModule,
    CardModule,
    CalendarModule,
    InputTextModule,
    InputMaskModule,
    DirectiveModule,
    NgSelectModule,
    PipeModule,
  ],
  declarations: [ClientComponent,HeaderComponent,SideBarComponent,CreateScheduleComponent,CreateCustomerComponent, DetailCustomerComponent,HomeComponent,DetailScheduleComponent]
})
export class ClientModule { }
