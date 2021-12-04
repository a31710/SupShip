import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { LoaderService } from 'src/app/service/loader.service';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-post-report',
  templateUrl: './post-report.component.html',
  styleUrls: ['./post-report.component.css']
})
export class PostReportComponent implements OnInit, OnChanges {
  fromDate:any;
  toDate: Date = new Date;
  @Input() postCodeReport:any;
  postReportData:any
  promise:any
  constructor(private customerService: CustomerService, public loaderService: LoaderService) {
    this.fromDate =  new Date(this.toDate.getFullYear(), this.toDate.getMonth(), 1);

  }



  ngOnInit() {


  }
  ngOnChanges(){

    this.customerService.reportPostCode(this.datePipe(this.fromDate),this.datePipe(this.toDate),this.postCodeReport)
    .subscribe((data)=>{
      this.postReportData = data?.data;
      console.log(data);

    })
  }


  datePipe(date:any){
    return ('0' + date.getDate()).slice(-2) + '-'
    + ('0' + (date.getMonth()+1)).slice(-2) + '-'
    + date.getFullYear();
  }

}
