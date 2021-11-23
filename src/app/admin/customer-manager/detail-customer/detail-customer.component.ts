import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.css']
})
export class DetailCustomerComponent implements OnInit,OnChanges {
  infoCusomter:any;
  @Input() idUpdate:any;
  @Output() deleteId: EventEmitter<any>;
  @Output() updateId: EventEmitter<any>;
  constructor(private customerSerivce: CustomerService) {
    this.deleteId = new EventEmitter<any>();
    this.updateId = new EventEmitter<any>();
   }

  ngOnInit() {

  }
  ngOnChanges(){
    this.customerSerivce.getDetailCustomer(this.idUpdate).subscribe((data)=>{
      this.infoCusomter = [data];
      console.log(data)
    })
  }
  onDelete(id:any){
    this.deleteId.emit(id);
  }
  onUpdate(id:any){
    this.updateId.emit(id);
  }
}
