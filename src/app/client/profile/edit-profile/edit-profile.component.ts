import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../service/profile.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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
  constructor(private profileService: ProfileService, private fb: FormBuilder, private route: Router,private cookieService: CookieService) {

    this.userId =  this.cookieService.get('userId');
    this.profileService.getUserInfor(this.userId).subscribe((data) =>{
      console.log(data.data);

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
    this.genderArray.setValue(userData?.gender.toString());
    this.getAllDistrict(userData?.address?.province);
    this.getAllWard(userData?.address?.district)

    this.addressArray.patchValue([{
      homeNo: userData?.address?.homeNo,
      province: userData?.address?.province,
      ward: userData?.address?.ward,
      district: userData?.address?.district
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
    })
  }

  getAllWard(value:any){
    this.profileService.getWardById(value).subscribe(data=>{
      this.dataWard = data;
    })
  }

  changePassword(){
    this.route.navigateByUrl('/client/profile/change-pasword');
  }

  updateUser(){
    this.bodyUpdate = this.userForm.value;
    this.bodyUpdate.address = this.addressArray.value[0];
    if(this.genderArray.value == 1){
      this.bodyUpdate.gender = 1;
    }else{
      this.bodyUpdate.gender = 0;
    }
    this.profileService.updateUser(this.bodyUpdate,this.userId).subscribe(()=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Cập nhật thông tin cá nhân thành công',
        showConfirmButton: false,
        timer: 3000
      })
    }
    )
  }
}
