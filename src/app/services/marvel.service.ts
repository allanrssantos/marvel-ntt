import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Md5Service } from './md5.service';
import { Character, CharacterDataWrapper } from '../models/character.model';
import { CharactersStateService } from './characters-state.service';



@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  private baseUrl = environment.apiUrl;
  private publicKey = environment.publicKey;
  private privateKey = environment.privateKey;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private characterSource = new BehaviorSubject<Character | null>(null);
  currentCharacter = this.characterSource.asObservable();

  constructor(private http: HttpClient, private md5: Md5Service, private charactersStateService: CharactersStateService) { }

  getCharacters(offset: number = 0, limit: number = 100): Observable<CharacterDataWrapper> {
    const timestamp = new Date().getTime().toString();
    const hash = this.md5.generateHash(timestamp, this.privateKey, this.publicKey);
    const url = `${this.baseUrl}/characters?ts=${timestamp}&apikey=${this.publicKey}&hash=${hash}&offset=${offset}&limit=${limit}`;

    return this.http.get<CharacterDataWrapper>(url);
  }

  changeCharacter(character: Character) {
    this.characterSource.next(character);
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login() {
    this.loggedIn.next(true);
  }

  logout() {
    this.loggedIn.next(false);
    this.charactersStateService.scrollPosition = 0;
  }
}
