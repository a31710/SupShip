import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../service/profile.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changeForm: FormGroup | any
  username:any
  password:any
  rePassword:any
  constructor( private fb: FormBuilder,private router: Router, private profileService: ProfileService) {
    this.username = localStorage.getItem('email')?.slice(1, -1);
    this.createForm();
  }
  changePasswordMessage = {
    'password': [
      { type: 'required', message: 'Bạn chưa nhập mật khẩu' },
      { type: 'minlength', message: 'mật khẩu phải có phải có ít nhất 6 kí tự' },
      { type: 'pattern', message: 'Mật khẩu của bạn phải chứa ít nhất, một chữ hoa, một chữ thường và một số' },
    ],
      'newPassword': [
        { type: 'required', message: 'Bạn chưa nhập mật khẩu' },
        { type: 'minlength', message: 'mật khẩu phải có phải có ít nhất 6 kí tự' },
        { type: 'pattern', message: 'Mật khẩu của bạn phải chứa ít nhất, một chữ hoa, một chữ thường và một số' },
      ],
      'reNewPassword': [
        { type: 'required', message: 'Bạn chưa nhập mật khẩu' },
        { type: 'minlength', message: 'mật khẩu phải có phải có ít nhất 6 kí tự' },
        { type: 'pattern', message: 'Mật khẩu của bạn phải chứa ít nhất, một chữ hoa, một chữ thường và một số' },
      ]

  }
  createForm() {
    this.changeForm = this.fb.group({
      forGotPassword: [false],
      email: [this.username, [Validators.required, Validators.email]],
      password:[null, [Validators.required, Validators.minLength(6),Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,255}$')]],
      newPassword:[null, [Validators.required, Validators.minLength(6),Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,255}$')]],
      reNewPassword:[null, [Validators.required, Validators.minLength(6),Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,255}$')]],
    });
  }
  get newPassword() {
    return this.changeForm.get('newPassword') as FormArray;
  }
  get reNewPassword() {
    return this.changeForm.get('reNewPassword') as FormArray;
  }
  ngOnInit() {
  }
  checkMatch(){
    console.log(this.password + '' + this.rePassword);
    console.log(this.password == this.rePassword);
    let flg = false;
    if(this.password == this.rePassword){
      flg = true
    }
    return flg;
  }
  onSubmit(){

    this.profileService.changePassword(this.changeForm.value).subscribe((data)=>{
      Swal.fire(
        'Đổi mật khẩu thành công!',
        '',
        'success'
      )
      console.log(data);

      this.router.navigateByUrl('client/profile/edit-profile');
    })


  }

}
