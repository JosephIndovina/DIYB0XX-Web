import { TestBed } from '@angular/core/testing';

import { InoGeneratorService } from './ino-generator.service';

describe('InoGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InoGeneratorService = TestBed.get(InoGeneratorService);
    expect(service).toBeTruthy();
  });
});
