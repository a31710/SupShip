import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './client/home/home.component';

const routes: Routes = [
{
  path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
},
{
  path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
},
{
  path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
},
{
  path:'', component: HomeComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
