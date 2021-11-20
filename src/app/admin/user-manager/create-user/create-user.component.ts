import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import Swal from 'sweetalert2'
import { NgSelectConfig } from '@ng-select/ng-select';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  dataPost:any
  dataDept:any
  deptCodeSelect:any;
  postCodeSelect:any;
  roleSelect='NV';
  createUserForm: FormGroup | any;

  constructor(private userService: UserService, private fb: FormBuilder,private config: NgSelectConfig ) {
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';
    this.getAllDeptCode();
    this.createForm();
   }

  ngOnInit() {
  }
  insertUserMessage = {
    'email': [
      { type: 'required', message: 'Bạn chưa nhập ô này' },
      { type: 'email', message: 'Không đúng định dạng email' },
    ]

    }

  roleData = [
    {value:'TCT', name:'Tổng công ty'},
    {value:'TBC', name: 'Tổng bưu cục'},
    {value:'CN', name:'Chi nhánh'},
    {value:'NV', name:'Nhân viên'},
  ]
  createForm(){
    this.createUserForm = this.fb.group({
      email:['', [Validators.required,Validators.email  ]],
      deptCode: ['', Validators.required],
      postCode: ['', Validators.required],
      roles: ['', Validators.required],
    })
  }

  getAllDeptCode(){
    this.userService.getDeptCode().subscribe(data=>this.dataDept=data)
  }

  getPostCode(value:any){
    this.userService.getPostCode(value).subscribe(data=>this.dataPost=data)
  }
  onSubmit(){
    console.log(this.createUserForm.value);
    this.userService.registerUser(this.createUserForm.value).subscribe((data)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Đăng ký thành công',
        showConfirmButton: false,
        timer: 3000
      })
      this.createUserForm.reset();
    })
  }

}
