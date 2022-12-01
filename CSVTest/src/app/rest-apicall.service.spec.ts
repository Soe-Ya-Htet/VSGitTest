import { TestBed } from '@angular/core/testing';

import { RestAPICallService } from './rest-apicall.service';

describe('RestAPICallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestAPICallService = TestBed.get(RestAPICallService);
    expect(service).toBeTruthy();
  });
});
