import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {
listCustomer:any


  constructor(private customerService: CustomerService, private route: Router, private toastr: ToastrService, private cookieService: CookieService) {
    this.customerService.getAllCustomer().subscribe(data=>this.listCustomer =data.data)
  }

  ngOnInit() {
  }

  onDelete(id:any){
     this.listCustomer = this.listCustomer.filter((data:any) => data.id !== id);
    this.customerService.deleteCustomer(id).subscribe(()=>{
      this.toastr.success('Xóa thành công');
    })
  }
  onUpdate(id:any){
    this.route.navigateByUrl(`/admin/customer/update/${id}`);
  }

}