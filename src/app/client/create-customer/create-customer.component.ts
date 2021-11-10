import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../service/customer.service';
import { ProfileService } from '../service/profile.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})


export class CreateCustomerComponent implements OnInit {
  bodyApi:any
  proviceSelect:any
  districtSelect:any
  wardSelect:any
  dataProvince: any
  dataDistrict: "" | any
  dataWard: "" | any
  insertCustomerForm: FormGroup | any;
  selectedIndustryValues:String[] = [];
  industryError: Boolean = true;
  constructor(private fb: FormBuilder, private profileSerivce: ProfileService, private customerService: CustomerService, private router: Router) {
    this.getAllCity();
    this.createForm();
    this.addIndustrysControls();
  }

  insertCustomerMessage = {
    'title': [
      { type: 'required', message: 'Bạn chưa nhập ô này' },
      { type: 'minlength', message: 'phải có ít nhất 5 kí tự' },
    ],
    'companyName': [
      { type: 'required', message: 'Bạn chưa nhập ô này' },
      { type: 'minlength', message: 'phải có ít nhất 5 kí tự' },
    ],
    'fullName': [
      { type: 'required', message: 'Bạn chưa nhập ô này' },
      { type: 'minlength', message: 'phải có ít nhất 5 kí tự'},
    ],
    'quantityMonth': [
      { type: 'required', message: 'Bạn chưa nhập ô này' },
      { type: 'min', message: 'Số phải lớn hơn 0' },
    ],
    'weight': [
      { type: 'required', message: 'Bạn chưa nhập ô này' },
      { type: 'min', message: 'Số phải lớn hơn 0' },
    ],
    'expectedRevenue': [
      { type: 'required', message: 'Bạn chưa nhập ô này' },
      { type: 'min', message: 'Số phải lớn hơn 0'},
    ],
    'representation': [
      { type: 'required', message: 'Bạn chưa nhập ô này' },
      { type: 'minlength', message: 'phải có ít nhất 5 kí tự' },
    ],
    'homeNo': [
      { type: 'required', message: 'Bạn chưa nhập ô này' },
      { type: 'minlength', message: 'phải có ít nhất 10 kí tự' },
    ],
    'phone': [
      { type: 'required', message: 'Bạn chưa nhập ô này' },
      { type: 'pattern', message: 'Sai định dạng số điện thoại' },
    ],

    }


  industryData = [
    { value: 'THU', name: 'Thư, hóa đơn, chứng từ' },
    { value: 'DC', name: 'Đồ Chơi' },
    { value: 'SACH', name: 'Sách, văn phòng phẩm' },
    { value: 'NS', name: 'Hàng nông sản' },
    { value: 'DT', name: 'Thiết bị điện tử' },
    { value: 'NT', name: 'Thiết bị nội thất' },
    { value: 'TT', name: 'Thời trang' },
    { value: 'DP', name: 'Dược phẩm' },
    { value: 'PKTT', name: 'Phu kiện thời trang' },
    { value: 'PKXM', name: 'Ô tô xe máy, phụ kiện' },
    { value: 'MP', name: 'Mỹ phẩm' },
    { value: 'HXT', name: 'Hàng xách tay' },
    { value: 'TBGD', name: 'Thiết bị gia dụng' },
    { value: 'KHAC', name: 'Khác' },
  ];

  ngOnInit() {

  }
  private addIndustrysControls() {
    this.industryData.forEach(() => this.industryFormArray.push(this.fb.control(false)));
  }
  get industryFormArray() {
    return this.insertCustomerForm.get('industry') as FormArray;
  }
  get addressArray() {
    return this.insertCustomerForm.get('address') as FormArray;
  }

  get leadSource() {
    return this.insertCustomerForm.get('leadSource') as FormArray;
  }

  createForm(){
    this.insertCustomerForm = this.fb.group({
        title:['', [Validators.required,Validators.minLength(5)  ]],
        companyName: ['', [Validators.required,Validators.minLength(5)]],
        representation: ['', [Validators.required ,Validators.minLength(5)]],
        phone:['', [Validators.required,]],
        quantityMonth:['', [Validators.required, Validators.min(1)]], //
        weight: ['', [Validators.required,Validators.min(1)]], //
        expectedRevenue: ['', [Validators.required,Validators.min(1)]], //
        leadSource:['PRIVATE', ],
        address: this.fb.array([this.addAddressGroup()]),
        industry: this.fb.array([]),
    })

  }
  addAddressGroup() {
    return this.fb.group({
      ward:['', [Validators.required]],
      district:['', [Validators.required]],
      province:['', [Validators.required]],
      homeNo:['', [Validators.required, Validators.minLength(10)]],
    });
  }

  getSelectedIndustryValue() {
    this.selectedIndustryValues = [];
    this.industryFormArray.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedIndustryValues.push(this.industryData[i].value);
      }

    });
    this.industryError =  this.selectedIndustryValues.length > 0 ? false : true;
  }
  checkIndustryControlsTouched() {
    let flg = false;
    this.industryFormArray.controls.forEach(control => {
      if (control.touched) {
        flg = true;
      }
    });

    return flg;
  }

  getAllCity(){
    this.profileSerivce.getProvince().subscribe(data=>{
      this.dataProvince = data;
    })
  }

  getAllDistrict(value:any){
    this.profileSerivce.getDistrictById(value).subscribe(data=>{
      this.dataDistrict = data
      console.log(value);

    })
  }

  getAllWard(value:any){
    this.profileSerivce.getWardById(value).subscribe(data=>{
      this.dataWard = data;
    })
  }
  onSubmit(){
  this.bodyApi= this.insertCustomerForm.value;
  this.bodyApi.industry=this.selectedIndustryValues;
  this.bodyApi.address=this.addressArray.value[0]
  this.customerService.createCustomer(this.bodyApi).subscribe((data)=>{
    console.log(data);
    this.insertCustomerForm.reset();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Thêm mới thành công',
      showConfirmButton: false,
      timer: 3000
    })
    this.router.navigateByUrl('/client/customer')
  })


  }

}
