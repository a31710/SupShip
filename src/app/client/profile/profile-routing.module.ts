import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';

import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileComponent } from './profile.component';


const routes: Routes = [{
  path: '', component: ProfileComponent,
  children: [
    {
      path: 'edit-profile', component: EditProfileComponent,
    },
    {
      path: 'change-pasword', component: ChangePasswordComponent,
    },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
