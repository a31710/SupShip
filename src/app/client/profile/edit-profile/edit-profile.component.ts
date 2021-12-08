import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../service/profile.service';
import Swal from 'sweetalert2'
import {  Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgSelectConfig } from '@ng-select/ng-select';
import { LoaderService } from 'src/app/service/loader.service';

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
  constructor(private profileService: ProfileService, private fb: FormBuilder, private config: NgSelectConfig,
    private route: Router,private cookieService: CookieService, public loaderService: LoaderService, private router: Router) {
      this.config.appendTo = 'body';
      this.config.bindValue = 'value';
    this.userId =  localStorage.getItem('userId');
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
    this.birthDayArray.setValue(this.pipeDateGet(userData?.birthday));
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

  editProfileMessage = {
    'fullName': [
      { type: 'required', message: 'Bạn chưa nhập ô này' },
      { type: 'minlength', message: 'phải có ít nhất 5 kí tự' },
    ],
    'companyName': [
      { type: 'required', message: 'Bạn chưa nhập ô này' },
      { type: 'minlength', message: 'phải có ít nhất 5 kí tự' },
    ],
    'birthday': [
      { type: 'required', message: 'Bạn chưa nhập ô này' },
      { type: 'minlength', message: 'Sai định dạng ngày sinh'},
    ],
    'homeNo': [
      { type: 'required', message: 'Bạn chưa nhập ô này' },
      { type: 'minlength', message: 'phải có ít nhất 10 kí tự' },
    ],
    'mobile': [
      { type: 'required', message: 'Bạn chưa nhập ô này' },
      { type: 'minlength', message: 'Sai định dạng số điện thoại' },
    ],

    }



  createForm(){
    this.userForm = this.fb.group({
        fullName:['', [Validators.required, Validators.minLength(5)]],
        mobile:['', [Validators.required,Validators.minLength(12)]],
        address: this.fb.array([this.addAddressGroup()]),
        gender:['', [Validators.required,]],
        birthday:['', [Validators.required,Validators.minLength(10)]],
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

  pipePhone(phone:any){
    const output = phone.substring(0,3) + phone.substring(4,7) + phone.substring(8,12)
    return output;

  }
  pipeDateGet(date:any){
    const year = date.substring(0,4);
    const month = date.substring(5,7);
    const day = date.substring(8,10);
    return day+month+year

  }

  pipeDatePost(date:any){
    const day = date.substring(0,2);
    const month = date.substring(3,5);
    const year = date.substring(6,10);
    return `${year}-${month}-${day}`
  }

  updateUser(){
    this.bodyUpdate = this.userForm.value;
    this.bodyUpdate.address = this.addressArray.value[0];
    if(this.genderArray.value == 1){
      this.bodyUpdate.gender = 1;
    }else{
      this.bodyUpdate.gender = 0;
    }
    this.bodyUpdate.mobile = this.pipePhone(this.mobileArray.value);
    this.bodyUpdate.birthday = this.pipeDatePost(this.birthDayArray.value);

    console.log(this.bodyUpdate);

    this.profileService.updateUser(this.bodyUpdate,this.userId).subscribe((data)=>{
      console.log(data);
      if(data.error == 'true'){
        Swal.fire({
          title: 'Cập nhật không thành công',
          text: data.message,
          icon: 'error',
          confirmButtonColor: '#4e73df',
          confirmButtonText: 'OK'
        })
      }else{
        Swal.fire({
          title: data.message,
          icon: 'success',
          confirmButtonColor: '#4e73df',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
              localStorage.setItem("username",this.fullNameArray.value);
              window.location.reload();
          }
        })

      }
    }
    )
  }
}
