import { Injectable } from '@angular/core';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersStateService {
  characters: Character[] = [];
  filteredCharacters: Character[] = [];
  scrollPosition: number = 0;
  totalCharacters: number = 0;
}
