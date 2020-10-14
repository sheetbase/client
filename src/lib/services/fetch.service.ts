import {HelperService} from './helper.service';
import {CacheService} from './cache.service';

export class FetchService {
  constructor(
    private helperService: HelperService,
    private cacheService: CacheService
  ) {}

  async fetch<Data>(
    input: RequestInfo,
    init?: RequestInit,
    json = true
  ): Promise<Data> {
    const response = await fetch(input, init);
    if (!response.ok) {
      throw new Error('Fetch failed!');
    }
    return !json ? response.text() : response.json();
  }

  get<Data>(url: string, init?: RequestInit, json = true, cacheTime = 0) {
    return this.cacheService.get(
      'fetch_' + this.helperService.md5(url),
      () => this.fetch<Data>(url, {...init, method: 'GET'}, json),
      cacheTime
    );
  }

  post<Data>(url: string, init?: RequestInit) {
    return this.fetch<Data>(url, {...init, method: 'POST'});
  }

  put<Data>(url: string, init?: RequestInit) {
    return this.fetch<Data>(url, {...init, method: 'PUT'});
  }

  patch<Data>(url: string, init?: RequestInit) {
    return this.fetch<Data>(url, {...init, method: 'PATCH'});
  }

  delete<Data>(url: string, init?: RequestInit) {
    return this.fetch<Data>(url, {...init, method: 'DELETE'});
  }
}
