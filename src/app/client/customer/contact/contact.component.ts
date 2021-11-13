import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  dateValue: Date = new Date;
  constructor(private router: Router) {
   }

  ngOnInit() {
  }
  log(){
    this.router.navigateByUrl('/client/schedule')
    console.log(this.dateValue);
  }
}
