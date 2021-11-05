import { Component, EventEmitter, OnInit, Output } from '@angular/core';import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/service/common.service';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {
listCustomer:any
offset: number = 0;
limit: number = 15;
size: number = 200;
totalPage:number = 3;
@Output() addDataCreate: EventEmitter<any>;


  constructor(private customerService: CustomerService, private route: Router, private toastr: ToastrService, private commonService: CommonService) {
    this.addDataCreate = new EventEmitter<any>()
    this.customerService.getAllCustomer().subscribe(data=>{
      this.listCustomer =data.data
      console.log(data);
      // this.size = data.totalItem;

    })
  }

  ngOnInit() {
  }
  onPageChange(offset: number) {
    this.offset = offset;
    console.log(offset);
  }
  onDelete(id:any){
     this.listCustomer = this.listCustomer.filter((data:any) => data.id !== id);
    this.customerService.deleteCustomer(id).subscribe(()=>{
      this.toastr.success('Xóa thành công');
    })
  }
  onUpdate(id:any){
    this.route.navigateByUrl(`/admin/customer/update/${id}`);
  }
  addCreateTab(){
    const createCustomer = {title:'Tạo mới khách hàng', value:2}
    this.addDataCreate.emit(createCustomer);
  }


}
