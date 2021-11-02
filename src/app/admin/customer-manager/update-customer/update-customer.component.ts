import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
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


  constructor(private fb: FormBuilder, private customerService: CustomerService, private toastr: ToastrService,private activeRoute: ActivatedRoute,private route: Router) {
    this.activeRoute.params.subscribe(params=>{
      this.idCustomer = params['id'];
      this.customerService.getDetailCustomer(this.idCustomer).subscribe(data=>{


        this.uploadValue(data);
      })
    })
    this.getAllCity();
    this.createForm();
    this.addIndustrysControls();
  }
  private addIndustrysControls() {
    this.industryData.forEach(() => this.industryFormArray.push(this.fb.control(false)));
  }
  ngOnInit() {
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


  uploadValue(customerData:any){
    this.companyNameArray.setValue(customerData?.companyName);
    this.titleArray.setValue(customerData?.title);
    this.representationArray.setValue(customerData?.representation);
    this.phoneArray.setValue(customerData?.phone);

    this.getAllDistrict(customerData?.addressResponse?.province);
    this.getAllWard(customerData?.addressResponse?.district)

    this.addressArray.patchValue([{
      homeNo: customerData?.addressResponse?.homeNo,
      province: customerData?.addressResponse?.province,
      ward: customerData?.addressResponse?.ward,
      district: customerData?.addressResponse?.district
    }])
    this.leadSource.setValue(customerData?.leadSource);
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
        fullName: ['', [Validators.required ,Validators.minLength(5)]],
        representation: ['', [Validators.required ,Validators.min(5)]],
        phone:['', [Validators.required,]],
        quantityMonth:['', [Validators.required]],
        inProvincePrice: ['', [Validators.required]],
        outProvincePrice: ['', [Validators.required]],
        weight: ['', [Validators.required]],
        expectedRevenue: ['', [Validators.required]],
        quality:['', [Validators.required]],
        compensation:['', [Validators.required]],
        payment:['', [Validators.required]],
        other:['', [Validators.required]],
        leadSource:['', [Validators.required]],
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
  this.customerService.updateCustomer(this.idCustomer,this.bodyApi).subscribe(data=>{
    this.toastr.success("Cập nhật thành công");
    this.route.navigateByUrl('/admin/customer')
  })
  }

}
