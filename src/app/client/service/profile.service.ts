import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient,) {

   }

  getUserInfor(userId: string):Observable<any>{
    return this.http.get(`http://localhost:8085/user/${userId}`);
  }

  updateUser(userData:any,userId: string):Observable<any>{
    return this.http.post<any>(`http://localhost:8085/user/${userId}/update`,userData);
  }

  getProvince(): Observable<any>{
    return this.http.get<any>('http://localhost:8085/province');
  }

  getDistrictById(cityId: number): Observable<any>{
    return this.http.get<any>(`http://localhost:8085/district?provinceCode=${cityId}`);
  }

  getWardById(district: number): Observable<any>{
    return this.http.get<any>(`http://localhost:8085/ward?districtCode=${district}`);
  }
  changePassword(body:any):Observable<any>{
    return this.http.post<any>('http://localhost:8085/user/password/change',body);
  }
}
