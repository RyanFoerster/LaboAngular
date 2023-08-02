import { TestBed } from '@angular/core/testing';

import { TournamentInscriptionService } from './tournament-inscription.service';

describe('TournamentInscriptionService', () => {
  let service: TournamentInscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TournamentInscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
