import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { CardCharacterComponent } from './shared/card-character/card-character.component';
import { CharactersComponent } from './components/characters/characters.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './shared/loading/loading.component';
import { ErrorToastComponent } from './shared/error-toast/error-toast.component';
import { CharacterDetailsComponent } from './components/characters/character-details/character-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardCharacterComponent,
    CharactersComponent,
    LoadingComponent,
    ErrorToastComponent,
    CharacterDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
