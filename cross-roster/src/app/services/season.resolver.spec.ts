import { TestBed } from '@angular/core/testing';

import { SeasonResolver } from './season.resolver';

describe('SeasonResolver', () => {
  let resolver: SeasonResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SeasonResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
