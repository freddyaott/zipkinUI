import { TestBed, inject } from '@angular/core/testing';

import { ZipkinApiService } from './zipkin-api.service';

describe('ZipkinApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZipkinApiService]
    });
  });

  it('should be created', inject([ZipkinApiService], (service: ZipkinApiService) => {
    expect(service).toBeTruthy();
  }));
});
