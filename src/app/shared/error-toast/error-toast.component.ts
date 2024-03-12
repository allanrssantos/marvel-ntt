import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-toast',
  templateUrl: './error-toast.component.html',
  styleUrls: ['./error-toast.component.scss'],
})
export class ErrorToastComponent implements OnInit {
  @Input() errorMessage: string = '';
  @Input() errorCode: string = '';
  show: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.show = true;
    setTimeout(() => {
      this.show = false;
      window.location.reload();
    }, 5000);
  }
}
