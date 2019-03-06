import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs';

import { User, SearchResults } from '../../models/github-api.model';

@Injectable()
export class GitHubApiService {
  static readonly API_URL = 'https://api.github.com';

  static readonly WHAT = ['repositories', 'commits', 'code', 'issues', 'users'];

  constructor(private http: HttpClient) {}

  static getUsersSearchUri(): string {
    return `${GitHubApiService.API_URL}/search/users`;
  }

  static getUsersUri(query: string | null = null): string {
    return query
      ? `${GitHubApiService.getUsersSearchUri()}?q=${query}`
      : `${GitHubApiService.API_URL}/users`;
  }

  static getSearchErrorMessageForWhatException(what: string): string {
    return `Searching for ${what} is not supported. The available types are: ${GitHubApiService.WHAT.join(
      ', '
    )}.`;
  }

  getUsers() {
    return this.http.get<User[]>(`${GitHubApiService.API_URL}/users`);
  }

  search<T>(what: string, params: HttpParams): Observable<SearchResults<T>> {
    if (GitHubApiService.WHAT.indexOf(what) === -1) {
      return throwError(
        GitHubApiService.getSearchErrorMessageForWhatException(what)
      );
    }
    return this.http.get<SearchResults<T>>(
      `${GitHubApiService.API_URL}/search/${what}`,
      { params }
    );
  }
}
