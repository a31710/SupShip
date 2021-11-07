import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  dataUser:any
  offset: number = 0;
  limit: number = 15;
  size: number = 70;
  totalPage:number = 3;
  searchForm: FormGroup | any;
  constructor(private userService: UserService, private fb: FormBuilder) {
    this.userService.getListUser().subscribe(data=>{
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
    console.log(offset);
  }
  get req() {
    return this.searchForm.get('search') as FormArray;
  }
  onSearch(){
    console.log(this.req.value);
    this.userService.searchUser(this.req.value).subscribe(data=>console.log(data)
    )
  }


}
