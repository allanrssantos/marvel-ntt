import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-toast',
  templateUrl: './error-toast.component.html',
  styleUrls: ['./error-toast.component.scss'],
})
export class ErrorToastComponent implements OnInit {
  @Input() errorMessage: string = '';
  @Input() errorCode: string = '';
  show: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.show = true;
    setTimeout(() => {
      this.show = false;
      this.router.navigate(['/'])
    }, 5000);
  }
}
