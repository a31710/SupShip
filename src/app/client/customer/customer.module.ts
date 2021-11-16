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
import { ReportComponent } from './report/report.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {ProgressBarModule} from 'primeng/progressbar';

@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MatTabsModule,
    MatButtonModule,
    CalendarModule,
    FormsModule,
    NgxChartsModule,
    ProgressBarModule
  ],
  declarations: [CustomerComponent,ReceiveComponent, ContactComponent,ReportComponent]
})
export class CustomerModule { }
