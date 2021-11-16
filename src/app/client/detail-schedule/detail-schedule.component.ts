import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-detail-schedule',
  templateUrl: './detail-schedule.component.html',
  styleUrls: ['./detail-schedule.component.css']
})
export class DetailScheduleComponent implements OnInit {
  dataProvince:any;
  dataDistrict:any;
  dataWard:any;
  proviceSelect:any
  districtSelect:any
  wardSelect:any
  updateForm:FormGroup|any;
  resultSelect:any = 1
  result:any = [{
    value:1, name:'Thành công'
  },
  {
    value:2, name:'Thất bại',
  },
  {
    value:3, name:'Gửi báo giá'
  }
]
  constructor(private profileSerivce: ProfileService, private fb: FormBuilder) {
    this.getAllCity();
  }

  ngOnInit() {
  }

  createForm(){
    this.updateForm = this.fb.group({
      scheduleId: ['',[Validators.required]],
      status: ['',[Validators.required]],
      customerCode: ['',[Validators.required]],
      districtPercent: ['',[Validators.required]],
      inProvincePercent: ['',[Validators.required]],
      outProvincePercent: ['',[Validators.required]],
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

}
