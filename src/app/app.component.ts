import { Component, OnDestroy, OnInit } from '@angular/core';
import { MarvelService } from './services/marvel.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'marvel';
  isLoggedIn: boolean = false;
  private subscription!: Subscription;


  constructor(private marvelService: MarvelService) {}

  ngOnInit(): void {
    this.subscription = this.marvelService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
