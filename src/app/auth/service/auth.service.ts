import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../login/model/login-model';
import { LoginResponse } from '../login/model/login-response';
import { map } from 'rxjs/operators';
import { VertifyEmail } from '../login/model/vertify-email';
import { VertifyResponse } from '../login/model/vertify-response';
import { CheckResponse } from '../login/model/check-response';
import { ChangePassword } from '../login/model/change-password';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() userId: EventEmitter<String> = new EventEmitter();
  url = environment.url
constructor(private http: HttpClient,private cookieService: CookieService, ) {
}

vertifyEmail(vertifyEmail: VertifyEmail): Observable<any>{
  return this.http.post<VertifyResponse>(`${this.url}/user/verify`, vertifyEmail)
}
login(loginModel: LoginModel): Observable<any>{
  return this.http.post<LoginResponse>(`${this.url}/user/login`, loginModel)
  .pipe(map(data =>{
    console.log(data);
    localStorage.setItem("isLogin",data?.error);
    localStorage.setItem("userId",data?.data?.userUid)
    this.cookieService.set('token', data?.data?.token);
    if(data?.error == 'false'){
      this.userInfo(data.data.userUid).subscribe(data=>{
        localStorage.setItem('empSystemId',data?.data?.empSystemId);
        this.cookieService.set('empSystemId', data?.data?.empSystemId);
        this.cookieService.set('roles', data?.data?.roles);
        localStorage.setItem("username",data?.data?.fullName);
        localStorage.setItem('deptCode', data?.data?.deptCode);
        localStorage.setItem('postCode', data?.data?.postCode);
      })
    }
    this.userId.emit(data?.data?.userUid);
    this.loggedIn.emit(true);
    return data;
  }));
}

checkEmail(email: string): Observable<any>{
  return this.http.post<CheckResponse>(`${this.url}/user/check-email`, email)
  .pipe(map(data =>{
    localStorage.setItem("isVertify",data.data == 1?'true':'false');
    return data;
  }));
}

refreshToken():Observable<any>{
  return this.http.get<any>(`${this.url}/user/refresh-token`);
}


forgotPassword(email:string):Observable<any>{
  return this.http.post<any>(`${this.url}/user/password/forgot`, email)
}
changePassword(changeModel: ChangePassword):Observable<any>{
  return this.http.post<any>(`${this.url}/user/password/change`, changeModel)
}

checkUpdate(email: string): Observable<any>{
  return this.http.post<any>(`${this.url}/user/check-update`, email)
  .pipe(map(data =>{
    localStorage.setItem("isUpdate",data.success);
    return true;
  }));

}

userInfo(id:any):Observable<any>{
  return this.http.get<any>(`${this.url}/user/${id}`)
}

logOut(){
  localStorage.clear();
  this.cookieService.deleteAll();

}


getVertify(){
  return localStorage.getItem("isVertify");
}

getLogin(){
  return localStorage.getItem("isLogin");
}
getCheck(){
  return localStorage.getItem("isCheck");
}

isLoggedIn(): boolean {
  return this.getLogin() == 'false';
}
getUpdate(){
  return localStorage.getItem("isUpdate");
}
getJwtToken(){
  return this.cookieService.get('token');
}

getRole(){
  return this.cookieService.get('roles');
}

getDeptCode(){
  return localStorage.getItem('deptCode');
}

getPostCode(){
  return localStorage.getItem('postCode');
}

}
