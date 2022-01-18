import { TestBed } from '@angular/core/testing';

import { UserPreferencesService } from './user-preferences.service';

describe('UserPreferencesService', () => {
  let service: UserPreferencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [UserPreferencesService]});
    service = TestBed.inject(UserPreferencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
