import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { CommonService } from './service/common.service';



@NgModule({
  declarations: [
  PaginationComponent],
  imports:[
    CommonModule,
  ],
  exports:[
    PaginationComponent
  ],
  providers:[CommonService]
})
export class SharedModule {

}
