import { TestBed } from '@angular/core/testing';

import { DistrictMNSControllerService } from './district-mns-controller.service';

describe('DistrictMNSControllerService', () => {
  let service: DistrictMNSControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistrictMNSControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
