import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../service/profile.service';
import { ScheduleService } from '../service/schedule.service';
import Swal from 'sweetalert2';
import { NgSelectConfig } from '@ng-select/ng-select';
@Component({
  selector: 'app-detail-schedule',
  templateUrl: './detail-schedule.component.html',
  styleUrls: ['./detail-schedule.component.css']
})
export class DetailScheduleComponent implements OnInit {
  bodyApi:any;
  scheduleData: any;
  dataProvince:any;
  dataDistrict:any;
  dataWard:any;
  proviceSelect:any
  districtSelect:any
  wardSelect:any
  updateForm:FormGroup|any;
  resultSelect:any = 3;
  result:any = [{
    value:3, name:'Thành công'
  },
  {
    value:5, name:'Thất bại',
  },
  {
    value:1, name:'Gửi báo giá'
  }
]
time1:any
time2:any
day: Date  = new Date;
  constructor(private profileSerivce: ProfileService, private fb: FormBuilder,private config: NgSelectConfig,
     private scheduleService: ScheduleService, private activatedRoute: ActivatedRoute) {
   this.activatedRoute.params.subscribe(params=>{
     const id = params['id'];
     this.scheduleService.detailSchedule(id).subscribe(data=>{
       this.scheduleData = [data]
       console.log(data);
       this.uploadForm(data.lead)
       this.scheduleIdArr.setValue(data?.id);
     })

   })
    this.getAllCity();
    this.createForm();
  }

  ngOnInit() {
  }

  toNumber(val:any) {
    let valArr = val.split('');
    let valFiltered = valArr.filter((x:any) => !isNaN(x));
    let valProcessed = valFiltered.join('');
    return parseInt(valProcessed);
  }


  onSubmit(){
    const form:any = `${this.datePipe(this.day)} ${this.time1}:00`
    const to:any = `${this.datePipe(this.day)} ${this.time2}:00`
    this.fromArr.setValue(form);
    this.toArr.setValue(to);
    this.bodyApi = this.updateForm.value;
    this.bodyApi.pickupAddress = this.addressArray.value[0];
    this.bodyApi.discount = parseInt(this.discountArr.value);
    this.bodyApi.inProvincePercent = this.toNumber(this.inProvincePercentArr.value)
    this.bodyApi.outProvincePercent = this.toNumber(this.outProvincePercentArr.value)
    console.log(this.bodyApi);

    this.scheduleService.updateSchedule(this.bodyApi).subscribe(data=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Cập nhật thành công',
        showConfirmButton: false,
        timer: 3000
      })
    })
  }


  uploadForm(data:any){
    this.getAllDistrict(data?.address?.province);
    this.getAllWard(data?.address?.district)
    this.addressArray.patchValue([{
      homeNo: data?.address?.homeNo,
      province: data?.address?.province,
      ward: data?.address?.ward,
      district: data?.address?.district
    }])
  }

  get discountArr(){
    return this.updateForm.get('discount') as FormArray;
  }

  get inProvincePercentArr(){
    return this.updateForm.get('inProvincePercent') as FormArray;
  }
  get outProvincePercentArr(){
    return this.updateForm.get('outProvincePercent') as FormArray;
  }

  get fromArr(){
    return this.updateForm.get('fromDate') as FormArray;
  }
  get toArr(){
    return this.updateForm.get('toDate') as FormArray;
  }

  get addressArray(){
    return this.updateForm.get('pickupAddress') as FormArray;
  }

  get scheduleIdArr(){
    return this.updateForm.get('scheduleId') as FormArray;
  }
  createForm(){
    this.updateForm = this.fb.group({
      scheduleId: ['',[Validators.required]],
      status: [3,[Validators.required]],
      customerCode: ['',[Validators.required]],
      districtPercent: ['',[Validators.required]],
      inProvincePercent: ['',[Validators.required]],
      outProvincePercent: ['',[Validators.required]],
      discount: ['',[Validators.required]],
      refundPercent: ['',[Validators.required]],
      reason: ['',[Validators.required]],
      proposal: ['',[Validators.required]],
      pickupAddress: this.fb.array([this.addAddressGroup()]),
      fromDate: ['',[Validators.required]],
      toDate: ['',[Validators.required]],
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


  datePipe(time:any){
    const day= time.getDate()<10?`0${time.getDate()}`:time.getDate();
    const month = time.getMonth()+1<10?`0${time.getMonth()+1}`:time.getMonth()+1;
    const year = time.getYear().toString().substring(1,3);
    return `${day}-${month}-20${year}`
  }

}
