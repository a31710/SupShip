import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-checkemail',
  templateUrl: './checkemail.component.html',
  styleUrls: ['./checkemail.component.css']
})
export class CheckemailComponent implements OnInit {

  checkForm: FormGroup | any;

  constructor(private authService: AuthService, private router: Router,
     private activatedRoute: ActivatedRoute, private fb: FormBuilder,public loaderService: LoaderService) {
    this.createForm();
  }

  ngOnInit() {

  }
  createForm() {
    this.checkForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],

    });
  }


  checkEmail(){
    localStorage.setItem('email', JSON.stringify(this.checkForm.get('email').value));
    this.authService.checkEmail(this.checkForm.value).subscribe((data)=>{
      if(data?.error == 'true'){
        Swal.fire({
          title: data?.message,
          icon: 'error',
          confirmButtonColor: '#4e73df',
          confirmButtonText: 'Chấp nhận'
        })
      }else{
        this.router.navigateByUrl('auth/login');
      }


    })
  }
  get email(): FormArray {
    return this.checkForm.get('email') as FormArray;
  }
}
