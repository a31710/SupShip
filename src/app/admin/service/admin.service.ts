import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url = environment.url;
  constructor(private http: HttpClient,) { }

  getProvince(): Observable<any>{
    return this.http.get<any>(`${this.url}/province`);
  }

  getDistrictById(cityId: number): Observable<any>{
    return this.http.get<any>(`${this.url}/district?provinceCode=${cityId}`);
  }

  getWardById(district: number): Observable<any>{
    return this.http.get<any>(`${this.url}/ward?districtCode=${district}`);
  }

  insertCustomer(body:any): Observable<any>{
    return this.http.post<any>(`${this.url}/api/lead/createWeb`, body);
  }
}
