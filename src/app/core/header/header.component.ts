import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MarvelService } from 'src/app/services/marvel.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  private loginSubscription!: Subscription;


  constructor(private router: Router, private marvelService: MarvelService) {
  }

  ngOnInit(): void {
    this.loginSubscription = this.marvelService.isLoggedIn.subscribe(
      (loggedIn) => {
        this.isLoggedIn = loggedIn;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  onGo(): void {
    this.router.navigate(['characters']);
    this.marvelService.login();
  }

  onExit(): void {
    this.router.navigate(['/']);
    this.marvelService.logout();
  }
}
