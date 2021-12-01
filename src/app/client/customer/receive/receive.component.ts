import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.css']
})
export class ReceiveComponent implements OnInit {
  tien = 3000000;
  totalLead:any
  leadData:any
  constructor(private customerService: CustomerService, private router:Router) {
    this.customerService.getLeadByUser().subscribe(data=>{
      this.leadData = data.data
      this.totalLead = data.totalItem;
      console.log(data);

    })
  }

  getLeadNew(){
    this.customerService.getLeadByStatus('NEW').subscribe(data=>{
      this.leadData = data.data
      this.totalLead = data.totalItem;
    })
  }

  getLeadAll(){
    this.customerService.getLeadByStatus('ALL').subscribe(data=>{
      this.leadData = data.data
      this.totalLead = data.totalItem;
    })
  }

  getLeadContacting(){
    this.customerService.getLeadByStatus('CONTACTING').subscribe(data=>{
      this.leadData = data.data
      this.totalLead = data.totalItem;
    })
  }

  getLeadSuccess(){
    this.customerService.getLeadByStatus('SUCCESS').subscribe(data=>{
      this.leadData = data.data
      this.totalLead = data.totalItem;
    })
  }

  getLeadFailed(){
    this.customerService.getLeadByStatus('FAILED').subscribe(data=>{
      this.leadData = data.data
      this.totalLead = data.totalItem;
    })
  }

  getLeadNotContacting(){
    this.customerService.getLeadByStatus('NOT_CONTACTED').subscribe(data=>{
      this.leadData = data.data
      this.totalLead = data.totalItem;
    })
  }

  ngOnInit() {
  }
  detailCustomer(id:any){
    this.router.navigateByUrl(`client/customer/${id}`);
  }
  createSchedule(id:any){
    this.router.navigateByUrl(`client/create-schedule/${id}`)
  }
}
