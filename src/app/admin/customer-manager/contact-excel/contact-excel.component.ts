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
  detailData:any[] = [];
  historyData:any
  leadsAssignByExcel:any[] = [];
  leadAssignSuccess:any[] = [];
  leadAssignFailed:any[] = [];
  pagiHistoryData:any

  offsetDetail: number = 0;
  limitDetail: number = 15;
  sizeDetail:any
  pagiDetail:any

  offsetSuccess: number = 0;
  limitSuccess: number = 15;
  sizeSuccess:any
  pagiSuccess:any

  offsetFailed: number = 0;
  limitFailed: number = 15;
  sizeFailed:any
  pagiFailed:any

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
    value:3,name:'Danh sách lỗi'
  },

  ]
  selected = new FormControl(0);
  secondSelected = new FormControl(0);


  constructor(private customerService: CustomerService,public loaderService: LoaderService) {
    this.customerService.excelHistory().subscribe(data=>{
      this.historyData = data.data
      this.size = data.totalItem;
      this.pagiHistoryData = this.paginate(this.historyData,15,1);
    })
   }

  ngOnInit() {
  }
  ngOnChanges(){
      // this.customerService.excelHistory().subscribe(data=>{
      //   this.historyData = data.data
      //   this.size = data.totalItem;
      // })
  }

  fetchExcel(value:any){
    console.log(value);

  }

  paginate(array:any, page_size:any, page_number:any) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }
  onPageChange(offset:any){
    this.offset = offset;
    this.pagiHistoryData = this.paginate(this.historyData,this.limit,(this.offset/this.limit)+1);
  }

  onPageChangeDetail(offset:any){
    this.offsetDetail = offset;
    this.pagiDetail = this.paginate(this.leadsAssignByExcel,this.limitDetail,(this.offsetDetail/this.limitDetail)+1);
  }

  onPageChangeSuccess(offset:any){
    this.offsetSuccess = offset;
    this.pagiSuccess = this.paginate(this.leadAssignSuccess,this.limitSuccess,(this.offsetSuccess/this.limitSuccess)+1);
  }

  onPageChangeFailed(offset:any){
    this.offsetFailed = offset;
    this.pagiFailed = this.paginate(this.leadAssignFailed,this.limitFailed,(this.offsetFailed/this.limitFailed)+1);
  }

  detailTab(id:any){
    this.leadsAssignByExcel = [];
    this.leadAssignSuccess = [];
    this.leadAssignFailed = [];
    this.offsetDetail = 0;
    this.offsetSuccess = 0;
    this.offsetFailed = 0;
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
        if(item?.status == 0){
          this.leadAssignSuccess.push(item);
          this.pagiSuccess = this.paginate(this.leadAssignSuccess,15,1);
          this.sizeSuccess = this.leadAssignSuccess?.length;
        }else{
          this.leadAssignFailed.push(item);
          this.pagiFailed = this.paginate(this.leadAssignFailed,15,1);
          this.sizeFailed = this.leadAssignFailed?.length;
        }
        this.leadsAssignByExcel.push(item);
        this.pagiDetail = this.paginate(this.leadsAssignByExcel,15,1);
        this.sizeDetail = this.leadsAssignByExcel?.length;
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
