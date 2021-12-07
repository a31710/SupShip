import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  url = environment.url
constructor(private http: HttpClient) { }

  createCustomer(body:any):Observable<any>{
    return this.http.post<any>(`${this.url}/api/lead`,body);
  }

  getLeadByUser():Observable<any>{
    return this.http.get<any>(`${this.url}/api/lead?status=ALL`);
  }

  getLeadByStatus(status:any):Observable<any>{
    return this.http.get<any>(`${this.url}/api/lead?status=${status}`);
  }

  getDetailCustomer(id:any):Observable<any>{
    return this.http.get<any>(`${this.url}/api/lead/${id}`);
  }
  createSchedule(body:any):Observable<any>{
    return this.http.post<any>(`${this.url}/api/schedules/save`,body)
  }

  searchLead(key:any):Observable<any>{
    return this.http.get<any>(`${this.url}/api/lead?status=ALL&key=${key}`);
  }



}



