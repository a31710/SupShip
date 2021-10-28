import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {
listCustomer:any


  constructor(private customerService: CustomerService) {
    this.customerService.getAllCustomer().subscribe(data=>this.listCustomer =data.data)
  }

  ngOnInit() {
  }

}
