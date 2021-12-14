import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard/auth.guard';
import { ClientComponent } from './client.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CreateScheduleComponent } from './create-schedule/create-schedule.component';
import { DetailCustomerComponent } from './detail-customer/detail-customer.component';
import { DetailScheduleComponent } from './detail-schedule/detail-schedule.component';
import { HomeComponent } from './home/home.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';




const routes: Routes = [{
  path: '', component: ClientComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo:'home'
    },{
      path: 'home', component: HomeComponent,
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
      path: 'create-schedule/:id', component: CreateScheduleComponent,
    },
    {
      path: 'create-customer', component: CreateCustomerComponent,
    },
    {
      path: 'customer/:id', component: DetailCustomerComponent,
    },
    {
      path: 'schedule/:id', component: DetailScheduleComponent,
    },
    {
      path: 'update-customer/:id', component: UpdateCustomerComponent,
    },

    { path: '**', redirectTo: '' },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
