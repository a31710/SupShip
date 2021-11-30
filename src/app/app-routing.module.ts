import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './auth/auth-guard/admin.guard';
import { AuthGuard } from './auth/auth-guard/auth.guard';
import { HomeComponent } from './client/home/home.component';

const routes: Routes = [
{
    path: '',
    pathMatch: 'full',
    redirectTo: 'client'
},
{
  path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
},
{
  path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),canActivate: [AdminGuard]
},
{
  path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule),canActivate: [AuthGuard]
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
