import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-post-report',
  templateUrl: './post-report.component.html',
  styleUrls: ['./post-report.component.css']
})
export class PostReportComponent implements OnInit {
  fromDate:any;
  toDate: Date = new Date;
  @Input() postCodeReport:any;
  postReportData:any
  constructor(private customerService: CustomerService) {
    this.fromDate =  new Date(this.toDate.getFullYear(), this.toDate.getMonth(), 1);
  }

  ngOnInit() {
    this.customerService.reportPostCode(this.datePipe(this.fromDate),this.datePipe(this.toDate),this.postCodeReport)
    .subscribe((data)=>{
      this.postReportData = data?.data;
    })

  }
  datePipe(date:any){
    return ('0' + date.getDate()).slice(-2) + '-'
    + ('0' + (date.getMonth()+1)).slice(-2) + '-'
    + date.getFullYear();
  }

}
