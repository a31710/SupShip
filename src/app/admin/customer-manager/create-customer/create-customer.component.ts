import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  val:any;
  value2:any;
  proviceSelect:any
  districtSelect:any
  wardSelect:any
  dataProvince: any
  dataDistrict: "" | any
  dataWard: "" | any
  insertCustomerForm: FormGroup | any;
  selectedIndustryValues:String[] = [];
  industryError: Boolean = true;
  bodyApi: any;

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

    get quantityMonthArr(){
      return this.insertCustomerForm.get('quantityMonth') as FormArray;
    }

    get weightArr(){
      return this.insertCustomerForm.get('weight') as FormArray;
    }

    get expectedRevenueArr(){
      return this.insertCustomerForm.get('expectedRevenue') as FormArray;
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

    get phoneArray() {
      return this.insertCustomerForm.get('phone') as FormArray;
    }

  constructor(private fb: FormBuilder, private customerService: CustomerService, private toastr: ToastrService) {
    this.getAllCity();
    this.createForm();
    this.addIndustrysControls();
   }

   private addIndustrysControls() {
    this.industryData.forEach(() => this.industryFormArray.push(this.fb.control(false)));
  }

  ngOnInit() {
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
  // checkleadSourceTouched(){
  //   let flg = false;
  //   if(this.leadSource.touched){
  //     flg=true;
  //   }
  //   return flg;
  // }

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
      console.log(value);

    })
  }

  getAllWard(value:any){
    this.customerService.getWardById(value).subscribe(data=>{
      this.dataWard = data;
    })
  }

  pipePhone(phone:any){
    const output = phone.substring(0,3) + phone.substring(4,7) + phone.substring(8,12)
    return output;

  }



  toNumber(val:any) {
    let valArr = val.split('');
    let valFiltered = valArr.filter((x:any) => !isNaN(x));
    let valProcessed = valFiltered.join('');
    return parseInt(valProcessed);
  }
  insertCustomer(){
  this.bodyApi= this.insertCustomerForm.value;
  this.bodyApi.industry=this.selectedIndustryValues;
  this.bodyApi.address=this.addressArray.value[0];
  this.bodyApi.phone = this.pipePhone(this.phoneArray.value);
  this.bodyApi.weight = parseInt(this.weightArr.value)
  this.bodyApi.quantityMonth = parseInt(this.quantityMonthArr.value)
  this.bodyApi.expectedRevenue = this.toNumber(this.expectedRevenueArr.value);
  console.log(this.bodyApi);
  this.insertCustomerForm.reset();
  this.customerService.insertCustomer(this.bodyApi).subscribe(data=>{
    console.log(data);
    this.toastr.success("Tạo mới thành công");
  })
  }



}
