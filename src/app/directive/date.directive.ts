import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlName][appDate]'
})
export class DateDirective {

  constructor(private eleRef: ElementRef, private ngControl: NgControl) { }
  @HostListener('input',['$event'])
  inputChange(){
   let newVal = this.eleRef.nativeElement.value.replace(/\D/g, '');
   if ( newVal.length <= 6) {
     this.eleRef.nativeElement.value = newVal.substring(0, newVal.length - 1);
   }
   if (newVal.length === 0) {
     this.eleRef.nativeElement.value = '';
   } else if (newVal.length <= 2) {
     this.eleRef.nativeElement.value = newVal.replace(/^(\d{0,2})/, '$1');
   } else if (newVal.length <= 4) {
     this.eleRef.nativeElement.value = newVal.replace(/^(\d{0,2})(\d{0,2})/, '$1/$2');
   } else if (newVal.length <= 8) {
     this.eleRef.nativeElement.value = newVal.replace(/^(\d{0,2})(\d{0,2})(\d{0,4})/, '$1/$2/$3');
   } else if (newVal.length > 8){
     newVal = newVal.substring(0, 8);
     this.eleRef.nativeElement.value = newVal.replace(/^(\d{0,2})(\d{0,2})(\d{0,4})/, '$1/$2/$3');

   }



  }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event:any) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
 keydownBackspace(event:any) {
   this.onInputChange(event.target.value, true);
 }


 onInputChange(event:any, backspace:any) {
   let newVal = event.replace(/\D/g, '');
   if (backspace && newVal.length <= 6) {
     newVal = newVal.substring(0, newVal.length - 1);
   }
   if (newVal.length === 0) {
     newVal = '';
   } else if (newVal.length <= 2) {
     newVal = newVal.replace(/^(\d{0,2})/, '$1');
   } else if (newVal.length <= 4) {
     newVal = newVal.replace(/^(\d{0,2})(\d{0,2})/, '$1/$2');
   } else if (newVal.length <= 8) {
     newVal = newVal.replace(/^(\d{0,2})(\d{0,2})(\d{0,4})/, '$1/$2/$3');
   } else {
     newVal = newVal.substring(0, 8);
     newVal = newVal.replace(/^(\d{0,2})(\d{0,2})(\d{0,4})/, '$1/$2/$3');
   }
   this.ngControl.control?.setValue(newVal);
 }

}
