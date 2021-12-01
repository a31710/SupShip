import { Directive, ElementRef, HostListener} from '@angular/core';
import { NgControl } from '@angular/forms';


@Directive({
  selector: '[appTime]'
})
export class TimeDirective {

  constructor(private eleRef: ElementRef,public ngControl: NgControl){

  }
  @HostListener('input',['$event'])
   inputChange(){
    console.log(this.eleRef.nativeElement.value);

  }
}
