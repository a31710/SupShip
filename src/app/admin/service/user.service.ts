import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
url = environment.url;
constructor(private http: HttpClient) { }
    getDeptCode():Observable<any>{
      return this.http.get<any>(`${this.url}/dept/list`);
    }
    getPostCode(deptCode:any):Observable<any>{
      return this.http.get<any>(`${this.url}/post/list/${deptCode}`);
    }

    registerUser(body:any): Observable<any>{
      return this.http.post<any>(`${this.url}/user/register`,body)
    }

    getListUser():Observable<any>{
      return this.http.get<any>(`${this.url}/user/list?page=1&size=5&desc`);
    }
    banUser(uid:any):Observable<any>{
      return this.http.post<any>(`${this.url}/user/ban-user`,uid);
    }
    unlockUser(uid:any):Observable<any>{
      return this.http.post<any>(`${this.url}/user/unlock-user`,uid);
    }
    searchUser(req:any):Observable<any>{
      return this.http.get<any>(`${this.url}/user?keyword=${req}`);
    }
}
