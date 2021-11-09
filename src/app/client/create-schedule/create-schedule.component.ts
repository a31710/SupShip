import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit {
  model: NgbDateStruct | any;
  today = this.calendar.getToday();
  time = {hour: 13, minute: 30};
  constructor(private calendar: NgbCalendar) { }

  ngOnInit() {
  }

}
