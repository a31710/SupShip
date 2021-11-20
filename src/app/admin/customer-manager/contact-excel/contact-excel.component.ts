import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { timeThursdays } from 'd3-time';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-contact-excel',
  templateUrl: './contact-excel.component.html',
  styleUrls: ['./contact-excel.component.css']
})
export class ContactExcelComponent implements OnInit {
  detailData:any
  historyData:any
  leadsAssignByExcel:any[] = [];
  tabs = [{
    value:1, name:'Lịch sử Upload'
  },
  {
    value:2, name:'Chi tiết file'
  }
  ];

  secondTab = [{
    value:1,name:'Tổng số bản ghi'
  },
  {
    value:2,name:'Danh sách hợp lệ'
  },
  {
    value:1,name:'Danh sách lỗi'
  },

  ]
  selected = new FormControl(0);
  secondSelected = new FormControl(0);


  constructor(private customerService: CustomerService) {
    this.customerService.excelHistory().subscribe(data=>{
      this.historyData = data.data
    })
   }

  ngOnInit() {
  }

  detailTab(id:any){
    this.tabs.forEach((d,i)=>{
      if(d.value == 2){
        this.selected.setValue(i);
      }
    })
    this.customerService.detailHIstory(id).subscribe(data=>{
      this.detailData = [data]
      const d = data?.leadsAssignByExcel;
      d.map((item:any)=>{
        this.leadsAssignByExcel = [];
        this.leadsAssignByExcel.push(item);
      })

    })
  }

}
