import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../login/model/login-model';
import { LoginResponse } from '../login/model/login-response';
import { map } from 'rxjs/operators';
import { VertifyEmail } from '../login/model/vertify-email';
import { VertifyResponse } from '../login/model/vertify-response';
import { CheckResponse } from '../login/model/check-response';
import { environment } from 'src/environments/environment';
import { ChangePassword } from '../login/model/change-password';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<String> = new EventEmitter();
constructor(private http: HttpClient, ) { }

vertifyEmail(vertifyEmail: VertifyEmail): Observable<any>{
  return this.http.post<VertifyResponse>('http://localhost:8085/user/verify', vertifyEmail)
  .pipe(map(data =>{
      localStorage.setItem("isVertify",data.success);
      return true;
  }));
}
login(loginModel: LoginModel): Observable<any>{
  return this.http.post<LoginResponse>('http://localhost:8085/user/login', loginModel)
  .pipe(map(data =>{
    localStorage.setItem("isLogin",data.success);
    localStorage.setItem("token",data.data.token);
    this.loggedIn.emit(true);
    return true;
  }));
}

checkEmail(email: string): Observable<any>{
  return this.http.post<CheckResponse>('http://localhost:8085/user/check-email', email)
  .pipe(map(data =>{
    localStorage.setItem("isCheck",data.success);
    return true;
  }));
}

forgotPassword(email:string):Observable<any>{
  return this.http.post<any>('http://localhost:8085/user/password/forgot', email)
}
changePassword(changeModel: ChangePassword):Observable<any>{
  return this.http.post<any>('http://localhost:8085/user/password/change', changeModel)
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
  return this.getLogin() == 'true';
}

}
