import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './auth/auth-guard/admin.guard';
import { AuthGuard } from './auth/auth-guard/auth.guard';
import { LoggedGuard } from './auth/auth-guard/logged.guard';
import { HomeComponent } from './client/home/home.component';

const routes: Routes = [
{
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/checkEmail',
},
{
  path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate:[LoggedGuard]
},
{
  path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),canActivate: [AuthGuard,AdminGuard ]
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
