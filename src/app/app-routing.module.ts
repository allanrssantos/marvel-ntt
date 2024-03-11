import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CharactersComponent } from './components/characters/characters.component';
import { AuthGuard } from './guards/auth.guard';
import { CharacterDetailsComponent } from './components/characters/character-details/character-details.component';

const routes: Routes = [
  { path: 'characters', component: CharactersComponent, canActivate:[AuthGuard] },
  { path: 'character', component: CharacterDetailsComponent, canActivate:[AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
