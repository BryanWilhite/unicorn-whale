// https://github.com/cironunes/httpclient-testing/blob/master/src/app/shared/github-api.service.spec.ts

import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from '@angular/common/http/testing';

import { HttpParams } from '@angular/common/http';

import { GitHubApiService } from './git-hub-api.service';
import { User } from '../../models/github-api.model';

describe('GitHubApiService', () => {
  let injector: TestBed;
  let service: GitHubApiService;
  let mockBackEnd: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GitHubApiService]
    });

    injector = getTestBed();
    service = injector.get(GitHubApiService);
    mockBackEnd = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    service = TestBed.get(GitHubApiService);
    expect(service).toBeTruthy();
  });

  describe('service call: getUsers', () => {
    it('should return an Observable<User[]>', () => {
      const dummyUsers: User[] = [new User(0, 'John'), new User(1, 'Doe')];

      // service call will be deferred/intercepted
      // by mock version of HttpClient in HttpClientTestingModule:
      service.getUsers().subscribe(users => {
        expect(users.length).toBe(2);
        expect(users).toEqual(dummyUsers);
        console.log({ users });
      });

      // setup expectations: one call for specified URI and GET method:
      const testRequest: TestRequest = mockBackEnd.expectOne(GitHubApiService.getUsersUri());
      expect(testRequest.request.method).toBe('GET');

      // test expectations with dummy data:
      testRequest.flush(dummyUsers);
    });

    it('should call endpoint only once with the expected HTTP method', () => {
      // service call will be deferred/intercepted
      // by mock version of HttpClient in HttpClientTestingModule:
      service.getUsers().subscribe();

      // setup expectations: one call for specified URI and GET method:
      const testRequest: TestRequest = mockBackEnd.expectOne(GitHubApiService.getUsersUri());
      expect(testRequest.request.method).toBe('GET');

      // test expectations with null invocation:
      testRequest.flush(null);
    });
  });

  describe('service call: search', () => {
    const name = 'cironunes';
    const dummyParams = new HttpParams().set('q', name);

    it('should throw an error if trying to search for not supported `what`', () => {
      const what = 'unknown';
      service.search(what, dummyParams).subscribe(
        () => {},
        err => {
          expect(err).toBe(GitHubApiService.getSearchErrorMessageForWhatException(what));
        }
      );

      // expectNone() is useful when an error is expected:
      mockBackEnd.expectNone(GitHubApiService.getUsersUri(name));
    });

    it('should return an Observable<SearchResults>', () => {
      service.search('users', dummyParams).subscribe(result => {
        expect(result.items.length).toBe(2);
      });

      // setup expectations: one call for specified URI and dummy `HttpParams`:
      const req = mockBackEnd.expectOne(GitHubApiService.getUsersUri(name));
      expect(req.request.url).toBe(GitHubApiService.getUsersSearchUri());
      expect(req.request.params).toEqual(dummyParams);

      // test expectations with dummy data:
      req.flush({
        incomplete_results: false,
        items: [{}, {}],
        total_count: 2
      });
    });
  });
});
