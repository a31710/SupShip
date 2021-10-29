import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../service/profile.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  bodyUpdate:any
  proviceSelect:any
  districtSelect:any
  wardSelect:any
  dataProvince: any
  dataDistrict: "" | any
  dataWard: "" | any
  userForm: FormGroup | any
  userId:any
  constructor(private profileService: ProfileService, private fb: FormBuilder) {

    this.userId = localStorage.getItem('userId');
    this.profileService.getUserInfor(this.userId).subscribe((data) =>{
      this.updateValue(data.data);
    }
    )
    this.getAllCity();
    this.createForm()
   }
  ngOnInit() {

  }
  updateValue(userData:any){
    this.fullNameArray.setValue(userData?.fullName);
    this.birthDayArray.setValue(userData?.birthday);
    this.mobileArray.setValue(userData?.mobile);
    this.genderArray.setValue(userData?.gender);
    this.dataProvince = userData?.address?.province;
    this.dataDistrict = userData?.address?.district;
    this.dataWard = userData?.address?.ward;
    this.addressArray.patchValue([{
      homeNo: userData?.address?.homeNo
    }])
  }
  createForm(){
    this.userForm = this.fb.group({
        fullName:['', [Validators.required]],
        mobile:['', [Validators.required]],
        address: this.fb.array([this.addAddressGroup()]),
        gender:['', [Validators.required,]],
        birthday:['', [Validators.required, Validators.pattern("")]],
    })
  }
  get addressArray() {
    return this.userForm.get('address') as FormArray;
  }
  get birthDayArray() {
    return this.userForm.get('birthday') as FormArray;
  }
  get fullNameArray() {
    return this.userForm.get('fullName') as FormArray;
  }
  get mobileArray() {
    return this.userForm.get('mobile') as FormArray;
  }
  get genderArray() {
    return this.userForm.get('gender') as FormArray;
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
    this.profileService.getProvince().subscribe(data=>{
      this.dataProvince = data;
    })
  }

  getAllDistrict(value:any){
    this.profileService.getDistrictById(value).subscribe(data=>{
      this.dataDistrict = data
      console.log(value);

    })
  }

  getAllWard(value:any){
    this.profileService.getWardById(value).subscribe(data=>{
      this.dataWard = data;
    })
  }
  updateUser(){
    this.bodyUpdate = this.userForm.value;
    this.bodyUpdate.address = this.addressArray.value[0];
    console.log(this.userForm.value);
  }
}
