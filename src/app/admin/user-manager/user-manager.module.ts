import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagerComponent } from './user-manager.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserManagerRoutingModule } from './user-manager-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    UserManagerRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [UserManagerComponent,CreateUserComponent]
})
export class UserManagerModule { }
