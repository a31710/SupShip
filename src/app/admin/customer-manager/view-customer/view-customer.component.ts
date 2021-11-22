import { Component, EventEmitter, OnInit, Output } from '@angular/core';import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../service/customer.service';
import { UserService } from '../../service/user.service';
import Swal from 'sweetalert2'
import { environment } from 'src/environments/environment';
import { NgSelectConfig } from '@ng-select/ng-select';
@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {
postCodeReport:any
req:any;
fromDate:any;
toDate: Date = new Date;
url = environment.url;
tranferForm: FormGroup | any;
idArray: any[] = []
tranferData:any[] |any = [] ;
listCustomer:any
offset: number = 0;
limit: number = 15;
size:any
totalPage:number = 3;
tabs = [{
  title:'Danh sách khách hàng',
  value: 1
},{
  title:'Báo cáo tiếp xúc',
  value: 5
}
];
status:any = 'ALL';
selected = new FormControl(0);
dataPost:any
dataDept:any
dataLead:any
deptCodeSelect:any;
postCodeSelect:any;
leadSelect:any
idUpdate:any;
isSearch:Boolean = false;
empSystemId:any;
  constructor(private customerService: CustomerService, private route: Router,private config: NgSelectConfig,
     private toastr: ToastrService, private fb: FormBuilder,private userService: UserService) {
      this.config.appendTo = 'body';
      this.config.bindValue = 'value';
      const cos:any = localStorage.getItem('empSystemId');
      this.empSystemId = parseInt(cos);

      this.fromDate =  new Date(this.toDate.getFullYear(), this.toDate.getMonth(), 1);

    // this.customerService.getAllCustomer().subscribe(data=>{
    //   this.size = data.totalItem;
    //   this.listCustomer =data.data
    // })
    this.customerService.getLeadStatus(1,15,'ALL').subscribe((data)=>{
      this.status = 'ALL';
      this.listCustomer = data.data
      console.log(data.data);
      this.size = data.totalItem;
      this.isSearch = false;
    })
    this.createForm();
    this.getAllDeptCode();
  }

  ngOnInit() {

  }

  createForm(){
    this.tranferForm = this.fb.group({
      userAssigneeId: [this.empSystemId,Validators.required],
      userRecipientId: ['',Validators.required],
      leadIds:['',],
      deptCode: ['',Validators.required],
      postCode: ['',Validators.required],

    })
  }

  get leadIdArray(){
    return this.tranferForm.get('leadIds') as FormArray;
  }
  onSubmit(){

    this.leadIdArray.setValue(this.idArray);
    console.log(this.tranferForm.value);
    this.customerService.LeadAssign(this.tranferForm.value).subscribe(data=>{
      this.tranferData = [];
      console.log(data);
    })
    // const resetArr = this.tranferData.filter((d:any) => d.id == -1)
  }
  onSearch(){
    this.customerService.searchLead(this.datePipe(this.fromDate),this.datePipe(this.toDate),this.status)
    .subscribe(data=>{
      this.listCustomer = data.data
      this.size = data.totalItem;
      this.isSearch = true;
    })

  }

  datePipe(date:any){
    return ('0' + date.getDate()).slice(-2) + '-'
    + ('0' + (date.getMonth()+1)).slice(-2) + '-'
    + date.getFullYear();
  }
  getAllDeptCode(){
    this.userService.getDeptCode().subscribe(data=>this.dataDept=data)
  }

  getPostCode(value:any){
    this.userService.getPostCode(value).subscribe(data=>this.dataPost=data)
  }

  getListByPostCode(postCode:any){
    this.customerService.getLeadByPostCode(postCode).subscribe(data=>{
      this.dataLead = data
      console.log(data);
    })
  }
  onPageChange(offset: number) {
    this.offset = offset;
    console.log(this.offset/this.limit);
    if(this.isSearch == false){
      this.customerService.getLeadStatus((this.offset/this.limit)+1,this.limit,this.status).subscribe(data=>{
        this.listCustomer = data.data;
        this.isSearch = false;
      })
    }else{
      this.customerService.searchLeadPagi(this.datePipe(this.fromDate),this.datePipe(this.toDate),this.status,(this.offset/this.limit)+1,this.limit)
      .subscribe(data=>{
        this.listCustomer = data.data;
        this.isSearch = true;
      })
    }



    this.idArray = [];
  }
  onDelete(id:any){
    this.tabs.map((d,i)=>{
      if(d.value == 3){
        this.tabs.splice(i, 1);
      }
    })
     this.listCustomer = this.listCustomer.filter((data:any) => data.id !== id);
    this.customerService.deleteCustomer(id).subscribe(()=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Xóa thành công',
        showConfirmButton: false,
        timer: 3000
      })
    })
  }

  addContactExcel(){
    const contactexcel = {title:'Giao khách hàng excel', value:7};
    const oldData = this.tabs.filter(data => data.value == 7)
    if(oldData[0]?.value == 7){
      console.log('bị trùng, trở về tab cũ');
      this.tabs.forEach((d,i)=>{
        if(d.value == 7){
          this.selected.setValue(i);
        }
      })
    }else{
      console.log('tạo mới');
      this.tabs.push(contactexcel);
      this.selected.setValue(this.tabs.length - 1);
    }
  }

  addPostReport(event:any){
    const postReport = {title:`Bưu cục ${event}`, value:6};
    const oldData = this.tabs.filter(data => data.value == 6)
    if(oldData[0]?.value == 6){
      console.log('bị trùng, trở về tab cũ');
      this.tabs.forEach((d,i)=>{
        if(d.value == 6){
          this.tabs[i].title = `Bưu cục ${event}`;
          this.selected.setValue(i);
        }
      })
    }else{
      console.log('tạo mới');
      this.tabs.push(postReport);
      this.selected.setValue(this.tabs.length - 1);
    }
    console.log(event);
    this.postCodeReport = event;
  }
  addUpdateTab(id:any){
    const updateCustomer = {title:'Cập nhật khách hàng', value:4}
    const oldData = this.tabs.filter(data => data.value == 4)
    if(oldData[0]?.value == 4){
      console.log('bị trùng, trở về tab cũ');
      this.tabs.forEach((d,i)=>{
        if(d.value == 4){
          this.selected.setValue(i);
        }
      })
    }else{
      console.log('tạo mới');
      this.tabs.push(updateCustomer);
      this.selected.setValue(this.tabs.length - 1);
    }
    console.log(id);

  }
  addCreateTab(){
    const createCustomer = {title:'Tạo mới khách hàng', value:2}
    const oldData = this.tabs.filter(data => data.value == 2)
    if(oldData[0]?.value == 2){
      console.log('bị trùng, trở về tab cũ');
      this.tabs.forEach((d,i)=>{
        if(d.value == 2){
          this.selected.setValue(i);
        }
      })
    }else{
      console.log('tạo mới');
      this.tabs.push(createCustomer);
      this.selected.setValue(this.tabs.length - 1);
    }
  }
  addDetailTab(id:any){
    const createDetail = {title:'Thông tin KH', value:3}
    const oldData = this.tabs.filter(data => data.value == 3)
    if(oldData[0]?.value == 3){
      console.log('bị trùng, trở về tab cũ');
      this.tabs.forEach((d,i)=>{
        if(d.value == 3){
          this.selected.setValue(i);
        }
      })
    }else{
      console.log('tạo mới');
      this.tabs.push(createDetail);
      this.selected.setValue(this.tabs.length - 1);
    }
    this.idUpdate = id;
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
  singleTranfer(id:any){
    const data  = this.listCustomer.filter((data:any)=> data.id === id);
    this.tranferData= data;
  }
  getIdArray(id:any){
    if(this.idArray.includes(id)){
      const newArr = this.idArray.filter(d => d !== id)
      this.idArray = newArr
    }else{
      this.idArray.push(id);
    }
    console.log(this.idArray);

  }

   allTranfer(){
    console.log(this.tranferData);
     this.idArray.forEach((d)=>{
       const data = this.listCustomer.filter((data:any)=> data.id == d)
      this.tranferData.push(data[0]);
      })
  }

  clearTranferData(){
    this.tranferData = [];
  }


  getListNew(){
    this.offset = 0;
    this.customerService.getLeadStatus(1,15,'NEW').subscribe((data)=>{
      this.status = 'NEW';
      this.listCustomer = data.data
      console.log(data.data);
      this.size = data.totalItem;
      this.isSearch = false;
    })
  }

  getListAll(){
    this.offset = 0;
    this.customerService.getLeadStatus(1,15,'ALL').subscribe((data)=>{
      this.status = 'ALL';
      this.listCustomer = data.data
      console.log(data.data);
      this.size = data.totalItem;
      this.isSearch = false;
    })
  }

  getListContacting(){
    this.offset = 0;
    this.customerService.getLeadStatus(1,15,'CONTACTING').subscribe((data)=>{
      this.status = 'CONTACTING';
      this.listCustomer = data.data
      console.log(data.data);
      this.size = data.totalItem;
      this.isSearch = false;
    })
  }

  getListSuccess(){
    this.offset = 0;
    this.customerService.getLeadStatus(1,15,'SUCCESS').subscribe((data)=>{
      this.status = 'SUCCESS';
      this.listCustomer = data.data
      console.log(data.data);
      this.size = data.totalItem;
      this.isSearch = false;
    })
  }

  getListFalied(){
    this.offset = 0;
    this.customerService.getLeadStatus(1,15,'FAILED').subscribe((data)=>{
      this.status = 'FAILED';
      this.listCustomer = data.data
      console.log(data.data);
      this.size = data.totalItem;
      this.isSearch = false;
    })
  }

  getListNotContacting(){
    this.offset = 0;
    this.customerService.getLeadStatus(1,15,'NOT_CONTACTED').subscribe((data)=>{
      this.status = 'NOT_CONTACTED';
      this.listCustomer = data.data
      console.log(data.data);
      this.size = data.totalItem;
      this.isSearch = false;
    })
  }

  toggle(i:any){
    $(`.toogle${i}`).toggleClass("bg-gradient-light");
  }

  // Upload File excel




  afuConfig = {
    uploadAPI:  {
      url:`${this.url}/api/lead-assigns/import`,
      method:"POST",
      headers: {
     "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      responseType: 'blob',
      withCredentials: false,
    },
    theme: "dragNDrop",
    fileNameIndex:false,
    hideResetBtn: true,
    autoUpload: false,
    replaceTexts: {
      selectFileBtn: 'Chọn file',
      resetBtn: 'Reset',
      uploadBtn: 'Tải lên',
      dragNDropBox: 'Kéo thả tệp tin vào đây',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_success: 'tạo mới khách hàng thành công !',
      afterUploadMsg_error: 'tải lên thất bại !',
      sizeLimit: 'Size Limit'
    }
  };
}
