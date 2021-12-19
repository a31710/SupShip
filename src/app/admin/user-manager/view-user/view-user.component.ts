import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoaderService } from 'src/app/service/loader.service';
import { UserService } from '../../service/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  idUser:any
  tabs = [{
    title:'Danh sách tài khoản',
    value: 1
  }
  ];
  selected = new FormControl(0);



  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
  idFrom: FormGroup | any;
  dataUser:any
  offset: number = 0;
  limit: number = 15;
  size: number = 70;
  totalPage:number = 3;
  searchForm: FormGroup | any;
  constructor(private userService: UserService, private fb: FormBuilder,public loaderService: LoaderService) {
    this.userService.getListUser().subscribe(data=>{
      this.size = data.content.length;
      this.dataUser = data.content;
      console.log(data);
    })
    this.CreateForm();
   }

  CreateForm(){
    this.searchForm =this.fb.group({
      search:''
    })
    this.idFrom =this.fb.group({
      userUid:''
    })
  }
  ngOnInit() {
  }
  onPageChange(offset: number) {
    this.offset = offset;
  }
  get req() {
    return this.searchForm.get('search') as FormArray;
  }

  getIdUser(id:any){
    const userid = id.replace(/\s/g, '');
    this.idFrom.controls['userUid'].setValue(userid);
    console.log(this.idFrom.value);
  }

  banUser(){
    this.userService.banUser(this.idFrom.value).subscribe(data=>{
      if(data?.error == 'true'){
        Swal.fire({
          title: 'Khóa tài khoản thất bại',
          text: data?.message,
          icon: 'error',
          confirmButtonColor: '#4e73df',
          confirmButtonText: 'Chấp nhận'
        })
      }else{
        Swal.fire({
          title: 'Khóa tài khoản thành công',
          icon: 'success',
          confirmButtonColor: '#4e73df',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.userService.getListUser().subscribe(data=>{
              this.size = data.totalItem;
              this.dataUser = data.content;
              console.log(data.content);
            })
          }
        })
      }
    })
  }


  unLockUser(){
    this.userService.unlockUser(this.idFrom.value).subscribe(data=>{
      if(data?.error == 'true'){
        Swal.fire({
          title: 'Mở khóa tài khoản thất bại',
          text: data?.message,
          icon: 'error',
          confirmButtonColor: '#4e73df',
          confirmButtonText: 'Chấp nhận'
        })
      }else{
        Swal.fire({
          title: 'Mở khóa tài khoản thành công',
          icon: 'success',
          confirmButtonColor: '#4e73df',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.userService.getListUser().subscribe(data=>{
              this.size = data.totalItem;
              this.dataUser = data.content;
              console.log(data.content);
            })
          }
        })
      }
    })
  }

  onSearch(){
    console.log(this.req.value);
    this.userService.searchUser(this.req.value).subscribe(data=>{
      if(data?.error == 'true'){
        Swal.fire({
          title: data?.message,
          icon: 'error',
          confirmButtonColor: '#4e73df',
          confirmButtonText: 'Chấp nhận'
        })
      }else{
        this.size = data.length;
        this.dataUser = data;
      }
    })
  }

  onCreateUser(data:any){
    this.userService.getListUser().subscribe(data=>{
      this.size = data.totalItem;
      this.dataUser = data.content;
      console.log(data.content);
    })

    this.tabs.map((d,i)=>{
      if(d.value == 2){
        this.tabs.splice(i, 1);
      }
    })
    this.selected.setValue(0);
    console.log(data);
  }
  addTab(){
    const createCustomer = {title:'Tạo mới tài khoản', value:2}
    const oldData = this.tabs.filter(data => data.value == 2)
    if(oldData[0]?.value == 2){
      console.log('bị trùng, trở về tab cũ');
      this.tabs.forEach((d,i)=>{
        if(d.value == 2){
          this.selected.setValue(i);
        }
      })
    }else{
      console.log('tạo mới');
      this.tabs.push(createCustomer);
      this.selected.setValue(this.tabs.length - 1);
    }
  }

}
