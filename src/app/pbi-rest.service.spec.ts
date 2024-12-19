import { TestBed } from '@angular/core/testing';

import { PBIRESTService } from './pbi-rest.service';

describe('PBIRESTService', () => {
  let service: PBIRESTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PBIRESTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
