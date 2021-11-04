import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagerComponent } from './user-manager.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserManagerRoutingModule } from './user-manager-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewUserComponent } from './view-user/view-user.component';
import { SharedModule } from 'src/app/shared/share.module';

@NgModule({
  imports: [
    CommonModule,
    UserManagerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  declarations: [UserManagerComponent,CreateUserComponent, ViewUserComponent]
})
export class UserManagerModule { }
