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

  getDetailCustomer(id:any):Observable<any>{
    return this.http.get<any>(`http://localhost:8085/api/lead/evtp/${id}`);
  }

  updateCustomer(id:any, body:any):Observable<any>{
    return this.http.put<any>(`http://localhost:8085/api/lead/evtp/${id}`,body)
  }
  deleteCustomer(id:any):Observable<any>{
    return this.http.delete<any>(`http://localhost:8085/api/lead/evtp/${id}`);
  }
}
