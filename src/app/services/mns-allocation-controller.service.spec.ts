import { TestBed } from '@angular/core/testing';

import { MnsAllocationControllerService } from './mns-allocation-controller.service';

describe('MnsAllocationControllerService', () => {
  let service: MnsAllocationControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MnsAllocationControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
