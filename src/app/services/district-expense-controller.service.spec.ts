import { TestBed } from '@angular/core/testing';

import { DistrictExpenseControllerService } from './district-expense-controller.service';

describe('DistrictExpenseControllerService', () => {
  let service: DistrictExpenseControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistrictExpenseControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
