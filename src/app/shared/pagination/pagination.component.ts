import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, range } from 'rxjs';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit,AfterViewInit {
  @Input() offset:any;
  @Input() limit: any;
  @Input() size: any;
  @Input() totalPage: any;
  @Input() range: number = 3;



  @Output() pageChange: EventEmitter<any>;
  currentPage: any;
  totalPages: any;
  pages:any
  constructor() {
    this.pageChange = new EventEmitter<any>();

  }
  ob:Observable<any> |any
  ngOnInit() {

  }
  ngAfterViewInit(){
   setTimeout(()=>{
    this.getPages(this.offset, this.limit, this.size);
    console.log(this.size);
   },2000)


  }

  getCurrentPage(offset: number, limit: number): number {
    return Math.floor(offset / limit) + 1;
  }

  getTotalPages(limit: number, size: number): number {
   return Math.ceil(Math.max(size, 1) / Math.max(limit, 1));
  }

  getPages(offset: number, limit: number, size: number) {
    this.currentPage = this.getCurrentPage(offset, limit);
    this.totalPages = this.getTotalPages(limit, size);
    this.pages = (this.rangeFunc(-this.range, this.range).map(offset=>this.currentPage+ offset
    ).filter(page => this.isValidPageNumber(page, this.totalPages)));
  }


  rangeFunc(start:any, end:any) {
    var ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
  }

  isValidPageNumber(page: number, totalPages: number): boolean {
  return page > 0 && page <= totalPages;
}

selectPage(page: number, event: any) {
  event.preventDefault();
  if (this.isValidPageNumber(page, this.totalPages)) {
    this.pageChange.emit((page - 1) * this.limit);
  }
  this.currentPage = page
  this.pages = (this.rangeFunc(-this.range, this.range).map(offset=>this.currentPage+ offset
    ).filter(page => this.isValidPageNumber(page, this.totalPages)));
}

cancelEvent(event:any) {
  event.preventDefault();
}

}
