import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientPageComponent } from './client-page.component';
import { ClientPageRoutingModule } from './client-page-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    ClientPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [ClientPageComponent]
})
export class ClientPageModule { }
