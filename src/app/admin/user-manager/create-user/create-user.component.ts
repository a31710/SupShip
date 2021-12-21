import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import Swal from 'sweetalert2'
import { NgSelectConfig } from '@ng-select/ng-select';
import { AuthService } from 'src/app/auth/service/auth.service';
import { CustomerService } from '../../service/customer.service';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  dsbDept:boolean = false;
  dsbPost:boolean = false;
  dsbRole:boolean = false;
  dataPost:any
  dataDept:any
  deptCodeSelect:any;
  postCodeSelect:any;
  roleSelect='NV';
  createUserForm: FormGroup | any;
  @Output() createUser: EventEmitter<any>;

  constructor(private userService: UserService, private fb: FormBuilder,private config: NgSelectConfig,
    private authService: AuthService , private customerService: CustomerService) {

    this.createUser =  new EventEmitter<any>();
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';
    this.getAllDeptCode();
    this.createForm();
   }


  // roleFunction(){
  //   const role = this.authService.getRole();
  //   if(role == 'CN'){
  //     this.customerService.fillCbx().subscribe(data=>{
  //       console.log(data);
  //       this.deptCodeSelect = data.deptCode
  //       this.dsbDept = true;
  //       this.getPostCode(data.deptCode);
  //       this.roleData = this.roleData.filter((d:any) => d.value == 'NV')
  //     })
  //   }
  //   if(role == 'BC'){
  //     this.customerService.fillCbx().subscribe(data=>{
  //       this.deptCodeSelect = data.deptCode;
  //       this.getPostCode(data.deptCode);
  //       this.postCodeSelect = data.postCode;
  //       this.dsbDept = true;
  //       this.dsbPost = true;
  //       this.roleData = this.roleData.filter((d:any) => d.value == 'NV')
  //     })
  //   }
  // }

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
    {value:'BC', name: 'Bưu cục'},
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
