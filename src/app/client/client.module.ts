import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client-routing-module';
import { HeaderComponent } from './shared/header/header.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';


@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
  ],
  declarations: [ClientComponent,HeaderComponent,SideBarComponent]
})
export class ClientModule { }
