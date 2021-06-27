import { TestBed } from '@angular/core/testing';

import { DistrictControllerService } from './district-controller.service';

describe('DistrictControllerService', () => {
  let service: DistrictControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistrictControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
