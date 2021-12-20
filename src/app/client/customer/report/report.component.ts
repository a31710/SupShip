import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoaderService } from 'src/app/service/loader.service';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  tltx:any;
  tlht:any;
  reportData:any
  value = 30;
  single:any
  view: any[] = [110, 110];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = true;
  dateValue: Date = new Date;
  successPct:any;
  contactingPct:any;
  failPct:any;
  colorScheme = {
    domain: ['#f6c23e', '#1cc88a', '#e74a3b']
  };
  empSystemId:any


  constructor(private cookieService: CookieService, private customerService: CustomerService, public loaderService: LoaderService ) {
    this.fetchApi(this.dateValue);

  }

  fetchApi(month:any){
    this.customerService.reportApp(this.datePipe(month)).subscribe(data=>{
      console.log(data);
      if(data?.successes + data?.fails == 0){
        this.tltx = 0;
      }else{
        this.tltx = (data?.successes + data?.fails)*100/(data?.totalAssigns);
      }
      if(data?.contacting == 0){
        this.tlht = 0;
      }else{
        this.tlht = (data?.contacting)*100/(data?.totalAssigns);
      }

      data?.successes == 0? this.successPct = 0: this.successPct = (data?.successes/(data?.successes +  data?.fails + data?.contacting)).toFixed(2);
      data?.fails == 0? this.failPct = 0: this.failPct = (data?.fails/(data?.successes +  data?.fails + data?.contacting)).toFixed(2);
      data?.contacting == 0? this.contactingPct = 0: this.contactingPct = (data?.contacting/(data?.successes +  data?.fails + data?.contacting)).toFixed(2);
      this.single=[ {
        "name": "Đang tiếp xúc",
        "value": data?.contacting
      },
      {
        "name": "Thành công",
        "value": data?.successes
      },
      {
        "name": "Thất bại",
        "value": data?.fails
      }];
      this.reportData = [data];
    })
  }

  onChangeDay(day:any){
   // do something here
   }

  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  ngOnInit() {
  }
  onChangeMonth(date:any){
   this.fetchApi(date);
  }

  datePipe(date:any){
    const day =  date.getDate();
    const month = date.getMonth()+1;
    const year = date.getYear().toString().substring(1,3);
    return `${month<10?`0${month}`:month}-20${year}`
  }


}
