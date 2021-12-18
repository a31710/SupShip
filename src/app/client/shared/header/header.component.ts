import { Component, OnChanges, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnChanges {
  username:any
  constructor(private authService:AuthService) {
    this.username = localStorage.getItem('username')
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
