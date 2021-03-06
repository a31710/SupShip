import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

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
  constructor(private authService: AuthService, private fb: FormBuilder,private router: Router, private toastr: ToastrService) {
    this.username = localStorage.getItem('email')?.slice(1, -1);
    this.createForm();
  }

  changePasswordMessage = {
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

  ngOnInit(): void {
  }
  createForm() {
    this.changeForm = this.fb.group({
      forGotPassword: [true],
      email: [null, [Validators.required, Validators.email]],
      tokenCode:[null, Validators.required],
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

  onSubmit(){

    this.authService.changePassword(this.changeForm.value).subscribe(()=>{
      this.router.navigateByUrl('auth/checkemail');
    })
    this.toastr.success('Bạn đã đổi mật khẩu thành công')

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

}
