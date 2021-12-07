import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../service/customer.service';
import { PrimeIcons } from "primeng/api";
import { LoaderService } from 'src/app/service/loader.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.css']
})
export class DetailCustomerComponent implements OnInit {
  events1: any[] |any = [];
  leadData:any
  constructor(private customerService: CustomerService, private activateRoute: ActivatedRoute,public loaderService: LoaderService, private datePipe: DatePipe) {
    this.activateRoute.params.subscribe(param=>{
      const id = param['id']
      this.customerService.getDetailCustomer(id).subscribe(data=>{
        this.leadData = [data];
        console.log(data);

        if(data?.schedules && data?.schedules[0]?.result){
          this.events1.push({status:'Ngày cập nhật kết quả',
          date:  this.datePipe.transform( data?.schedules[data?.schedules.length-1]?.result?.createdDate,'dd/MM - hh:mm a '),
          color:'#858796',
          result: data?.schedules[data?.schedules.length-1]?.result?.status
         })
        }

        if(data.schedules){
          this.events1.push({status:'Ngày đặt lịch tiếp xúc', date:  this.datePipe.transform( data?.schedules[data?.schedules.length-1]?.createDate,'dd/MM - hh:mm a '),color:'#858796'})
        }
        if(data.leadAssigns){
          this.events1.push({status:'Ngày giao tiếp xúc', date:  this.datePipe.transform( data.leadAssigns[data?.leadAssigns.length-1]?.createdDate,'dd/MM - hh:mm a '),color:'#858796'})
        }
        this.events1.push({status:'Ngày tạo khách hàng', date: this.datePipe.transform(data?.createDate,'dd/MM - hh:mm a') ,color:'#858796' })
        this.events1[0].color = '#4e73df'
      })
    })
   }

  ngOnInit() {


  }


}
