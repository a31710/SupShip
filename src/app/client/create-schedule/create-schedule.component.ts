import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { CustomerService } from '../service/customer.service';
import { ScheduleService } from '../service/schedule.service';
@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit {
  scheduleData:any
  time1Validate:boolean = true;
  time2Validate:boolean = true;
  time1:any
  time2:any
  day: Date | any;
  model: NgbDateStruct | any;
  today = this.calendar.getToday();

  constructor(private calendar: NgbCalendar, private fb: FormBuilder, private router:Router,
     private activateRoute: ActivatedRoute,private customerService:CustomerService, private scheduleService: ScheduleService) {
      this.activateRoute.params.subscribe(params=>{
        const id = params['id'];
        this.scheduleService.detailSchedule(id).subscribe(data=>{
          this.scheduleData = [data]
          console.log(data);
        })

      })
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
    this.activateRoute.params.subscribe(params => {
      const id:any = parseInt(params['id']);
      this.leadIdArr.setValue(id);
    })
    const form:any = `${this.datePipe(this.day)} ${this.time1}:00`
    const to:any = `${this.datePipe(this.day)} ${this.time2}:00`
    this.fromArr.setValue(form);
    this.toArr.setValue(to);
    console.log(this.scheduleForm.value);
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

  datePipe(time:any){
    const day= time.getDate()<10?`0${time.getDate()}`:time.getDate();
    const month = time.getMonth()+1<10?`0${time.getMonth()+1}`:time.getMonth()+1;
    const year = time.getYear().toString().substring(1,3);
    return `${day}-${month}-20${year}`
  }
  changeTime1(time:any){
    if(time == '00:00'){
      this.time1Validate = false;
    }else{
      this.time1Validate = true;
    }

  }
  changeTime2(time:any){
    if(time == '00:00'){
      this.time2Validate = false
    }else{
      this.time2Validate = true;
    }
  }
}
