import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/service/loader.service';
import { CustomerService } from '../../service/customer.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.css']
})
export class ReceiveComponent implements OnInit {
  totalLead:any
  leadData:any;
  req:any = '';
  data:any;
  constructor(private customerService: CustomerService, private router:Router,public loaderService: LoaderService) {
    this.customerService.getLeadByUser().subscribe(data=>{
      this.leadData = data.data
      this.totalLead = data.totalItem;
      console.log(data);
    })
  }

  onSearch(){
    console.log(this.req);
    if(this.req != undefined && this.req){
      this.customerService.searchLead(this.req).subscribe(data=>{

        if(data?.error == 'true'){
          Swal.fire({
            icon: 'error',
            title: data?.message,
            showConfirmButton: true,
            confirmButtonText: 'Chấp nhận'
          })
        }else{
          console.log(data);
          this.leadData = data.data
          this.totalLead = data.totalItem;
        }
      })
    }else{
      this.customerService.getLeadByUser().subscribe(data=>{
        this.leadData = data.data
        this.totalLead = data.totalItem;
        console.log(data);
      })
    }
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
