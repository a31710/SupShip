import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { LoaderService } from 'src/app/service/loader.service';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-post-report',
  templateUrl: './post-report.component.html',
  styleUrls: ['./post-report.component.css']
})
export class PostReportComponent implements OnInit, OnChanges {
  reportData:any;
  fromDate:any;
  toDate: Date = new Date;
  @Input() postCodeReport:any;
  postReportData:any
  promise:any;
  offset: number = 0;
  limit: number = 15;
  size:any
  pagiData:any
  constructor(private customerService: CustomerService, public loaderService: LoaderService) {
    this.fromDate =  new Date(this.toDate.getFullYear(), this.toDate.getMonth(), 1);

  }



  ngOnInit() {


  }
  ngOnChanges(){

    this.customerService.reportPostCode(this.datePipe(this.fromDate),this.datePipe(this.toDate),this.postCodeReport)
    .subscribe((data)=>{
      this.reportData = data;
      this.postReportData = data?.data;
      console.log(data);
      this.size = this.postReportData.length;
      this.pagiData = this.paginate(this.postReportData,15,1);

    })
  }

  paginate(array:any, page_size:any, page_number:any) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }
  onPageChange(offset:any){
    this.offset = offset;
    this.pagiData = this.paginate(this.postReportData,this.limit,(this.offset/this.limit)+1);
  }


  datePipe(date:any){
    return ('0' + date.getDate()).slice(-2) + '-'
    + ('0' + (date.getMonth()+1)).slice(-2) + '-'
    + date.getFullYear();
  }

  onSearch(){
    this.customerService.reportPostCode(this.datePipe(this.fromDate),this.datePipe(this.toDate),this.postCodeReport)
    .subscribe((data)=>{
      this.reportData = data;
      this.postReportData = data?.data;
      console.log(data);
      this.size = this.postReportData.length;
      this.pagiData = this.paginate(this.postReportData,15,1);

    })
  }

}
