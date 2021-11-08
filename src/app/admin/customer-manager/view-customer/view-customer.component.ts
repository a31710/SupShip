import { Component, EventEmitter, OnInit, Output } from '@angular/core';import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from 'src/app/shared/service/common.service';
import { CustomerService } from '../../service/customer.service';
import { UserService } from '../../service/user.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {
tranferForm: FormGroup | any;
idArray: any[] = []
tranferData:any[] |any = [] ;
listCustomer:any
offset: number = 0;
limit: number = 5;
size:any
totalPage:number = 3;
tabs = [{
  title:'Danh sách khách hàng',
  value: 1
},];
selected = new FormControl(0);
dataPost:any
dataDept:any
deptCodeSelect:any;
postCodeSelect:any;
existArray:any[] = [];
idUpdate:any;

  constructor(private customerService: CustomerService, private route: Router,
     private toastr: ToastrService, private fb: FormBuilder,private userService: UserService) {

    this.customerService.getAllCustomer().subscribe(data=>{
      this.size = data.totalItem;
      this.listCustomer =data.data
    })
    this.createForm();
    this.getAllDeptCode();
  }

  ngOnInit() {

  }

  createForm(){
    this.tranferForm = this.fb.group({
      userAssigneeId: ['',],
      userRecipientId: ['',],
      deptCode: ['',],
      postCode: ['',],
    })
  }
  getAllDeptCode(){
    this.userService.getDeptCode().subscribe(data=>this.dataDept=data)
  }

  getPostCode(value:any){
    this.userService.getPostCode(value).subscribe(data=>this.dataPost=data)
  }
  onPageChange(offset: number) {
    this.offset = offset;
  }
  onDelete(id:any){
    this.tabs.map((d,i)=>{
      if(d.value == 3){
        this.tabs.splice(i, 1);
      }
    })
     this.listCustomer = this.listCustomer.filter((data:any) => data.id !== id);
    this.customerService.deleteCustomer(id).subscribe(()=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Xóa thành công',
        showConfirmButton: false,
        timer: 3000
      })
    })
  }
  addUpdateTab(id:any){
    const updateCustomer = {title:'Cập nhật khách hàng', value:4}
    const oldData = this.tabs.filter(data => data.value == 4)
    if(oldData[0]?.value == 4){
      console.log('bị trùng, trở về tab cũ');
      this.tabs.forEach((d,i)=>{
        if(d.value == 4){
          this.selected.setValue(i);
        }
      })
    }else{
      console.log('tạo mới');
      this.tabs.push(updateCustomer);
      this.selected.setValue(this.tabs.length - 1);
    }
    console.log(id);

  }
  addCreateTab(){
    const createCustomer = {title:'Tạo mới khách hàng', value:2}
    const oldData = this.tabs.filter(data => data.value == 2)
    if(oldData[0]?.value == 2){
      console.log('bị trùng, trở về tab cũ');
      this.tabs.forEach((d,i)=>{
        if(d.value == 2){
          this.selected.setValue(i);
        }
      })
    }else{
      console.log('tạo mới');
      this.tabs.push(createCustomer);
      this.selected.setValue(this.tabs.length - 1);
    }
  }
  addDetailTab(id:any){
    const createDetail = {title:'Thông tin KH', value:3}
    const oldData = this.tabs.filter(data => data.value == 3)
    if(oldData[0]?.value == 3){
      console.log('bị trùng, trở về tab cũ');
      this.tabs.forEach((d,i)=>{
        if(d.value == 3){
          this.selected.setValue(i);
        }
      })
    }else{
      console.log('tạo mới');
      this.tabs.push(createDetail);
      this.selected.setValue(this.tabs.length - 1);
    }
    this.idUpdate = id;
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
  singleTranfer(id:any){
    const data  = this.listCustomer.filter((data:any)=> data.id === id);
    this.tranferData= data;
    this.existArray.push(id);

  }
  getIdArray(id:any){
    this.idArray.push(id);
  }

  allTranfer(){
    //  this.idArray.forEach((d)=>{
    //    if(this.existArray.includes(d)){
    //       const deleteData = this.tranferData.filter((data:any)=> data.id !== d)
    //       this.tranferData = deleteData;
    //    }else{
    //     const data = this.listCustomer.filter((data:any)=> data.id == d)
    //     this.tranferData.push(data[0]);
    //    }
    //   })

  }



}
