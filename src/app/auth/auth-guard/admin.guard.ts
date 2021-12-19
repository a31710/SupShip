import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   const role = this.cookieService.get('roles');

   if (role == 'NV') {
    Swal.fire({
      title: 'Truy cập không thành công? ',
      text: "Bạn không có quyền truy cập vào trang này",
      icon: 'error',
      confirmButtonColor: '#4e73df',
      confirmButtonText: 'Chấp nhận'
    })
    this.router.navigateByUrl('/client/home');
    return false;
  }
  if(role == "TCB" || role == "TCB"){
    return true
  }
    return true;
  }

}
