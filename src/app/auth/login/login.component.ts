import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { LoginModel } from './model/login-model';
import { VertifyEmail } from './model/vertify-email';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any
  loginModel: LoginModel | any;
  vertifyEmail: VertifyEmail | any;
  messsage: any
  username:any
  isCheck:any ='false'
  isLogin:any ='false'
  isUpdate:any ='false'
  isVertify:any ='false'

  email:any
  constructor(private authService: AuthService, private fb: FormBuilder,private router: Router) {
    this.isCheck = this.authService.getCheck();
    this.username = localStorage.getItem('email')?.slice(1, -1);
    this.email = {email: this.username}
    this.createForm();
  }

  ngOnInit() {
  }
  createForm() {
    this.loginForm = this.fb.group({
      email: [this.username, Validators.required],
      password:[null, [Validators.required, Validators.minLength(5),Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,255}$')]],
      tokenCode:[null, Validators.required],
    });
  }

  get password() {
    return this.loginForm.get('password') as FormArray;
  }


  login(){
    this.loginModel={
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }
    this.vertifyEmail = {
      email: this.loginForm.get('email').value,
      tokenCode: this.loginForm.get('tokenCode').value
    }

    if(this.isCheck == 'true'){
      this.authService.login(this.loginModel).subscribe(()=>{
        this.isLogin = this.authService.getLogin();
        if(this.isLogin == 'true'){
         this.authService.checkUpdate(this.email).subscribe(()=>{
           this.isUpdate = this.authService.getUpdate();
           if(this.isUpdate == 'false'){
              Swal.fire('You need to update profile')
              this.router.navigateByUrl('/client/profile/edit-profile');
           }else{
            Swal.fire(
              'Đăng nhập thành công!',
              '',
              'success'
            )
            this.router.navigateByUrl('/admin/customer');
           }
         })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Đăng nhập thất bại',
            text: 'mật khẩu sai',
          })
        }
      })
    }else{
      this.authService.vertifyEmail(this.vertifyEmail).subscribe(()=>{
        this.isVertify = this.authService.getVertify();
        if(this.isVertify == 'true'){
          this.authService.login(this.loginModel).subscribe(()=>{
            this.isLogin = this.authService.getLogin();
            if(this.isLogin == 'true'){
              Swal.fire('You need to update profile')
              this.router.navigateByUrl('/client/profile/edit-profile');
            }else{
              this.messsage ="Dang nhap that bai";
            }
          })
        }else{
          this.messsage = "TokenCode sai";
        }
      }
      )
    }
    }
  }

