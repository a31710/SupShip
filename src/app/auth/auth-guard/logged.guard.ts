import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Kiểm tra người dùng đã đăng nhập chưa
    const isLogged = this.authService.isLoggedIn();
    if (!isLogged) {
        return true;
    } else {
      this.router.navigateByUrl('/client/home');
    }
    return true;
  }

}
