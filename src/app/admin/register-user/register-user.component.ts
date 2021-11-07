import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  registerForm: FormGroup | any;
  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.createForm();
  }

  ngOnInit() {
  }
  createForm() {
    this.registerForm = this.fb.group({
      email: [null, Validators.required],
      role:[null, Validators.required],
    });
  }
  register(){
    console.log(this.registerForm.value);
    this.toastr.success("Thêm thành công");
  }



}
