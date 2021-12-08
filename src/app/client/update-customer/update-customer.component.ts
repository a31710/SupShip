import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';
import { LoaderService } from 'src/app/service/loader.service';
import { CustomerService } from '../service/customer.service';
import { ProfileService } from '../service/profile.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
  idUpdate:any
  bodyApi:any
  proviceSelect:any
  districtSelect:any
  wardSelect:any
  dataProvince: any
  dataDistrict: "" | any
  dataWard: "" | any
  updateCustomerForm: FormGroup | any;
  selectedIndustryValues:String[] = [];
  industryError: Boolean = true;
  constructor(private fb: FormBuilder, private profileSerivce: ProfileService,public loaderService: LoaderService,
     private customerService: CustomerService, private router: Router,private config: NgSelectConfig, private activatedRouter: ActivatedRoute) {
    this.getAllCity();
    this.createForm();
    this.addIndustrysControls();

    this.config.appendTo = 'body';
    this.config.bindValue = 'value';
  }

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
      { type: 'minlength', message: 'Sai định dạng số điện thoại' },
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
    this.activatedRouter.params.subscribe(params=>{
      const id = params['id'];
      this.idUpdate = id;
      this.customerService.getDetailCustomer(id).subscribe(data=>this.uploadValue(data))
    })


  }

  private addIndustrysControls() {
    this.industryData.forEach(() => this.industryFormArray.push(this.fb.control(false)));
  }
  get industryFormArray() {
    return this.updateCustomerForm.get('industry') as FormArray;
  }
  get addressArray() {
    return this.updateCustomerForm.get('address') as FormArray;
  }
  get phoneArr() {
    return this.updateCustomerForm.get('phone') as FormArray;
  }

  get leadSource() {
    return this.updateCustomerForm.get('leadSource') as FormArray;
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
    this.expectedRevenueArray.setValue(customerData?.expectedRevenue.toString());
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

      this.industryError = false;
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
        representation: ['', [Validators.required,Validators.minLength(5)]],
        phone:['', [Validators.required,Validators.minLength(12)]],
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
    console.log(this.industryError);

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

  pipePhone(phone:any){
    const output = phone.substring(0,3) + phone.substring(4,7) + phone.substring(8,12)
    return output;

  }

   get quantityMonthArr(){
    return this.updateCustomerForm.get('quantityMonth') as FormArray;
  }

  get weightArr(){
    return this.updateCustomerForm.get('weight') as FormArray;
  }

  get expectedRevenueArr(){
    return this.updateCustomerForm.get('expectedRevenue') as FormArray;
  }


  toNumber(val:any) {
    let valArr = val.split('');
    let valFiltered = valArr.filter((x:any) => !isNaN(x));
    let valProcessed = valFiltered.join('');
    return parseInt(valProcessed);
  }

  onSubmit(){
  this.bodyApi= this.updateCustomerForm.value;
  this.bodyApi.industry=this.selectedIndustryValues;
  this.bodyApi.address=this.addressArray.value[0];
  this.bodyApi.phone = this.pipePhone(this.phoneArr.value);
  this.bodyApi.weight = parseInt(this.weightArr.value)
  this.bodyApi.quantityMonth = parseInt(this.quantityMonthArr.value)
  this.bodyApi.expectedRevenue = this.toNumber(this.expectedRevenueArr.value);

  this.customerService.updateCustomer(this.idUpdate,this.bodyApi).subscribe(data=>{
    if(data?.error == 'true'){
      Swal.fire({
        title: 'Cập nhật thất bại',
        text: data?.message,
        icon: 'error',
        confirmButtonColor: '#4e73df',
        confirmButtonText: 'Chấp nhận'
      })
    }else{
      Swal.fire({
        title: 'Cập nhật khách hàng thành công',
        icon: 'success',
        confirmButtonColor: '#4e73df',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
            this.router.navigateByUrl(`client/customer/${this.idUpdate}`)
        }
      })
    }

  })


  }

}
