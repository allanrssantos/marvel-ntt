import { TestBed } from '@angular/core/testing';

import { CharactersStateService } from './characters-state.service';

describe('CharactersStateService', () => {
  let service: CharactersStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharactersStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
