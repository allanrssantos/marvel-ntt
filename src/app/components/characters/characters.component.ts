import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Character, CharacterDataWrapper } from 'src/app/models/character.model';
import { CharactersStateService } from 'src/app/services/characters-state.service';
import { MarvelService } from 'src/app/services/marvel.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  error: boolean = false;
  errorCode: string = '';
  errorMessage: string = '';
  offset: number = 0;
  limit: number = 100;
  totalCharacters: number = 0;
  filterText: string = '';
  filteredCharacterNames: string[] = [];
  filteredCharacters: Character[] = [];
  showBackButton: boolean = false;
  showDropdown: boolean = false;
  selectedCharacter: string | null = null;
  private subscription = new Subscription();
  marginTop: string = '';


  constructor(
    private marvelService: MarvelService,
    private router: Router,
    public charactersState: CharactersStateService,
  ) {}

  ngOnInit(): void {
    if (this.charactersState.characters.length === 0) {
      this.loadAllCharacters();
    } else {
      this.loadCharacterNames();
      this.restoreScrollPosition();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadAllCharacters(): void {
    const loadCharacters = (offset: number): Observable<any> => {
      return this.marvelService.getCharacters(offset, this.limit);
    };

    this.loading = true;
    this.subscription.add(
      loadCharacters(this.offset).subscribe({
        next: (response: CharacterDataWrapper) => {
          this.charactersState.characters = [...this.charactersState.characters, ...response.data.results];
          this.charactersState.totalCharacters = response.data.total;
          if (this.charactersState.characters.length < this.charactersState.totalCharacters) {
            this.offset += this.limit;
            this.loadAllCharacters();
          } else {
            this.loading = false;
          }
        },
        error: (error: HttpErrorResponse) => {
          this.error = true;
          this.errorCode = error.status.toString();
          this.errorMessage = error.message;
          this.loading = false;
        }
      })
    );
  }

  restoreScrollPosition(): void {
    setTimeout(() => {
      const position = this.charactersState.scrollPosition;
      if (position) window.scrollTo(0, position);
    }, 0);
  }

  goToCharacterDetail(character: Character): void {
    this.charactersState.scrollPosition = window.scrollY;
    this.marvelService.changeCharacter(character);
    this.router.navigate(['/characters/detail']);
  }

  filterCharacters(): void {
    this.showBackButton = true;

    if (!this.filterText) {
      this.loadCharacterNames();
    } else {
      this.filteredCharacterNames = this.charactersState.characters
        .map(character => character.name)
        .filter(name => name.toLowerCase().includes(this.filterText.toLowerCase()));

      if (this.filteredCharacterNames.length === 0) {
        this.filteredCharacterNames = ['No results'];
      }
    }
  }

  loadCharacterNames(): void {
    if (this.loading) {
      this.filteredCharacterNames = ['Await loading...'];
    } else if (this.charactersState.characters.length === this.charactersState.totalCharacters) {
      this.filteredCharacterNames = this.charactersState.characters.map(character => character.name);
    }
  }

  applyFilter(characterName: string): void {
    this.filteredCharacters = this.charactersState.characters.filter(
      (character) =>
        character.name.toLowerCase() === characterName.toLowerCase()
    );
  }

  toggleDropdown(): void {
    if (this.charactersState.characters.length < this.charactersState.totalCharacters) {
            this.filteredCharacterNames = ['Await loading...'];
    } else {
      this.loadCharacterNames();
    }
    this.showDropdown = !this.showDropdown;
  }


  selectCharacter(characterName: string): void {
    if (characterName === 'No results') {
      this.selectedCharacter = null;
      return;
    }
    this.showBackButton = true;
    this.selectedCharacter = characterName;
    this.showDropdown = false;
    this.filterText = '';
    this.filteredCharacterNames = [];
    this.applyFilter(characterName);
  }

   clearFilter(): void {
    this.selectedCharacter = null;
    this.filterText = '';
    this.filteredCharacters = [];
    this.filteredCharacterNames = this.charactersState.characters.map(character => character.name);
    this.showDropdown = false;
    this.showBackButton = false;
  }
}
