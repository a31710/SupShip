import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../service/customer.service';
import { PrimeIcons } from "primeng/api";
import { LoaderService } from 'src/app/service/loader.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.css']
})
export class DetailCustomerComponent implements OnInit {
  type:any;
  events1: any[] |any = [];
  leadData:any
  constructor(private customerService: CustomerService, private activateRoute: ActivatedRoute,
    public loaderService: LoaderService, private datePipe: DatePipe, private router: Router) {
    this.activateRoute.params.subscribe(param=>{
      const id = param['id']
      this.customerService.getDetailCustomer(id).subscribe(data=>{
        this.type = data?.type;
        console.log(data?.type);

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
  onUpdate(id:any){
    this.router.navigateByUrl(`/client/update-customer/${id}`)
  }

  onDelete(id:any){
    if(this.type == 'TU_NHAP'){
      this.customerService.deleteCustomer(id).subscribe((data)=>{
        if(data?.error =='true'){
          Swal.fire({
            title: 'Xóa không thành công ?',
            text: data?.message,
            icon: 'error',
            confirmButtonColor: '#4e73df',
            confirmButtonText: 'Chấp nhận'
          })
        }else{
          Swal.fire({
            title: 'Xóa thành công',
            icon: 'success',
            confirmButtonColor: '#4e73df',
            confirmButtonText: 'Chấp nhận'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigateByUrl('/client/customer')
            }
          })
        }
      })
    }else{
      Swal.fire({
        title: 'Xóa không thành công ?',
        text:'Bạn chỉ có thể xóa khách hàng mà mình tự tạo!',
        icon: 'error',
        confirmButtonColor: '#4e73df',
        confirmButtonText: 'Chấp nhận'
      })
    }
  }


}
