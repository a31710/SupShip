import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleService } from '../../service/schedule.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  scheduleData:any;
  day: Date = new Date;
  dateValue: Date = new Date;
  constructor(private router: Router,private scheduleService: ScheduleService) {
    this.scheduleService.listSchedule(this.datePipe(this.day)).subscribe((data)=>{
      this.scheduleData = data.content;
    })
   }

   onChangeMonth(date:any){
     this.scheduleService.listScheduleMonth(this.datePipe(date)).subscribe(data=>{
      this.scheduleData = data.content;
      console.log(data);

     }
     )

   }

   onChangeDay(day:any){
    this.scheduleService.listSchedule(this.datePipe(day)).subscribe((data)=>{
      this.scheduleData = data.content;
      console.log(data?.content[0]?.fromDate);
    })
   }

  ngOnInit() {
  }
  detailSchedule(id:any){
    this.router.navigateByUrl(`/client/schedule/${id}`)
  }
  datePipe(date:any){
    const day =  date.getDate();
    const month = date.getMonth()+1;
    const year = date.getYear().toString().substring(1,3);
    return `${day<10?`0${day}`:day}-${month<10?`0${month}`:month}-20${year}`
  }
}
