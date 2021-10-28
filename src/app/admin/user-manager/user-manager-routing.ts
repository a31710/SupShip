
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserManagerComponent } from './user-manager.component';

const routes: Routes = [{
  path: '', component: UserManagerComponent,
  children: [
    // {
    //   path: '', component: ViewStaffComponent,
    // },
    {
      path: 'create-user', component: CreateUserComponent,
    },
    // {
    //   path: 'update-staff/:id', component: UpdateStaffComponent,
    // },
    // {
    //   path: 'detail-staff/:id', component: DetailStaffComponent,
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserManagerRoutingModule { }
