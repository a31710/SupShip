import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../service/customer.service';
import { PrimeIcons } from "primeng/api";
import { LoaderService } from 'src/app/service/loader.service';
@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.css']
})
export class DetailCustomerComponent implements OnInit {
  events1: any[] |any;
  events2: any[] |any;
  leadData:any
  constructor(private customerService: CustomerService, private activateRoute: ActivatedRoute,public loaderService: LoaderService) {
    this.activateRoute.params.subscribe(param=>{
      const id = param['id']
      this.customerService.getDetailCustomer(id).subscribe(data=>{
        this.leadData = [data];
        console.log(data);

      }
      )

    })
   }

  ngOnInit() {
    this.events1 = [
      {
        status: "Gửi báo giá",
        date: "10:30 15/10/2020 ",
        color: "#4e73df",
        danger:'Chưa cập nhật kết quả'
      },
      {
        status: "Đang đàm phán",
        date: "15/10/2020 14:00",
        color: "#858796"
      },
      {
        status: "Gửi báo giá",
        date: "15/10/2020 16:15",
        color: "#858796"
      },
      {
        status: "Thêm mới khách hàng",
        date: "16/10/2020 10:00",
        color: "#858796"
      }
    ];
  }


}
