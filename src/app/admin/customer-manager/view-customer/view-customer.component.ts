import { Component, EventEmitter, OnInit, Output } from '@angular/core';import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as fileSaver from 'file-saver';
import { CustomerService } from '../../service/customer.service';
import { UserService } from '../../service/user.service';
import Swal from 'sweetalert2'
import { environment } from 'src/environments/environment';
import { NgSelectConfig } from '@ng-select/ng-select';
import { LoaderService } from 'src/app/service/loader.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth/service/auth.service';
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
isCTX:boolean = false;
isdb:boolean = false;
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
fileName='Bao-cao-tiep-xuc.xlsx'
loadUpdate: any = 1;
loadExcel: any = 1;
dsbDept:boolean = false;
dsbPost:boolean = false;
  constructor(private customerService: CustomerService, private cookieService: CookieService,private config: NgSelectConfig,
     public loaderService: LoaderService , private fb: FormBuilder,private userService: UserService, private authService: AuthService) {
      this.reportRole();
      this.roleFunction();
      this.setTime();
      this.config.appendTo = 'body';
      this.config.bindValue = 'value';
      const cos:any = this.cookieService.get('empSystemId');
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

  fetchAPi(){
    this.customerService.getLeadStatus(1,15,'ALL').subscribe((data)=>{
      this.status = 'ALL';
      this.listCustomer = data.data
      console.log(data.data);
      this.size = data.totalItem;
      this.isSearch = false;
    })
  }

  roleFunction(){
    const role = this.authService.getRole();
    if(role == 'CN'){
      this.customerService.fillCbx().subscribe(data=>{
        console.log(data);
        this.deptCodeSelect = data.deptCode
        this.dsbDept = true;
        this.getPostCode(data.deptCode);
      })
    }
    if(role == 'BC'){
      this.customerService.fillCbx().subscribe(data=>{
        this.deptCodeSelect = data.deptCode;
        this.getPostCode(data.deptCode);
        this.postCodeSelect = data.postCode;
        this.getListByPostCode(data.postCode);
        this.dsbDept = true;
        this.dsbPost = true;
      })
    }
  }

  setTime(){
    setTimeout(()=>{
      const role = this.authService.getRole();
      if(role == 'BC'){
        this.customerService.fillCbx().subscribe(d=>{
          d.postCode;
          this.tabs.map((d,i)=>{
            if(d.value == 5){
              this.tabs.splice(i, 1);
            }
          })
          const postReport = {title: 'Báo cáo tiếp xúc', value:6};
          const oldData = this.tabs.filter(data => data.value == 6)
          if(oldData[0]?.value == 6){
            console.log('bị trùng, trở về tab cũ');
            this.tabs.forEach((d,i)=>{
              if(d.value == 6){
                this.tabs[i].title ='Báo cáo tiếp xúc';
              }
            })
          }else{
            console.log('tạo mới');
            this.tabs.push(postReport);
          }
          this.postCodeReport = d.postCode;
        })
      }else{
        if(!role){
          this.setTime()
        }
      }
    })
  }



  reportRole(){
    const role = this.authService.getRole();
    if(role == 'BC'){
      this.customerService.fillCbx().subscribe(d=>{
        d.postCode;
        this.tabs.map((d,i)=>{
          if(d.value == 5){
            this.tabs.splice(i, 1);
          }
        })
        const postReport = {title: 'Báo cáo tiếp xúc', value:6};
        const oldData = this.tabs.filter(data => data.value == 6)
        if(oldData[0]?.value == 6){
          console.log('bị trùng, trở về tab cũ');
          this.tabs.forEach((d,i)=>{
            if(d.value == 6){
              this.tabs[i].title ='Báo cáo tiếp xúc';
              this.selected.setValue(i);
            }
          })
        }else{
          console.log('tạo mới');
          this.tabs.push(postReport);
        }
        this.postCodeReport = d.postCode;
      })
    }
  }

  createForm(){
    this.tranferForm = this.fb.group({
      userAssigneeId: [this.empSystemId,Validators.required],
      userRecipientId: ['',Validators.required],
      leadIds:['',],
      deptCode: ['',Validators.required],
      postCode: ['',Validators.required],
      note:['',Validators.required],
    })
  }



  resetTranferForm(){
    const empty:any ="";
    this.deptCodeSelect = empty;
    this.postCodeSelect = empty;
    this.leadSelect = empty;
    this.tranferForm.reset();
  }




  get userRecipientIdArr(){
    return this.tranferForm.get('userRecipientId') as FormArray;
  }

  get leadIdArray(){
    return this.tranferForm.get('leadIds') as FormArray;
  }

  get deptCodeArr(){
    return this.tranferForm.get('deptCode') as FormArray;
  }

  get postCodeArr(){
    return this.tranferForm.get('postCode') as FormArray;
  }

  onSubmit(){

    this.leadIdArray.setValue(this.idArray);
    console.log(this.tranferForm.value);
    this.customerService.LeadAssign(this.tranferForm.value).subscribe(data=>{
      this.tranferData = [];
      this.idArray = [];
      console.log(data);
      if(data?.error == "true"){
        Swal.fire({
          title: 'Giao tiếp xúc thất bại',
          text: data?.message,
          icon: 'error',
          confirmButtonColor: '#4e73df',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.fetchAPi();
            this.resetTranferForm();
          }
        })
      }else{
        Swal.fire({
          title: 'Giao tiếp xúc thành công',
          icon: 'success',
          confirmButtonColor: '#4e73df',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.fetchAPi();
            this.resetTranferForm();
          }
        })
      }

    })




  }
  onSearch(){

    if(this.req != undefined && this.req){
      this.customerService.searchIdLead(this.req).subscribe(data=>{

        if(data?.error == 'true'){
          Swal.fire({
            icon: 'error',
            title: data?.message,
            showConfirmButton: true,
            confirmButtonText: 'Chấp nhận'
          })
        }else{
          console.log(data);
          this.listCustomer = [data]
          this.size = data.totalItem;
          this.isSearch = true;

        }
      })
    }else{
      this.customerService.searchLead(this.datePipe(this.fromDate),this.datePipe(this.toDate),this.status)
      .subscribe(data=>{
        this.listCustomer = data.data
        this.size = data.totalItem;
        this.isSearch = true;
        if(data?.error == 'true'){
          Swal.fire({
            icon: 'error',
            title: data?.message,
            showConfirmButton: true,
            confirmButtonText: 'Chấp nhận'
          })
        }else{
          this.listCustomer = data.data
          this.size = data.totalItem;
          this.isSearch = true;
        }
      })
    }


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

  createCus(data:any){
    this.customerService.getLeadStatus(1,15,'ALL').subscribe((data)=>{
      this.status = 'ALL';
      this.listCustomer = data.data
      console.log(data.data);
      this.size = data.totalItem;
      this.isSearch = false;
    })

    this.tabs.map((d,i)=>{
      if(d.value == 2){
        this.tabs.splice(i, 1);
      }
    })
    this.selected.setValue(0);
    console.log(data);


  }

  updateCus(data:any){
    this.customerService.getLeadStatus(1,15,'ALL').subscribe((data)=>{
      this.status = 'ALL';
      this.listCustomer = data.data
      console.log(data.data);
      this.size = data.totalItem;
      this.isSearch = false;
    })

    this.tabs.map((d,i)=>{
      if(d.value == 4){
        this.tabs.splice(i, 1);
      }
    })
    this.selected.setValue(0);
    console.log(data);
    this.loadUpdate+=1;
  }

  onDelete(id:any){

    this.customerService.deleteCustomer(id).subscribe((data)=>{
      if(data?.error =='true'){
        Swal.fire({
          title: 'Xóa không thành công ?',
          text: data?.message,
          icon: 'error',
          confirmButtonColor: '#4e73df',
          confirmButtonText: 'Chấp nhận'
        }).then((result) => {
          if (result.isConfirmed) {
            this.tabs.map((d,i)=>{
              if(d.value == 3){
                this.tabs.splice(i, 1);
              }
            })
            this.selected.setValue(0);
          }
        })

      }else{
        Swal.fire({
          title: 'Xóa thành công',
          icon: 'success',
          timer: 3000
        })
        this.customerService.getLeadStatus(1,15,'ALL').subscribe((data)=>{
          this.status = 'ALL';
          this.listCustomer = data.data
          console.log(data.data);
          this.size = data.totalItem;
          this.isSearch = false;
        })
        this.tabs.map((d,i)=>{
          if(d.value == 3){
            this.tabs.splice(i, 1);
          }
        })
        this.selected.setValue(0);
      }

    })
  }

  addContactExcel(){
    const contactexcel = {title:'Giao tiếp xúc excel', value:7};
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
    this.selected.setValue(0);
  }
  uploadTranferForm(data:any){
    console.log(data);

  }
  singleTranfer(id:any, stt:any){
    this.roleFunction();
    if(stt == 'CONTACTING' || stt == 'FAILED' || stt == 'NOT_CONTACTED'){
      this.isCTX = true;
    }else{
      this.isCTX = false;
    }
    this.idArray.push(id);


    const data  = this.listCustomer.filter((data:any)=> data.id === id);
    if(data[0].leadAssigns){
      this.deptCodeSelect = data[0].leadAssigns[data[0].leadAssigns.length-1]?.deptCode
      this.getPostCode(this.deptCodeSelect);
      this.postCodeSelect = data[0].leadAssigns[data[0].leadAssigns.length-1]?.postCode
      this.getListByPostCode(this.postCodeSelect);
    }
    this.tranferData= data;
    this.uploadTranferForm(data)
  }
  getIdArray(id:any){

    if(this.idArray.includes(id)){
      const newArr = this.idArray.filter(d => d !== id)
      this.idArray = newArr
    }else{
      this.idArray.push(id);
      if(this.idArray.length>0){
        this.isdb = true;
      }else{
        this.isdb = false;
      }
    }
    console.log(this.idArray);
    if(this.idArray.length>0){
      this.isdb = true;
    }else{
      this.isdb = false;
    }

  }

   allTranfer(){
     this.idArray.forEach((d)=>{
       const data = this.listCustomer.filter((data:any)=> data.id == d)
      data.map((d:any)=>{
        if(d?.status == 'CONTACTING' || d?.status == 'FAILED'){

          Swal.fire({
            title: 'Chuyển tiếp xúc lỗi ?',
            text: "Không được chuyển tiếp xúc nhiều khách hàng, hoặc vừa chuyển tiếp xúc, vừa giao tiếp xúc",
            icon: 'error',
            confirmButtonColor: '#4e73df',
            confirmButtonText: 'Chấp nhận'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          })

        }
      })
      this.tranferData.push(data[0]);
      })
      console.log(this.tranferData);
  }

  clearTranferData(){
    if(this.isdb == false){
      this.idArray = [];
    }
    if(this.idArray.length>0){
      this.isdb == true
    }
    this.tranferData = [];
    this.resetTranferForm();
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


  fetchExcel(){
    this.loadExcel +=1;
  }




  returnBlob(res:any) : Blob {
    console.log('file Downloaded');
    return new Blob([res], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });
  }

  exportLead(){
    this.customerService.exportLead('danh-sach-khach-hang.xlsx',this.datePipe(this.fromDate),this.datePipe(this.toDate))
    .subscribe( res =>{
      if(res){
        fileSaver.saveAs(this.returnBlob(res),'danh-sach-khach-hang.xlsx');
      }
    })
  }

  exportExcel(){
    this.customerService.exportExcelReport(this.fileName).subscribe( res =>{
      if(res){
        fileSaver.saveAs(this.returnBlob(res),this.fileName);
      }
    })
  }

  // Upload File excel




  afuConfig = {
    uploadAPI:  {
      url:`${this.url}/api/lead-assigns/import`,
      method:"POST",
      headers: {
     "Authorization": `Bearer ${this.cookieService.get('token')}`
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
