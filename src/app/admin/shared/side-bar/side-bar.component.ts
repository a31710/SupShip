import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  isAdmin:Boolean = false;
  constructor(private cookieService: CookieService) {
    const roles = this.cookieService.get('roles');
    if(roles == "NV"){
      this.isAdmin = false;
    }else{
      this.isAdmin = true;
    }
   }

  ngOnInit() {
  }
  toggle(){
    $("#sidebarToggle, #sidebarToggleTop, #accordionSidebar").toggleClass("toggled si");
  }
}
