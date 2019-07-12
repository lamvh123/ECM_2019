import { TestBed } from '@angular/core/testing';

import { DynamicScriptLoaderServiceService } from './dynamic-script-loader-service.service';

describe('DynamicScriptLoaderServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DynamicScriptLoaderServiceService = TestBed.get(DynamicScriptLoaderServiceService);
    expect(service).toBeTruthy();
  });
});
