import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  public indexTab = 0;
  url = environment.url;
constructor(private http: HttpClient) { }

listSchedule(date:any):Observable<any>{
  return this.http.get<any>(`${this.url}/api/schedules?date=${date}`);
}

listScheduleMonth(month:any):Observable<any>{
  return this.http.get<any>(`${this.url}/api/schedules?month=${month}`);
}
detailSchedule(id:any):Observable<any>{
  return this.http.get<any>(`${this.url}/api/schedules/${id}`);
}
updateSchedule(body:any):Observable<any>{
  return this.http.post<any>(`${this.url}/api/results`,body)
}
}
