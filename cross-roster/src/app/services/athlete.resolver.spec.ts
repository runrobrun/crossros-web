import { TestBed } from '@angular/core/testing';

import { AthleteResolver } from './athlete.resolver';

describe('AthleteResolver', () => {
  let resolver: AthleteResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AthleteResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
