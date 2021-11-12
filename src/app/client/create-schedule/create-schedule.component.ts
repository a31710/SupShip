import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { CustomerService } from '../service/customer.service';
@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit {
  model: NgbDateStruct | any;
  today = this.calendar.getToday();

  constructor(private calendar: NgbCalendar, private fb: FormBuilder, private router:Router,
     private activateRoute: ActivatedRoute,private customerService:CustomerService) {
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
  get leadIdArr(){
    return this.scheduleForm.get('leadId') as FormArray;
  }
  get fromArr(){
    return this.scheduleForm.get('fromDate') as FormArray;
  }
  get toArr(){
    return this.scheduleForm.get('toDate') as FormArray;
  }
  onSubmit(){
    this.activateRoute.params.subscribe(params => this.leadIdArr.setValue(params['id']))
    const form:any = `${this.model?.day<10?`0${this.model?.day}`: this.model?.day}-${this.model?.month<10?`0${this.model?.month}`: this.model?.month}-${this.model?.year} ${this.fromArr.value<10?`0${this.fromArr.value}`: this.fromArr.value}:00:00`
    const to:any = `${this.model?.day<10?`0${this.model?.day}`: this.model?.day}-${this.model?.month<10?`0${this.model?.month}`: this.model?.month}-${this.model?.year} ${this.toArr.value<10?`0${this.toArr.value}`: this.toArr.value}:00:00`
    this.fromArr.setValue(form);
    this.toArr.setValue(to);
    this.customerService.createSchedule(this.scheduleForm.value).subscribe(data=>{
      this.scheduleForm.reset();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Đặt lịch thành công',
        showConfirmButton: false,
        timer: 3000
      })
      this.router.navigateByUrl('/client/customer')

    })

  }
}
