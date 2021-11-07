import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-checkemail',
  templateUrl: './checkemail.component.html',
  styleUrls: ['./checkemail.component.css']
})
export class CheckemailComponent implements OnInit {

  checkForm: FormGroup | any;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
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
    this.authService.checkEmail(this.checkForm.value).subscribe(()=>{
      this.router.navigateByUrl('auth/login')
      console.log(this.authService.getCheck());

    })
  }
  get email(): FormArray {
    return this.checkForm.get('email') as FormArray;
  }
}
