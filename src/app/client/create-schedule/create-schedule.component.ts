import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit {
  model: NgbDateStruct | any;
  today = this.calendar.getToday();

  constructor(private calendar: NgbCalendar, private fb: FormBuilder) {
    this.createForm()
   }
  scheduleForm: FormGroup | any;
  ngOnInit() {
  }

  createForm(){
    this.scheduleForm = this.fb.group({
      leadId: ['',],
      fromDate: [''],
      toDate: [''],
    })
  }
  get fromArr(){
    return this.scheduleForm.get('fromDate') as FormArray;
  }
  get toArr(){
    return this.scheduleForm.get('toDate') as FormArray;
  }
  onSubmit(){
    const form:any = `${this.model?.day<10?`0${this.model?.day}`: this.model?.day}-${this.model?.month<10?`0${this.model?.month}`: this.model?.month}-${this.model?.year} ${this.fromArr.value}:00:00`
    const to:any = `${this.model?.day<10?`0${this.model?.day}`: this.model?.day}-${this.model?.month<10?`0${this.model?.month}`: this.model?.month}-${this.model?.year} ${this.toArr.value}:00:00`
    this.fromArr.setValue(form);
    this.toArr.setValue(to);
    console.log(this.scheduleForm.value);
    this.scheduleForm.reset();
  }
}
