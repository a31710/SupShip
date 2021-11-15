import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {


  isAdmin:Boolean = false;
  constructor() {
    const roles = localStorage.getItem('roles');
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
