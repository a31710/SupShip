import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  @Output() createUser: EventEmitter<any>;

  constructor(private userService: UserService, private fb: FormBuilder,private config: NgSelectConfig ) {
    this.createUser =  new EventEmitter<any>();
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

  get emailArr(){
    return this.createUserForm.get('email') as FormArray;
  }

  get deptCodeArr(){
    return this.createUserForm.get('deptCode') as FormArray;
  }

  get postCodeArr(){
    return this.createUserForm.get('postCode') as FormArray;
  }

  get rolesArr(){
    return this.createUserForm.get('roles') as FormArray;
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
      if(data?.error == 'true'){
        Swal.fire({
          title: 'Tạo tài khoản thất bại',
          text: data?.message,
          icon: 'error',
          confirmButtonColor: '#4e73df',
          confirmButtonText: 'Chấp nhận'
        })
      }else{
        Swal.fire({
          title: 'Tạo mới tài khoản thành công',
          icon: 'success',
          confirmButtonColor: '#4e73df',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
              this.createUser.emit(data);
          }
        })
      }
    })
  }

}
