import { TestBed } from '@angular/core/testing';

import { ApiConfigService } from './api-config.service';
import { environment } from '../../../environments/environment';

describe('ApiConfigService', () => {
  let service: ApiConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getApiUrl should return the API URL from environment', () => {
    expect(service.getApiUrl()).toEqual(environment.apiUrl);
  });
});
