import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {

  constructor(private cookieService: CookieService){

  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const header = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "POST",
      // "Authorization": `Bearer ${this.cookieService.get('token')}`
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    });

    const newReq = req.clone({ headers: header });

    return next.handle(newReq).pipe(
      catchError(err => {
        console.error('lỗi rồi:');
       return throwError(err);
      })
    )
  }
}
