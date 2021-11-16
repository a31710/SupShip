import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../service/customer.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
  @Input() idUpdate:any;
  idCustomer:any
  proviceSelect:any
  districtSelect:any
  wardSelect:any
  dataProvince: any
  dataDistrict: "" | any
  dataWard: "" | any
  updateCustomerForm: FormGroup | any;
  selectedIndustryValues:String[] = [];
  industryError: Boolean = true;
  bodyApi: any;
  customerData:any

  updateCustomerMessage = {
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


    get industryFormArray() {
      return this.updateCustomerForm.get('industry') as FormArray;
    }
    get addressArray() {
      return this.updateCustomerForm.get('address') as FormArray;
    }

    get leadSource() {
      return this.updateCustomerForm.get('leadSource') as FormArray;
    }


  constructor(private fb: FormBuilder, private customerService: CustomerService, private toastr: ToastrService,private route: Router) {

    this.getAllCity();
    this.createForm();
    this.addIndustrysControls();
  }
  private addIndustrysControls() {
    this.industryData.forEach(() => this.industryFormArray.push(this.fb.control(false)));
  }
  ngOnInit() {
    this.customerService.getDetailCustomer(this.idUpdate).subscribe(data=>this.uploadValue(data))
  }

  get titleArray(){
    return this.updateCustomerForm.get('title') as FormArray;
  }
  get companyNameArray(){
    return this.updateCustomerForm.get('companyName') as FormArray;
  }
  get representationArray(){
    return this.updateCustomerForm.get('representation') as FormArray;
  }
  get phoneArray(){
    return this.updateCustomerForm.get('phone') as FormArray;
  }
  get expectedRevenueArray(){
    return this.updateCustomerForm.get('expectedRevenue') as FormArray;
  }
  get weightArray(){
    return this.updateCustomerForm.get('weight') as FormArray;
  }
  get quantityMonthArray(){
    return this.updateCustomerForm.get('quantityMonth') as FormArray;
  }

  uploadValue(customerData:any){
    console.log(customerData);


    this.companyNameArray.setValue(customerData?.companyName);
    this.titleArray.setValue(customerData?.title);
    this.expectedRevenueArray.setValue(customerData?.expectedRevenue);
    this.weightArray.setValue(customerData?.weight);
    this.quantityMonthArray.setValue(customerData?.quantityMonth);
    this.representationArray.setValue(customerData?.representation);
    this.phoneArray.setValue(customerData?.phone);
    this.getAllDistrict(customerData?.address?.province);
    this.getAllWard(customerData?.address?.district)
    this.leadSource.setValue(customerData?.leadSource);
    this.addressArray.patchValue([{
      homeNo: customerData?.address?.homeNo,
      province: customerData?.address?.province,
      ward: customerData?.address?.ward,
      district: customerData?.address?.district
    }])

    customerData?.industries.map((data:any)=>{
      this.selectedIndustryValues.push(data.code);
      const indexCode = this.industryData.findIndex(x => x.value ===data.code)
      this.setindustryValue(indexCode)
      })

  }
  setindustryValue(indexCode:any){
    this.industryFormArray.controls.map((control,i)=>{
      if(i==indexCode){
        control.setValue(true);
      }
    })
  }

  createForm(){
    this.updateCustomerForm = this.fb.group({
      title:['', [Validators.required,Validators.minLength(5)  ]],
      companyName: ['', [Validators.required,Validators.minLength(5)]],
      representation: ['', [Validators.required ,Validators.minLength(5)]],
      phone:['', [Validators.required,]],
      quantityMonth:['', [Validators.required,]], //
      weight: ['', [Validators.required]], //
      expectedRevenue: ['', [Validators.required]], //
      leadSource:['', ],
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
    this.customerService.getProvince().subscribe(data=>{
      this.dataProvince = data;
    })
  }

  getAllDistrict(value:any){
    this.customerService.getDistrictById(value).subscribe(data=>{
      this.dataDistrict = data
    })
  }

  getAllWard(value:any){
    this.customerService.getWardById(value).subscribe(data=>{
      this.dataWard = data;
    })
  }

  onSubmit(){
  this.bodyApi= this.updateCustomerForm.value;
  this.bodyApi.industry=this.selectedIndustryValues;
  this.bodyApi.address=this.addressArray.value[0]
  console.log(this.bodyApi);

  this.customerService.updateCustomer(this.idUpdate,this.bodyApi).subscribe(data=>{
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Cập nhật thành công',
      showConfirmButton: false,
      timer: 3000
    })

  })
  }

}
