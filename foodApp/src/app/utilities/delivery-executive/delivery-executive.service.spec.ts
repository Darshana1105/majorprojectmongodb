import { TestBed } from '@angular/core/testing';

import { DeliveryExecutiveService } from './delivery-executive.service';

describe('DeliveryExecutiveService', () => {
  let service: DeliveryExecutiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryExecutiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
