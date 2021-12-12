import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoaderService } from 'src/app/service/loader.service';
import { ScheduleService } from '../service/schedule.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit,OnChanges {
  tabs = [{
    title:'Khách hàng',
    value: 1
  },{
    title:'Tiếp xúc',
    value: 2
  },{
    title:'Báo cáo',
    value: 3
  }
  ];
  selected = new FormControl();
  select:any = 0;
  index:any;


  constructor(public loaderService: LoaderService, private scheduleService: ScheduleService) {
    this.selected.setValue(this.scheduleService.indexTab)
  }

  ngOnInit() {
  }
  ngOnChanges() {
    console.log(this.index+ 'vk');

  }



}
