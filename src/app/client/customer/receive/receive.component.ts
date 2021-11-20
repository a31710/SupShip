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

  ngOnInit() {
  }
  detailCustomer(id:any){
    this.router.navigateByUrl(`client/customer/${id}`);
  }
  createSchedule(id:any){
    this.router.navigateByUrl(`client/create-schedule/${id}`)
  }
}
