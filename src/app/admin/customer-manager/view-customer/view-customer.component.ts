import { Component, EventEmitter, OnInit, Output } from '@angular/core';import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
limit: number = 15;
size:any
totalPage:number = 3;
tabs = [{
  title:'Danh sách khách hàng',
  value: 1
},{
  title:'Báo cáo tiếp xúc',
  value: 5
}
];
selected = new FormControl(0);
dataPost:any
dataDept:any
dataLead:any
deptCodeSelect:any;
postCodeSelect:any;
leadSelect:any
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
      userAssigneeId: ['',Validators.required],
      userRecipientId: ['',Validators.required],
      leadIds:['',],
      deptCode: ['',Validators.required],
      postCode: ['',Validators.required],

    })
  }

  get leadIdArray(){
    return this.tranferForm.get('leadIds') as FormArray;
  }
  onSubmit(){
    this.leadIdArray.setValue(this.idArray);
    console.log(this.tranferForm.value);
  }
  getAllDeptCode(){
    this.userService.getDeptCode().subscribe(data=>this.dataDept=data)
  }

  getPostCode(value:any){
    this.userService.getPostCode(value).subscribe(data=>this.dataPost=data)
  }

  getListByPostCode(postCode:any){
    this.customerService.getLeadByPostCode(postCode).subscribe(data=>{
      this.dataLead = data
      console.log(data);
    })
  }
  onPageChange(offset: number) {
    this.offset = offset;
    console.log(this.offset/this.limit);

    this.customerService.getCustomerPagi((this.offset/this.limit)+1, this.limit).subscribe((data)=>{
      this.listCustomer = data.data
    })


    this.idArray = [];
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

  addPostReport(event:any){
    const postReport = {title:'Bưu cục lồn', value:6};
    const oldData = this.tabs.filter(data => data.value == 6)
    if(oldData[0]?.value == 6){
      console.log('bị trùng, trở về tab cũ');
      this.tabs.forEach((d,i)=>{
        if(d.value == 6){
          this.selected.setValue(i);
        }
      })
    }else{
      console.log('tạo mới');
      this.tabs.push(postReport);
      this.selected.setValue(this.tabs.length - 1);
    }
    console.log(event);
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
  }
  getIdArray(id:any){
    if(this.idArray.includes(id)){
      const newArr = this.idArray.filter(d => d !== id)
      this.idArray = newArr
    }else{
      this.idArray.push(id);
    }
    console.log(this.idArray);

  }

  allTranfer(){
      const resetArr = this.tranferData.filter((d:any) => d.id == -1)
      this.tranferData = resetArr

     this.idArray.forEach((d)=>{
       const data = this.listCustomer.filter((data:any)=> data.id == d)
      this.tranferData.push(data[0]);
      })
      console.log(this.tranferData);

  }


  getListNew(){
    this.customerService.getLeadStatus('NEW').subscribe((data)=>{
      this.listCustomer = data.data
    })
  }

  getListAll(){
    this.customerService.getLeadStatus('null').subscribe((data)=>{
      this.listCustomer = data.data
    })
  }

  getListContacting(){
    this.customerService.getLeadStatus('CONTACTING').subscribe((data)=>{
      this.listCustomer = data.data
    })
  }

  getListSuccess(){
    this.customerService.getLeadStatus('SUCCESS').subscribe((data)=>{
      this.listCustomer = data.data
    })
  }

  getListFalied(){
    this.customerService.getLeadStatus('FAILED').subscribe((data)=>{
      this.listCustomer = data.data
    })
  }

  getListNotContacting(){
    this.customerService.getLeadStatus('NOT_CONTACTING').subscribe((data)=>{
      this.listCustomer = data.data
    })
  }

  toggle(i:any){
    $(`.toogle${i}`).toggleClass("bg-gradient-light");
  }
}
