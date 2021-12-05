import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { timeThursdays } from 'd3-time';
import { CustomerService } from '../../service/customer.service';
import * as fileSaver from 'file-saver';
import { LoaderService } from 'src/app/service/loader.service';
@Component({
  selector: 'app-contact-excel',
  templateUrl: './contact-excel.component.html',
  styleUrls: ['./contact-excel.component.css']
})
export class ContactExcelComponent implements OnInit, OnChanges {
  @Input() loadExcel:any;
  offset: number = 0;
  limit: number = 15;
  size:any
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


  constructor(private customerService: CustomerService,public loaderService: LoaderService) {
    this.customerService.excelHistory().subscribe(data=>{
      this.historyData = data.data
      this.size = data.totalItem;
    })
   }

  ngOnInit() {
  }
  ngOnChanges(){
      this.customerService.excelHistory().subscribe(data=>{
        this.historyData = data.data
        this.size = data.totalItem;
      })
  }

  fetchExcel(value:any){
    console.log(value);

  }

  onPageChange(offset: number) {
      console.log(offset);

  }

  detailTab(id:any){
    this.tabs.forEach((d,i)=>{
      if(d.value == 2){
        this.selected.setValue(i);
      }
    })
    this.customerService.detailHIstory(id).subscribe(data=>{
      console.log(data);

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
