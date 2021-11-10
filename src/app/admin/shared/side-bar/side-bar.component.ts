import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  toggle(){
    $("#sidebarToggle, #sidebarToggleTop, #accordionSidebar").toggleClass("toggled si");
  }
}
