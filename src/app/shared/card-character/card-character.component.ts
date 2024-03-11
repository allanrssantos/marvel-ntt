import { Component, Input, OnInit } from '@angular/core';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-card-character',
  templateUrl: './card-character.component.html',
  styleUrls: ['./card-character.component.scss']
})
export class CardCharacterComponent implements OnInit {
  @Input() character!: Character;
  @Input() index: number = 0;
  imageUrl: string = '';
  cardColor: string = '';
  hover: boolean = false;

  ngOnInit(): void {
    this.cardColor = this.index % 2 === 0 ? '#007bff' : '#e60000';
    this.imageUrl = `${this.character.thumbnail.path}/portrait_uncanny.${this.character.thumbnail.extension}`;
  }

}
