import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  url = environment.url;
constructor(private http: HttpClient) { }

listSchedule(date:any):Observable<any>{
  return this.http.get<any>(`${this.url}/api/schedules?date=${date}`);
}

listScheduleMonth(month:any):Observable<any>{
  return this.http.get<any>(`${this.url}/api/schedules?month=${month}`);
}

}
