import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlName][appPhoneNumber]'
})
export class PhoneNumberDirective {

  constructor(private eleRef: ElementRef,public ngControl: NgControl) {
   }

   @HostListener('input',['$event'])
   inputChange(){
    let newVal = this.eleRef.nativeElement.value.replace(/\D/g, '');
    if ( newVal.length <= 6) {
      this.eleRef.nativeElement.value = newVal.substring(0, newVal.length - 1);
    }
    if (newVal.length === 0) {
      this.eleRef.nativeElement.value = '';
    } else if (newVal.length <= 3) {
      this.eleRef.nativeElement.value = newVal.replace(/^(\d{0,3})/, '$1');
    } else if (newVal.length <= 6) {
      this.eleRef.nativeElement.value = newVal.replace(/^(\d{0,3})(\d{0,3})/, '$1 $2');
    } else if (newVal.length <= 10) {
      this.eleRef.nativeElement.value = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '$1 $2 $3');
    } else if (newVal.length > 10){
      newVal = newVal.substring(0, 10);
      this.eleRef.nativeElement.value = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '$1 $2 $3');

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
    } else if (newVal.length <= 3) {
      newVal = newVal.replace(/^(\d{0,3})/, '$1');
    } else if (newVal.length <= 6) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '$1 $2');
    } else if (newVal.length <= 10) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '$1 $2 $3');
    } else {
      newVal = newVal.substring(0, 10);
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '$1 $2 $3');
    }
    this.ngControl.control?.setValue(newVal);
  }




}