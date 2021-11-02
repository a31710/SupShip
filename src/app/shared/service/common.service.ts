import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CommonService {

  constructor(private http: HttpClient) { }
  addPaginationParams(page: number, size: number):Observable<any> {
    return this.http.get<any>(`http://localhost:8085/api/lead/filter?page=${page}&size=${size}&sort=lastModifiedDate,desc`)
  }

}
