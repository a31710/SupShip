import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  username:any
  constructor() {
    this.username = localStorage.getItem('username');
   }

  ngOnInit() {
    this.username = localStorage.getItem('username');
  }
  ngOnChanges() {
    this.username = localStorage.getItem('username');
  }
  ngDoCheck(){
    this.username = localStorage.getItem('username');
  }

  ngAfterViewInit(){
    this.username = localStorage.getItem('username');
  }
  ngAfterViewChecked(){
    this.username = localStorage.getItem('username');
  }
  toggle(){
    $("#sidebarToggle, #sidebarToggleTop, #accordionSidebar").toggleClass("toggled si");

  }
}
