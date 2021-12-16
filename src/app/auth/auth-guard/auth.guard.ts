import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Kiểm tra người dùng đã đăng nhập chưa
    const isAuthenticated = this.authService.isLoggedIn();
    if (isAuthenticated) {
        return true;
    } else {
      this.router.navigateByUrl('/auth/checkemail');
      Swal.fire({
        title: 'Truy cập không thành công? ',
        text: "Bạn cần đăng nhập để có thể truy cập trang này",
        icon: 'error',
        confirmButtonColor: '#4e73df',
        confirmButtonText: 'Chấp nhận'
      })

    }

    return true;
  }

}
