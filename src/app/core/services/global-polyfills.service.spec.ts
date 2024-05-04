import { TestBed } from '@angular/core/testing';

import { GlobalPolyfillsService } from './global-polyfills.service';

describe('GlobalPolyfillsService', () => {
  let service: GlobalPolyfillsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalPolyfillsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
