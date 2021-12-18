import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth/service/auth.service';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  isAdmin:Boolean = false;
  constructor(private cookieService: CookieService, private authService: AuthService) {
    this.setTime();
   }
   setTime(){
    setTimeout(()=>{
      const role = this.authService.getRole();
      if(role){
        if(role == "NV"){
          this.isAdmin = false;
        }else{
          this.isAdmin = true;
        }
      }else{
        this.setTime()
      }
    })
  }
  ngOnInit() {
  }
  toggle(){
    $("#sidebarToggle, #sidebarToggleTop, #accordionSidebar").toggleClass("toggled si");
  }
}
