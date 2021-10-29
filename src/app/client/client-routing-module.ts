import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard/auth.guard';
import { ClientComponent } from './client.component';



const routes: Routes = [{
  path: '', component: ClientComponent,
  children: [
    {
      path: 'profile',
      loadChildren: () => import('./profile/profile.module')
        .then(m => m.ProfileModule), canActivate: [AuthGuard],
    },

    { path: '**', redirectTo: '' },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
