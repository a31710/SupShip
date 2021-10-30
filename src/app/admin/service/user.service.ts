import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private http: HttpClient) { }
    getDeptCode():Observable<any>{
      return this.http.get<any>('http://localhost:8085/dept/list');
    }
    getPostCode(deptCode:any):Observable<any>{
      return this.http.get<any>(`http://localhost:8085/post/list/${deptCode}`);
    }

    registerUser(body:any): Observable<any>{
      return this.http.post<any>('http://localhost:8085/user/register',body)
    }

}
