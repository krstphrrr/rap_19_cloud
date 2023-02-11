import { TestBed, inject } from '@angular/core/testing';

import { AnalysisStateService } from './analysis-state.service';

describe('AnalysisStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnalysisStateService]
    });
  });

  it('should be created', inject([AnalysisStateService], (service: AnalysisStateService) => {
    expect(service).toBeTruthy();
  }));
});
