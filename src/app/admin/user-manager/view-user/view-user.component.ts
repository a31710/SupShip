import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoaderService } from 'src/app/service/loader.service';
import { UserService } from '../../service/user.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/service/auth.service';
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  idUser:boolean = false;
  tabs = [{
    title:'Danh sách tài khoản',
    value: 1
  }
  ];
  selected = new FormControl(0);
  isShow:any


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
  pagiUserData:any;
 
  constructor(private userService: UserService, private fb: FormBuilder,public loaderService: LoaderService,private authService: AuthService) {
    this.roleFunction();
    this.fetchApi();
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

  // tạo body để gọi api post.  

  fetchApi(){
    this.userService.getListUser().subscribe(data=>{
      this.size = data.content.length;
      this.dataUser = data.content;
      this.pagiUserData = this.paginate(this.dataUser,15,1);
      console.log(data);
    })
  }
  // lấy data để hiển thị lên html

  roleFunction(){
    const role = this.authService.getRole();
    if(role == 'TCT'){
      this.isShow = true;
    }
  }
  // lấy quyền trong cookie để show các tính năng của quyền TCT

  ngOnInit() {
  }
  onPageChange(offset: number) {
    this.offset = offset;
    this.pagiUserData = this.paginate(this.dataUser,this.limit,(this.offset/this.limit)+1);
  }




  get req() {
    return this.searchForm.get('search') as FormArray;
  }
  // lấy giá trị của ô input trên searchForm

  getIdUser(id:any){
    const userid = id.replace(/\s/g, '');
    this.idFrom.controls['userUid'].setValue(userid);
    console.log(this.idFrom.value);
  }
  // lấy id theo user khi click vào user hoặc ban user

  paginate(array:any, pageSize:any, pageNumber:any) {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }
  // hàm trả về data đã lọc theo pagi



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
           this.fetchApi();
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
            this.fetchApi();
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
        this.pagiUserData = this.paginate(this.dataUser,15,1);
      }
    })
  }

  onCreateUser(data:any){
    this.userService.getListUser().subscribe(data=>{
      this.size = data.totalItem;
      this.dataUser = data.content;
      this.pagiUserData = this.paginate(this.dataUser,15,1);
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
