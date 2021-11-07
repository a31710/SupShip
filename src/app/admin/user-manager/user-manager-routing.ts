
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserManagerComponent } from './user-manager.component';
import { ViewUserComponent } from './view-user/view-user.component';

const routes: Routes = [{
  path: '', component: UserManagerComponent,
  children: [
    {
      path: '', component: ViewUserComponent,
    },
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
