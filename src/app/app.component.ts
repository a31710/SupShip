import { Component } from '@angular/core';

declare function toggleSidebar():void;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SupShip';
  constructor(){

  }
}
