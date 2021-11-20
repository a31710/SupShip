import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username:any
  constructor() {
    this.username = localStorage.getItem('username');
   }

  ngOnInit() {
  }
  toggle(){
    $("#sidebarToggle, #sidebarToggleTop, #accordionSidebar").toggleClass("toggled si");

  }
}
