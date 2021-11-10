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




}



