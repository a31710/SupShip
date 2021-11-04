import { Component, OnInit } from '@angular/core';
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
  constructor(private userService: UserService) {
    this.userService.getListUser().subscribe(data=>{
      this.dataUser = data.content;
      console.log(data.content);

    }
    )
   }

  ngOnInit() {
  }
  onPageChange(offset: number) {
    this.offset = offset;
    console.log(offset);
  }


}
