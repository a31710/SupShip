import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from 'src/app/service/loader.service';
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
  day:Date = new Date;
  model: NgbDateStruct | any;
  today = this.calendar.getToday();
  status:any
  idSchedule:any

  constructor(private calendar: NgbCalendar, private fb: FormBuilder, private router:Router,private datePipe: DatePipe,
     private activateRoute: ActivatedRoute,private customerService:CustomerService, public loaderService: LoaderService,private scheduleService: ScheduleService) {
      this.scheduleService.indexTab = 0;
      this.activateRoute.params.subscribe(params=>{
        const id = params['id'];
        this.customerService.getDetailCustomer(id).subscribe(data=>{
          this.scheduleData = [data]
          this.updateHour(data?.schedules)
          this.status = data.status;
          this.idSchedule = data?.schedules[0].id;
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
  onChaneDay(value:any){
    this.day = value;
    console.log(value);

  }

  updateHour(data:any){
    if(data){
      const fromDate = this.datePipe.transform(data[data.length-1].fromDate,'HH:mm')
      const toDate = this.datePipe.transform(data[data.length-1].toDate,'HH:mm')
      this.day = new Date(data[data.length-1].fromDate);
      this.time1 = fromDate;
      this.time2 = toDate;
    }
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
    const form:any = `${this.datePipes(this.day)} ${this.time1}:00`
    const to:any = `${this.datePipes(this.day)} ${this.time2}:00`
    this.fromArr.setValue(form);
    this.toArr.setValue(to);
    console.log(this.scheduleForm.value);


    if(this.status == 'CONTACTING'){
      this.scheduleService.changeSchedule(this.scheduleForm.value, this.idSchedule).subscribe(data=>{
        console.log(data);
      if(data?.error == 'true'){
        Swal.fire({
          title: 'Đổi lịch thất bại?',
          text: data?.message,
          icon: 'error',
          confirmButtonColor: '#4e73df',
          confirmButtonText: 'Chấp nhận'
        })
      }else{
        this.scheduleForm.reset();
        Swal.fire({
          title: 'Đổi lịch thành công',
          icon: 'success',
          confirmButtonColor: '#4e73df',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl('/client/customer')
          }
        })
      }
      })
    }else{
      this.customerService.createSchedule(this.scheduleForm.value).subscribe(data=>{
        console.log(data);
      if(data?.error == 'true'){
        Swal.fire({
          title: 'Đặt lịch thất bại?',
          text: data?.message,
          icon: 'error',
          confirmButtonColor: '#4e73df',
          confirmButtonText: 'Chấp nhận'
        })
      }else{
        this.scheduleForm.reset();
        Swal.fire({
          title: 'Đặt lịch thành công',
          icon: 'success',
          confirmButtonColor: '#4e73df',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl('/client/customer')
          }
        })
      }
      })
    }

  }

  datePipes(time:any){
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
