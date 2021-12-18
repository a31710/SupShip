import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { LoginModel } from './model/login-model';
import { VertifyEmail } from './model/vertify-email';
import Swal from 'sweetalert2'
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  passwords:any = 'password';
  show = false;
  loginForm: FormGroup | any
  loginModel: LoginModel | any;
  vertifyEmail: VertifyEmail | any;


  messsage: any
  username:any

  isLogin:any ='false'
  isUpdate:any ='false'
  isVertify:any ='false'

  emaiModel:any;


  email:any
  constructor(private authService: AuthService, private fb: FormBuilder,private router: Router,public loaderService: LoaderService) {
    this.isVertify = this.authService.getVertify();
    this.username = localStorage.getItem('email')?.slice(1, -1);
    this.email = {email: this.username}
    this.createForm();
  }

  ngOnInit() {
    this.passwords = 'password';
  }

  onClick() {
    if (this.passwords === 'password') {
      this.passwords = 'text';
      this.show = true;
    } else {
      this.passwords = 'password';
      this.show = false;
    }
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: [this.username, Validators.required],
      password:[null, [Validators.required, Validators.minLength(5),Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,255}$')]],
      tokenCode:[null],
    });
  }

  get password() {
    return this.loginForm.get('password') as FormArray;
  }

  get emailArr(){
    return this.loginForm.get('email') as FormArray;
  }

  get tokenArr(){
    return this.loginForm.get('tokenCode') as FormArray;
  }




  login(){
    this.authService.logOut();
    this.emaiModel={
      email: this.emailArr.value
    }

    this.loginModel={
      email: this.emailArr.value,
      password: this.password.value
    }
    this.vertifyEmail = {
      email: this.emailArr.value,
      tokenCode: this.tokenArr.value
    }


    if(this.isVertify == 'true'){
      this.postLogin();
    }else{
      this.authService.vertifyEmail(this.vertifyEmail).subscribe(data=>{
        console.log(data);
        if(data?.error == 'true'){
          Swal.fire({
            text: data?.message,
            icon: 'error',
            confirmButtonColor: '#4e73df',
            confirmButtonText: 'Chấp nhận'
          })
        }else{
          this.postLogin();
        }

      })
    }

    }

    setTime(){
      setTimeout(()=>{
        const role = this.authService.getRole();
        if(role){
          if(role == 'NV'){
            this.router.navigateByUrl('/client/customer');
          }else{
            this.router.navigateByUrl('/admin/customer');
          }
        }else{
          this.setTime()
        }
      })
    }

    postLogin(){
      this.authService.login(this.loginModel).subscribe((data)=>{
        console.log(data);

        if(data?.error == 'true'){
          Swal.fire({
            title: 'Đăng nhập thất bại',
            text: data?.message,
            icon: 'error',
            confirmButtonColor: '#4e73df',
            confirmButtonText: 'Chấp nhận'
          })
        }else{
          this.authService.checkUpdate(this.emaiModel).subscribe(data=>{
            console.log(this.authService.getIsUpdate());

            if(this.authService.getIsUpdate() == 'true'){
              Swal.fire({
                title: 'Bạn chưa cập nhật thông tin cá nhân',
                text: 'Vui lòng cập nhật thông tin',
                icon: 'error',
                confirmButtonColor: '#4e73df',
                confirmButtonText: 'Chấp nhận'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigateByUrl('/client/profile/edit-profile');
                }
              })
            }else{
              Swal.fire({
                title: 'Đăng nhập thành công',
                icon: 'success',
                confirmButtonColor: '#4e73df',
                confirmButtonText: 'OK'
              })

              this.setTime();

            }
          })
        }
      })
    }
  }

