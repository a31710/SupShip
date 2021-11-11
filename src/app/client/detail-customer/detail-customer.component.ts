import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.css']
})
export class DetailCustomerComponent implements OnInit {
  leadData:any
  constructor(private customerService: CustomerService, private activateRoute: ActivatedRoute) {
    this.activateRoute.params.subscribe(param=>{
      const id = param['id']
      this.customerService.getDetailCustomer(id).subscribe(data=>this.leadData = data
      )

    })
   }

  ngOnInit() {
  }

}
