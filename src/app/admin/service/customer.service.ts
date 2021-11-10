import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
url = environment.url;
constructor(private http: HttpClient) { }


  getAllCustomer(): Observable<any>{
    return this.http.get<any>(`${this.url}/api/lead/filter`);
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

  insertCustomer(body:any): Observable<any>{
    return this.http.post<any>(`${this.url}/api/lead/createWeb`, body);
  }

  getDetailCustomer(id:any):Observable<any>{
    return this.http.get<any>(`${this.url}/api/lead/evtp/${id}`);
  }

  updateCustomer(id:any, body:any):Observable<any>{
    return this.http.put<any>(`${this.url}/api/lead/evtp/${id}`,body)
  }
  deleteCustomer(id:any):Observable<any>{
    return this.http.delete<any>(`${this.url}/api/lead/evtp/${id}`);
  }
  getCustomerPagi(page:any, size:any):Observable<any>{
    return this.http.get<any>(`${this.url}/api/lead/filter?page=${page}&size=${size}&sort=lastModifiedDate,desc`)
  }

  getLeadStatus(status:any):Observable<any>{
    return this.http.get<any>(`${this.url}/api/lead/filter?status=${status}`)
  }
}
