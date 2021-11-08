import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  url = environment.url
  constructor(private http: HttpClient,) {

   }

  getUserInfor(userId: string):Observable<any>{
    return this.http.get(`${this.url}/user/${userId}`);
  }

  updateUser(userData:any,userId: string):Observable<any>{
    return this.http.post<any>(`${this.url}/user/${userId}/update`,userData);
  }

  getProvince(): Observable<any>{
    return this.http.get<any>(`${this.url}/province`);
  }

  getDistrictById(cityId: number): Observable<any>{
    return this.http.get<any>(`${this.url}/district?provinceCode=${cityId}`);
  }

  getWardById(district: number): Observable<any>{
    return this.http.get<any>(`${this.url}/ward?districtCode=${district}`);
  }
  changePassword(body:any):Observable<any>{
    return this.http.post<any>(`${this.url}/user/password/change`,body);
  }
}
