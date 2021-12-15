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
    this.customerSerivce.getDetailCustomer(this.idUpdate).subscribe((data)=>{
      this.infoCusomter = [data];
      this.events1 = [
      ];
      const fakeData:any = [];
      const promise = new Promise(res=>{
        fakeData.push({status:'Ngày tạo khách hàng', date: this.datePipe.transform(data?.createDate,'dd/MM - HH:mm') ,color:'#858796' })
        if(data.leadAssigns){
          data.leadAssigns.map((d:any, i:any)=>{
            if(i>0){
              fakeData.push({status:'Ngày chuyển tiếp xúc',
              date:  this.datePipe.transform( d.createdDate,'dd/MM - HH:mm'),
              color:'#858796',
              createBy:d.assigneeName})
            }else{
              fakeData.push({status:'Ngày giao tiếp xúc',
              date:  this.datePipe.transform( d.createdDate,'dd/MM - HH:mm'),
              color:'#858796',
              createBy:d.assigneeName})
            }})
        }
        if(data.schedules){
          fakeData.push({
            status:'Ngày đặt lịch tiếp xúc',
            date:  this.datePipe.transform( data?.schedules[data?.schedules.length-1]?.createDate,'dd/MM - HH:mm'),
            color:'#858796',
            createBy: data?.schedules[data?.schedules.length-1]?.createdBy
          })
        }
        if(data?.schedules && data?.schedules[0]?.result){
          fakeData.push({status:'Ngày cập nhật kết quả',
          date:  this.datePipe.transform( data?.schedules[data?.schedules.length-1]?.result?.createdDate,'dd/MM - HH:mm'),
          color:'#858796',
          result: data?.schedules[data?.schedules.length-1]?.result?.status,
         })
        }
        res(fakeData);
      })

      promise.then(data=>{
        this.events1 = this.reverseArr(data)
        console.log(this.events1);
        this.events1[0].color = '#4e73df'
      })
    })
  }

  ngOnInit() {

    this.customerSerivce.getDetailCustomer(this.idUpdate).subscribe((data)=>{
      this.infoCusomter = [data];
      this.events1 = [
      ];
      const fakeData:any = [];
      const promise = new Promise(res=>{
        fakeData.push({status:'Ngày tạo khách hàng', date: this.datePipe.transform(data?.createDate,'dd/MM - HH:mm') ,color:'#858796' })
        if(data.leadAssigns){
          data.leadAssigns.map((d:any, i:any)=>{
            if(i>0){
              fakeData.push({status:'Ngày chuyển tiếp xúc',
              date:  this.datePipe.transform( d.createdDate,'dd/MM - HH:mm'),
              color:'#858796',
              createBy:d.assigneeName})
            }else{
              fakeData.push({status:'Ngày giao tiếp xúc',
              date:  this.datePipe.transform( d.createdDate,'dd/MM - HH:mm'),
              color:'#858796',
              createBy:d.assigneeName})
            }})
        }
        if(data.schedules){
          fakeData.push({
            status:'Ngày đặt lịch tiếp xúc',
            date:  this.datePipe.transform( data?.schedules[data?.schedules.length-1]?.createDate,'dd/MM - HH:mm'),
            color:'#858796',
            createBy: data?.schedules[data?.schedules.length-1]?.createdBy
          })
        }
        if(data?.schedules && data?.schedules[0]?.result){
          fakeData.push({status:'Ngày cập nhật kết quả',
          date:  this.datePipe.transform( data?.schedules[data?.schedules.length-1]?.result?.createdDate,'dd/MM - HH:mm'),
          color:'#858796',
          result: data?.schedules[data?.schedules.length-1]?.result?.status,
         })
        }
        res(fakeData);
      })

      promise.then(data=>{
        this.events1 = this.reverseArr(data)
        console.log(this.events1);
        this.events1[0].color = '#4e73df'
      })
    })


  }

  onDelete(id:any){
    this.deleteId.emit(id);
  }
  onUpdate(id:any){
    this.updateId.emit(id);
  }

  reverseArr(array:any){
    return array.map((item:any,idx:any) => array[array.length-1-idx])
  }
}
