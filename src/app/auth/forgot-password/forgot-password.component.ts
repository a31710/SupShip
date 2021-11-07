import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm: FormGroup | any;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.forgotForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],

    });
  }
  get email(): FormArray {
    return this.forgotForm.get('email') as FormArray;
  }
  onSubmit(){
    localStorage.setItem('email', JSON.stringify(this.forgotForm.get('email').value));
    this.authService.forgotPassword(this.forgotForm.value).subscribe(()=>{
      this.router.navigateByUrl('auth/change-password')
    })
  }
}
