import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  day: Date = new Date;
  value = 30;
  single =[ {
    "name": "Đang tiếp xúc",
    "value": 8940000
  },
  {
    "name": "Thành công",
    "value": 5000000
  },
  {
    "name": "Thất bại",
    "value": 7200000
  }];
  view: any[] = [110, 110];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = true;

  colorScheme = {
    domain: ['#f6c23e', '#1cc88a', '#e74a3b']
  };


  constructor() {

  }

  onChangeDay(day:any){
   // do something here
   }

  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  ngOnInit() {
  }

}
