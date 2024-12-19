import { TestBed } from '@angular/core/testing';

import { AzureManagementService } from './azure-management.service';

describe('AzureManagementService', () => {
  let service: AzureManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzureManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
