import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

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
    console.log(this.authService.isLoggedIn());

    if (isAuthenticated) {
        return true;
    } else {
        this.toastr.error("Bạn cần đăng nhập để có quyền truy cập trang này");
        this.router.navigateByUrl('/auth/checkemail');
    }

    return true;
  }

}
