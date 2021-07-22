import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

/* ADD A SPINNER */

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;


  constructor(private spinnerService: NgxSpinnerService) { }

  busy() {
    this.busyRequestCount++;
    this.spinnerService.show(undefined, {
      type: 'line-scale-party', /** CHANGE SPINNER STYLE IF YOU WANT, https://www.npmjs.com/package/ngx-spinner */
      bdColor: 'rgba(255,255,255,0)',
      color: '#333333'
    })
  }

  idle() {
    this.busyRequestCount--;
    if(this.busyRequestCount <= 0){
      this.busyRequestCount = 0;
      this.spinnerService.hide();
    }
  }
}
