import { TestBed, inject } from '@angular/core/testing';

import { GitHubApiService } from './git-hub-api.service';

describe('GitHubApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GitHubApiService]
    });
  });

  it('should be created', inject([GitHubApiService], (service: GitHubApiService) => {
    expect(service).toBeTruthy();
  }));
});
