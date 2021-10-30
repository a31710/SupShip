import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

constructor(private http: HttpClient) { }


  getAllCustomer(): Observable<any>{
    return this.http.get<any>('http://localhost:8085/api/lead/filter');
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

  insertCustomer(body:any): Observable<any>{
    return this.http.post<any>('http://localhost:8085/api/lead/createWeb', body);
  }



}
