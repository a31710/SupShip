import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/service/loader.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.css']
})
export class DetailCustomerComponent implements OnInit,OnChanges {
  infoCusomter:any;
  events1: any[] |any = [];
  @Input() idUpdate:any;
  @Input() loadUpdate:any;
  @Output() deleteId: EventEmitter<any>;
  @Output() updateId: EventEmitter<any>;
  constructor(private customerSerivce: CustomerService, public loaderService: LoaderService, private datePipe: DatePipe) {
    this.deleteId = new EventEmitter<any>();
    this.updateId = new EventEmitter<any>();
   }

  ngOnChanges(){
   if(this.loadUpdate){
    this.customerSerivce.getDetailCustomer(this.idUpdate).subscribe((data)=>{
      this.infoCusomter = [data];
      this.events1 = [
      ];
      if(data.schedules){
        this.events1.push({status:'Ngày cập nhật kết quả',
        date:  this.datePipe.transform( data.schedules[data.schedules.length-1]?.result?.createdDate,'dd/MM - hh:mm a '),
        color:'#858796',
        result: data.schedules[data.schedules.length-1]?.result?.status
       })
        this.events1.push({status:'Ngày đặt lịch tiếp xúc', date:  this.datePipe.transform( data.schedules[data.schedules.length-1]?.createDate,'dd/MM - hh:mm a '),color:'#858796'})

      }
      if(data.leadAssigns){
        this.events1.push({status:'Ngày giao tiếp xúc', date:  this.datePipe.transform( data.leadAssigns[data.leadAssigns.length-1]?.createdDate,'dd/MM - hh:mm a '),color:'#858796'})
      }
      this.events1.push({status:'Ngày tạo khách hàng', date: this.datePipe.transform(data?.createDate,'dd/MM - hh:mm a') ,color:'#858796' })
      this.events1[0].color = '#4e73df'
      console.log(this.events1)
    })
   }
  }

  ngOnInit() {

    this.customerSerivce.getDetailCustomer(this.idUpdate).subscribe((data)=>{
      this.infoCusomter = [data];
      this.events1 = [
      ];
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
      console.log(this.events1)
    })


  }

  onDelete(id:any){
    this.deleteId.emit(id);
  }
  onUpdate(id:any){
    this.updateId.emit(id);
  }
}
