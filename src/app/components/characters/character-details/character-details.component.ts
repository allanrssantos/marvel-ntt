import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'src/app/models/character.model';
import { MarvelService } from 'src/app/services/marvel.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {
  character!: Character;
  imageUrl: string = '';
  constructor(private marvelService: MarvelService, private router: Router) { }

  ngOnInit(): void {
    this.marvelService.currentCharacter.subscribe(character => {
      if (character) {
        this.character = character;
      }
    });
    this.imageUrl = `${this.character.thumbnail.path}/portrait_uncanny.${this.character.thumbnail.extension}`;
  }

  close(): void {
    this.router.navigate(['characters']);
  }
}
