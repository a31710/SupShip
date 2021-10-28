import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard/auth.guard';
import { AdminComponent } from './admin.component';
import { RegisterUserComponent } from './register-user/register-user.component';


const routes: Routes = [{
  path: '', component: AdminComponent,
  children: [
    {
      path: 'register', component: RegisterUserComponent, canActivate: [AuthGuard]
    },
    {
      path: 'customer',
      loadChildren: () => import('./customer-manager/customer-manager.module')
        .then(m => m.CustomerManagerModule),
    },
    {
      path: 'user',
      loadChildren: () => import('./user-manager/user-manager.module')
        .then(m => m.UserManagerModule),
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
