import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AuthService } from './auth/service/auth.service';
import { LoaderService } from './service/loader.service';
@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {

  constructor(private cookieService: CookieService, private authService: AuthService, public loaderService: LoaderService){

  }
  // intercept(
  //   req: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   const header = new HttpHeaders({
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin':'*',
  //     "Access-Control-Allow-Credentials": "true",
  //     "Access-Control-Allow-Methods": "POST",
  //     // "Authorization": `Bearer ${this.cookieService.get('token')}`
  //     "Authorization": `Bearer ${localStorage.getItem('token')}`
  //   });

  //   const newReq = req.clone({ headers: header });

  //   return next.handle(newReq).pipe(
  //     catchError((err:any) => {
  //       if (err instanceof HttpErrorResponse && err.status === 401) {

  //       }else{
  //         return throwError(err);
  //       }
  //     })
  //   )

  // }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.isLoading.next(true)
    const token:any = this.authService.getJwtToken();
    request = this.addToken(request, token);

    return next.handle(request).pipe(
      finalize(()=>{
        this.loaderService.isLoading.next(false)
      }),
      catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        console.log("Token hết hạn, đang làm mới Token");

        return this.handle401Error(request, next);
      }if (error instanceof HttpErrorResponse && error.status === 403) {
        Swal.fire({
          title: 'Bạn không có quyền truy cập?',
          icon: 'error',
          confirmButtonColor: '#4e73df',
          confirmButtonText: 'Chấp nhận'
        })
        return throwError(error);
      }else {
        return throwError(error);
      }

    }));
}

private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
        setHeaders: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*',
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "POST",
          // "Authorization": `Bearer ${this.cookieService.get('token')}`
          'Authorization': `Bearer ${token}`
        }
    });
}

private isRefreshing = false;
private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
        this.isRefreshing = true;
        this.refreshTokenSubject.next(null);
        return this.authService.refreshToken().pipe(
            finalize(()=>{
              this.loaderService.isLoading.next(false)
            }),
            switchMap((token: any) => {
                console.log(token?.data?.token);
                this.isRefreshing = false;
                this.refreshTokenSubject.next(token?.data?.token);
                return next.handle(this.addToken(request, token?.data?.token));
            })
        );
    } else {
        return this.refreshTokenSubject.pipe(
          finalize(()=>{
            this.loaderService.isLoading.next(false)
          }),
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
            return next.handle(this.addToken(request, jwt));
        }));
    }
}



}
