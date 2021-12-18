import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeThursdays } from 'd3-time';
import { post } from 'jquery';
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
    return this.http.get<any>(`${this.url}/api/lead/${id}`);
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

  getLeadStatus(page:any,size:any,status:any):Observable<any>{
    return this.http.get<any>(`${this.url}/api/lead/filter?page=${page}&size=${size}&status=${status}`)
  }

  getLeadByPostCode(podeCode:any):Observable<any>{
    return this.http.get<any>(`${this.url}/api/user/postcode?postCode=${podeCode}`);
  }

  contactExcel(body:any):Observable<any>{
    return this.http.post<any>(`${this.url}/api/lead-assigns/import`,body)
  }

  searchLead(fromDate:any,toDate:any,status:any):Observable<any>{
    return this.http.get<any>(`${this.url}/api/lead/filter?from=${fromDate}&to=${toDate}&status=${status}`);
  }

  searchLeadPagi(fromDate:any,toDate:any,status:any,page:any,size:any):Observable<any>{
    return this.http.get<any>(`${this.url}/api/lead/filter?from=${fromDate}&to=${toDate}&status=${status}&page=${page}&size=${size}`);
  }
  excelHistory():Observable<any>{
    return this.http.get<any>(`${this.url}/api/lead-assigns/history`);
  }
  detailHIstory(id:any):Observable<any>{
    return this.http.get<any>(`${this.url}/api/lead-assigns/import/${id}`)
  }

  DownloadFile(x :string):Observable<any>{
    const param = new HttpParams().set('filename',x);
    const options = {
      params: param
    };
    return this.http.get(`${this.url}/api/lead-assigns/templates/download`,{...options, responseType: 'blob'} );
  }
  LeadAssign(body:any):Observable<any>{
    return this.http.post<any>(`${this.url}/api/lead-assigns`,body)
  }

  ReportAllCompany(from:any, to:any):Observable<any>{
    return this.http.get<any>(`${this.url}/api/report?from=${from}&to=${to}`);
  }
  reportPostCode(from:any, to:any, postCode:any):Observable<any>{
    return this.http.get<any>(`${this.url}/api/report/post?from=${from}&to=${to}&post=${postCode}`);
  }

  searchIdLead(req:any):Observable<any>{
    return this.http.get<any>(`${this.url}/api/lead/search?key=${req}`)
  }

  searchDeptcodeReport(from:any, to:any, dept:any):Observable<any>{
    return this.http.get<any>(`${this.url}/api/report?from=${from}&to=${to}&dept=${dept}`);
  }

  exportExcelReport(x: string):Observable<any>{
    const param = new HttpParams().set('filename',x);
    const options = {
      params: param
    };
    return this.http.get(`${this.url}/api/report/export-excel`,{...options, responseType: 'blob'});
  }

  exportExcelTuyen(x: string):Observable<any>{
    const param = new HttpParams().set('filename',x);
    const options = {
      params: param
    };
    return this.http.get(`${this.url}/api/report/export-route`,{...options, responseType: 'blob'});
  }
  exportExcelCN(x: string):Observable<any>{
    const param = new HttpParams().set('filename',x);
    const options = {
      params: param
    };
    return this.http.get(`${this.url}/api/report/export-cn`,{...options, responseType: 'blob'});
  }
  exportExcelBC(x: string):Observable<any>{
    const param = new HttpParams().set('filename',x);
    const options = {
      params: param
    };
    return this.http.get(`${this.url}/api/report/export-bc`,{...options, responseType: 'blob'});
  }

  fillCbx():Observable<any>{
    return this.http.get<any>(`${this.url}/fillCbx`)
  }
}
