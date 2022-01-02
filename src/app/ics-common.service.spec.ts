import { TestBed } from '@angular/core/testing';

import { IcsCommonService } from './ics-common.service';

describe('IcsCommonService', () => {
  let service: IcsCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IcsCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
