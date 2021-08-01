import { TestBed } from '@angular/core/testing';

import { ReportDataControllerService } from './report-data-controller.service';

describe('ReportDataControllerService', () => {
  let service: ReportDataControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportDataControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
