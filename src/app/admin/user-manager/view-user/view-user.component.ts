import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoaderService } from 'src/app/service/loader.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  tabs = [{
    title:'Danh sách tài khoản',
    value: 1
  }
  ];
  selected = new FormControl(0);



  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  dataUser:any
  offset: number = 0;
  limit: number = 15;
  size: number = 70;
  totalPage:number = 3;
  searchForm: FormGroup | any;
  constructor(private userService: UserService, private fb: FormBuilder,public loaderService: LoaderService) {
    this.userService.getListUser().subscribe(data=>{
      this.size = data.totalItem;
      this.dataUser = data.content;
      console.log(data.content);
    }
    )
    this.CreateForm();
   }

  CreateForm(){
    this.searchForm =this.fb.group({
      search:''
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
  onSearch(){
    console.log(this.req.value);
    this.userService.searchUser(this.req.value).subscribe(data=>{
      this.size = data.totalItem;
      this.dataUser = data.content;
      console.log(data.content);
    }
    )
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
