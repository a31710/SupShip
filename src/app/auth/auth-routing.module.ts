import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CheckemailComponent } from './checkemail/checkemail.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [{
  path: '', component: AuthComponent,
  children: [
    {
      path: 'login', component: LoginComponent,
    },
    {
      path: 'checkemail', component: CheckemailComponent,
    },
    {
      path: 'forgot-password', component: ForgotPasswordComponent,
    },
    {
      path: 'change-password', component: ChangePasswordComponent,
    },
    { path: '**', redirectTo: 'checkemail' },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
