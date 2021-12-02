import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagerComponent } from './user-manager.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserManagerRoutingModule } from './user-manager-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewUserComponent } from './view-user/view-user.component';
import { SharedModule } from 'src/app/shared/share.module';
import {MatTabsModule} from '@angular/material/tabs';
import { NgSelectModule } from '@ng-select/ng-select';
import { PipeModule } from 'src/app/pipe/pipe.module';
@NgModule({
  imports: [
    CommonModule,
    UserManagerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MatTabsModule,
    NgSelectModule,
    PipeModule,


  ],
  declarations: [UserManagerComponent,CreateUserComponent, ViewUserComponent]
})
export class UserManagerModule { }
