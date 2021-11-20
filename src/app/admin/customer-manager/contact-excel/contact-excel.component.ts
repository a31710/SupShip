import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { timeThursdays } from 'd3-time';
import { CustomerService } from '../../service/customer.service';
import * as fileSaver from 'file-saver';
@Component({
  selector: 'app-contact-excel',
  templateUrl: './contact-excel.component.html',
  styleUrls: ['./contact-excel.component.css']
})
export class ContactExcelComponent implements OnInit {
  fileName='Giao-tiep-xuc-khach-hang-mau.xlsx'
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

  returnBlob(res:any) : Blob {
    console.log('file Downloaded');
    return new Blob([res], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });
  }
  download(){

    this.customerService.DownloadFile(this.fileName).subscribe( res =>{
      if(res){
        fileSaver.saveAs(this.returnBlob(res),this.fileName);
      }
    })
  }
}
