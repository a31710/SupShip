import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { utcThursdays } from 'd3-time';
import { CustomerService } from '../../service/customer.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-contact-report',
  templateUrl: './contact-report.component.html',
  styleUrls: ['./contact-report.component.css']
})
export class ContactReportComponent implements OnInit {
  isToggle:any =[];
  ReportAllCompany:any;
  listPostCode:any[] = [];
  dataDept:any;
  deptCodeSelect:any
  fromDate:any;
  toDate: Date = new Date;

  @Output() onPostChange: EventEmitter<any>;
  constructor(private customerService: CustomerService,private userService: UserService) {
    this.onPostChange = new EventEmitter<any>();
    this.fromDate =  new Date(this.toDate.getFullYear(), this.toDate.getMonth(), 1);
    this.getAllDeptCode();
    this.customerService.ReportAllCompany(this.datePipe(this.fromDate),this.datePipe(this.toDate)).subscribe(data=>{
      console.log(data);
      this.ReportAllCompany = data?.data;
    })
  }




  toogleData(deptCode:any){

    if(this.isToggle.includes(deptCode)){
      const index = this.isToggle.indexOf(deptCode);
      if (index > -1) {
        this.isToggle.splice(index, 1);
      }
      this.listPostCode.map((d:any)=>{
       this.ReportAllCompany = this.ReportAllCompany.filter((i:any)=> i.postCode == d.postcode);
      })
      this.listPostCode = [];

    }else{
  // Thêm data vào ReportAllCompany
    this.ReportAllCompany.map((d:any,i:any)=>{
      if(d.deptCode == deptCode){
        const deptCodeData = this.ReportAllCompany.filter((d:any)=> d.deptCode == deptCode);
        deptCodeData[0]?.reportMonthlyPostOfficeDtos.map((d:any)=>{
          this.listPostCode.push(d.postCode);
          this.ReportAllCompany.splice(i+1,0,d)
        })
      }
    })

    this.isToggle.push(deptCode);
    }
  }

  datePipe(date:any){
    return ('0' + date.getDate()).slice(-2) + '-'
    + ('0' + (date.getMonth()+1)).slice(-2) + '-'
    + date.getFullYear();
  }


  onSearch(){
    const fromDate = this.datePipe(this.fromDate);
    const toDate = this.datePipe(this.toDate);
    console.log(`${fromDate} ${toDate} ${this.deptCodeSelect}`);

  }


  getAllDeptCode(){
    this.userService.getDeptCode().subscribe(data=>this.dataDept=data)
  }

  ngOnInit() {
  }
  postReport(postCode:any){
    this.onPostChange.emit(postCode);
  }
}
