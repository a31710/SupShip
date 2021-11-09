import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard/auth.guard';
import { ClientComponent } from './client.component';
import { CreateScheduleComponent } from './create-schedule/create-schedule.component';
import { HomeComponent } from './home/home.component';



const routes: Routes = [{
  path: '', component: ClientComponent,
  children: [
    {
      path: '', component: HomeComponent,
    },
    {
      path: 'profile',
      loadChildren: () => import('./profile/profile.module')
        .then(m => m.ProfileModule), canActivate: [AuthGuard],
    },
    {
      path: 'customer',
      loadChildren: () => import('./customer/customer.module')
        .then(m => m.CustomerModule), canActivate: [AuthGuard],
    },
    {
      path: 'create-schedule', component: CreateScheduleComponent,
    },

    { path: '**', redirectTo: '' },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
