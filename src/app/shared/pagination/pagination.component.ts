import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { range } from 'rxjs';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() offset:any;
  @Input() limit: any;
  @Input() size: any;
  @Input() range: number = 3;

  @Output() pageChange: EventEmitter<any>;
  currentPage: any;
  totalPages: any;
  pages: Observable<number[]> | any;
  constructor() {
    this.pageChange = new EventEmitter<any>()
  }

  ngOnInit() {
    this.getPages(this.offset, this.limit, this.size);
  }


  getCurrentPage(offset: number, limit: number): number {
    return Math.floor(offset / limit) + 1;
  }

  getTotalPages(limit: number, size: number): number {
   return Math.ceil(Math.max(size, 1) / Math.max(limit, 1));
  }

  getPages(offset: number, limit: number, size: number) {
    // this.currentPage = this.getCurrentPage(offset, limit);
    // this.totalPages = this.getTotalPages(limit, size);
    // this.pages =  Observable.range(-this.range, this.range * 2 + 1)
    //   .map((offset:any) => this.currentPage + offset)
    //   .filter((page:any) => this.isValidPageNumber(page, this.totalPages))
    //   .toArray();
  }


  isValidPageNumber(page: number, totalPages: number): boolean {
  return page > 0 && page <= totalPages;
}

selectPage(page: number, event: any) {
  event.preventDefault();
  if (this.isValidPageNumber(page, this.totalPages)) {
    this.pageChange.emit((page - 1) * this.limit);
  }
}

cancelEvent(event:any) {
  event.preventDefault();
}

}
