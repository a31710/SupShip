import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   const role = localStorage.getItem('roles');
   console.log(role);

   if (role == 'NV') {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Bạn không có quyền đang nhập vào trang này',
      showConfirmButton: false,
      timer: 3000
    })
    this.router.navigateByUrl('/client');
    return false;
  }
  if(role == "TCB" || role == "TCB"){
    return true
  }
    return true;
  }

}
