import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-contact-report',
  templateUrl: './contact-report.component.html',
  styleUrls: ['./contact-report.component.css']
})
export class ContactReportComponent implements OnInit {

  @Output() onPostChange: EventEmitter<any>;
  constructor() {
    this.onPostChange = new EventEmitter<any>();
  }

  ngOnInit() {
  }
  postReport(){
    this.onPostChange.emit("3");
  }
}
